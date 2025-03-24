import React from "react";
import {
  GiftCardButton,
  GiftCardContent,
  GiftCardImage,
  GiftCardSection,
  GiftCardText,
} from "./GiftCard.styled";

const GiftCards = ({ imageUrl }) => {
  return (
    <GiftCardSection>
      <GiftCardContent>
        <GiftCardText>
          <h2>Shop Airbnb gift cards</h2>
          <GiftCardButton>Learn more</GiftCardButton>
        </GiftCardText>
        <GiftCardImage src={imageUrl} alt="airbnb gift cards" />
      </GiftCardContent>
    </GiftCardSection>
  );
};

export default GiftCards;
