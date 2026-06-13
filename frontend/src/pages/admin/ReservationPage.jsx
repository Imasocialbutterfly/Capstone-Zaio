import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  format,
  differenceInDays,
  addDays,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  getDay,
} from "date-fns";
import * as S from "./ReservationPage.styled";
import airbnbLogo from "../../assets/airbnb-logo.png";
import {
  Search,
  Globe,
  Menu,
  User,
  Share,
  Heart,
  Star,
  Home,
  KeyRound,
  MapPin,
} from "lucide-react";

const ReservationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const availableDates = React.useMemo(() => {
    if (!listing?.availability) return [];

    const dates = [];

    listing.availability.forEach((range) => {
      if (!range.available) return;

      const days = eachDayOfInterval({
        start: new Date(range.start),
        end: new Date(range.end),
      });

      days.forEach((day) => {
        dates.push(format(day, "yyyy-MM-dd"));
      });
    });

    return dates;
  }, [listing]);

  const [checkIn, setCheckIn] = useState(
    format(addDays(new Date(), 1), "yyyy-MM-dd"),
  );
  const [checkOut, setCheckOut] = useState(
    format(addDays(new Date(), 3), "yyyy-MM-dd"),
  );

  const [calendarStart, setCalendarStart] = useState(checkIn);
  const [calendarEnd, setCalendarEnd] = useState(checkOut);

  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const { data } = await axios.get(`/api/listings/${id}/booked-dates`);

        setBookedDates(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBookedDates();
  }, [id]);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data } = await axios.get(`/api/listings/${id}`);
        setListing(data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load listing");
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  useEffect(() => {
    if (!availableDates.length) return;

    const firstDate = availableDates[0];

    setCheckIn(firstDate);

    setCheckOut(format(addDays(new Date(firstDate), 3), "yyyy-MM-dd"));
  }, [availableDates]);

  const selectThreeNightRange = (startDate) => {
    const startIndex = availableDates.findIndex((d) => d === startDate);
    if (startIndex === -1) return;

    const start = availableDates[startIndex];
    const end = availableDates[startIndex + 3];

    if (!end) return;

    setCheckIn(start);
    setCheckOut(end);
    setCalendarStart(start);
    setCalendarEnd(end);
  };

  const handleGuestChange = (type, operation) => {
    setGuests((prev) => {
      let newValue = prev[type] + (operation === "inc" ? 1 : -1);
      if (type === "adults" && newValue < 1) newValue = 1;
      if ((type === "children" || type === "infants") && newValue < 0)
        newValue = 0;
      return { ...prev, [type]: newValue };
    });
  };

  const getGalleryImages = () => {
    const images = listing?.images?.length ? listing.images : [];
    if (images.length === 0) {
      const placeholder = { url: "/placeholder.jpg", caption: "No image" };
      return { main: placeholder, small: Array(4).fill(placeholder) };
    }

    const mainImage = images[0];
    const smallImages = [];
    for (let i = 1; i <= 4; i++) {
      smallImages.push(images[i % images.length]);
    }
    return { main: mainImage, small: smallImages };
  };

  const nights = differenceInDays(new Date(checkOut), new Date(checkIn));
  const totalPrice = listing ? listing.price * nights : 0;
  const serviceFee = totalPrice * 0.12;
  const cleaningFee = 45;
  const grandTotal = totalPrice + serviceFee + cleaningFee;

  const handleReserve = async () => {
    if (!listing) return;
    if (nights <= 0) {
      alert("Please select valid dates");
      return;
    }
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/reservations",
        {
          listingId: listing._id,
          startDate: checkIn,
          endDate: checkOut,
          guests,
          totalPrice: grandTotal,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      navigate("/trips");
    } catch (err) {
      alert(err.response?.data?.error || "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <S.Container>
        <S.LoadingSpinner />
      </S.Container>
    );
  if (error)
    return (
      <S.Container>
        <S.ErrorMessage>{error}</S.ErrorMessage>
      </S.Container>
    );

  const { main: mainImage, small: smallImages } = getGalleryImages();

  const currentMonth = new Date();

  const secondMonth = addDays(endOfMonth(currentMonth), 1);

  const isDateBooked = (date) => {
    return bookedDates.some((booking) => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);

      return date >= start && date <= end;
    });
  };

  const buildMonthCalendar = (monthDate) => {
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);

    const firstWeekDay = getDay(monthStart);

    const days = [];

    for (let i = 0; i < firstWeekDay; i++) {
      days.push(null);
    }

    const monthDays = eachDayOfInterval({
      start: monthStart,
      end: monthEnd,
    });

    days.push(...monthDays);

    return days;
  };

  const currentMonthDays = buildMonthCalendar(currentMonth);

  const secondMonthDays = buildMonthCalendar(secondMonth);

  return (
    <>
      <S.ReservationHeader>
        <S.HeaderContainer>
          <S.LogoWrapper>
            <S.AirbnbLogo
              src={airbnbLogo}
              alt="Airbnb"
              onClick={() => navigate("/")}
            />
          </S.LogoWrapper>

          <S.SearchBar>
            <S.SearchText>Anywhere</S.SearchText>
            <S.Divider />
            <S.SearchText>Any week</S.SearchText>
            <S.Divider />
            <S.SearchText>Add guests</S.SearchText>
            <S.SearchButton>
              <Search size={16} />
            </S.SearchButton>
          </S.SearchBar>

          <S.HeaderRight>
            <S.IconButton>
              <Globe size={18} />
            </S.IconButton>
            <S.ProfileButton>
              <Menu size={18} />
              <User size={18} />
            </S.ProfileButton>
          </S.HeaderRight>
        </S.HeaderContainer>
      </S.ReservationHeader>

      <S.ListingHeader>
        <S.ListingHeaderContent>
          <S.ListingInfo>
            <S.ListingTitle>{listing.title}</S.ListingTitle>

            <S.ListingMeta>
              <Star size={14} fill="currentColor" />
              <span>{listing.rating || 4.8}</span>
              <span>·</span>
              <span>{listing.reviewCount || 44} reviews</span>
            </S.ListingMeta>
          </S.ListingInfo>

          <S.ListingActions>
            <S.ActionButton>
              <Share size={16} />
              <span>Share</span>
            </S.ActionButton>

            <S.ActionButton>
              <Heart size={16} />
              <span>Save</span>
            </S.ActionButton>
          </S.ListingActions>
        </S.ListingHeaderContent>
      </S.ListingHeader>

      <S.Container>
        <S.Content>
          <S.ImageGallery>
            <S.MainImage
              src={mainImage.url}
              alt={mainImage.caption || "Main view"}
            />
            <S.SmallImagesGrid>
              {smallImages.map((img, idx) => (
                <S.SmallImage
                  key={idx}
                  src={img.url}
                  alt={img.caption || `View ${idx + 1}`}
                />
              ))}
            </S.SmallImagesGrid>
          </S.ImageGallery>
          <S.LeftColumn>
            <S.HostSection>
              <div>
                <S.HostHeading>
                  Entire rental unit hosted by {listing.host?.username}
                </S.HostHeading>

                <S.PropertyDetails>
                  {listing.maxGuests} guests · {listing.bedrooms} bedrooms ·{" "}
                  {listing.bathrooms} bathrooms
                </S.PropertyDetails>
              </div>

              <S.HostAvatar
                src="/default-avatar.jpg"
                alt={listing.host?.username}
              />
            </S.HostSection>

            <S.FeatureList>
              <S.FeatureItem>
                <Home size={24} />
                <S.FeatureContent>
                  <S.FeatureTitle>Entire place</S.FeatureTitle>
                  <S.FeatureDescription>
                    You'll have the entire rental unit to yourself.
                  </S.FeatureDescription>
                </S.FeatureContent>
              </S.FeatureItem>

              <S.FeatureItem>
                <KeyRound size={24} />
                <S.FeatureContent>
                  <S.FeatureTitle>Self check-in</S.FeatureTitle>
                  <S.FeatureDescription>
                    Check yourself in with the lockbox.
                  </S.FeatureDescription>
                </S.FeatureContent>
              </S.FeatureItem>

              <S.FeatureItem>
                <MapPin size={24} />
                <S.FeatureContent>
                  <S.FeatureTitle>Great location</S.FeatureTitle>
                  <S.FeatureDescription>
                    Conveniently located near local attractions.
                  </S.FeatureDescription>
                </S.FeatureContent>
              </S.FeatureItem>
            </S.FeatureList>

            <S.DescriptionSection>
              <S.DescriptionHeading>About this place</S.DescriptionHeading>
              <S.Description>{listing.description}</S.Description>
            </S.DescriptionSection>

            <S.AmenitiesSection>
              <S.SectionTitle>What this place offers</S.SectionTitle>
              <S.AmenitiesGrid>
                {listing.amenities?.slice(0, 6).map((item, idx) => (
                  <S.AmenityItem key={idx}>✓ {item}</S.AmenityItem>
                ))}
              </S.AmenitiesGrid>
            </S.AmenitiesSection>

            <S.CalendarSection>
              <S.CalendarHeader>
                <h2>
                  {nights} nights in {listing.title}
                </h2>

                <p>
                  {format(new Date(checkIn), "dd MMM yyyy")} –{" "}
                  {format(new Date(checkOut), "dd MMM yyyy")}
                </p>
              </S.CalendarHeader>

              <S.CalendarMonths>
                <S.CalendarMonth>
                  <S.MonthHeading>
                    {format(currentMonth, "MMMM yyyy")}
                  </S.MonthHeading>

                  <S.WeekRow>
                    <span>Su</span>
                    <span>Mo</span>
                    <span>Tu</span>
                    <span>We</span>
                    <span>Th</span>
                    <span>Fr</span>
                    <span>Sa</span>
                  </S.WeekRow>

                  <S.CalendarGrid>
                    {currentMonthDays.map((date, index) => {
                      if (!date) {
                        return <S.EmptyCell key={index} />;
                      }

                      const booked = isDateBooked(date);

                      const dateString = format(date, "yyyy-MM-dd");

                      const selected =
                        dateString >= checkIn && dateString <= checkOut;

                      return (
                        <S.CalendarDay
                          key={index}
                          $booked={booked}
                          $selected={selected}
                          disabled={booked}
                          onClick={() => {
                            if (booked) return;

                            setCheckIn(dateString);

                            setCheckOut(format(addDays(date, 3), "yyyy-MM-dd"));
                          }}
                        >
                          {format(date, "d")}
                        </S.CalendarDay>
                      );
                    })}
                  </S.CalendarGrid>
                </S.CalendarMonth>

                <S.CalendarMonth>
                  <S.MonthHeading>
                    {format(secondMonth, "MMMM yyyy")}
                  </S.MonthHeading>

                  <S.WeekRow>
                    <span>Su</span>
                    <span>Mo</span>
                    <span>Tu</span>
                    <span>We</span>
                    <span>Th</span>
                    <span>Fr</span>
                    <span>Sa</span>
                  </S.WeekRow>

                  <S.CalendarGrid>
                    {secondMonthDays.map((date, index) => {
                      if (!date) {
                        return <S.EmptyCell key={index} />;
                      }

                      const booked = isDateBooked(date);

                      const dateString = format(date, "yyyy-MM-dd");

                      const selected =
                        dateString >= checkIn && dateString <= checkOut;

                      return (
                        <S.CalendarDay
                          key={index}
                          $booked={booked}
                          $selected={selected}
                          disabled={booked}
                          onClick={() => {
                            if (booked) return;

                            setCheckIn(dateString);

                            setCheckOut(format(addDays(date, 3), "yyyy-MM-dd"));
                          }}
                        >
                          {format(date, "d")}
                        </S.CalendarDay>
                      );
                    })}
                  </S.CalendarGrid>
                </S.CalendarMonth>
              </S.CalendarMonths>
            </S.CalendarSection>

            <S.ReviewsSection>
              <S.SectionTitle>Guest reviews</S.SectionTitle>
              <S.ReviewCard>
                <S.ReviewerName>Kenyon</S.ReviewerName>
                <S.ReviewRating>★★★★★</S.ReviewRating>
                <S.ReviewText>
                  "If we could have stayed for ever we would have. The garden
                  and the atmosphere is absolutely incredible."
                </S.ReviewText>
              </S.ReviewCard>
            </S.ReviewsSection>
          </S.LeftColumn>

          <S.RightColumn>
            <S.BookingCard>
              <S.PricePerNight>
                R{listing.price} <span>/ night</span>
              </S.PricePerNight>
              <S.BookingInputs>
                <S.DateInputGroup>
                  <S.DateInputWrapper>
                    <label>CHECK-IN</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={format(new Date(), "yyyy-MM-dd")}
                    />
                  </S.DateInputWrapper>
                  <S.DateInputWrapper>
                    <label>CHECKOUT</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn}
                    />
                  </S.DateInputWrapper>
                </S.DateInputGroup>

                <S.GuestSelector>
                  <S.GuestLabel>Guests</S.GuestLabel>
                  <S.GuestControls>
                    <S.GuestRow>
                      <span>Adults (13+)</span>
                      <div>
                        <S.GuestButton
                          onClick={() => handleGuestChange("adults", "dec")}
                        >
                          -
                        </S.GuestButton>
                        <span>{guests.adults}</span>
                        <S.GuestButton
                          onClick={() => handleGuestChange("adults", "inc")}
                        >
                          +
                        </S.GuestButton>
                      </div>
                    </S.GuestRow>
                    <S.GuestRow>
                      <span>Children (2-12)</span>
                      <div>
                        <S.GuestButton
                          onClick={() => handleGuestChange("children", "dec")}
                        >
                          -
                        </S.GuestButton>
                        <span>{guests.children}</span>
                        <S.GuestButton
                          onClick={() => handleGuestChange("children", "inc")}
                        >
                          +
                        </S.GuestButton>
                      </div>
                    </S.GuestRow>
                    <S.GuestRow>
                      <span>Infants (under 2)</span>
                      <div>
                        <S.GuestButton
                          onClick={() => handleGuestChange("infants", "dec")}
                        >
                          -
                        </S.GuestButton>
                        <span>{guests.infants}</span>
                        <S.GuestButton
                          onClick={() => handleGuestChange("infants", "inc")}
                        >
                          +
                        </S.GuestButton>
                      </div>
                    </S.GuestRow>
                  </S.GuestControls>
                </S.GuestSelector>
              </S.BookingInputs>

              <S.PriceBreakdown>
                <S.PriceRow>
                  <span>
                    R{listing.price} x {nights} nights
                  </span>
                  <span>R{totalPrice}</span>
                </S.PriceRow>
                <S.PriceRow>
                  <span>Cleaning fee</span>
                  <span>R{cleaningFee}</span>
                </S.PriceRow>
                <S.PriceRow>
                  <span>Service fee</span>
                  <span>R{serviceFee.toFixed(2)}</span>
                </S.PriceRow>
                <S.TotalRow>
                  <strong>Total</strong>
                  <strong>R{grandTotal.toFixed(2)}</strong>
                </S.TotalRow>
              </S.PriceBreakdown>

              <S.ReserveButton onClick={handleReserve} disabled={submitting}>
                {submitting ? "Processing..." : "Reserve"}
              </S.ReserveButton>
              <S.PaymentDisclaimer>
                You won't be charged yet
              </S.PaymentDisclaimer>
            </S.BookingCard>
          </S.RightColumn>
        </S.Content>
      </S.Container>
    </>
  );
};

export default ReservationPage;
