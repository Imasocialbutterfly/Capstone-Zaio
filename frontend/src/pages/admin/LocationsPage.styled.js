import styled from 'styled-components';

export const PageHeader = styled.header`
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

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.img`
  height: 32px;
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

export const ProfileMenu = styled.button`
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

export const DropdownMenu = styled.div`
  position: absolute;
  right: 40px;
  top: 70px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
  width: 240px;
  padding: 8px 0;
  z-index: 100;
`;

export const MenuItem = styled.div`
  padding: 12px 16px;
  font-size: 14px;
  cursor: pointer;
  color: #222;

  &:hover {
    background-color: #f7f7f7;
  }
`;

export const MenuSeparator = styled.div`
  height: 1px;
  background-color: #ddd;
  margin: 8px 0;
`;

export const LocationsContainer = styled.div`
  padding: 0 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

export const LocationsHeader = styled.div`
  padding: 2rem 0;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #717171;
    font-size: 1rem;
  }
`;

export const SearchFilters = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 24px;
  background: white;
  font-size: 0.9rem;
  cursor: pointer;
  
  &:hover {
    border-color: #222;
  }
  
  &.active {
    background: #222;
    color: white;
    border-color: #222;
  }
`;

export const ListingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

export const ListingCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

export const ListingImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

export const ListingInfo = styled.div`
  padding: 1.25rem;
`;

export const ListingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

export const ListingTitleHeader = ListingHeader;

export const ListingTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
`;

export const ListingRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  
  svg {
    fill: #FF385C;
    color: #FF385C;
  }
`;

export const ListingLocation = styled.p`
  color: #717171;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

export const ListingDetails = styled.p`
  color: #717171;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

export const ListingAmenities = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const AmenityTag = styled.span`
  padding: 0.25rem 0.5rem;
  background: #f7f7f7;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #484848;
`;

export const ListingFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

export const Price = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  
  span {
    font-weight: 400;
    font-size: 0.9rem;
    color: #717171;
  }
`;

export const BookButton = styled.button`
  padding: 0.5rem 1rem;
  background: #FF385C;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: #E31C5F;
  }
`;

export const LoadMoreButton = styled.button`
  display: block;
  margin: 0 auto 3rem;
  padding: 0.75rem 2rem;
  background: white;
  border: 1px solid #222;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: #f7f7f7;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 1.2rem;
  color: #717171;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #FF385C;
  font-size: 1.1rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    color: #717171;
    margin-bottom: 2rem;
  }
`;

export const StyledSearchBar = styled.div`
  margin-bottom: 2rem;
  
  input {
    width: 100%;
    padding: 1rem;
    border: 2px solid #ddd;
    border-radius: 12px;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #222;
    }
  }
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
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;