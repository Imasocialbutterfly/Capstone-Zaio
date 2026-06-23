import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  Users,
  Bed,
  Bath,
  Menu,
  User,
  Globe,
} from "lucide-react";
import airbnbLogo from "../../assets/airbnb-logo.png";
import * as S from "./LocationsPage.styled";
import AuthModal from "../auth/AuthModal";

const LocationsPage = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    propertyType: "all",
    priceRange: "all",
    bedrooms: "all",
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authError, setAuthError] = useState("");

  const propertyTypes = [
    "All",
    "Apartment",
    "House",
    "Condo",
    "Villa",
    "Cabin",
  ];
  const priceRanges = [
    { label: "All", value: "all" },
    { label: "Under R1500", value: "0-1500" },
    { label: "R1500 - R3000", value: "1500-3000" },
    { label: "R3000 - R5000", value: "3000-5000" },
    { label: "Over R5000", value: "5000+" },
  ];
  const bedroomOptions = ["All", "1", "2", "3", "4+"];

  useEffect(() => {
    fetchListings();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/listings");

      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }

      const data = await response.json();
      setListings(data.listings || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = listings.filter((listing) => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        listing.title?.toLowerCase().includes(term) ||
        listing.description?.toLowerCase().includes(term) ||
        listing.address?.city?.toLowerCase().includes(term) ||
        listing.address?.country?.toLowerCase().includes(term);

      if (!matchesSearch) return false;
    }

    if (
      filters.propertyType !== "all" &&
      listing.propertyType !== filters.propertyType
    ) {
      return false;
    }

    if (filters.priceRange !== "all") {
      const price = listing.price;
      const [min, max] = filters.priceRange.split("-");

      if (filters.priceRange === "5000+") {
        if (price < 5000) return false;
      } else {
        if (price < parseInt(min) || price > parseInt(max)) return false;
      }
    }

    if (filters.bedrooms !== "all") {
      if (filters.bedrooms === "4+") {
        if (listing.bedrooms < 4) return false;
      } else {
        if (listing.bedrooms !== parseInt(filters.bedrooms)) return false;
      }
    }

    return true;
  });

  const resetAuthForm = () => {
    setAuthError("");
    setAuthMode("login");
  };

  const handleAuthSubmit = async (credentials) => {
    try {
      setAuthError("");
      const endpoint = authMode === "login" ? "login" : "signup";

      const response = await fetch(
        `http://localhost:4000/api/users/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setCurrentUser(data.user);
      setShowAuthModal(false);
    } catch (error) {
      setAuthError(error.message || "An error occurred");
      console.error("Auth error:", error);
    }
  };

  const handleProtectedAction = (action) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    action();
  };

  const handleListingClick = (id) => {
    navigate(`/listing/${id}`);
  };

  const handleBookClick = (e, listingId) => {
    e.stopPropagation();
    handleProtectedAction(() => {
      navigate(`/reservation/${listingId}`);
    });
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    if (currentUser) {
      setShowDropdown(!showDropdown);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setCurrentUser(null);
    setShowDropdown(false);
  };

  if (loading) {
    return (
      <S.LocationsContainer>
        <S.LoadingSpinner />
      </S.LocationsContainer>
    );
  }

  if (error) {
    return (
      <S.LocationsContainer>
        <S.ErrorMessage>
          <p>Error loading listings: {error}</p>
          <button onClick={fetchListings}>Try Again</button>
        </S.ErrorMessage>
      </S.LocationsContainer>
    );
  }

  return (
    <div>
      <S.PageHeader>
        <S.HeaderContainer>
          <S.Logo src={airbnbLogo} alt="Airbnb" onClick={() => navigate("/")} />

          <S.HeaderRight>
            <S.IconButton>
              <Globe size={18} />
            </S.IconButton>

            <div style={{ position: "relative" }}>
              <S.ProfileMenu onClick={handleProfileClick}>
                <Menu size={18} />
                <User size={18} />
              </S.ProfileMenu>

              {showDropdown && currentUser && (
                <S.DropdownMenu ref={dropdownRef}>
                  <S.MenuItem onClick={() => navigate("/my-reservations")}>
                    Trips
                  </S.MenuItem>

                  <S.MenuItem onClick={() => navigate("/wishlist")}>
                    Wishlist
                  </S.MenuItem>

                  <S.MenuSeparator />

                  <S.MenuItem onClick={handleLogout}>Logout</S.MenuItem>
                </S.DropdownMenu>
              )}
            </div>
          </S.HeaderRight>
        </S.HeaderContainer>
      </S.PageHeader>

      <S.LocationsContainer>
        <S.LocationsHeader>
          <h1>Find your next stay</h1>
          <p>Search low prices on hotels, homes and much more...</p>
        </S.LocationsHeader>

        <S.StyledSearchBar>
          <input
            type="text"
            placeholder="Search by location, property type, or amenities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </S.StyledSearchBar>

        <S.SearchFilters>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <strong style={{ alignSelf: "center" }}>Property Type:</strong>
            {propertyTypes.map((type) => (
              <S.FilterButton
                key={type}
                className={
                  filters.propertyType === type.toLowerCase() ? "active" : ""
                }
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    propertyType: type === "All" ? "all" : type.toLowerCase(),
                  }))
                }
              >
                {type}
              </S.FilterButton>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginTop: "0.5rem",
            }}
          >
            <strong style={{ alignSelf: "center" }}>Price Range:</strong>
            {priceRanges.map((range) => (
              <S.FilterButton
                key={range.value}
                className={filters.priceRange === range.value ? "active" : ""}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, priceRange: range.value }))
                }
              >
                {range.label}
              </S.FilterButton>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginTop: "0.5rem",
            }}
          >
            <strong style={{ alignSelf: "center" }}>Bedrooms:</strong>
            {bedroomOptions.map((beds) => (
              <S.FilterButton
                key={beds}
                className={
                  filters.bedrooms === beds.toLowerCase() ? "active" : ""
                }
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    bedrooms: beds === "All" ? "all" : beds,
                  }))
                }
              >
                {beds}
              </S.FilterButton>
            ))}
          </div>
        </S.SearchFilters>

        {filteredListings.length === 0 ? (
          <S.EmptyState>
            <h3>No listings found</h3>
            <p>Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilters({
                  propertyType: "all",
                  priceRange: "all",
                  bedrooms: "all",
                });
              }}
              style={{
                padding: "0.75rem 1.5rem",
                background: "#222",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Clear all filters
            </button>
          </S.EmptyState>
        ) : (
          <>
            <p style={{ marginBottom: "1.5rem", color: "#717171" }}>
              Showing {filteredListings.length} of {listings.length} stays
            </p>

            <S.ListingsGrid>
              {filteredListings.map((listing) => (
                <S.ListingCard
                  key={listing._id}
                  onClick={() => handleListingClick(listing._id)}
                >
                  <S.ListingImage
                    src={
                      listing.images?.[0]?.url ||
                      "https://via.placeholder.com/300x250"
                    }
                    alt={listing.title}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x250";
                    }}
                  />
                  <S.ListingInfo>
                    <S.ListingTitleHeader>
                      <S.ListingTitle>{listing.title}</S.ListingTitle>
                      <S.ListingRating>
                        <Star size={16} />
                        <span>4.5</span>
                      </S.ListingRating>
                    </S.ListingTitleHeader>

                    <S.ListingLocation>
                      <MapPin size={14} style={{ marginRight: "0.25rem" }} />
                      {listing.address?.city}, {listing.address?.country}
                    </S.ListingLocation>

                    <S.ListingDetails>
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                          }}
                        >
                          <Users size={14} />
                          {listing.maxGuests} guests
                        </span>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                          }}
                        >
                          <Bed size={14} />
                          {listing.bedrooms} bedrooms
                        </span>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                          }}
                        >
                          <Bath size={14} />
                          {listing.bathrooms} bathrooms
                        </span>
                      </div>
                      {listing.propertyType && (
                        <div style={{ textTransform: "capitalize" }}>
                          {listing.propertyType}
                        </div>
                      )}
                    </S.ListingDetails>

                    {listing.amenities && listing.amenities.length > 0 && (
                      <S.ListingAmenities>
                        {listing.amenities.slice(0, 3).map((amenity, index) => (
                          <S.AmenityTag key={index}>{amenity}</S.AmenityTag>
                        ))}
                        {listing.amenities.length > 3 && (
                          <S.AmenityTag>
                            +{listing.amenities.length - 3} more
                          </S.AmenityTag>
                        )}
                      </S.ListingAmenities>
                    )}

                    <S.ListingFooter>
                      <S.Price>
                        R{listing.price} <span>/ night</span>
                      </S.Price>
                      <S.BookButton
                        onClick={(e) => handleBookClick(e, listing._id)}
                      >
                        Book
                      </S.BookButton>
                    </S.ListingFooter>
                  </S.ListingInfo>
                </S.ListingCard>
              ))}
            </S.ListingsGrid>

            {filteredListings.length < listings.length && (
              <S.LoadMoreButton onClick={() => console.log("Load more clicked")}>
                Show more stays
              </S.LoadMoreButton>
            )}
          </>
        )}
      </S.LocationsContainer>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
          resetAuthForm();
        }}
        onAuthSubmit={handleAuthSubmit}
        mode={authMode}
        setMode={setAuthMode}
        error={authError}
        setAuthError={setAuthError}
      />
    </div>
  );
};

export default LocationsPage;