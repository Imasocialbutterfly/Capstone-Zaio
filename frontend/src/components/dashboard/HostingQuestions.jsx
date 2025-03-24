import React from 'react';
import {
  HostingSection,
  HostingContent,
  HostingText,
  HostingButton
} from './HostingQuestions.styled';

const HostingQuestions = ({ backgroundImage }) => {
  return (
    <HostingSection style={{ backgroundImage: `url(${backgroundImage})` }}>
      <HostingContent>
        <HostingText>
          <h2>Questions about hosting?</h2>
          <HostingButton>Ask a Super Host</HostingButton>
        </HostingText>
      </HostingContent>
    </HostingSection>
  );
};

export default HostingQuestions;