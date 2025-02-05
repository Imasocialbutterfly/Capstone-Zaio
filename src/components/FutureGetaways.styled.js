import styled from "styled-components";

export const FutureGetawaysContainer = styled.section`
  margin-top: 40px;
  padding: 20px;
  background-color: #fff;
`;

export const FutureSectionHeading = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
`;

export const CategoryTabs = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 2px solid #ddd;
  margin-bottom: 28px;
`;

export const CategoryTab = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  color: ${(props) => (props.active ? "#ff385c" : "#555")};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  padding: 10px 0;
  cursor: pointer;
  border-bottom: ${(props) => (props.active ? "2px solid #ff385c" : "none")};
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #ff385c;
  }
`;

export const DestinationList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

export const DestinationItem = styled.div`
  font-size: 18px;
  color: #333;

  strong {
    display: block;
    font-size: 16px;
    margin-bottom: 5px;
    color: #222;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #777;
  }
`;
