// Map.styled.tsx
import { styled } from "@mui/material/styles";

export const MapContainer = styled("div")`
  width: 90%;
  height: 90%;
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 10px;
  overflow: hidden;
`;