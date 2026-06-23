import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  background: white;
`;

export const Header = styled.header`
  border-bottom: 1px solid #ebebeb;
`;

export const HeaderTop = styled.div`
  height: 80px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const AirbnbLogo = styled.img`
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

export const ProfileMenuWrapper = styled.div`
  position: relative;
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

export const ProfileDropdown = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 12px);
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
  width: 240px;
  padding: 8px 0;
  z-index: 1000;
  overflow: hidden;
  border: 1px solid #ebebeb;
`;

export const DropdownItem = styled.button`
  width: 100%;
  border: none;
  background: white;
  text-align: left;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  color: #222;
  text-transform: none;
  transition: background 0.15s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: inherit;

  &:hover {
    background: #f7f7f7;
  }
`;

export const DropdownDivider = styled.div`
  height: 1px;
  background: #ddd;
  margin: 8px 0;
`;

export const Nav = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px 20px;
  display: flex;
  gap: 12px;
`;

export const NavButton = styled.button`
  border: 1px solid #dddddd;
  background: white;
  border-radius: 999px;
  padding: 10px 18px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  color: #222;
  text-transform: none;
  font-family: inherit;

  &:hover {
    background: #f7f7f7;
  }
`;

export const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px 32px;
`;

export const Title = styled.h1`
  font-size: 38px;
  font-weight: 600;
  margin-bottom: 32px;
  color: #222;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: 18px;
    border: 1px solid #ddd;
    background: #fafafa;
    font-size: 14px;
    color: #222;
    font-weight: 600;
    text-transform: none;
  }

  td {
    padding: 18px;
    border: 1px solid #ddd;
    font-size: 14px;
    color: #222;
    text-transform: none;
  }
`;

export const DeleteButton = styled.button`
  width: 110px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: #ff385c;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-transform: none;

  &:hover {
    background: #e31c5f;
  }
`;

export const Footer = styled.footer`
  margin-top: 100px;
  background: #f7f7f7;
  border-top: 1px solid #ebebeb;
  padding: 48px 32px;
`;

export const FooterGrid = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;

  h4 {
    margin-bottom: 16px;
    font-size: 14px;
    color: #222;
    text-transform: none;
  }

  p {
    color: #717171;
    margin-bottom: 10px;
    font-size: 14px;
    text-transform: none;
  }
`;