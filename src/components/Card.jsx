import React from "react";
import {
  CardContainer,
  CardImage,
  CityName,
  CountryName,
  ImageContainer,
  TextOverlay,
} from "./Card.styled";

const Card = ({
  imageUrl = "/api/placeholder/400/300",
  city = "City Name",
  country = "Country",
  className = "",
}) => {
  return (
    <CardContainer className={className}>
      <ImageContainer>
        <CardImage src={imageUrl} alt={`${city}, ${country}`} />
      </ImageContainer>

      <TextOverlay>
        <CityName>{city}</CityName>
        <CountryName>{country}</CountryName>
      </TextOverlay>
    </CardContainer>
  );
};

export default Card;
