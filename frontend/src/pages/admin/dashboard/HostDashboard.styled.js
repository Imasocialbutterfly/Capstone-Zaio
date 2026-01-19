import styled from 'styled-components';

export const HostDashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #f7f7f7;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Logo = styled.img`
  height: 40px;
  cursor: pointer;
`;

export const WelcomeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const WelcomeText = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0;
`;

export const MainContent = styled.div`
  display: flex;
  min-height: calc(100vh - 80px);
`;

export const Sidebar = styled.aside`
  width: 250px;
  background-color: white;
  padding: 2rem 0;
  box-shadow: 1px 0 2px rgba(0, 0, 0, 0.08);
`;

export const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SidebarMenuItem = styled.li`
  padding: 1rem 2rem;
  cursor: pointer;
  transition: background-color 0.2s;
  border-left: 4px solid transparent;
  background-color: ${props => props.active ? '#f7f7f7' : 'white'};
  border-left-color: ${props => props.active ? '#FF385C' : 'transparent'};
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? '#FF385C' : '#333'};

  &:hover {
    background-color: #f7f7f7;
  }
`;

export const ContentArea = styled.main`
  flex: 1;
  padding: 2rem;
`;

export const SectionTitle = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: #333;
`;

export const ReservationsTable = styled.table`
  width: 100%;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const TableHeader = styled.thead`
  background-color: #f7f7f7;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #fafafa;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
`;

export const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  color: #333;
`;

export const DeleteButton = styled.button`
  background-color: #FF385C;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background-color: #e31c5f;
  }
`;

export const CreateListingForm = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 800px;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #FF385C;
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #FF385C;
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #FF385C;
  }
`;

export const SubmitButton = styled.button`
  background-color: #FF385C;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;

  &:hover {
    background-color: #e31c5f;
  }
`;

export const ListingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

export const ListingCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const ListingImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const ListingContent = styled.div`
  padding: 1.5rem;
`;

export const ListingTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
`;

export const ListingDescription = styled.p`
  color: #666;
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
`;

export const ListingPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #FF385C;
  margin-bottom: 1rem;
`;

export const ListingActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ActionButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background-color: #f7f7f7;
  }
`;

export const DeleteListingButton = styled(ActionButton)`
  border-color: #FF385C;
  color: #FF385C;

  &:hover {
    background-color: #fff5f5;
  }
`;

export const NoDataMessage = styled.div`
  background-color: white;
  padding: 3rem;
  text-align: center;
  border-radius: 8px;
  color: #666;
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #FF385C;
`;