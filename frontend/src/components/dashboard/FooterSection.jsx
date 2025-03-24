import React from "react";
import {
  FooterColumn,
  FooterContainer,
  FooterGrid,
  FooterHeading,
  FooterLink,
} from "./FooterSection.styled";
import { footerLinks } from "../../utils/footerLinks";


const FooterSection = () => {
  return (
    <FooterContainer>
      <FooterGrid>
        {Object.entries(footerLinks).map(([category, links]) => (
          <FooterColumn key={category}>
            <FooterHeading>{category}</FooterHeading>
            {links.map((link, index) => (
              <FooterLink key={index} href="#">
                {link}
              </FooterLink>
            ))}
          </FooterColumn>
        ))}
      </FooterGrid>
    </FooterContainer>
  );
};

export default FooterSection;
