import styled from 'styled-components'
import Card from '../../../components/dashboard/Card';

export const DashboardContainer = styled.div`
    min-height: 100vh;
    position: relative;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
`;

export const Header = styled.header`
  background: transparent;
  padding-top: 24px;
  padding-bottom: 40px;
`;

export const HeaderContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;

  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center
`;

export const HeaderLeft = styled.div`
    flex: 0 0 auto;
`

export const HeaderCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

export const HeaderTopSection = styled.div`
  max-width: 1280px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
`;

export const NavItem = styled.div`
  color: white;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;

  opacity: ${(props) => (props.$active ? 1 : 0.75)};

  position: relative;
  padding-bottom: 12px;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;

    transform: translateX(-50%);

    width: ${(props) => (props.$active ? "100%" : "0")};

    height: 2px;
    background: white;

    transition: all 0.2s ease;
  }

  &:hover {
    opacity: 1;
  }

  &:hover::after {
    width: 100%;
  }
`;


export const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;

  button {
    color: white;
  }
`;

export const Logo = styled.img`
    height: 2rem;
`

export const GlobeIcon = styled.button`
    background: transparent;
    border: none;
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: #f7f7f7
    }
`

export const ProfileMenu = styled.div`
    display: flex;
    align-items: center;
    padding: 0.2rem;
    border: 1px solid #ddd;
    border-radius: 50px;
    cursor: pointer;
    
    &:hover {
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
`

export const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 50px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
  width: 240px;
  padding: 8px 0;
  z-index: 100;
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

export const HostBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background: linear-gradient(135deg, #FF385C, #FF6B6B);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`;

export const UpgradeButton = styled.div`
  display: flex;
  align-items: center;
  color: #FF385C;
  font-weight: 600;
`;

export const MenuSeparator = styled.div`
  height: 1px;
  background-color: #ddd;
  margin: 8px 0;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;

  background: white;

  border-radius: 999px;

  padding: 8px;

  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.08),
    0 8px 28px rgba(0, 0, 0, 0.12);
`;

export const SearchBarContainer = styled.div`
  position: relative;
  max-width: 850px;
  margin: 20px auto 0;
  position: relative;
`;

export const LocationDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
  padding: 8px 0;
  z-index: 1000;
  margin-top: 8px;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ebebeb;
`;

export const LocationOption = styled.div`
  padding: 12px 16px;
  font-size: 14px;
  cursor: pointer;
  color: #222;
  
  &:hover {
    background-color: #f7f7f7;
  }
`;

export const GuestsDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 120px;
  width: 300px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
  padding: 20px;
  z-index: 1000;
  margin-top: 8px;
  border: 1px solid #ebebeb;
`;

export const GuestOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid #ebebeb;
  }
`;

export const GuestLabel = styled.div`
  display: flex;
  flex-direction: column;
  
  span {
    font-size: 12px;
    color: #717171;
    margin-top: 4px;
  }
`;

export const GuestType = styled.span`
  font-weight: 600;
  color: #222;
`;

export const GuestCounter = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const CounterButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid #b0b0b0;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #b0b0b0;
  
  &:hover:not(:disabled) {
    border-color: #222;
    color: #222;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CounterValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
  color: #222;
`;

export const SearchField = styled.div`
  flex: 1;

  padding: 14px 24px;

  border-right: 1px solid #dddddd;

  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    background: #f7f7f7;
    border-radius: 32px;
  }

  &:last-of-type {
    border-right: none;
  }

  label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: #222;
    margin-bottom: 2px;
  }

  input {
    border: none;
    outline: none;
    width: 100%;

    background: transparent;

    font-size: 14px;
    color: #717171;

    cursor: pointer;
  }
`;

export const SearchButton = styled.button`
  width: 48px;
  height: 48px;

  border: none;
  border-radius: 50%;

  background: #ff385c;

  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  flex-shrink: 0;

  transition: all 0.2s ease;

  &:hover {
    background: #e31c5f;
  }
`;

export const ProfileImage = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 0.5rem
`

export const MenuButton = styled.button`
    background: none;
    border: none;
    color: #717171;
    cursor: pointer;
`

export const BackgroundImg = styled.div`
    background-image: url('https://amazingarchitecture.com/storage/1565/diagonal_house_frari_architecture_network_aveiro_portugal.jpg');
    background-size: cover;
    background-position: center;
    height: 500px;
    width: 100%;
`

export const BlackBackground = styled.div`
  background-color: #000;
  position: relative;
  min-height: 700px;
`;

export const ContentSection = styled.div`
    padding: 2rem 6%;
    background white;
    position: relative;
    z-index: 2;
`

export const SectionHeading = styled.h1`
    font-size: 2rem;
    margin-bottom: 2rem;
`

export const InspirationGrid = styled.div`
    display: flex;
    overflow-x: auto;
    gap: 1.5rem;
    margin: 0 -6% 1rem;
    padding: 0 6% 1rem;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        display: none;
    }

    ${Card} {
        min-width: 240px;
        flex: 0 0 auto;
        scroll-snap-align: start
    }
`

export const DiscoverSection = styled.div`
    padding-top: 3rem;
`