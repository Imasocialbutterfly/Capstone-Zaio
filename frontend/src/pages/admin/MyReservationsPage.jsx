import React, { useEffect, useState, useRef } from "react";
import api from "../../utils/axiosInstance";
import {
  Trash2,
  Menu,
  User,
  MessageCircle,
  CalendarCheck,
  Heart,
  Home,
  Settings,
  FileText,
  LogOut,
} from "lucide-react";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import airbnbLogo from "../../assets/airbnb-logo.png";
import * as S from "./MyReservationsPage.styled";

const MyReservationsPage = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await api.get("/reservations/my-reservations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const cancelReservation = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.log(err);
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
    } catch (error) {
      console.error("Become host error:", error);
      alert(error.message);
    }
  };

  const handleCreateListingClick = () => {
    if (currentUser?.role === "host") {
      navigate("/manage-listings");
    } else {
      handleBecomeHost();
    }
  };

  return (
    <S.Page>
      <S.Header>
        <S.HeaderTop>
          <S.LogoWrapper>
            <S.AirbnbLogo
              src={airbnbLogo}
              alt="Airbnb"
              onClick={() => navigate("/")}
            />
          </S.LogoWrapper>

          <S.ProfileMenuWrapper ref={profileMenuRef}>
            <S.ProfileButton
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <Menu size={18} />
              <User size={18} />
            </S.ProfileButton>

            {showProfileMenu && (
              <S.ProfileDropdown>
                <S.DropdownItem onClick={() => navigate("/messages")}>
                  Messages
                </S.DropdownItem>

                <S.DropdownItem onClick={() => navigate("/wishlist")}>
                  Wishlist
                </S.DropdownItem>

                <S.DropdownDivider />

                <S.DropdownItem onClick={handleBecomeHost}>
                  {currentUser?.role === "host"
                    ? "You are a Host"
                    : "Become a Host"}
                </S.DropdownItem>

                <S.DropdownItem onClick={() => navigate("/account")}>
                  Account
                </S.DropdownItem>

                <S.DropdownItem onClick={() => navigate("/help")}>
                  Help Center
                </S.DropdownItem>

                <S.DropdownDivider />

                <S.DropdownItem
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/login");
                  }}
                >
                  Log Out
                </S.DropdownItem>
              </S.ProfileDropdown>
            )}
          </S.ProfileMenuWrapper>
        </S.HeaderTop>

        <S.Nav>
          <Link to="/">
            <S.NavButton>View Reservations</S.NavButton>
          </Link>
          <Link to="/locations">
            <S.NavButton>View Listings</S.NavButton>
          </Link>
          <S.NavButton onClick={handleCreateListingClick}>
            {currentUser?.role === "host"
              ? "Create Listing"
              : "Become a Host to Create Listing"}
          </S.NavButton>
        </S.Nav>
      </S.Header>

      <S.Content>
        <S.Title>My Reservations</S.Title>

        {currentUser && currentUser?.role !== "host" && (
          <S.BecomeHostCard>
            <S.BecomeHostContent>
              <S.BecomeHostText>
                <h3>Become a Host</h3>

                <p>
                  Turn your extra space into extra income. Share your place,
                  welcome guests, and start earning.
                </p>
              </S.BecomeHostText>

              <S.BecomeHostButton onClick={handleBecomeHost}>
                Get started
              </S.BecomeHostButton>
            </S.BecomeHostContent>
          </S.BecomeHostCard>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <S.Table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Checkin</th>
                <th>Checkout</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation._id}>
                  <td>{reservation.listingId?.title}</td>
                  <td>
                    {format(new Date(reservation.startDate), "dd/MM/yyyy")}
                  </td>
                  <td>{format(new Date(reservation.endDate), "dd/MM/yyyy")}</td>
                  <td>R{reservation.totalPrice}</td>
                  <td>{reservation.status}</td>
                  <td>
                    <S.DeleteButton
                      onClick={() => cancelReservation(reservation._id)}
                    >
                      Delete
                    </S.DeleteButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </S.Table>
        )}
      </S.Content>

      <S.Footer>
        <S.FooterGrid>
          <div>
            <h4>Support</h4>
            <p>Help Center</p>
            <p>Safety information</p>
            <p>Cancellation options</p>
          </div>
          <div>
            <h4>Community</h4>
            <p>Airbnb.org</p>
            <p>Diversity & belonging</p>
          </div>
          <div>
            <h4>Hosting</h4>
            <p>Try hosting</p>
            <p>Host resources</p>
          </div>
          <div>
            <h4>About</h4>
            <p>Newsroom</p>
            <p>Careers</p>
          </div>
        </S.FooterGrid>
      </S.Footer>
    </S.Page>
  );
};

export default MyReservationsPage;
