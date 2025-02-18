import styled from 'styled-components'
import Card from '../../../components/dashboard/Card';

export const DashboardContainer = styled.div`
    min-height: 100vh;
    background-color: #fff;
`;

export const Header = styled.header`
    background: white;
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 1rem;
`

export const HeaderContainer = styled.div`
    max-width: 1760px;
    margin: 0 auto;
    padding: 1rem 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const HeaderLeft = styled.div`
    flex: 0 0 auto;
`

export const HeaderCenter = styled.nav`
    display: flex;
    gap: 2rem;
    justify-content: center;
`

export const NavItem = styled.a`
    color: #222222;
    text-decoration: none;
    position: relative;
    padding: 0.5rem 0;
    cursor: pointer;
    
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: ${props => props.active ? '60%' : '0'};
        height: 2px;
        background-color: #222;
        transition: width 0.3s ease;
    }
    
    &:hover::after {
        width: 60%;
    }
`

export const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;

    button {
        background: transparent;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 50px;
        cursor: pointer;

        &:hover {
            background: #f7f7f7;
        }
    }
`

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

export const MenuSeparator = styled.div`
  height: 1px;
  background-color: #ddd;
  margin: 8px 0;
`;

export const SearchBar = styled.div`
    max-width: 850px;
    margin: 0 auto;
    display: flex;
    background: white;
    border: 1px solid #ddd;
    border-radius: 50px;
    padding: 0.5rem;
    box-shadow: 0 1px 2px rgba(0,0,0,0.08);
`

export const SearchField = styled.div`
    flex: 1;
    padding: 0.5rem 1.5rem;
    border-right: 1px solid #ddd;
    
    &:last-of-type {
        border-right: none;
    }
    
    label {
        display: block;
        font-size: 0.75rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
    }

    input {
        border: none;
        outline: none;
        width: 100%;
        font-size: 0.875rem;
        
        &::placeholder {
            color: #717171;
        }
    }
`

export const SearchButton = styled.button`
    background: #FF385C;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 0.42rem;
    
    &:hover {
        background: #DE1162;
    }
`

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

export const ContentSection = styled.div`
    padding: 2rem 6%;
    background white;
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