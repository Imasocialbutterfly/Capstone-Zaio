import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  Users,
  Bed,
  Bath,
  Home,
  Shield,
  Key,
  Calendar,
  ChevronRight,
  Check,
  X,
  Heart,
  Menu,
  Share,
} from "lucide-react";
import airbnbLogo from "../../assets/airbnb-logo.png";
import {
  ListingContainer,
  PageHeader,
  HeaderContainer,
  Logo,
  ProfileMenu,
  ProfileImage,
  MenuButton,
  DropdownMenu,
  MenuItem,
  MenuSeparator,
  MainContent,
  LeftColumn,
  ListingHeader,
  TitleRow,
  ListingTitle,
  RatingSection,
  StarIcon,
  RatingText,
  SuperhostBadge,
  LocationSection,
  MapIcon,
  LocationText,
  ActionStrip,
  ActionButton,
  LeftInfo,
  Separator,
  RightActions,
} from "./ReservationPage.styled.js";

const ReservationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [showAllDescription, setShowAllDescription] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2022-02-19");
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/listings/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch listing");
      }

      const data = await response.json();
      setListing(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching listing:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    if (currentUser) {
      setShowDropdown(!showDropdown);
    } else {
      navigate("/auth");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setCurrentUser(null);
    setShowDropdown(false);
  };

  const handleBookClick = () => {
    console.log("Booking listing);", id);
  };

  const handleReportClick = () => {
    console.log("Report listing;", id);
  };

  const handleShare = () => {
    console.log('Share listing:', id)
  }

  const handleSave = () => {
    console.log('Save listing:', id)
  }

  const calculateTotal = () => {
    if (!listing) return 0;

    const basePrice = listing.price || 75;
    const nights = 7;
    const subtotal = basePrice * nights;
    const weeklyDiscount = subtotal * 0.15;
    const cleaningFee = 62;
    const serviceFee = 50;
    const taxes = subtotal * 0.15;

    return subtotal - weeklyDiscount + cleaningFee + serviceFee + taxes;
  };

  if (loading) {
    return (
      <ListingContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            fontSize: "1.2rem",
            color: "#717171",
          }}
        >
          Loading listing...
        </div>
      </ListingContainer>
    );
  }

  if (error || !listing) {
    return (
      <ListingContainer>
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "#FF385C",
            fontSize: "1.1rem",
          }}
        >
          <p>Error loading listing: {error || "Listing not found"}</p>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "0.75rem 1.5rem",
              background: "#222",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          >
            Go Back Home
          </button>
        </div>
      </ListingContainer>
    );
  }

  return (
    <ListingContainer>
      <PageHeader>
        <HeaderContainer>
          <Logo src={airbnbLogo} alt="Airbnb Logo" onClick={handleLogoClick} />
          <ProfileMenu>
            <MenuButton onClick={() => setShowDropdown(!showDropdown)}>
              <Menu />
            </MenuButton>
            <ProfileImage
              src={
                currentUser?.profileImage ||
                "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
              }
              alt="Profile"
              onClick={handleProfileClick}
            />

            {showDropdown && (
              <DropdownMenu>
                {currentUser ? (
                  <>
                    <MenuItem>
                      <strong>Welcome, {currentUser.username}!</strong>
                      {currentUser.role === "host" && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            marginTop: "4px",
                            color: "#FF385C",
                          }}
                        >
                          <span style={{ fontSize: "12px" }}>
                            Verified Host
                          </span>
                        </div>
                      )}
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Log out</MenuItem>
                    <MenuSeparator />
                    {currentUser.role === "host" ? (
                      <>
                        <MenuItem onClick={() => navigate("/manage-listings")}>
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
                        navigate("/auth");
                        setShowDropdown(false);
                      }}
                    >
                      Log in
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/auth");
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

      <MainContent>
        <LeftColumn>
          <ListingHeader>
            <TitleRow>
              <ListingTitle>{listing.title || "Bordeaux Getaway"}</ListingTitle>
            </TitleRow>

            <ActionStrip>
              <LeftInfo>
                <RatingSection>
                  <StarIcon>
                    <Star size={16} fill="#FF385C" color="#FF385C" />
                  </StarIcon>
                  <RatingText>
                    <strong>{listing.rating?.toFixed(1) || 5.0}</strong> (
                    {listing.reviewCount || 7} reviews)
                  </RatingText>
                  {listing.host?.isSuperhost && (
                    <SuperhostBadge>
                      <Star
                        size={14}
                        fill="#FF385C"
                        color="#FF385C"
                        style={{ marginRight: "4px" }}
                      />
                      Superhost
                    </SuperhostBadge>
                  )}
                </RatingSection>
                <Separator>·</Separator>
                <LocationSection>
                  <MapIcon>
                    <MapPin size={16} />
                  </MapIcon>
                  <LocationText>
                    {listing.location || "Bordeaux, France"}
                  </LocationText>
                </LocationSection>
              </LeftInfo>

              <RightActions>
                <ActionButton onClick={handleShare}>
                  <Share size={18} />
                  Share
                </ActionButton>
                <ActionButton onClick={handleSave}>
                  <Heart size={18} />
                  Save
                </ActionButton>
              </RightActions>
            </ActionStrip>
          </ListingHeader>
        </LeftColumn>
      </MainContent>
    </ListingContainer>
  );
};

export default ReservationPage;
