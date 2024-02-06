import { Outlet } from "react-router-dom";
import Body from "../components/Body";

function RootLayout() {
  return (
    <>
      <Body />
      <Outlet />
    </>
  );
}

export default RootLayout;
