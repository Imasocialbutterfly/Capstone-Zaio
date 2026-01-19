import React, { useEffect, useRef, useState } from "react";
import {
  DashboardContainer,
  Header,
  HeaderCenter,
  HeaderContainer,
  HeaderLeft,
  HeaderRight,
  Logo,
  MenuButton,
  NavItem,
  ProfileImage,
  ProfileMenu,
  SearchBar,
  SearchField,
  SearchButton,
  BackgroundImg,
  ContentSection,
  SectionHeading,
  InspirationGrid,
  DiscoverSection,
  DropdownMenu,
  MenuItem,
  MenuSeparator,
  HostBadge,
  UpgradeButton,
  LocationDropdown,
  LocationOption,
  SearchBarContainer,
  GuestsDropdown,
  GuestOption,
  GuestCounter,
  CounterButton,
  CounterValue,
  GuestLabel,
  GuestType,
} from "./Dashboard.styled";
import {
  GlobeIcon,
  Menu,
  Search,
  Crown,
  Home,
  Plus,
  Minus,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import { useNavigate } from 'react-router-dom';
import Card from "../../../components/dashboard/Card";
import { experienceData, inspirationData } from "../../../utils/images";
import Experiences from "../../../components/dashboard/Experiences";
import { ExperienceColumns } from "../../../components/dashboard/Experiences.styled";
import GiftCards from "../../../components/dashboard/GiftCards";
import HostingQuestions from "../../../components/dashboard/HostingQuestions";
import FutureGetaways from "../../../components/dashboard/FutureGetaways";
import FooterSection from "../../../components/dashboard/FooterSection";
import AuthModal from "../../auth/AuthModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);
  const guestsDropdownRef = useRef(null);
  const searchFieldRef = useRef(null);
  const guestsFieldRef = useRef(null);
  const [authError, setAuthError] = useState("");
  const [authMode, setAuthMode] = useState("login");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);

  const locations = ["New York", "Paris", "Tokyo", "Cape Town", "Phuket"];

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

  const handleBecomeHost = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:4000/api/users/become-host",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to become host");
      }

      setCurrentUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Congratulations! You are now a host! 🎉");
      setShowDropdown(false);
    } catch (error) {
      console.error("Become host error:", error);
      alert(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setCurrentUser(null);
    setShowDropdown(false);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationDropdown(false);
  };

  const handleLocationClick = () => {
    setShowLocationDropdown(true);
    setShowGuestsDropdown(false);
  };

  const handleGuestsClick = () => {
    setShowGuestsDropdown(true);
    setShowLocationDropdown(false);
  };

  const handleGuestChange = (type, operation) => {
    setGuests((prev) => {
      const newValue =
        operation === "increase" ? prev[type] + 1 : Math.max(0, prev[type] - 1);
      return {
        ...prev,
        [type]: newValue,
      };
    });
  };

  const getTotalGuests = () => {
    return guests.adults + guests.children;
  };

  const getGuestsText = () => {
    const total = getTotalGuests();
    if (total === 0) return "Add Guests";
    if (total === 1) return "1 guest";
    return `${total} guests`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target) &&
        searchFieldRef.current &&
        !searchFieldRef.current.contains(event.target)
      ) {
        setShowLocationDropdown(false);
      }
      if (
        guestsDropdownRef.current &&
        !guestsDropdownRef.current.contains(event.target) &&
        guestsFieldRef.current &&
        !guestsFieldRef.current.contains(event.target)
      ) {
        setShowGuestsDropdown(false);
      }
      if (
        checkInRef.current &&
        !checkInRef.current.contains(event.target) &&
        !event.target.closest(".react-datepicker")
      ) {
        setShowCheckInCalendar(false);
      }
      if (
        checkOutRef.current &&
        !checkOutRef.current.contains(event.target) &&
        !event.target.closest(".react-datepicker")
      ) {
        setShowCheckOutCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckInClick = () => {
    setShowCheckInCalendar(true);
    setShowCheckOutCalendar(false);
    setShowLocationDropdown(false);
    setShowGuestsDropdown(false);
  };
  const handleCheckOutClick = () => {
    setShowCheckOutCalendar(true);
    setShowCheckInCalendar(false);
    setShowLocationDropdown(false);
    setShowGuestsDropdown(false);
  };

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    setShowCheckInCalendar(false);

    if (checkOutDate && date < date) {
      setCheckOutDate(null);
    }
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
    setShowCheckOutCalendar(false);
  };

  return (
    <DashboardContainer>
      <Header>
        <HeaderContainer>
          <HeaderLeft>
            <Logo src="data:image/png;base64,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" />
          </HeaderLeft>

          <HeaderCenter>
            <NavItem active>Places to go</NavItem>
            <NavItem>Experiences</NavItem>
            <NavItem>Online Experiences</NavItem>
          </HeaderCenter>

          <HeaderRight>
            {currentUser?.role === "host" && (
              <HostBadge>
                <Crown size={16} />
                Host
              </HostBadge>
            )}
            <button onClick={() => {
              if (currentUser?.role === "host") {
                navigate('/manage-listings')
              } else {
                handleBecomeHost()
              }
            }}>
              {currentUser?.role === "host"
                ? "Host Dashboard"
                : "Become a host"}
            </button>
            <GlobeIcon />
            <ProfileMenu ref={dropdownRef}>
              <MenuButton onClick={() => setShowDropdown(!showDropdown)}>
                <Menu />
              </MenuButton>
              <ProfileImage
                onClick={() => setShowAuthModal(true)}
                src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                alt="Profile"
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
                            }}
                          >
                            <Crown size={14} color="#FF385C" />
                            <span
                              style={{ color: "#FF385C", fontSize: "12px" }}
                            >
                              Verified Host
                            </span>
                          </div>
                        )}
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Log out</MenuItem>
                      <MenuSeparator />
                      {currentUser.role === "host" ? (
                        <>
                          <MenuItem onClick={() => navigate('/manage-listings')}>
                            <Home size={16} style={{ marginRight: "8px" }} />
                            Manage Listings
                          </MenuItem>
                          <MenuItem>Host Calendar</MenuItem>
                          <MenuItem>Earnings</MenuItem>
                        </>
                      ) : (
                        <MenuItem onClick={handleBecomeHost}>
                          <UpgradeButton>
                            <Crown size={16} style={{ marginRight: "8px" }} />
                            Become a Host
                          </UpgradeButton>
                        </MenuItem>
                      )}
                      <MenuItem>My Trips</MenuItem>
                      <MenuItem>Saved Homes</MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem
                        onClick={() => {
                          setAuthMode("login");
                          setShowAuthModal(true);
                          setShowDropdown(false);
                        }}
                      >
                        Log in
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setAuthMode("signup");
                          setShowAuthModal(true);
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
          </HeaderRight>
        </HeaderContainer>

        <SearchBarContainer ref={locationDropdownRef}>
          <SearchBar>
            <SearchField
              ref={searchFieldRef}
              onClick={handleLocationClick}
              active={showLocationDropdown}
              style={{ width: "25%" }}
            >
              <label>Location</label>
              <input
                type="text"
                placeholder="Select Location"
                value={selectedLocation}
                readOnly
              />
            </SearchField>
            <SearchField
              ref={checkInRef}
              onClick={handleCheckInClick}
              active={showCheckInCalendar}
              style={{ width: "20%", position: "relative" }}
            >
              <label>Check In</label>
              <input
                type="text"
                placeholder="Add Dates"
                value={checkInDate ? checkInDate.toLocaleDateString() : ""}
                readOnly
              />
              {showCheckInCalendar && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    zIndex: 1000,
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
                  }}
                >
                  <DatePicker
                    selected={checkInDate}
                    onChange={handleCheckInChange}
                    inline
                    minDate={new Date()}
                    maxDate={checkOutDate || addDays(new Date(), 90)}
                    calendarStartDay={1}
                  />
                </div>
              )}
            </SearchField>
            <SearchField
              ref={checkOutRef}
              onClick={handleCheckOutClick}
              active={showCheckOutCalendar}
              style={{ width: "20%", position: "relative" }}
            >
              <label>Check Out</label>
              <input
                type="text"
                placeholder="Add Dates"
                value={checkOutDate ? checkOutDate.toLocaleDateString() : ""}
                readOnly
              />
              {showCheckOutCalendar && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    zIndex: 1000,
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
                  }}
                >
                  <DatePicker
                    selected={checkOutDate}
                    onChange={handleCheckOutChange}
                    inline
                    minDate={checkInDate || new Date()}
                    maxDate={addDays(checkInDate || new Date(), 90)}
                    calendarStartDay={1}
                  />
                </div>
              )}
            </SearchField>
            <SearchField
              ref={guestsFieldRef}
              onClick={handleGuestsClick}
              active={showGuestsDropdown}
              style={{ width: "20%" }}
            >
              <label>Guests</label>
              <input
                type="text"
                placeholder="Add Guests"
                value={getGuestsText()}
                readOnly
              />
            </SearchField>
            <SearchButton>
              <Search size={20} color="white" />
            </SearchButton>
          </SearchBar>

          {showLocationDropdown && (
            <LocationDropdown>
              {locations.map((location) => (
                <LocationOption
                  key={location}
                  onClick={() => handleLocationSelect(location)}
                >
                  {location}
                </LocationOption>
              ))}
            </LocationDropdown>
          )}

          {showGuestsDropdown && (
            <GuestsDropdown ref={guestsDropdownRef}>
              <GuestOption>
                <GuestLabel>
                  <GuestType>Adults</GuestType>
                  <span>Age 13+</span>
                </GuestLabel>
                <GuestCounter>
                  <CounterButton
                    onClick={() => handleGuestChange("adults", "decrease")}
                    disabled={guests.adults === 0}
                  >
                    <Minus size={16} />
                  </CounterButton>
                  <CounterValue>{guests.adults}</CounterValue>
                  <CounterButton
                    onClick={() => handleGuestChange("adults", "increase")}
                  >
                    <Plus size={16} />
                  </CounterButton>
                </GuestCounter>
              </GuestOption>

              <GuestOption>
                <GuestLabel>
                  <GuestType>Children</GuestType>
                  <span>Ages 2-12</span>
                </GuestLabel>
                <GuestCounter>
                  <CounterButton
                    onClick={() => handleGuestChange("children", "decrease")}
                    disabled={guests.children === 0}
                  >
                    <Minus size={16} />
                  </CounterButton>
                  <CounterValue>{guests.children}</CounterValue>
                  <CounterButton
                    onClick={() => handleGuestChange("children", "increase")}
                  >
                    <Plus size={16} />
                  </CounterButton>
                </GuestCounter>
              </GuestOption>
            </GuestsDropdown>
          )}
        </SearchBarContainer>
      </Header>

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
      />
      <BackgroundImg></BackgroundImg>
      <ContentSection>
        <SectionHeading>Inspiration for your next trip</SectionHeading>
        <InspirationGrid>
          {inspirationData.map((item, index) => (
            <Card
              key={index}
              city={item.city}
              country={item.country}
              imageUrl={item.imageUrl}
            />
          ))}
        </InspirationGrid>

        <DiscoverSection>
          <SectionHeading>Discover Airbnb Experiences</SectionHeading>
          <ExperienceColumns>
            <Experiences data={experienceData.trip} />
            <Experiences data={experienceData.home} />
          </ExperienceColumns>
        </DiscoverSection>

        {currentUser?.role === "host" ? (
          <div
            style={{
              background: "#f7f7f7",
              padding: "2rem",
              borderRadius: "12px",
              margin: "2rem 0",
            }}
          >
            <SectionHeading>Host Dashboard</SectionHeading>
            <p>
              Welcome to your host dashboard! You can now create and manage
              listings.
            </p>
            <button
              style={{
                background: "#FF385C",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                cursor: "pointer",
                marginTop: "1rem",
              }}
            >
              Create Your First Listing
            </button>
          </div>
        ) : currentUser ? (
          <div
            style={{
              background: "#fff3cd",
              padding: "2rem",
              borderRadius: "12px",
              margin: "2rem 0",
            }}
          >
            <SectionHeading>Ready to become a host?</SectionHeading>
            <p>
              Join our community of hosts and start earning money by sharing
              your space.
            </p>
            <button
              onClick={handleBecomeHost}
              style={{
                background: "#000",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                cursor: "pointer",
                marginTop: "1rem",
              }}
            >
              Become a Host
            </button>
          </div>
        ) : null}

        <GiftCards imageUrl="https://cdn.images.express.co.uk/img/dynamic/25/590x/secondary/Airbnb-3906241.jpg?r=1644406120862" />
        <HostingQuestions backgroundImage="https://images.unsplash.com/photo-1737452072725-0fcbd8133f82?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <FutureGetaways />
      </ContentSection>

      <FooterSection />
    </DashboardContainer>
  );
};

export default Dashboard;