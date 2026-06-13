import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #222222;
`;

export const ListingHeader = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 32px 24px 24px;
`;

export const ListingHeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ListingInfo = styled.div`
  flex: 1;
`;

export const ListingTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  line-height: 1.2;
  margin: 0 0 12px;
  color: #222;
`;

export const ListingMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 15px;
  color: #222;

  svg {
    color: #ff385c;
  }
`;

export const ListingActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;

  background: transparent;
  border: none;
  cursor: pointer;

  font-size: 14px;
  font-weight: 600;
  color: #222;

  text-decoration: underline;

  &:hover {
    opacity: 0.7;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
`;

export const LeftColumn = styled.div`
  flex: 2;
  min-width: 280px;
`;

export const RightColumn = styled.div`
  flex: 1;
  min-width: 320px;
`;

export const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 8px;
  margin-bottom: 24px;
  border-radius: 20px;
  overflow: hidden;
  background: #f7f7f7;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  transition: transform 0.25s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (min-width: 769px) {
    aspect-ratio: auto;
    min-height: 100%;
    grid-row: span 2;
  }
`;

export const SmallImagesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const SmallImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.25s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

export const HostSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 32px 0;
  border-bottom: 1px solid #ebebeb;
  gap: 24px;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

export const HostHeading = styled.h2`
  font-size: 22px;
  font-weight: 600;
  line-height: 28px;
  color: #222;
  margin: 0 0 8px;
`;

export const PropertyDetails = styled.div`
  font-size: 16px;
  color: #222;
  line-height: 24px;
`;

export const HostAvatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;

  box-shadow:
    0 6px 16px rgba(0, 0, 0, 0.12),
    0 2px 6px rgba(0, 0, 0, 0.08);
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem 0;
`;

export const DescriptionHeading = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin: 32px 0 16px;
  color: #222;
`;

export const DescriptionSection = styled.div`
  padding-bottom: 32px;
  border-bottom: 1px solid #ebebeb;
`;

export const Description = styled.p`
  font-size: 16px;
  line-height: 1.65;
  color: #222;
  margin: 0;
  white-space: pre-line;
`;

export const FeatureList = styled.div`
  padding: 32px 0;
  border-bottom: 1px solid #ebebeb;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }

  svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: #222;
  }
`;

export const FeatureContent = styled.div`
  flex: 1;
`;

export const FeatureTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin: 0 0 4px;
`;

export const FeatureDescription = styled.p`
  font-size: 14px;
  color: #717171;
  line-height: 1.4;
  margin: 0;
`;


export const AmenitiesSection = styled.div`
  margin-top: 1rem;
`;

export const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const AmenityItem = styled.div`
  font-size: 0.9rem;
`;


export const MonthTitle = styled.h3`
  margin: 24px 0 16px;
  font-size: 22px;
  font-weight: 600;
`;

export const WeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 10px;

  span {
    text-align: center;
    font-size: 13px;
    color: #717171;
    font-weight: 600;
  }
`;

export const EmptyCell = styled.div`
  height: 52px;
`;

export const CalendarSection = styled.div`
  margin-top: 48px;
  padding-top: 48px;
  border-top: 1px solid #ebebeb;
`;

export const CalendarHeader = styled.div`
  margin-bottom: 32px;

  h2 {
    font-size: 24px;
    font-weight: 600;
  }

  p {
    color: #717171;
  }
`;

export const CalendarGrid = styled.div`
  display: grid;

  grid-template-columns:
    repeat(7, 1fr);

  gap: 10px;

  max-height: 700px;

  overflow-y: auto;
`;

export const CalendarDay = styled.button`
  height: 50px;

  border: none;

  border-radius: 50%;

  background: ${({ $selected }) =>
    $selected ? "#222" : "transparent"};

  color: ${({ $selected, $booked }) =>
    $selected
      ? "#fff"
      : $booked
      ? "#ccc"
      : "#222"};

  text-decoration: ${({ $booked }) =>
    $booked ? "line-through" : "none"};

  cursor: ${({ $booked }) =>
    $booked ? "not-allowed" : "pointer"};

  &:hover {
    background: ${({ $selected, $booked }) =>
      !$selected && !$booked
        ? "#f7f7f7"
        : undefined};
  }
`;

export const CalendarMonths = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const CalendarMonth = styled.div`
  width: 100%;
`;

export const MonthHeading = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
`;



export const ReviewsSection = styled.div`
  margin-top: 2rem;
`;

export const ReviewCard = styled.div`
  background: #f7f7f7;
  padding: 1rem;
  border-radius: 12px;
  margin-top: 1rem;
`;

export const ReviewerName = styled.div`
  font-weight: 600;
`;

export const ReviewRating = styled.div`
  color: #ffb400;
  margin: 0.25rem 0;
`;

export const ReviewText = styled.p`
  font-size: 0.9rem;
  line-height: 1.4;
`;

export const BookingCard = styled.div`
  position: sticky;
  top: 100px;
  width: 100%;
  max-width: 370px;
  border: 1px solid #dddddd;
  border-radius: 12px;
  padding: 24px;
  box-shadow:
    0 6px 16px rgba(0, 0, 0, 0.12);

  background: white;
`;

export const PricePerNight = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  span {
    font-weight: normal;
    font-size: 1rem;
    color: #717171;
  }
`;

export const BookingInputs = styled.div`
  border: 1px solid #b0b0b0;
  border-radius: 12px;
  overflow: hidden;
  margin: 24px 0;
`;

export const DatePickerWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

export const DateInputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid #b0b0b0;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 16px;
`;

export const DateInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;

  &:first-child {
    border-right: 1px solid #b0b0b0;
  }

  label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: #222;
    margin-bottom: 4px;
    letter-spacing: 0.5px;
  }

  input {
    border: none;
    outline: none;
    background: transparent;
    font-size: 14px;
    font-weight: 500;
    color: #222;
    width: 100%;
    cursor: pointer;
    padding: 0;
  }

  input::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;

export const GuestSelector = styled.div`
  border: 1px solid #b0b0b0;
  border-top: none;
  border-radius: 0 0 12px 12px;
  padding: 12px;
`;

export const GuestLabel = styled.div`
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

export const GuestControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const GuestRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  div {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
`;

export const GuestButton = styled.button`
  background: white;
  border: 1px solid #b0b0b0;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 1.2rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  &:hover {
    border-color: #222222;
  }
`;

export const PriceBreakdown = styled.div`
  margin: 1.5rem 0;
  border-top: 1px solid #dddddd;
  padding-top: 1rem;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #dddddd;
  font-weight: 600;
`;

export const ReserveButton = styled.button`
  width: 100%;
  background: #ff5a5f;
  color: white;
  border: none;
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: #e00b41;
  }
  &:disabled {
    background: #ffb3b8;
    cursor: not-allowed;
  }
`;

export const PaymentDisclaimer = styled.div`
  text-align: center;
  font-size: 0.75rem;
  color: #717171;
  margin-top: 0.75rem;
`;

export const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #ff5a5f;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;
  margin: 4rem auto;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  text-align: center;
  color: #e00b41;
  font-size: 1.2rem;
  margin-top: 4rem;
`;

export const ReservationHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
  border-bottom: 1px solid #ebebeb;
`;

export const HeaderContainer = styled.div`
  max-width: 1280px;
  height: 80px;
  margin: 0 auto;
  padding: 0 40px;

  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const AirbnbLogo = styled.img`
  height: 32px;
  cursor: pointer;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 8px 8px 20px;
  border: 1px solid #dddddd;
  border-radius: 40px;
  background: white;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const SearchText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export const Divider = styled.div`
  width: 1px;
  height: 20px;
  background: #dddddd;
`;

export const SearchButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: #ff385c;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;


export const IconButton = styled.button`
  border: none;
  background: transparent;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: #f7f7f7;
  }
`;

export const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #dddddd;
  border-radius: 999px;
  padding: 8px 12px;
  background: white;
  cursor: pointer;
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;