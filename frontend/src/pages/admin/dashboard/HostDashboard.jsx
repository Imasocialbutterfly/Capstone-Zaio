import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../../auth/AuthModal';
import {
  HostDashboardContainer,
  Header,
  Logo,
  WelcomeSection,
  WelcomeText,
  MainContent,
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  ContentArea,
  SectionTitle,
  ReservationsTable,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableCell,
  DeleteButton,
  CreateListingForm,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  SubmitButton,
  ListingsGrid,
  ListingCard,
  ListingImage,
  ListingContent,
  ListingTitle,
  ListingDescription,
  ListingPrice,
  ListingActions,
  ActionButton,
  DeleteListingButton,
  NoDataMessage,
  LoadingSpinner
} from './HostDashboard.styled';

import { 
  Crown, 
  Home, 
  Calendar, 
  DollarSign, 
  LogOut, 
  User, 
  HelpCircle, 
  Settings, 
  Image as ImageIcon, 
  X, 
  CheckCircle,
  PartyPopper,
  Sparkles,
  Home as HomeIcon,
  MapPin,
  Star
} from 'lucide-react';

const HostDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('reservations');
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const dropdownRef = useRef(null);
  const [newListingData, setNewListingData] = useState(null);

  const [reservations, setReservations] = useState([]);
  const [listings, setListings] = useState([]);
  const [newListing, setNewListing] = useState({
    title: '',
    description: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    price: '',
    propertyType: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 1,
    amenities: [],
    images: [],
    rules: []
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      
      if (user.role !== 'host') {
        navigate('/');
      }
      
      fetchHostListings();
    } else {
      setAuthMode('login');
      setShowAuthModal(true);
    }
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchHostListings = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/api/listings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const user = JSON.parse(localStorage.getItem('user'));
         const listingsData = data.listings || data;
        const hostListings = listingsData.filter(listing => 
          listing.host === user._id || listing.host?._id === user._id
        );
        setListings(hostListings);
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setIsUploading(true);
    
    try {
      const imagePromises = files.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({
              preview: e.target.result,
              file: file,
              name: file.name,
              type: file.type,
              size: file.size
            });
          };
          reader.readAsDataURL(file);
        });
      });
      
      const newImages = await Promise.all(imagePromises);
      setUploadedImages([...uploadedImages, ...newImages]);
      setImageFiles([...imageFiles, ...files]);
      
    } catch (error) {
      console.error('Error processing images:', error);
      alert('Error processing images');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const removeImage = (index) => {
    const newImages = [...uploadedImages];
    const newFiles = [...imageFiles];
    newImages.splice(index, 1);
    newFiles.splice(index, 1);
    setUploadedImages(newImages);
    setImageFiles(newFiles);
  };

  const uploadImagesToServer = async () => {
    return uploadedImages.map(img => ({
      url: img.preview,
      caption: img.name
    }));
  };

  const handleAuthSubmit = async (credentials) => {
    try {
      const endpoint = authMode === 'login' ? 'login' : 'signup';
      const response = await fetch(`http://localhost:4000/api/users/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      setCurrentUser(data.user);
      
      if (data.user.role !== 'host') {
        navigate('/');
      }
      
      setShowAuthModal(false);
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
    setShowProfileDropdown(false);
    navigate('/');
  };

  const handleCreateListing = async (e) => {
  e.preventDefault();
  
  if (!newListing.title || !newListing.description || !newListing.price || !newListing.address.street || 
      !newListing.address.city || !newListing.address.country) {
    alert('Please fill in all required fields');
    return;
  }

  if (uploadedImages.length === 0) {
    alert('Please upload at least one image');
    return;
  }

  try {
    const imageUrls = uploadedImages.map(img => ({
      url: img.preview,
      caption: img.name
    }));
    
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    console.log('Token exists:', !!token);
    console.log('User ID:', user?._id);
    
    const listingData = {
      ...newListing,
      images: imageUrls,
      price: parseFloat(newListing.price),
      bedrooms: parseInt(newListing.bedrooms),
      bathrooms: parseInt(newListing.bathrooms),
      maxGuests: parseInt(newListing.maxGuests),
      host: user._id 
    };
    
    console.log('Submitting listing data:', listingData);
    
    const response = await fetch('http://localhost:4000/api/listings/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(listingData)
    });

    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Response text:', responseText);
    
    if (response.ok) {
      const createdListing = JSON.parse(responseText);
      console.log('Created listing:', createdListing);
      setListings([...listings, createdListing]);
      
      setNewListingData(createdListing);
      
      setShowSuccessModal(true);
      
      setNewListing({
        title: '',
        description: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: ''
        },
        price: '',
        propertyType: 'apartment',
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 1,
        amenities: [],
        images: [],
        rules: []
      });
      setUploadedImages([]);
      setImageFiles([]);
      
    } else {
      try {
        const errorData = JSON.parse(responseText);
        alert(errorData.error || 'Failed to create listing');
      } catch {
        alert('Server error: ' + responseText.substring(0, 100));
      }
    }
  } catch (error) {
    console.error('Network error creating listing:', error);
    alert('Network error: ' + error.message);
  }
};

  const handleDeleteReservation = (index) => {
    const newReservations = [...reservations];
    newReservations.splice(index, 1);
    setReservations(newReservations);
  };

  const handleDeleteListing = async (listingId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:4000/api/listings/${listingId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setListings(listings.filter(listing => listing._id !== listingId));
          alert('Listing deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting listing:', error);
      }
    }
  };

  const SuccessModal = () => {
    if (!showSuccessModal) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        animation: 'fadeIn 0.3s ease-in-out'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '2.5rem',
          maxWidth: '500px',
          width: '90%',
          textAlign: 'center',
          position: 'relative',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          animation: 'slideUp 0.4s ease-out'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '3rem'
          }}>
            <PartyPopper size={60} color="#FF385C" fill="#FF385C" />
          </div>
          
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)'
          }}>
            <CheckCircle size={48} color="white" />
          </div>
          
          <h2 style={{
            margin: '0 0 1rem 0',
            color: '#333',
            fontSize: '1.8rem',
            fontWeight: '700'
          }}>
            Listing Created Successfully! 🎉
          </h2>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '1rem',
            color: '#666'
          }}>
            <Sparkles size={16} color="#FFD700" fill="#FFD700" />
            <span>Your property is now live!</span>
            <Sparkles size={16} color="#FFD700" fill="#FFD700" />
          </div>
          
          
          {newListingData && (
            <div style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              padding: '1.5rem',
              margin: '1.5rem 0',
              textAlign: 'left',
              border: '1px solid #E2E8F0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <HomeIcon size={24} color="#FF385C" />
                <h3 style={{ margin: 0, color: '#333', fontSize: '1.2rem' }}>
                  {newListingData.title}
                </h3>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
                <MapPin size={16} color="#666" />
                <span style={{ color: '#666', fontSize: '0.9rem' }}>
                  {newListingData.address.city}, {newListingData.address.country}
                </span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid #E2E8F0'
              }}>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#FF385C' }}>
                    R{newListingData.price}
                    <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: '400' }}>/night</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    {newListingData.bedrooms} bed • {newListingData.bathrooms} bath
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  backgroundColor: '#F0FDF4',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  border: '1px solid #BBF7D0'
                }}>
                  <Star size={14} color="#10B981" fill="#10B981" />
                  <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: '600' }}>
                    LIVE
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <p style={{
            color: '#666',
            lineHeight: '1.5',
            marginBottom: '2rem',
            fontSize: '0.95rem'
          }}>
            Your listing is now visible to guests. You can manage it from the "View Listings" section.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => {
                setActiveSection('listings');
                setShowSuccessModal(false);
              }}
              style={{
                padding: '12px 24px',
                backgroundColor: '#FF385C',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                '&:hover': {
                  backgroundColor: '#E31C5F',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <Home size={18} />
              View All Listings
            </button>
            
            <button
              onClick={() => setShowSuccessModal(false)}
              style={{
                padding: '12px 24px',
                backgroundColor: 'white',
                color: '#333',
                border: '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: '#f7f7f7'
                }
              }}
            >
              Close
            </button>
          </div>
          
          <div style={{
            marginTop: '1.5rem',
            fontSize: '0.8rem',
            color: '#888',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}>
            <span>✨ You're one step closer to earning!</span>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'reservations':
        return (
          <>
            <SectionTitle>My Reservations</SectionTitle>
            {reservations.length === 0 ? (
              <NoDataMessage>
                <p>No reservations yet. Bookings will appear here.</p>
              </NoDataMessage>
            ) : (
              <ReservationsTable>
                <TableHeader>
                  <tr>
                    <TableHeaderCell>Booked by</TableHeaderCell>
                    <TableHeaderCell>Property name</TableHeaderCell>
                    <TableHeaderCell>Check-in Date</TableHeaderCell>
                    <TableHeaderCell>Check-out Date</TableHeaderCell>
                    <TableHeaderCell>Actions</TableHeaderCell>
                  </tr>
                </TableHeader>
                <tbody>
                  {reservations.map((reservation, index) => (
                    <TableRow key={index}>
                      <TableCell>{reservation.bookedBy}</TableCell>
                      <TableCell>{reservation.propertyName}</TableCell>
                      <TableCell>{reservation.checkIn}</TableCell>
                      <TableCell>{reservation.checkOut}</TableCell>
                      <TableCell>
                        <DeleteButton onClick={() => handleDeleteReservation(index)}>
                          Delete
                        </DeleteButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </ReservationsTable>
            )}
          </>
        );

      case 'listings':
        return (
          <>
            <SectionTitle>My Listings</SectionTitle>
            {isLoading ? (
              <LoadingSpinner>Loading...</LoadingSpinner>
            ) : listings.length === 0 ? (
              <NoDataMessage>
                <p>You haven't created any listings yet.</p>
                <button
                  onClick={() => setActiveSection('create')}
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#FF385C',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Create Your First Listing
                </button>
              </NoDataMessage>
            ) : (
              <ListingsGrid>
                {listings.map((listing) => (
                  <ListingCard key={listing._id}>
                    {listing.images && listing.images[0] ? (
                      <ListingImage 
                        src={listing.images[0].url} 
                        alt={listing.title}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                        }}
                      />
                    ) : (
                      <ListingImage 
                        src="https://via.placeholder.com/300x200?text=No+Image" 
                        alt="No image available"
                      />
                    )}
                    <ListingContent>
                      <ListingTitle>{listing.title}</ListingTitle>
                      <ListingDescription>
                        {listing.description && listing.description.length > 100 
                          ? `${listing.description.substring(0, 100)}...`
                          : listing.description || 'No description'}
                      </ListingDescription>
                      <ListingPrice>R{listing.price || '0'} / night</ListingPrice>
                      <div style={{ 
                        fontSize: '0.875rem', 
                        color: '#666', 
                        marginBottom: '1rem',
                        display: 'flex',
                        gap: '1rem'
                      }}>
                        <span>🛏️ {listing.bedrooms || 0} bed{listing.bedrooms !== 1 ? 's' : ''}</span>
                        <span>🚿 {listing.bathrooms || 0} bath{listing.bathrooms !== 1 ? 's' : ''}</span>
                        <span>👥 {listing.maxGuests || 1} guest{listing.maxGuests !== 1 ? 's' : ''}</span>
                      </div>
                      <ListingActions>
                        <ActionButton onClick={() => {
                          navigate(`/edit-listing/${listing._id}`);
                        }}>
                          Edit
                        </ActionButton>
                        <DeleteListingButton onClick={() => handleDeleteListing(listing._id)}>
                          Delete
                        </DeleteListingButton>
                      </ListingActions>
                    </ListingContent>
                  </ListingCard>
                ))}
              </ListingsGrid>
            )}
          </>
        );

      case 'create':
        return (
          <>
            <SectionTitle>Create New Listing</SectionTitle>
            <CreateListingForm onSubmit={handleCreateListing}>
              <FormGroup>
                <FormLabel>Title *</FormLabel>
                <FormInput
                  type="text"
                  value={newListing.title}
                  onChange={(e) => setNewListing({...newListing, title: e.target.value})}
                  required
                  placeholder="Beautiful apartment in city center"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Description *</FormLabel>
                <FormTextarea
                  value={newListing.description}
                  onChange={(e) => setNewListing({...newListing, description: e.target.value})}
                  required
                  placeholder="Describe your property..."
                  rows="4"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Images * (At least 1 required)</FormLabel>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '10px', 
                  marginBottom: '1rem',
                  minHeight: '120px',
                  border: uploadedImages.length === 0 ? '2px dashed #ddd' : 'none',
                  borderRadius: '8px',
                  padding: uploadedImages.length === 0 ? '20px' : '0',
                  justifyContent: uploadedImages.length === 0 ? 'center' : 'flex-start',
                  alignItems: 'center',
                  backgroundColor: uploadedImages.length === 0 ? '#fafafa' : 'transparent'
                }}>
                  {uploadedImages.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#666' }}>
                      <ImageIcon size={40} style={{ marginBottom: '10px', opacity: 0.5 }} />
                      <p>No images uploaded yet</p>
                    </div>
                  ) : (
                    uploadedImages.map((image, index) => (
                      <div key={index} style={{ 
                        position: 'relative',
                        width: '120px',
                        height: '120px'
                      }}>
                        <img 
                          src={image.preview} 
                          alt={`Preview ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            border: '1px solid #ddd'
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: '#FF385C',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                          }}
                        >
                          <X size={14} />
                        </button>
                        <div style={{
                          position: 'absolute',
                          bottom: '0',
                          left: '0',
                          right: '0',
                          background: 'rgba(0,0,0,0.7)',
                          color: 'white',
                          fontSize: '10px',
                          padding: '2px 4px',
                          borderBottomLeftRadius: '8px',
                          borderBottomRightRadius: '8px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {image.name}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      backgroundColor: '#f7f7f7',
                      border: '2px dashed #ddd',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontWeight: '500'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f0f0f0';
                      e.currentTarget.style.borderColor = '#ccc';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f7f7f7';
                      e.currentTarget.style.borderColor = '#ddd';
                    }}
                  >
                    <ImageIcon size={20} />
                    {isUploading ? 'Uploading...' : 'Choose Images'}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                      disabled={isUploading}
                    />
                  </label>
                  <small style={{ color: '#666', fontSize: '0.875rem' }}>
                    Upload high-quality photos of your property (JPG, PNG, WebP). Max 10 images.
                  </small>
                </div>
              </FormGroup>

              <FormGroup>
                <FormLabel>Address *</FormLabel>
                <FormInput
                  type="text"
                  value={newListing.address.street}
                  onChange={(e) => setNewListing({
                    ...newListing,
                    address: {...newListing.address, street: e.target.value}
                  })}
                  required
                  placeholder="Street address"
                />
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <FormInput
                    type="text"
                    value={newListing.address.city}
                    onChange={(e) => setNewListing({
                      ...newListing,
                      address: {...newListing.address, city: e.target.value}
                    })}
                    required
                    placeholder="City"
                    style={{ flex: 1 }}
                  />
                  <FormInput
                    type="text"
                    value={newListing.address.state}
                    onChange={(e) => setNewListing({
                      ...newListing,
                      address: {...newListing.address, state: e.target.value}
                    })}
                    required
                    placeholder="State/Province"
                    style={{ flex: 1 }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <FormInput
                    type="text"
                    value={newListing.address.zipCode}
                    onChange={(e) => setNewListing({
                      ...newListing,
                      address: {...newListing.address, zipCode: e.target.value}
                    })}
                    required
                    placeholder="ZIP/Postal Code"
                    style={{ flex: 1 }}
                  />
                  <FormInput
                    type="text"
                    value={newListing.address.country}
                    onChange={(e) => setNewListing({
                      ...newListing,
                      address: {...newListing.address, country: e.target.value}
                    })}
                    required
                    placeholder="Country"
                    style={{ flex: 1 }}
                  />
                </div>
              </FormGroup>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <FormGroup style={{ flex: 1 }}>
                  <FormLabel>Price per night (R) *</FormLabel>
                  <FormInput
                    type="number"
                    value={newListing.price}
                    onChange={(e) => setNewListing({...newListing, price: e.target.value})}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </FormGroup>

                <FormGroup style={{ flex: 1 }}>
                  <FormLabel>Property Type *</FormLabel>
                  <FormSelect
                    value={newListing.propertyType}
                    onChange={(e) => setNewListing({...newListing, propertyType: e.target.value})}
                    required
                  >
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="guesthouse">Guesthouse</option>
                    <option value="condo">Condo</option>
                    <option value="cabin">Cabin</option>
                    <option value="other">Other</option>
                  </FormSelect>
                </FormGroup>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <FormGroup style={{ flex: 1 }}>
                  <FormLabel>Bedrooms *</FormLabel>
                  <FormInput
                    type="number"
                    value={newListing.bedrooms}
                    onChange={(e) => setNewListing({...newListing, bedrooms: parseInt(e.target.value) || 0})}
                    required
                    min="0"
                  />
                </FormGroup>

                <FormGroup style={{ flex: 1 }}>
                  <FormLabel>Bathrooms *</FormLabel>
                  <FormInput
                    type="number"
                    value={newListing.bathrooms}
                    onChange={(e) => setNewListing({...newListing, bathrooms: parseInt(e.target.value) || 0})}
                    required
                    min="0"
                  />
                </FormGroup>

                <FormGroup style={{ flex: 1 }}>
                  <FormLabel>Max Guests *</FormLabel>
                  <FormInput
                    type="number"
                    value={newListing.maxGuests}
                    onChange={(e) => setNewListing({...newListing, maxGuests: parseInt(e.target.value) || 1})}
                    required
                    min="1"
                  />
                </FormGroup>
              </div>

              <FormGroup>
                <FormLabel>Amenities (comma separated)</FormLabel>
                <FormInput
                  type="text"
                  placeholder="WiFi, Kitchen, Pool, Parking, etc."
                  onChange={(e) => setNewListing({
                    ...newListing,
                    amenities: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                  })}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>House Rules (one per line)</FormLabel>
                <FormTextarea
                  placeholder="No smoking&#10;No pets&#10;Check-in after 3 PM"
                  rows="3"
                  onChange={(e) => setNewListing({
                    ...newListing,
                    rules: e.target.value.split('\n').map(item => item.trim()).filter(item => item)
                  })}
                />
              </FormGroup>

              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                marginTop: '2rem',
                justifyContent: 'flex-end'
              }}>
                <button
                  type="button"
                  onClick={() => setActiveSection('listings')}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: 'transparent',
                    color: '#333',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: '#f7f7f7'
                    }
                  }}
                >
                  Cancel
                </button>
                <SubmitButton type="submit" disabled={isUploading}>
                  {isUploading ? 'Creating...' : 'Create Listing'}
                </SubmitButton>
              </div>
            </CreateListingForm>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <HostDashboardContainer>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideUp {
            from { 
              opacity: 0;
              transform: translate(-50%, -40%);
            }
            to { 
              opacity: 1;
              transform: translate(-50%, -50%);
            }
          }
          
          @keyframes confetti {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(100px) rotate(360deg); }
          }
        `}
      </style>
      
      <Header>
        <Logo 
          src="data:image/png;base64,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"
          onClick={() => navigate('/')}
          alt="Airbnb Logo"
        />
        
        <WelcomeSection style={{ position: 'relative' }} ref={dropdownRef}>
          <WelcomeText>Welcome, {currentUser?.username}</WelcomeText>
          
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px',
              borderRadius: '50%',
              backgroundColor: '#f7f7f7',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e8e8e8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f7f7f7';
            }}
          >
            <User size={20} />
          </button>
          
          {showProfileDropdown && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
                width: '240px',
                zIndex: 1000,
                marginTop: '8px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  padding: '16px',
                  borderBottom: '1px solid #f0f0f0'
                }}
              >
                <div style={{ fontWeight: '600', fontSize: '14px' }}>
                  {currentUser?.username}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: '4px'
                  }}
                >
                  <Crown size={14} color="#FF385C" />
                  <span style={{ color: '#746e6f', fontSize: '12px' }}>
                    Verified Host
                  </span>
                </div>
              </div>
              
              <div
                style={{
                  padding: '8px 0'
                }}
              >
                <button
                  onClick={() => {
                    setActiveSection('reservations');
                    setShowProfileDropdown(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f7f7f7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <Home size={16} />
                  View Reservations
                </button>
                
                <button
                  onClick={() => {
                    setActiveSection('listings');
                    setShowProfileDropdown(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f7f7f7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <Settings size={16} />
                  Manage Listings
                </button>
                
                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f7f7f7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <Calendar size={16} />
                  Host Calendar
                </button>
                
                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f7f7f7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <DollarSign size={16} />
                  Earnings Dashboard
                </button>
              </div>
              
              <div
                style={{
                  padding: '8px 0',
                  borderTop: '1px solid #f0f0f0',
                  borderBottom: '1px solid #f0f0f0'
                }}
              >
                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f7f7f7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <HelpCircle size={16} />
                  Help Center
                </button>
              </div>
              
              <div
                style={{
                  padding: '8px 0'
                }}
              >
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    color: '#FF385C',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#fff5f5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <LogOut size={16} />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </WelcomeSection>
      </Header>

      <MainContent>
        <Sidebar>
          <SidebarMenu>
            <SidebarMenuItem 
              active={activeSection === 'reservations'}
              onClick={() => setActiveSection('reservations')}
            >
              View Reservations
            </SidebarMenuItem>
            <SidebarMenuItem 
              active={activeSection === 'listings'}
              onClick={() => setActiveSection('listings')}
            >
              View Listings
            </SidebarMenuItem>
            <SidebarMenuItem 
              active={activeSection === 'create'}
              onClick={() => setActiveSection('create')}
            >
              Create Listing
            </SidebarMenuItem>
          </SidebarMenu>
        </Sidebar>

        <ContentArea>
          {renderContent()}
        </ContentArea>
      </MainContent>

      <SuccessModal />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSubmit={handleAuthSubmit}
        mode={authMode}
        setMode={setAuthMode}
        error=""
      />
    </HostDashboardContainer>
  );
};

export default HostDashboard;