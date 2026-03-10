import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../../auth/AuthModal';
import airbnbLogo from '../../../assets/airbnb-logo.png';
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
          borderRadius: '16px',
          padding: '1.5rem',
          maxWidth: '480px',
          width: '90%',
          textAlign: 'center',
          position: 'relative',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          animation: 'slideUp 0.4s ease-out',
          maxHeight: '80vh',
          overflow: 'auto'
        }}>
          <div style={{
            position: 'absolute',
            top: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '2.5rem'
          }}>
            <PartyPopper size={50} color="#FF385C" fill="#FF385C" />
          </div>
          
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            backgroundColor: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)'
          }}>
            <CheckCircle size={36} color="white" />
          </div>
          
          <h2 style={{
            margin: '0 0 0.75rem 0',
            color: '#333',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>
            Listing Created Successfully! 🎉
          </h2>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '0.75rem',
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
              padding: '1rem',
              margin: '1rem 0',
              textAlign: 'left',
              border: '1px solid #E2E8F0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                <HomeIcon size={20} color="#FF385C" />
                <h3 style={{ margin: 0, color: '#333', fontSize: '1.1rem' }}>
                  {newListingData.title}
                </h3>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                <MapPin size={14} color="#666" />
                <span style={{ color: '#666', fontSize: '0.85rem' }}>
                  {newListingData.address.city}, {newListingData.address.country}
                </span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginTop: '0.75rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid #E2E8F0'
              }}>
                <div>
                  <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#FF385C' }}>
                    R{newListingData.price}
                    <span style={{ fontSize: '0.85rem', color: '#666', fontWeight: '400' }}>/night</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#666' }}>
                    {newListingData.bedrooms} bed • {newListingData.bathrooms} bath
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  backgroundColor: '#F0FDF4',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  border: '1px solid #BBF7D0'
                }}>
                  <Star size={12} color="#10B981" fill="#10B981" />
                  <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: '600' }}>
                    LIVE
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <p style={{
            color: '#666',
            lineHeight: '1.5',
            marginBottom: '1.5rem',
            fontSize: '0.9rem'
          }}>
            Your listing is now visible to guests. You can manage it from the "View Listings" section.
          </p>
          
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <button
              onClick={() => {
                setActiveSection('listings');
                setShowSuccessModal(false);
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#FF385C',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.95rem',
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
              <Home size={16} />
              View All Listings
            </button>
            
            <button
              onClick={() => setShowSuccessModal(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: 'white',
                color: '#333',
                border: '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.95rem',
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
            marginTop: '1rem',
            fontSize: '0.75rem',
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
          src={airbnbLogo}
          onClick={() => navigate('/')}
          alt="Airbnb Logo"
          style={{ width: '100px', height: 'auto'}}
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