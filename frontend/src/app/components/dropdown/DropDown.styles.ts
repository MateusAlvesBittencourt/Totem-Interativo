import { styled } from "@mui/material/styles";

interface ContainerProps {
  width?: number;
}

export const DropDownContainer = styled("div")<ContainerProps>`
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  background-color: ${({ theme }) => theme.palette.primary.dark};
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.palette.white};
  display: flex;
  flex-direction: column;
`;

export const DropDownHeader = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.5rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.palette.primary.dark};
  color: ${({ theme }) => theme.palette.white};
  font-size: 16px;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const DropDownList = styled("ul")`
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: ${({ theme }) => theme.palette.primary.dark};
  max-height: 200px;
  overflow-y: auto;
`;

export const DropDownItem = styled("li")`
  padding: 10px 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.white};
  text-align: left;
  cursor: pointer;
  border-top: 1px solid ${({ theme }) => theme.palette.white}22;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const DropdownIcon = styled("span")<{ isOpen: boolean }>`
  font-size: 12px;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease;
  color: ${({ theme }) => theme.palette.white};
`;
