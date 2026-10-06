import { styled } from "@mui/material/styles";

export const SidebarContainer = styled("div")`
  width: 100%;
  max-width: 280px;
  background-color: ${({ theme }) => theme.palette.primary.dark};
  padding: 16px;
  color: ${({ theme }) => theme.palette.white};
  height: 100vh;
`;

export const Header = styled("div")`
  margin-bottom: 24px;
`;

export const Title = styled("h1")`
  font-size: 28px;
  font-weight: 800;
  line-height: 1.4;
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.palette.white};
`;

export const Subtitle = styled("p")`
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-left: 0.5rem;
  font-size: 16px;
  margin-top: 8px;
  color: ${({ theme }) => theme.palette.white};
`;

export const Section = styled("div")`
  margin-bottom: 16px;
`;

export const SectionHeader = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.palette.white}22;
`;

export const SectionTitle = styled("span")`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.white};
`;

export const DropdownIcon = styled("span")<{ isOpen: boolean }>`
  font-size: 12px;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease;
  color: ${({ theme }) => theme.palette.white};
`;

export const ExpositorGrid = styled("div")`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding-top: 12px;
`;

export const ExpositorItem = styled("div")`
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 12px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ExpositorLogo = styled("img")`
  max-width: 100%;
  height: auto;
`;

export const CategoriaItem = styled("div")`
  padding: 10px 16px;
  border-top: 1px solid ${({ theme }) => theme.palette.white}22;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.white};
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.light};
    cursor: pointer;
  }
`;
