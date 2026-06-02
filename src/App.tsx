import React from "react";
import { Box } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginLeft from "./components/Login/LoginLeft.js";
import LoginRight from "./components/Login/LoginRight.js";
import Dashboard from "./pages/dashboard.js"; 

import LoginImage from "./assets/images/pablo-sign-in 1.svg";
import Logo from "./assets/images/Group.svg";
import Users from "./pages/Users.js";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Route Login */}
      <Route
        path="/login"
        element={
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" }, 
              minHeight: "100vh", 
              width: "100vw",
              maxWidth: "100%", 
              backgroundColor: "#ffffff",
              overflowY: "auto", 
              overflowX: "hidden", 
              position: "relative",
              boxSizing: "border-box",
            }}
          >
            <LoginLeft loginImage={LoginImage} logo={Logo} />
            <LoginRight />
          </Box>
        }
      />

      {/* Route Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      
      {/* Jika path ngawur, arahkan ke login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;