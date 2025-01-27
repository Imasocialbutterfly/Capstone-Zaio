import React from "react";
import {
  DashboardContainer,
  Header,
  HeaderCenter,
  HeaderContainer,
  HeaderLeft,
  HeaderRight,
  Logo,
  MenuButton,
  NavItem,
  ProfileImage,
  ProfileMenu,
  SearchBar,
  SearchField,
  SearchButton,
  BackgroundImg,
  ContentSection,
  SectionHeading,
  InspirationGrid,
  DiscoverSection,
} from "./Dashboard.styled";
import { GlobeIcon, Menu, Search } from "lucide-react";
import Card from "../../../components/Card";

const Dashboard = () => {
  const inspirationData = [
    { city: "Paris", country: "France" },
    { city: "New York", country: "USA" },
    { city: "Tokyo", country: "Japan" },
    { city: "Cape Town", country: "South Africa" },
    { city: "Phuket", country: "Thailand" },
  ];
  return (
    <DashboardContainer>
      <Header>
        <HeaderContainer>
          <HeaderLeft>
            <Logo src="data:image/png;base64,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" />
          </HeaderLeft>

          <HeaderCenter>
            <NavItem active>Places to go</NavItem>
            <NavItem>Experiences</NavItem>
            <NavItem>Online Experiences</NavItem>
          </HeaderCenter>

          <HeaderRight>
            <button>Become a host</button>
            <GlobeIcon />
            <ProfileMenu>
              <MenuButton>
                <Menu />
              </MenuButton>
              <ProfileImage
                src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                alt="Profile"
              />
            </ProfileMenu>
          </HeaderRight>
        </HeaderContainer>

        <SearchBar>
          <SearchField>
            <label>Hotels</label>
            <input type="text" placeholder="Select Hotel" />
          </SearchField>
          <SearchField>
            <label>Check In</label>
            <input type="text" placeholder="Add Dates" />
          </SearchField>
          <SearchField>
            <label>Check Out</label>
            <input type="text" placeholder="Add Dates" />
          </SearchField>
          <SearchField>
            <label>Guests</label>
            <input type="text" placeholder="Add Guests" />
          </SearchField>
          <SearchButton>
            <Search size={20} color="white" />
          </SearchButton>
        </SearchBar>
      </Header>
      <BackgroundImg></BackgroundImg>
      <ContentSection>
        <SectionHeading>Inspiration for your next trip</SectionHeading>
        <InspirationGrid>
          {inspirationData.map((item, index) => (
            <Card 
              key={index}
              city={item.city}
              country={item.country}
              imageUrl={`/api/placeholder/400/300?city=${item.city}`}
            />
          ))}
        </InspirationGrid>

        <DiscoverSection>
          <SectionHeading>Discover Airbnb Experiences</SectionHeading>
        </DiscoverSection>
      </ContentSection>
    </DashboardContainer>
  );
};

export default Dashboard;
