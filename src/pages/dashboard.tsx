import React, { useState } from "react";
import {
  Box,
  Drawer,
  Toolbar,
  Container,
  Grid,
  Fab,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu"; 

import DashboardNavbar from "../components/dashboard/DashboardNavbar.js";
import DashboardSidebar from "../components/dashboard/DashboardSidebar.js";
import StatsCard from "../components/dashboard/StatsCard.js";
import WelcomeSection from "../components/dashboard/WelcomeSection.js"; 

// Import asset ikon card kamu di sini (sesuaikan path-nya)

import Icon1 from "../assets/images/icon.png";
import Icon2 from "../assets/images/icon2.png";
import Icon3 from "../assets/images/icon3.png";
import Icon4 from "../assets/images/icon4.png";

const drawerWidth = 240;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  // 1. UPDATE ARRAY: Ganti title dengan icon
  const stats = [
    {
      id: 1,
      icon: Icon1, // Langsung panggil variabel import-nya di sini
      subtitle: "USERS",
      value: "1,245",
    
      color: "success.main",
      path: "/users",
      valueSize: { xs: "1.1rem", sm: "1.25rem", md: "1.4rem" }, 
      subtitleSize: { xs: "0.6rem", sm: "0.65rem" }, 
    },
    {
      id: 2,
      icon: Icon2,
      value: "423",
      subtitle: "ACTIVE USERS",
      color: "info.main",
      valueSize: { xs: "1.1rem", sm: "1.25rem", md: "1.4rem" },
      subtitleSize: { xs: "0.6rem", sm: "0.65rem" },
    },
    {
      id: 3,
      icon: Icon3,
      value: "98.2%",
      subtitle: "USERS WITH LOANS",
      color: "success.main",
      valueSize: { xs: "1.1rem", sm: "1.25rem", md: "1.4rem" },
      subtitleSize: { xs: "0.6rem", sm: "0.65rem" },
    },
    {
      id: 4,
      icon: Icon4,
      value: "87",
      subtitle: "USERS WITH SAVINGS",
      color: "warning.main",
      valueSize: { xs: "1.1rem", sm: "1.25rem", md: "1.4rem" },
      subtitleSize: { xs: "0.6rem", sm: "0.65rem" },
    },
  ];

  return (
    <Box 
      sx={{ 
        display: "flex", 
        maxWidth: "100vw",     
        overflowX: "hidden",   
        boxSizing: "border-box"
      }}
    >
      <DashboardNavbar
        anchorEl={anchorEl}
        handleProfileMenuOpen={handleProfileMenuOpen}
        handleProfileMenuClose={handleProfileMenuClose}
        handleLogout={handleLogout}
      />

      <Fab
        color="primary"
        aria-label="open sidebar"
        onClick={handleDrawerToggle}
        sx={{
          position: "fixed",
          bottom: 20,      
          right: 20,
          backgroundColor: "#39CDCC",
          color: "white",
          zIndex: (theme) => theme.zIndex.drawer + 2, 
          display: { xs: "flex", md: "none" },      
          "&:hover": {
            backgroundColor: "#2fb5b4",
          }
        }}
      >
        <MenuIcon />
      </Fab>

      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle} 
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" }, 
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <DashboardSidebar handleLogout={handleLogout} handleDrawerToggle={handleDrawerToggle} />
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" }, 
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              top: "64px",
              height: "calc(100% - 64px)",
            },
          }}
        >
          <DashboardSidebar handleLogout={handleLogout} />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 }, 
          width: {
            xs: "100%", 
            sm: `calc(100% - ${drawerWidth}px)`, 
          },
          maxWidth: "100%",    
          overflowX: "hidden", 
          backgroundColor: "#f5f7f8",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        <Toolbar />

        <Container maxWidth={false} sx={{ px: { xs: 0, sm: 4 }, mt: 2 }}>
          <Grid container spacing={3}>
            
            {/* Bagian Stats Cards */}
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",          
                  justifyContent: "center",  
                  alignItems: "stretch",     
                  gap: 3,                    
                  width: "100%",
                }}
              >
              {stats.map((item) => (
  <Box
    key={item.id}
    onClick={() => item.path && navigate(item.path)} 
    sx={{
      width: { 
        xs: "100%", 
        sm: "calc(50% - 12px)", 
        md: "calc(25% - 18px)" 
      },
      display: "flex",
      justifyContent: "center",
      cursor: item.path ? "pointer" : "default", 
      transition: item.path ? "transform 0.2s ease" : "none",
      "&:hover": item.path ? {
        transform: "translateY(-4px)", 
      } : {},
    }}
  >
    <StatsCard
      icon={item.icon} // Dikirim sebagai path string biasa
      value={item.value}
      subtitle={item.subtitle}
      color={item.color}
      valueSize={item.valueSize}
      subtitleSize={item.subtitleSize}
      // title={""} <-- SUDAH DIHAPUS BIAR TIDAK ERROR
    />
  </Box>
))}
              </Box>
            </Grid>

            {/* Bagian Welcome Section */}
            <Grid size={{ xs: 12 }}>
              <WelcomeSection />
            </Grid>

          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;