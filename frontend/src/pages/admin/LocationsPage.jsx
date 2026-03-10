import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Users, Bed, Bath, Menu } from 'lucide-react';
import airbnbLogo from '../../assets/airbnb-logo.png'
import {
  LocationsContainer,
  LocationsHeader,
  SearchFilters,
  FilterButton,
  ListingsGrid,
  ListingCard,
  ListingImage,
  ListingInfo,
  ListingTitleHeader,
  ListingTitle,
  ListingRating,
  ListingLocation,
  ListingDetails,
  ListingAmenities,
  AmenityTag,
  ListingFooter,
  Price,
  BookButton,
  LoadMoreButton,
  LoadingContainer,
  ErrorMessage,
  EmptyState,
  StyledSearchBar,
  PageHeader,
  HeaderContainer,
  Logo,
  ProfileMenu,
  ProfileImage,
  MenuButton,
  DropdownMenu,
  MenuItem,
  MenuSeparator
} from './LocationsPage.styled';

const LocationsPage = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    propertyType: 'all',
    priceRange: 'all',
    bedrooms: 'all'
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const propertyTypes = ['All', 'Apartment', 'House', 'Condo', 'Villa', 'Cabin'];
  const priceRanges = [
    { label: 'All', value: 'all' },
    { label: 'Under R1500', value: '0-1500' },
    { label: 'R1500 - R3000', value: '1500-3000' },
    { label: 'R3000 - R5000', value: '3000-5000' },
    { label: 'Over R5000', value: '5000+' }
  ];
  const bedroomOptions = ['All', '1', '2', '3', '4+'];

  useEffect(() => {
    fetchListings();
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/api/listings');
      
      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }
      
      const data = await response.json();
      setListings(data.listings || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching listings:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = listings.filter(listing => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchesSearch = 
        listing.title?.toLowerCase().includes(term) ||
        listing.description?.toLowerCase().includes(term) ||
        listing.address?.city?.toLowerCase().includes(term) ||
        listing.address?.country?.toLowerCase().includes(term);
      
      if (!matchesSearch) return false;
    }

    if (filters.propertyType !== 'all' && listing.propertyType !== filters.propertyType) {
      return false;
    }

    if (filters.priceRange !== 'all') {
      const price = listing.price;
      const [min, max] = filters.priceRange.split('-');
      
      if (filters.priceRange === '5000+') {
        if (price < 5000) return false;
      } else {
        if (price < parseInt(min) || price > parseInt(max)) return false;
      }
    }

    if (filters.bedrooms !== 'all') {
      if (filters.bedrooms === '4+') {
        if (listing.bedrooms < 4) return false;
      } else {
        if (listing.bedrooms !== parseInt(filters.bedrooms)) return false;
      }
    }

    return true;
  });

  const handleListingClick = (id) => {
    navigate(`/listing/${id}`);
  };

  const handleBookClick = (e, listingId) => {
    e.stopPropagation();
    console.log('Book listing:', listingId);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleProfileClick = () => {
    if (currentUser) {
      setShowDropdown(!showDropdown);
    } else {
      navigate('/auth');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
    setShowDropdown(false);
  };

  if (loading) {
    return (
      <LocationsContainer>
        <LoadingContainer>Loading listings...</LoadingContainer>
      </LocationsContainer>
    );
  }

  if (error) {
    return (
      <LocationsContainer>
        <ErrorMessage>
          <p>Error loading listings: {error}</p>
          <button onClick={fetchListings}>Try Again</button>
        </ErrorMessage>
      </LocationsContainer>
    );
  }

  return (
    <div>
      <PageHeader>
        <HeaderContainer>
          <Logo 
            src={airbnbLogo} 
            alt="Airbnb Logo" 
            onClick={handleLogoClick}
          />
          <ProfileMenu ref={dropdownRef}>
            <MenuButton onClick={() => setShowDropdown(!showDropdown)}>
              <Menu />
            </MenuButton>
            <ProfileImage
              src={currentUser?.profileImage || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="}
              alt="Profile"
              onClick={handleProfileClick}
            />

            {showDropdown && (
              <DropdownMenu>
                {currentUser ? (
                  <>
                    <MenuItem>
                      <strong>Welcome, {currentUser.username}!</strong>
                      {currentUser.role === 'host' && (
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '4px', 
                          marginTop: '4px',
                          color: '#FF385C'
                        }}>
                          <span style={{ fontSize: '12px' }}>Verified Host</span>
                        </div>
                      )}
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Log out</MenuItem>
                    <MenuSeparator />
                    {currentUser.role === 'host' ? (
                      <>
                        <MenuItem onClick={() => navigate('/manage-listings')}>
                          Manage Listings
                        </MenuItem>
                        <MenuItem>Host Dashboard</MenuItem>
                      </>
                    ) : null}
                    <MenuItem>My Trips</MenuItem>
                    <MenuItem>Saved Homes</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem
                      onClick={() => {
                        navigate('/auth');
                        setShowDropdown(false);
                      }}
                    >
                      Log in
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate('/auth');
                        setShowDropdown(false);
                      }}
                    >
                      Sign up
                    </MenuItem>
                  </>
                )}
                <MenuSeparator />
                <MenuItem>Airbnb your home</MenuItem>
                <MenuItem>Host an experience</MenuItem>
                <MenuItem>Help Center</MenuItem>
              </DropdownMenu>
            )}
          </ProfileMenu>
        </HeaderContainer>
      </PageHeader>

      <LocationsContainer>
        <LocationsHeader>
          <h1>Find your next stay</h1>
          <p>Search low prices on hotels, homes and much more...</p>
        </LocationsHeader>

        <StyledSearchBar>
          <input
            type="text"
            placeholder="Search by location, property type, or amenities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </StyledSearchBar>

        <SearchFilters>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <strong style={{ alignSelf: 'center' }}>Property Type:</strong>
            {propertyTypes.map(type => (
              <FilterButton
                key={type}
                className={filters.propertyType === type.toLowerCase() ? 'active' : ''}
                onClick={() => setFilters(prev => ({
                  ...prev,
                  propertyType: type === 'All' ? 'all' : type.toLowerCase()
                }))}
              >
                {type}
              </FilterButton>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <strong style={{ alignSelf: 'center' }}>Price Range:</strong>
            {priceRanges.map(range => (
              <FilterButton
                key={range.value}
                className={filters.priceRange === range.value ? 'active' : ''}
                onClick={() => setFilters(prev => ({ ...prev, priceRange: range.value }))}
              >
                {range.label}
              </FilterButton>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <strong style={{ alignSelf: 'center' }}>Bedrooms:</strong>
            {bedroomOptions.map(beds => (
              <FilterButton
                key={beds}
                className={filters.bedrooms === beds.toLowerCase() ? 'active' : ''}
                onClick={() => setFilters(prev => ({ ...prev, bedrooms: beds === 'All' ? 'all' : beds }))}
              >
                {beds}
              </FilterButton>
            ))}
          </div>
        </SearchFilters>

        {filteredListings.length === 0 ? (
          <EmptyState>
            <h3>No listings found</h3>
            <p>Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilters({ propertyType: 'all', priceRange: 'all', bedrooms: 'all' });
              }}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#222',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Clear all filters
            </button>
          </EmptyState>
        ) : (
          <>
            <p style={{ marginBottom: '1.5rem', color: '#717171' }}>
              Showing {filteredListings.length} of {listings.length} stays
            </p>
            
            <ListingsGrid>
              {filteredListings.map((listing) => (
                <ListingCard
                  key={listing._id}
                  onClick={() => handleListingClick(listing._id)}
                >
                  <ListingImage
                    src={listing.images?.[0]?.url || 'https://via.placeholder.com/300x250'}
                    alt={listing.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x250';
                    }}
                  />
                  <ListingInfo>
                    <ListingTitleHeader>
                      <ListingTitle>{listing.title}</ListingTitle>
                      <ListingRating>
                        <Star size={16} />
                        <span>4.5</span>
                      </ListingRating>
                    </ListingTitleHeader>
                    
                    <ListingLocation>
                      <MapPin size={14} style={{ marginRight: '0.25rem' }} />
                      {listing.address?.city}, {listing.address?.country}
                    </ListingLocation>
                    
                    <ListingDetails>
                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Users size={14} />
                          {listing.maxGuests} guests
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Bed size={14} />
                          {listing.bedrooms} bedrooms
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Bath size={14} />
                          {listing.bathrooms} bathrooms
                        </span>
                      </div>
                      {listing.propertyType && (
                        <div style={{ textTransform: 'capitalize' }}>
                          {listing.propertyType}
                        </div>
                      )}
                    </ListingDetails>
                    
                    {listing.amenities && listing.amenities.length > 0 && (
                      <ListingAmenities>
                        {listing.amenities.slice(0, 3).map((amenity, index) => (
                          <AmenityTag key={index}>{amenity}</AmenityTag>
                        ))}
                        {listing.amenities.length > 3 && (
                          <AmenityTag>+{listing.amenities.length - 3} more</AmenityTag>
                        )}
                      </ListingAmenities>
                    )}
                    
                    <ListingFooter>
                      <Price>
                        R{listing.price} <span>/ night</span>
                      </Price>
                      <BookButton onClick={(e) => handleBookClick(e, listing._id)}>
                        Book
                      </BookButton>
                    </ListingFooter>
                  </ListingInfo>  
                </ListingCard>
              ))}
            </ListingsGrid>
            
            {filteredListings.length < listings.length && (
              <LoadMoreButton onClick={() => console.log('Load more clicked')}>
                Show more stays
              </LoadMoreButton>
            )}
          </>
        )}
      </LocationsContainer>
    </div>
  );
};

export default LocationsPage;