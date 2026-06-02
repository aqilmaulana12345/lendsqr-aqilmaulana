import React, { useState } from "react";
import {
  Box,
  Drawer,
  Toolbar,
  Fab,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Divider,
  Tabs,
  Tab
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import MenuIcon from "@mui/icons-material/Menu"; 
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import DashboardNavbar from "../components/dashboard/DashboardNavbar.js";
import DashboardSidebar from "../components/dashboard/DashboardSidebar.js";

// Import file SCSS
import "./dashboard.scss";

const drawerWidth = 240;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  const handleLogout = () => navigate("/login");
  const handleActivate = () => console.log("User di-aktifkan");

  return (
    <Box className="dashboard-root">
      {/* Navbar */}
      <DashboardNavbar
        anchorEl={anchorEl}
        handleProfileMenuOpen={handleProfileMenuOpen}
        handleProfileMenuClose={handleProfileMenuClose}
        handleLogout={handleLogout}
      />

      {/* FLOATING HAMBURGER BUTTON (Mobile Only) */}
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
          "&:hover": { backgroundColor: "#2fb5b4" }
        }}
      >
        <MenuIcon />
      </Fab>

      {/* SIDEBAR NAVIGATION */}
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle} 
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
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

      {/* MAIN CONTENT AREA */}
      <Box component="main" className="dashboard-main" sx={{ p: { xs: 2, sm: 3 } }}>
        <Toolbar />

        {/* 1. TOMBOL PREVIOUS (BACK) */}
        <Box onClick={() => navigate(-1)} className="back-button">
          <ArrowBackIcon sx={{ fontSize: "18px" }} />
          <Typography variant="body2">Back to Users</Typography>
        </Box>

        {/* 2. LAYOUT UTAMA */}
        <Box className="dashboard-header" sx={{ width: { xs: "100%", md: "1037px" }, mb: 3, flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" } }}>
          <Typography variant="h5" className="header-title">
            User Details
          </Typography>

          <Box className="btn-group" sx={{ width: { xs: "100%", sm: "auto" } }}>
            <Button variant="outlined" className="btn-action blacklist" sx={{ px: { xs: 2, sm: 3 }, py: 1, fontSize: { xs: "11px", sm: "12px" }, flex: { xs: 1, sm: "none" } }}>
              Blacklist User
            </Button>
            <Button variant="outlined" onClick={handleActivate} className="btn-action activate" sx={{ px: { xs: 2, sm: 3 }, py: 1, fontSize: { xs: "11px", sm: "12px" }, flex: { xs: 1, sm: "none" } }}>
              Activate User
            </Button>
          </Box>
        </Box>

        {/* Container Tumpukan Card Utama */}
        <Box className="card-wrapper">
          
          {/* CARD ATAS */}
          <Card className="custom-card" sx={{ width: "100%", maxWidth: "1037px", height: { xs: "auto", md: "210px" } }}>
            <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 3 }}>
              <Box className="profile-container" sx={{ flexWrap: { xs: "wrap", md: "nowrap" }, gap: { xs: 3, md: 6 } }}>
                
                {/* Kolom 1 */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
                  <Avatar src="/images/profile.jpg" alt="User Profile" sx={{ width: 100, height: 100 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 500, color: "#213F7D" }}>Grace Effiom</Typography>
                    <Typography variant="body2" color="text.secondary">LSQFf587g90</Typography>
                  </Box>
                </                Box>

                <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />

                {/* Kolom 2 */}
                <Box sx={{ flexShrink: 0, px: { md: 2 } }}>
                  <Typography variant="body2" sx={{ color: "#545F7D", mb: 1 }}>User's Tier</Typography>
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    <StarIcon sx={{ color: "#E9B200", fontSize: 18 }} />
                    <StarBorderIcon sx={{ color: "#E9B200", fontSize: 18 }} />
                    <StarBorderIcon sx={{ color: "#E9B200", fontSize: 18 }} />
                  </Box>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />

                {/* Kolom 3 */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexGrow: { xs: 0, md: 1 }, pl: { md: 4 } }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#213F7D" }}>₦200,000.00</Typography>
                  <Typography variant="body2" color="text.secondary">00921 / Providus Bank</Typography>
                </Box>
              </Box>

              {/* Navigation Tab */}
              <Box sx={{ width: "100%", mt: "auto" }}>
                <Tabs value={0} variant="fullWidth" sx={{ minHeight: "auto", "& .MuiTabs-indicator": { backgroundColor: "#39CDCC", height: "2px" } }}>
                  <Tab label="General Details" sx={{ textTransform: "none", fontWeight: 500, fontSize: "14px", color: "#000", "&.Mui-selected": { color: "#39CDCC" } }} />
                  <Tab label="Documents" sx={{ textTransform: "none", fontWeight: 400, fontSize: "14px", color: "#000", "&.Mui-selected": { color: "#39CDCC" } }} />
                  <Tab label="Bank Details" sx={{ textTransform: "none", fontWeight: 400, fontSize: "14px", color: "#000", "&.Mui-selected": { color: "#39CDCC" } }} />
                  <Tab label="Loans" sx={{ textTransform: "none", fontWeight: 400, fontSize: "14px", color: "#000", "&.Mui-selected": { color: "#39CDCC" } }} />
                  <Tab label="Savings" sx={{ textTransform: "none", fontWeight: 400, fontSize: "14px", color: "#000", "&.Mui-selected": { color: "#39CDCC" } }} />
                  <Tab label="App and System" sx={{ textTransform: "none", fontWeight: 400, fontSize: "14px", color: "#000", "&.Mui-selected": { color: "#39CDCC" } }} />
                </Tabs>
              </Box>
            </CardContent>
          </Card>

          {/* CARD BAWAH */}
          <Card className="custom-card" sx={{ width: { xs: "100%", md: "1037px" }, minHeight: { xs: "auto", md: "910px" } }}>
          <CardContent sx={{ p: 4, height: "100%" }}>
  
  {/* ==================== COLUMN 1: Personal Information ==================== */}
  <Box className="info-section">
    <Typography variant="subtitle1" className="section-title">Personal Information</Typography>
    <Box className="grid-container-custom">
      <Box className="info-item">
        <span className="info-label">Full Name</span>
        <span className="info-value">Grace Effionm</span>
      </Box>
      <Box className="info-item">
        <span className="info-label">Phone Number</span>
        <span className="info-value">2312312</span>
      </Box>
      <Box className="info-item">
        <span className="info-label">Email Address</span>
        <span className="info-value">grace@gmail.com</span>
      </Box>
      <Box className="info-item">
        <span className="info-label">NIVN</span>
        <span className="info-value">0712129</span>
      </Box>
      <Box className="info-item">
        <span className="info-label">Gender</span>
        <span className="info-value">Female</span>
      </Box>

      {/* Baris kedua otomatis sejajar lurus ke bawah dengan kolom 1, 2, 3 di atasnya */}
      <Box className="info-item">
        <span className="info-label">Marital Status</span>
        <span className="info-value">Single</span>
      </Box>
      <Box className="info-item">
        <span className="info-label">Children</span>
        <span className="info-value">None</span>
      </Box>
      <Box className="info-item">
        <span className="info-label">Type of Residence</span>
        <span className="info-value">Parent's Apartment</span>
      </Box>
    </Box>
  </Box>

  <Divider className="custom-divider" />

  {/* ==================== COLUMN 2: Education and Employment ==================== */}
  <Box className="info-section">
    <Typography variant="subtitle1" className="section-title">Education and Employment</Typography>
    <Box className="grid-container-custom">
      <Box className="info-item">
        <span className="info-label">Level of Education</span>
        <span className="info-value">B.Sc</span>
      </Box>
      <Box className="info-item">
        <span className="info-label">Employment Status</span>
        <span className="info-value">Employed</span>
      </Box>
      <Box className="info-item">
        <span className="info-label">Sector of Employment</span>
        <span className="info-value">Fintech</span>
      </Box>
      <Box className="info-item">
        <span className="info-label">Duration of Employment</span>
        <span className="info-value">2 Years</span>
      </Box>
      
      {/* Kolom ke-5 sengaja dikosongkan biar baris 1 genap pas dengan layout */}
      <Box className="info-item"></Box> 

      <Box className="info-item">
        <span className="info-label">Office Email</span>
        <span className="info-value">grace@lendsqr.com</span>
      </Box>
      <Box className="info-item">
        <span className="info-label">Monthly Income</span>
        <span className="info-value">$200,000.00 - $400,000.00</span>
      </Box>
      <Box className="info-item">
        <span className="info-label">Loan Repayment</span>
        <span className="info-value">40.000</span>
      </Box>
    </Box>
  </Box>

  <Divider className="custom-divider" />

  {/* ==================== COLUMN 3: Socials ==================== */}
  <Box className="info-section">
    <Typography variant="subtitle1" className="section-title">Socials</Typography>
    <Box className="grid-container-custom">
      <Box className="info-item">
        <span className="info-label">Twitter</span>
        <span className="info-value">@grace_efflom</span>
      </Box>
      <Box className="info-item">
        <span className="info-label">Facebook</span>
        <span className="info-value">Grace Effiom</span>
      </Box>
      <Box className="info-item">
        <span className="info-label">Instagram</span>
        <span className="info-value">@grace_effiom</span>
      </Box>
    </Box>
  </Box>

  <Divider className="custom-divider" />

  {/* ==================== COLUMN 4: Guarantor ==================== */}
  <Box className="info-section">
    <Typography variant="subtitle1" className="section-title">Guarantor</Typography>
    <Box className="grid-container-custom">
      <Box className="info-item">
        <span className="info-label">Full Name</span>
        <span className="info-value">Debby Ogana</span>
      </Box>
      <Box className="info-item">
        <span className="info-label">Phone Number</span>
        <span className="info-value">012219789712</span>
      </Box>
      <Box className="info-item">
        <span className="info-label">Email Address</span>
        <span className="info-value">debby@gmail.com</span>
      </Box>
      <Box className="info-item">
        <span className="info-label">Relationship</span>
        <span className="info-value">Sister</span>
      </Box>
    </Box>
  </Box>

  <Divider className="custom-divider" />

  {/* ==================== COLUMN 5: Additional Guarantor ==================== */}
  <Box className="info-section">
    <Box className="grid-container-custom">
      <Box className="info-item">
        <span className="info-label">Full Name</span>
        <span className="info-value">Debby Ogana</span>
      </Box>
      <Box className="info-item">
        <span className="info-label">Phone Number</span>
        <span className="info-value">012219789712</span>
      </Box>
      <Box className="info-item">
        <span className="info-label">Email Address</span>
        <span className="info-value">debby@gmail.com</span>
      </Box>
      <Box className="info-item">
        <span className="info-label">Relationship</span>
        <span className="info-value">Sister</span>
      </Box>
    </Box>
  </Box>

</CardContent>
          </Card>

        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;