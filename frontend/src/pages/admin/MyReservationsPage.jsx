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

  const profileMenuRef = useRef(null);

  // Close dropdown when clicking outside
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

                <S.DropdownItem onClick={() => navigate("/my-reservations")}>
                  Trips
                </S.DropdownItem>

                <S.DropdownItem onClick={() => navigate("/wishlist")}>
                  Wishlist
                </S.DropdownItem>

                <S.DropdownDivider />

                <S.DropdownItem onClick={() => navigate("/become-host")}>
                  Become a Host
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
          <Link to="/manage-listings">
            <S.NavButton>View Listings</S.NavButton>
          </Link>
          <Link to="/locations">
            <S.NavButton>Create Listing</S.NavButton>
          </Link>
        </S.Nav>
      </S.Header>

      <S.Content>
        <S.Title>My Reservations</S.Title>

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
