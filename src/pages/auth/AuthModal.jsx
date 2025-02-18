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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="#4285F4"
                d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
              />
            </svg>
            Continue with Google
          </SocialButton>

          <SocialButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="#000000"
                d="M18.71 19.5C17.88 20.74 17 22 15.66 22c-1.45 0-1.93-.86-3.66-.86-1.78 0-2.24.86-3.67.86-1.31 0-2.29-1.35-3.12-2.6C4.25 16.06 2 11.97 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.88 4.5 2.09 1.09-1.21 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.47-2.25 7.56-3.79 10zM13 8.5c0-1.93 1.57-3.5 3.5-3.5 1.93 0 3.5 1.57 3.5 3.5 0 1.93-1.57 3.5-3.5 3.5-1.93 0-3.5-1.57-3.5-3.5z"
              />
            </svg>
            Continue with Apple
          </SocialButton>

          <SocialButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="#EA4335"
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
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
