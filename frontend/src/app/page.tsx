"use client";
import { styled } from "@mui/system";
import Sidebar from "./components/sidebar/Sidebar";
import Map from "./components/map/Mapcomponent"
const HomeContainer = styled("div")`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  text-align: left;
`;

export default function Home() {
  return (
    <HomeContainer>
      <Sidebar />
      <Map/>
    </HomeContainer>
  );
}
