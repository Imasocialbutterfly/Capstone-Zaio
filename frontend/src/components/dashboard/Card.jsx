import React from "react";
import {
  CardContainer,
  CardImage,
  CityName,
  CountryName,
  ImageContainer,
  TextOverlay,
} from "./Card.styled";

const DEFAULT_IMAGE = "https://via.placeholder.com/400x300";

const Card = ({
  imageUrl = DEFAULT_IMAGE,
  city = "City Name",
  country = "Country",
  className = "",
}) => {

  return (
    <CardContainer className={className}>
      <ImageContainer>
        <CardImage
          src={imageUrl}
          alt={`${city}, ${country}`}
        />
      </ImageContainer>

      <TextOverlay>
        <CityName>{city}</CityName>
        <CountryName>{country}</CountryName>
      </TextOverlay>
    </CardContainer>
  );
};

export default Card;
