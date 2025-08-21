// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import CineflixNavbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <CineflixNavbar />
      <Outlet />
    </>
  );
}
