import styled from 'styled-components';

export const ListingContainer = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
`;

export const PageHeader = styled.header`
  background: white;
  border-bottom: 1px solid #ebebeb;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const HeaderContainer = styled.div`
  max-width: 1760px;
  margin: 0 auto;
  padding: 0 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.img`
  height: 2rem;
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.8;
  }
`;

export const ProfileMenu = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2rem;
  border: 1px solid #ddd;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  
  &:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;

export const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  color: #717171;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 50px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
  width: 240px;
  padding: 8px 0;
  z-index: 1000;
  margin-right: 20px;
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

export const MainContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 5rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    padding: 2rem;
  }
`;

export const LeftColumn = styled.div`
  max-width: 100%;
`;

export const RightColumn = styled.div`
  position: sticky;
  top: 100px;
  height: fit-content;
  
  @media (max-width: 1200px) {
    position: static;
    order: -1;
    margin-bottom: 2rem;
  }
`;

export const ListingHeader = styled.div`
  margin-bottom: 2rem;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

export const ListingTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
`;

export const ActionStrip = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 1rem 0 2rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const LeftInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const RightActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: auto;
`;

export const Separator = styled.span`
  color: #717171;
  font-size: 1.2rem;
  line-height: 1;
  margin: 0 0.25rem;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #222;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 0;
  border-radius: 4px;
  transition: background 0.2s;
  
  &:hover {
    background-color: #f7f7f7;
  }
`;

export const RightInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

export const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StarIcon = styled.span`
  display: flex;
  align-items: center;
`;

export const RatingText = styled.span`
  font-size: 1rem;
  color: #222;
  
  strong {
    font-weight: 600;
  }
`;

export const SuperhostBadge = styled.span`
  background-color: #f7f7f7;
  color: #222;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
`;

export const LocationSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const MapIcon = styled.span`
  display: flex;
  align-items: center;
`;

export const LocationText = styled.span`
  font-size: 1rem;
  color: #222;
  text-decoration: underline;
  cursor: pointer;
`;