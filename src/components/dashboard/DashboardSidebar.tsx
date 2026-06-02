import React from "react";
import {
  Box,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

// 1. SWITCH ORGANIZATION & DASHBOARD 
import SwicthIcon from "../../assets/images/icon-navbar/Switch Organization.png"; 
import DashboardIcon from "../../assets/images/icon-navbar/Dashboard.png"; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// 2. Category: CUSTOMERS
import UsersIcon from "../../assets/images/icon-navbar/Users.png";
import GuarantorsIcon from "../../assets/images/icon-navbar/Guarantors.png";
import LoansIcon from "../../assets/images/icon-navbar/Loans.png";
import DecisionModelsIcon from "../../assets/images/icon-navbar/Decision Models.png";
import SavingsIcon from "../../assets/images/icon-navbar/Savings.png";
import LoanRequestIcon from "../../assets/images/icon-navbar/Loan Request.png";
import WhitelistIcon from "../../assets/images/icon-navbar/Whitelist.png";
import KarmaIcon from "../../assets/images/icon-navbar/Karma.png";

// 3. Category: BUSINESS
import OrganizationIcon from "../../assets/images/icon-navbar/Organizations.png";
import LoanProductsIcon from "../../assets/images/icon-navbar/Loan Request2.png"; 
import SavingsProductsIcon from "../../assets/images/icon-navbar/Savings and Products.png";
import Fees from "../../assets/images/icon-navbar/Fees and Change.png";
import TransactionsIcon from "../../assets/images/icon-navbar/Transactions.png";
import ServicesIcon from "../../assets/images/icon-navbar/Services.png";
import ServicesAccountIcon from "../../assets/images/icon-navbar/Services Account.png";
import SettlementsIcon from "../../assets/images/icon-navbar/Settlements.png";
import ReportsIcon from "../../assets/images/icon-navbar/Reports.png";

// 4. Category: SETTINGS
import PreferenceIcon from "../../assets/images/icon-navbar/Preferences.png";
import Fees2 from "../../assets/images/icon-navbar/Fees and Pricing.png";
import AuditsIcon from "../../assets/images/icon-navbar/Audit Logs.png";
import SystemIcon from "../../assets/images/icon-navbar/System Manages.png";

// 5. LOGOUT 
import LogoutIcon from "../../assets/images/icon-navbar/Logout.png";

interface Props {
  handleLogout: () => void;
  handleDrawerToggle?: () => void;
}

interface MenuItemType {
  text: string;
  icon?: string;
}

interface MenuGroupType {
  category: string;
  items: MenuItemType[];
}

const menuGroups: MenuGroupType[] = [
  {
    category: "Customers",
    items: [
      { text: "Users", icon: UsersIcon },
      { text: "Guarantors", icon: GuarantorsIcon },
      { text: "Loans", icon: LoansIcon },
      { text: "Decision Models", icon: DecisionModelsIcon },
      { text: "Savings", icon: SavingsIcon },
      { text: "Loan Request", icon: LoanRequestIcon },
      { text: "Whitelist", icon: WhitelistIcon },
      { text: "Karma", icon: KarmaIcon },
    ],
  },
  {
    category: "Business",
    items: [
      { text: "Organization", icon: OrganizationIcon },
      { text: "Loan Products", icon: LoanProductsIcon },
      { text: "Savings Products", icon: SavingsProductsIcon },
      { text: "Fees and Change", icon: Fees },
      { text: "Transactions", icon: TransactionsIcon },
      { text: "Services", icon: ServicesIcon },
      { text: "Services Account", icon: ServicesAccountIcon },
      { text: "Settlements", icon: SettlementsIcon },
      { text: "Reports", icon: ReportsIcon },
    ],
  },
  {
    category: "Settings",
    items: [
      { text: "Preferences" , icon: PreferenceIcon},
      { text: "Fees and Pricing" , icon: Fees2 },
      { text: "Audits Logs" , icon: AuditsIcon },
      { text: "Systems Messages" , icon: SystemIcon },
    ],
  },
];

const DashboardSidebar = ({ handleLogout, handleDrawerToggle }: Props) => {
  
  const baseTextStyle = {
    fontFamily: "'Work Sans', sans-serif",
    color: "#213F7D",
    fontSize: "16px",
    fontWeight: 400,
  };

  return (
    <Box
      sx={{
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* TOOLBAR LOGO */}
      <Toolbar
        sx={{
          backgroundColor: "#39CDCC",
          color: "white",
          display: { xs: "flex", sm: "none" },
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", fontFamily: "'Work Sans', sans-serif" }}>
          Admin Panel
        </Typography>
      </Toolbar>

      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <Divider />
      </Box>

      {/* ==================================================== */}
      {/* 1. SWITCH ORGANIZATION                               */}
      {/* ==================================================== */}
      <Box 
        sx={{ 
          px: { xs: 2, sm: 3 }, 
          pt: { xs: 8, sm: 11, md: 3 }, 
          pb: 0.5,
        
          display: "flex",       
          alignItems: "center",  
          cursor: "pointer", 
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* ICON UTAMA (KIRI) */}
        <Box
          component="img"
          src={SwicthIcon}
          alt="Switch-Organization-icon"
          sx={{
            width: "16px",
            height: "16px",
            marginRight: "12px", 
            objectFit: "contain",
            flexShrink: 0, 
          }}
        />

      
<Box 
  sx={{ 
    display: "flex", 
    alignItems: "center", 
    gap: "6px",

    width: "max-content", 
  }}
>
  <Typography 
    sx={{ 
      ...baseTextStyle, 
      fontSize: "16px",   
      fontWeight: 400,    
      whiteSpace: "nowrap",
      overflow: "visible",   
      textOverflow: "unset", 
    }}
  >
    Switch Organization
  </Typography>

  <ExpandMoreIcon 
    sx={{ 
      color: "#213F7D", 
      fontSize: "24px",
      flexShrink: 0, 
    }} 
  />
</Box>
      </Box>

{/* 2. MAIN MENU: DASHBOARD (STANDALONE) */}
      <Box sx={{ px: 1, mb: 2, mt: 1 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              if (handleDrawerToggle) handleDrawerToggle();
            }}
            sx={{
              py: 0.4, 
              px: 2,
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              "&:hover": { backgroundColor: "#f8fafc" }
            }}
          >
            <Box
              component="img"
              src={DashboardIcon}
              alt="Dashboard-icon"
              sx={{
                width: "16px",
                height: "16px",
                marginRight: "12px",
                objectFit: "contain",
              }}
            />
            <ListItemText
              primary={
                <Typography sx={{ ...baseTextStyle, fontWeight: 500 }}>
                  Dashboard
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </Box>

      {/* ==================================================== */}
      {/* 3. MENU CATEGORY GROUPS (CUSTOMERS, ETC.) */}
      {/* ==================================================== */}
      <Box sx={{ flexGrow: 1, px: 1 }}>
        {menuGroups.map((group) => (
          <Box key={group.category} sx={{ mb: 1.5 }}>
            
            {/* Judul Kategori */}
            <Box sx={{ px: 2, pt: 1, pb: 0.5 }}> 
              <Typography
                variant="subtitle2"
                sx={{
                  ...baseTextStyle,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontSize: "13px", 
                  opacity: 0.7
                }}
              >
                {group.category}
              </Typography>
            </Box>

            <List disablePadding>
              {group.items.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      if (handleDrawerToggle) handleDrawerToggle();
                    }}
                    sx={{
                      py: 0.4, 
                      px: 2,
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      "&:hover": {
                        backgroundColor: "#f8fafc",
                      }
                    }}
                  >
                    {item.icon && (
                      <Box
                        component="img"
                        src={item.icon}
                        alt={`${item.text}-icon`}
                        sx={{
                          width: "16px",      
                          height: "16px",      
                          marginRight: "12px", 
                          objectFit: "contain",
                        }}
                      />
                    )}

                    <ListItemText
                      primary={
                        <Typography sx={baseTextStyle}>
                          {item.text}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 0.5 }} /> 

      {/* ==================================================== */}
      {/* 4. LOGOUT                                            */}
      {/* ==================================================== */}
      <List sx={{ px: 1, pb: 1 }}> 
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              if (handleDrawerToggle) handleDrawerToggle();
              handleLogout();
            }}
            sx={{
              py: 0.4, 
              px: 2,
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start", 
              gap: "12px" 
            }}
          >
            <Box
              component="img"
              src={LogoutIcon} 
              alt="Logout"
              sx={{
                width: 16,  
                height: 16, 
                objectFit: "contain",
                display: "block"
              }}
            />

            <Typography
              sx={{
                fontFamily: "'Work Sans', sans-serif",
                color: "error.main",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: 1 
              }}
            >
              Logout
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default DashboardSidebar;