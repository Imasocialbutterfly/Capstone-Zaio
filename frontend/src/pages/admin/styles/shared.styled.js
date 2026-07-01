import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
  background: #f7f7f7;
  min-height: 100vh;
`;

export const Form = styled.form`
  background: #fff;
  padding: 40px;
  border-radius: 24px;
  border: 1px solid #ebebeb;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 18px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 32px;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 15px;
  color: #222;

  &::after {
    content: ${(props) => (props.required ? '" *"' : '""')};
    color: #ff385c;
  }
`;

export const FormInput = styled.input`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  border: 1px solid #d0d0d0;
  border-radius: 12px;
  background: white;
  font-size: 16px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #b0b0b0;
  }

  &:focus {
    outline: none;
    border-color: #222;
    box-shadow: 0 0 0 1px #222;
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 140px;
  padding: 16px;
  border: 1px solid #d0d0d0;
  border-radius: 12px;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s ease;

  &:hover {
    border-color: #b0b0b0;
  }

  &:focus {
    outline: none;
    border-color: #222;
    box-shadow: 0 0 0 1px #222;
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  border: 1px solid #d0d0d0;
  border-radius: 12px;
  background: white;
  font-size: 16px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #b0b0b0;
  }

  &:focus {
    outline: none;
    border-color: #222;
    box-shadow: 0 0 0 1px #222;
  }
`;

export const SubmitButton = styled.button`
  height: 48px;
  padding: 0 28px;
  border: none;
  border-radius: 10px;

  background: linear-gradient(
    135deg,
    #e61e4d 0%,
    #d70466 50%,
    #bd1e59 100%
  );
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(230, 30, 77, 0.28);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 240px;
  font-size: 18px;
  color: #717171;
`;

export const ErrorMessage = styled.div`
  background: #fff8f6;
  border: 1px solid #ffd4d9;
  color: #c13515;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 24px;
`;

export const SuccessMessage = styled.div`
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 24px;
`;

export const ImageUploadLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 22px;
  background: white;
  border: 1px solid #222;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.2s ease;

  &:hover {
    background: #f7f7f7;
  }
`;