import React, { useEffect, useRef, useState } from "react";
import airbnbLogo from "../../../assets/airbnb-logo.png";
import * as S from "./Dashboard.styled";
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
import { useNavigate } from "react-router-dom";
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

  const locations = [
    "All",
    "New York",
    "Paris",
    "Tokyo",
    "Cape Town",
    "Phuket",
  ];

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
        },
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
        },
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
    if (location === "All") {
      navigate("/locations");
      setShowLocationDropdown(false);
      return;
    } else {
      setSelectedLocation(location);
      setShowLocationDropdown(false);
    }
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
    <S.DashboardContainer>
      <S.BlackBackground>
        <S.Header>
          <S.HeaderContainer>
            <S.HeaderLeft>
              <S.Logo src={airbnbLogo} />
            </S.HeaderLeft>

              <S.HeaderCenter>
                <S.NavItem $active>Places to go</S.NavItem>
                <S.NavItem>Experiences</S.NavItem>
                <S.NavItem>Online Experiences</S.NavItem>
              </S.HeaderCenter>
            {/* <S.HeaderTopSection>
            </S.HeaderTopSection> */}

            <S.HeaderRight>
              {currentUser?.role === "host" && (
                <S.HostBadge>
                  <Crown size={16} />
                  Host
                </S.HostBadge>
              )}
              <button
                onClick={() => {
                  if (currentUser?.role === "host") {
                    navigate("/manage-listings");
                  } else {
                    handleBecomeHost();
                  }
                }}
              >
                {currentUser?.role === "host"
                  ? "Host Dashboard"
                  : "Become a host"}
              </button>
              <GlobeIcon />
              <S.ProfileMenu ref={dropdownRef}>
                <S.MenuButton onClick={() => setShowDropdown(!showDropdown)}>
                  <Menu />
                </S.MenuButton>
                <S.ProfileImage
                  onClick={() => setShowAuthModal(true)}
                  src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                  alt="Profile"
                />

                {showDropdown && (
                  <S.DropdownMenu>
                    {currentUser ? (
                      <>
                        <S.MenuItem>
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
                        </S.MenuItem>
                        <S.MenuItem onClick={handleLogout}>Log out</S.MenuItem>
                        <S.MenuSeparator />
                        {currentUser.role === "host" ? (
                          <>
                            <S.MenuItem
                              onClick={() => navigate("/manage-listings")}
                            >
                              <Home size={16} style={{ marginRight: "8px" }} />
                              Manage Listings
                            </S.MenuItem>
                            <S.MenuItem>Host Calendar</S.MenuItem>
                            <S.MenuItem>Earnings</S.MenuItem>
                          </>
                        ) : (
                          <S.MenuItem onClick={handleBecomeHost}>
                            <S.UpgradeButton>
                              <Crown size={16} style={{ marginRight: "8px" }} />
                              Become a Host
                            </S.UpgradeButton>
                          </S.MenuItem>
                        )}
                        <S.MenuItem>My Trips</S.MenuItem>
                        <S.MenuItem>Saved Homes</S.MenuItem>
                      </>
                    ) : (
                      <>
                        <S.MenuItem
                          onClick={() => {
                            setAuthMode("login");
                            setShowAuthModal(true);
                            setShowDropdown(false);
                          }}
                        >
                          Log in
                        </S.MenuItem>
                        <S.MenuItem
                          onClick={() => {
                            setAuthMode("signup");
                            setShowAuthModal(true);
                            setShowDropdown(false);
                          }}
                        >
                          Sign up
                        </S.MenuItem>
                      </>
                    )}
                    <S.MenuSeparator />
                    <S.MenuItem>Airbnb your home</S.MenuItem>
                    <S.MenuItem>Host an experience</S.MenuItem>
                    <S.MenuItem>Help Center</S.MenuItem>
                  </S.DropdownMenu>
                )}
              </S.ProfileMenu>
            </S.HeaderRight>
          </S.HeaderContainer>

          <S.SearchBarContainer ref={locationDropdownRef}>
            <S.SearchBar>
              <S.SearchField
                ref={searchFieldRef}
                onClick={handleLocationClick}
                $active={showLocationDropdown}
                style={{ width: "25%" }}
              >
                <label>Location</label>
                <input
                  type="text"
                  placeholder={
                    selectedLocation === ""
                      ? "Any Location"
                      : "Selected Location"
                  }
                  value={
                    selectedLocation === "" ? "Any Location" : selectedLocation
                  }
                  readOnly
                />
              </S.SearchField>
              <S.SearchField
                ref={checkInRef}
                onClick={handleCheckInClick}
                $active={showCheckInCalendar}
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
              </S.SearchField>
              <S.SearchField
                ref={checkOutRef}
                onClick={handleCheckOutClick}
                $active={showCheckOutCalendar}
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
              </S.SearchField>
              <S.SearchField
                ref={guestsFieldRef}
                onClick={handleGuestsClick}
                $active={showGuestsDropdown}
                style={{ width: "20%" }}
              >
                <label>Guests</label>
                <input
                  type="text"
                  placeholder="Add Guests"
                  value={getGuestsText()}
                  readOnly
                />
              </S.SearchField>
              <S.SearchButton>
                <Search size={20} color="white" />
              </S.SearchButton>
            </S.SearchBar>

            {showLocationDropdown && (
              <S.LocationDropdown>
                {locations.map((location) => (
                  <S.LocationOption
                    key={location}
                    onClick={() => handleLocationSelect(location)}
                  >
                    {location}
                  </S.LocationOption>
                ))}
              </S.LocationDropdown>
            )}

            {showGuestsDropdown && (
              <S.GuestsDropdown ref={guestsDropdownRef}>
                <S.GuestOption>
                  <S.GuestLabel>
                    <S.GuestType>Adults</S.GuestType>
                    <span>Age 13+</span>
                  </S.GuestLabel>
                  <S.GuestCounter>
                    <S.CounterButton
                      onClick={() => handleGuestChange("adults", "decrease")}
                      disabled={guests.adults === 0}
                    >
                      <Minus size={16} />
                    </S.CounterButton>
                    <S.CounterValue>{guests.adults}</S.CounterValue>
                    <S.CounterButton
                      onClick={() => handleGuestChange("adults", "increase")}
                    >
                      <Plus size={16} />
                    </S.CounterButton>
                  </S.GuestCounter>
                </S.GuestOption>

                <S.GuestOption>
                  <S.GuestLabel>
                    <S.GuestType>Children</S.GuestType>
                    <span>Ages 2-12</span>
                  </S.GuestLabel>
                  <S.GuestCounter>
                    <S.CounterButton
                      onClick={() => handleGuestChange("children", "decrease")}
                      disabled={guests.children === 0}
                    >
                      <Minus size={16} />
                    </S.CounterButton>
                    <S.CounterValue>{guests.children}</S.CounterValue>
                    <S.CounterButton
                      onClick={() => handleGuestChange("children", "increase")}
                    >
                      <Plus size={16} />
                    </S.CounterButton>
                  </S.GuestCounter>
                </S.GuestOption>
              </S.GuestsDropdown>
            )}
          </S.SearchBarContainer>
        </S.Header>

        <S.BackgroundImg></S.BackgroundImg>
      </S.BlackBackground>
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
      <S.ContentSection>
        <S.SectionHeading>Inspiration for your next trip</S.SectionHeading>
        <S.InspirationGrid>
          {inspirationData.map((item, index) => (
            <Card
              key={index}
              city={item.city}
              country={item.country}
              imageUrl={item.imageUrl}
            />
          ))}
        </S.InspirationGrid>

        <S.DiscoverSection>
          <S.SectionHeading>Discover Airbnb Experiences</S.SectionHeading>
          <ExperienceColumns>
            <Experiences data={experienceData.trip} />
            <Experiences data={experienceData.home} />
          </ExperienceColumns>
        </S.DiscoverSection>

        {currentUser?.role === "host" ? (
          <div
            style={{
              background: "#f7f7f7",
              padding: "2rem",
              borderRadius: "12px",
              margin: "2rem 0",
            }}
          >
            <S.SectionHeading>Host Dashboard</S.SectionHeading>
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
            <S.SectionHeading>Ready to become a host?</S.SectionHeading>
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
      </S.ContentSection>

      <FooterSection />
    </S.DashboardContainer>
  );
};

export default Dashboard;
