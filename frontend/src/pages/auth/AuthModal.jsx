import React, { useState, useEffect } from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  CloseButton,
  ModalContent,
  WelcomeText,
  InputField,
  HelpText,
  ContinueButton,
  Divider,
  SocialButton,
  Title,
  ToggleMode,
  ErrorMessage,
  LoadingSpinner
} from "./AuthModal.styled";

const AuthModal = ({
  isOpen,
  onClose,
  onAuthSubmit,
  mode: initialMode,
  setMode,
  error,
  setAuthError // Added prop to clear errors
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState(""); // For client-side validation
  const isSignup = initialMode === "signup";

  // Reset form when mode changes
  useEffect(() => {
    setFormData({ email: "", password: "", username: "" });
    setLocalError("");
    setAuthError?.("");
  }, [initialMode, setAuthError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate password in real-time
    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    if (isSignup && password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return false;
    }
    setLocalError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    // Client-side validation
    if (isSignup && !formData.username.trim()) {
      setLocalError("Username is required");
      return;
    }
    
    if (!validatePassword(formData.password)) return;

    setIsLoading(true);
    try {
      await onAuthSubmit(formData);
      // Reset form on successful submission
      setFormData({ email: "", password: "", username: "" });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <CloseButton onClick={onClose} aria-label="Close modal">
            <svg viewBox="0 0 32 32">
              <path
                d="m6 6 20 20M26 6 6 26"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </CloseButton>
          <Title>{isSignup ? "Create Account" : "Welcome Back"}</Title>
        </ModalHeader>

        <ModalContent as="form" onSubmit={handleSubmit}>
          <WelcomeText>
            {isSignup ? "Join Airbnb" : "Log in to your account"}
          </WelcomeText>

          {(error || localError) && (
            <ErrorMessage>{error || localError}</ErrorMessage>
          )}

          {isSignup && (
            <InputField
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
          )}

          <InputField
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />

          <InputField
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            minLength={isSignup ? 6 : undefined}
            disabled={isLoading}
          />

          <HelpText>
            {isSignup
              ? "We'll send you a confirmation email"
              : "We'll never share your information"}
          </HelpText>

          <ContinueButton
            type="submit"
            disabled={
              isLoading ||
              (isSignup && !formData.username.trim()) ||
              !formData.email ||
              !formData.password ||
              !!localError
            }
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : isSignup ? (
              "Sign Up"
            ) : (
              "Continue"
            )}
          </ContinueButton>

          <Divider>
            <span>or</span>
          </Divider>

          <ToggleMode
            onClick={() => setMode(isSignup ? "login" : "signup")}
            disabled={isLoading}
          >
            {isSignup
              ? "Already have an account? Log in"
              : "Don't have an account? Sign up"}
          </ToggleMode>

          <SocialButton type="button" disabled={isLoading}>
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
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AuthModal;