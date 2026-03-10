import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
  
  &::after {
    content: ${props => props.required ? '" *"' : '""'};
    color: #FF385C;
  }
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #FF385C;
    box-shadow: 0 0 0 2px rgba(255, 56, 92, 0.1);
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #FF385C;
    box-shadow: 0 0 0 2px rgba(255, 56, 92, 0.1);
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #FF385C;
    box-shadow: 0 0 0 2px rgba(255, 56, 92, 0.1);
  }
`;

export const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: #FF385C;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #E31C5F;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #666;
  font-size: 1.2rem;
`;

export const ErrorMessage = styled.div`
  background-color: #fee;
  border: 1px solid #f99;
  color: #c00;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

export const ImageUploadLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: #f7f7f7;
  border: 2px dashed #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
  
  &:hover {
    background-color: #f0f0f0;
    border-color: #ccc;
  }
`;