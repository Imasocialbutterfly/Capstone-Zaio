import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 568px;
  position: relative;
  overflow: hidden;
`

export const ModalHeader = styled.div`
  padding: 24px 24px 16px;
  border-bottom: 1px solid #ebebeb;
  position: relative;
`

export const CloseButton = styled.button`
  position: absolute;
  left: 24px;
  top: 24px;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f7f7f7;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`

export const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin: 0;
  color: #222222;
`

export const ModalContent = styled.div`
  padding: 24px;
`

export const WelcomeText = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 32px;
  color: #222222;
`

export const CountrySelect = styled.div`
  border: 1px solid #b0b0b0;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border-color: #222222;
  }
`

export const PhoneInput = styled.input`
  padding: 12px;
  border: 1px solid #b0b0b0;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 8px;

  &:focus {
    outline: none;
    border-color: #222222;
  }
`

export const HelpText = styled.p`
  font-size: 12px;
  color: #717171;
  margin: 8px 0 24px;
`

export const ContinueButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #ff385c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 16px;

  &:hover {
    background: #e31c5f;
  }
`

export const Divider = styled.div`
  text-align: center;
  margin: 16px 0;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #dddddd;
  }

  span {
    background: white;
    padding: 0 16px;
    color: #717171;
    position: relative;
    font-size: 12px;
  }
`

export const SocialButton = styled.button`
  width: 100%;
  padding: 12px;
  background: white;
  border: 1px solid #222222;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: #f7f7f7;
  }
`