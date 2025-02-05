import React, { useState } from "react";
import {
  FutureGetawaysContainer,
  FutureSectionHeading,
  CategoryTabs,
  CategoryTab,
  DestinationList,
  DestinationItem,
} from "./FutureGetaways.styled";
import { categoriesData } from "../utils/getawaysCategories";

const FutureGetaways = () => {
  const [activeCategory, setActiveCategory] = useState(
    "Destinations for arts and culture"
  );

  return (
    <FutureGetawaysContainer>
      <FutureSectionHeading>
        Inspiration for future getaways
      </FutureSectionHeading>

      <CategoryTabs>
        {Object.keys(categoriesData).map((category) => (
          <CategoryTab
            key={category}
            active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </CategoryTab>
        ))}
      </CategoryTabs>

      <DestinationList>
        {categoriesData[activeCategory].map((destination, index) => (
          <DestinationItem key={index}>
            <strong>{destination.name}</strong>
            <p>{destination.location}</p>
          </DestinationItem>
        ))}
      </DestinationList>
    </FutureGetawaysContainer>
  );
};

export default FutureGetaways;
