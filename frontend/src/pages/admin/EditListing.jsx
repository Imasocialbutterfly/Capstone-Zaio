import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import airbnbLogo from '../../assets/airbnb-logo.png'
import {
  Image as ImageIcon,
  X,
  ArrowLeft
} from 'lucide-react';
import {
  Container,
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  SubmitButton,
  LoadingSpinner,
  ErrorMessage,
  ImageUploadLabel
} from './styles/shared.styled'

const EditListing = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [listing, setListing] = useState({
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
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:4000/api/listings/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch listing');
      }
      
      const data = await response.json();
      
      setListing({
        ...data,
        price: data.price.toString(),
        bedrooms: data.bedrooms.toString(),
        bathrooms: data.bathrooms.toString(),
        maxGuests: data.maxGuests.toString()
      });
      
      if (data.images && data.images.length > 0) {
        setExistingImages(data.images);
      }
      
    } catch (err) {
      console.error('Error fetching listing:', err);
      setError('Failed to load listing');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
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
      e.target.value = '';
    }
  };

  const removeNewImage = (index) => {
    const newImages = [...uploadedImages];
    const newFiles = [...imageFiles];
    newImages.splice(index, 1);
    newFiles.splice(index, 1);
    setUploadedImages(newImages);
    setImageFiles(newFiles);
  };

  const removeExistingImage = (index) => {
    const newImages = [...existingImages];
    newImages.splice(index, 1);
    setExistingImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!listing.title || !listing.description || !listing.price || !listing.address.street || 
        !listing.address.city || !listing.address.country) {
      setError('Please fill in all required fields');
      return;
    }

    if (existingImages.length === 0 && uploadedImages.length === 0) {
      setError('Please upload at least one image');
      return;
    }

    try {
      setSaving(true);
      
      let finalImages = [];
      
      if (existingImages.length > 0) {
        finalImages = [...existingImages];
      }
      
      if (uploadedImages.length > 0) {
        const newImageUrls = uploadedImages.map(img => ({
          url: img.preview,
          caption: img.name
        }));
        finalImages = [...finalImages, ...newImageUrls];
      }
      
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      
      const listingData = {
        ...listing,
        images: finalImages,
        price: parseFloat(listing.price),
        bedrooms: parseInt(listing.bedrooms),
        bathrooms: parseInt(listing.bathrooms),
        maxGuests: parseInt(listing.maxGuests),
        amenities: listing.amenities || [],
        rules: listing.rules || []
      };
      
      console.log('Updating listing with data:', listingData);
      
      const response = await fetch(`http://localhost:4000/api/listings/${id}`, {
        method: 'PUT',
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
        setSuccess('Listing updated successfully!');
        setTimeout(() => {
          navigate('/manage-listings');
        }, 1500);
      } else {
        try {
          const errorData = JSON.parse(responseText);
          setError(errorData.error || 'Failed to update listing');
        } catch {
          setError('Server error: ' + responseText.substring(0, 100));
        }
      }
    } catch (error) {
      console.error('Network error updating listing:', error);
      setError('Network error: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setListing(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }));
  };

  const handleAmenitiesChange = (e) => {
    const value = e.target.value;
    const amenitiesArray = value.split(',').map(item => item.trim()).filter(item => item);
    setListing(prev => ({
      ...prev,
      amenities: amenitiesArray
    }));
  };

  const handleRulesChange = (e) => {
    const value = e.target.value;
    const rulesArray = value.split('\n').map(item => item.trim()).filter(item => item);
    setListing(prev => ({
      ...prev,
      rules: rulesArray
    }));
  };

  if (loading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <LoadingSpinner>Loading listing...</LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container style={{ position: 'relative', minHeight: '100vh' }}>
      <button
        onClick={() => navigate('/manage-listings')}
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          color: '#666',
          cursor: 'pointer',
          fontSize: '1rem',
          padding: '0.5rem 1rem',
          zIndex: 10,
          borderRadius: '8px',
          transition: 'all 0.2s ease',
          ':hover': {
            backgroundColor: '#f5f5f5'
          }
        }}
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem 2rem 2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem' }}>
            Edit Listing
          </h1>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Update your property information
          </p>
        </div>
        
        {error && (
          <ErrorMessage style={{ 
            backgroundColor: '#fee',
            border: '1px solid #f99',
            color: '#c00',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem'
          }}>
            {error}
          </ErrorMessage>
        )}
        
        {success && (
          <div style={{ 
            backgroundColor: '#dfd',
            border: '1px solid #9d9',
            color: '#080',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem'
          }}>
            {success}
          </div>
        )}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>Title *</FormLabel>
            <FormInput
              type="text"
              name="title"
              value={listing.title}
              onChange={handleChange}
              required
              placeholder="Beautiful apartment in city center"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Description *</FormLabel>
            <FormTextarea
              name="description"
              value={listing.description}
              onChange={handleChange}
              required
              placeholder="Describe your property..."
              rows="4"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Images</FormLabel>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Existing images will be kept. Upload new images to add to the collection.
            </p>
            
            {existingImages.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Current Images:</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {existingImages.map((image, index) => (
                    <div key={`existing-${index}`} style={{ position: 'relative' }}>
                      <img 
                        src={image.url} 
                        alt={image.caption || `Image ${index + 1}`}
                        style={{
                          width: '120px',
                          height: '120px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: '1px solid #ddd'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
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
                          justifyContent: 'center'
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '10px', 
              marginBottom: '1rem',
              minHeight: '120px',
              border: uploadedImages.length === 0 && existingImages.length === 0 ? '2px dashed #ddd' : 'none',
              borderRadius: '8px',
              padding: uploadedImages.length === 0 && existingImages.length === 0 ? '20px' : '0',
              justifyContent: uploadedImages.length === 0 ? 'center' : 'flex-start',
              alignItems: 'center',
              backgroundColor: uploadedImages.length === 0 && existingImages.length === 0 ? '#fafafa' : 'transparent'
            }}>
              {uploadedImages.length === 0 && existingImages.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#666' }}>
                  <ImageIcon size={40} style={{ marginBottom: '10px', opacity: 0.5 }} />
                  <p>No images uploaded yet</p>
                </div>
              ) : (
                uploadedImages.map((image, index) => (
                  <div key={`new-${index}`} style={{ position: 'relative' }}>
                    <img 
                      src={image.preview} 
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '1px solid #ddd'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
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
                        justifyContent: 'center'
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
            
            <ImageUploadLabel>
              <ImageIcon size={20} />
              Add More Images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </ImageUploadLabel>
            <small style={{ color: '#666', fontSize: '0.875rem', display: 'block', marginTop: '0.5rem' }}>
              Upload additional high-quality photos (JPG, PNG, WebP)
            </small>
          </FormGroup>

          <FormGroup>
            <FormLabel>Address *</FormLabel>
            <FormInput
              type="text"
              name="street"
              value={listing.address.street}
              onChange={handleAddressChange}
              required
              placeholder="Street address"
            />
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <FormInput
                type="text"
                name="city"
                value={listing.address.city}
                onChange={handleAddressChange}
                required
                placeholder="City"
                style={{ flex: 1 }}
              />
              <FormInput
                type="text"
                name="state"
                value={listing.address.state}
                onChange={handleAddressChange}
                required
                placeholder="State/Province"
                style={{ flex: 1 }}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <FormInput
                type="text"
                name="zipCode"
                value={listing.address.zipCode}
                onChange={handleAddressChange}
                required
                placeholder="ZIP/Postal Code"
                style={{ flex: 1 }}
              />
              <FormInput
                type="text"
                name="country"
                value={listing.address.country}
                onChange={handleAddressChange}
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
                name="price"
                value={listing.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </FormGroup>

            <FormGroup style={{ flex: 1 }}>
              <FormLabel>Property Type *</FormLabel>
              <FormSelect
                name="propertyType"
                value={listing.propertyType}
                onChange={handleChange}
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
                name="bedrooms"
                value={listing.bedrooms}
                onChange={handleChange}
                required
                min="0"
              />
            </FormGroup>

            <FormGroup style={{ flex: 1 }}>
              <FormLabel>Bathrooms *</FormLabel>
              <FormInput
                type="number"
                name="bathrooms"
                value={listing.bathrooms}
                onChange={handleChange}
                required
                min="0"
              />
            </FormGroup>

            <FormGroup style={{ flex: 1 }}>
              <FormLabel>Max Guests *</FormLabel>
              <FormInput
                type="number"
                name="maxGuests"
                value={listing.maxGuests}
                onChange={handleChange}
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
              value={listing.amenities.join(', ')}
              onChange={handleAmenitiesChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>House Rules (one per line)</FormLabel>
            <FormTextarea
              placeholder="No smoking&#10;No pets&#10;Check-in after 3 PM"
              rows="3"
              value={listing.rules.join('\n')}
              onChange={handleRulesChange}
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
              onClick={() => navigate('/manage-listings')}
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
            <SubmitButton type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Update Listing'}
            </SubmitButton>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default EditListing;