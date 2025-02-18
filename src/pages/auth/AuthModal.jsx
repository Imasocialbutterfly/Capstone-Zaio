import React from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  CloseButton,
  ModalContent,
  WelcomeText,
  PhoneInput,
  HelpText,
  ContinueButton,
  Divider,
  SocialButton,
  Title,
  CountrySelect,
} from "./AuthModal.styled";

const AuthModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <CloseButton onClick={onClose}>
            <svg viewBox="0 0 32 32">
              <path
                d="m6 6 20 20M26 6 6 26"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </CloseButton>
          <Title>Log in or sign up</Title>
        </ModalHeader>

        <ModalContent>
          <WelcomeText>Welcome to Airbnb</WelcomeText>

          <CountrySelect>
            <span>South Africa (+27)</span>
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path
                d="m12 16-6-6 1.5-1.5L12 13l4.5-4.5L18 10z"
                fill="currentColor"
              />
            </svg>
          </CountrySelect>

          <PhoneInput type="tel" placeholder="Phone number" />

          <HelpText>
            We'll call or text you to confirm your number. Standard message and
            data rates apply.
          </HelpText>

          <ContinueButton>Continue</ContinueButton>

          <Divider>
            <span>or</span>
          </Divider>

          <SocialButton>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                fill="currentColor"
              />
              <path
                d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                fill="currentColor"
              />
            </svg>
            Continue with Google
          </SocialButton>

          <SocialButton>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                fill="currentColor"
              />
              <path
                d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                fill="currentColor"
              />
            </svg>
            Continue with Apple
          </SocialButton>

          <SocialButton>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                fill="currentColor"
              />
              <path
                d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                fill="currentColor"
              />
            </svg>
            Continue with Email
          </SocialButton>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AuthModal;
