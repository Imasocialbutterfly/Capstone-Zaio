import React from "react";
import {
  ExperienceButton,
  ExperienceColumn,
  ExperienceContent,
  ExperienceImage,
} from "./Experiences.styled";

const Experiences = ({ data }) => {
  return (
    <>
      {data.map((experience, index) => (
        <ExperienceColumn key={index}>
          <ExperienceImage
            style={{ backgroundImage: `url(${experience.imageUrl})` }}
          />
          <ExperienceContent>
            <h2>{experience.title}</h2>
            <ExperienceButton>{experience.buttonText}</ExperienceButton>
          </ExperienceContent>
        </ExperienceColumn>
      ))}
    </>
  );
};

export default Experiences;
