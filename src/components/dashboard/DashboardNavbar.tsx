import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  InputBase,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import Logo1 from "../../assets/images/Group.svg"; 

interface Props {
  anchorEl: HTMLElement | null;
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleProfileMenuClose: () => void;
  handleLogout: () => void;
}

const DashboardNavbar = ({
  anchorEl,
  handleProfileMenuOpen,
  handleProfileMenuClose,
  handleLogout,
}: Props) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        color: "#333",
        boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
        zIndex: (theme) => theme.zIndex.drawer + 1, 
      }}
    >
    <Toolbar
  sx={{
    justifyContent: "space-between",
    height: { xs: "70px", sm: "30px" },
    py: { xs: 0, sm: 1 }, 
    px: { xs: 1, sm: 3 }, 
  }}
>
        {/* LEFT: Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src={Logo1}
            alt="Lendsqr Logo"
            sx={{
              height: { xs: "16px", sm: "28px" }, 
              width: "auto", 
              objectFit: "contain",
              display: "block"
            }}
          />
        </Box>


        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: { xs: "100%", md: "35%" }, 
            mx: { xs: 1, md: 0 }, 
            border: "1px solid #dcdcdc",
            borderRadius: "6px", 
            overflow: "hidden",
            height: { xs: "30px", md: "42px" }, 
          }}
        >
          <InputBase
            placeholder={window.innerWidth < 600 ? "Search..." : "Search for anything..."}
            sx={{
              px: 1, 
              fontSize: { xs: "12px", md: "16px" }, 
              flex: 1,
            }}
          />

          <IconButton
            sx={{
              bgcolor: "#39CDCC",
              color: "#fff",
              borderRadius: 0,
              height: "100%",
              px: { xs: 1, md: 2 },
              "&:hover": {
                bgcolor: "#2fb5b4",
              },
            }}
          >
            <SearchIcon sx={{ fontSize: { xs: 16, md: 24 } }} />
          </IconButton>
        </Box>

        {/* RIGHT: Docs, Notif, Profile */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 3 }, 
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              cursor: "pointer",
              textDecoration: "underline",
              fontWeight: 500,
              display: { xs: "none", sm: "block" }, 
            }}
          >
            Docs
          </Typography>

          <IconButton color="inherit" sx={{ p: { xs: 0.25, sm: 1 } }}>
            <NotificationsIcon sx={{ fontSize: { xs: 18, sm: 24 } }} />
          </IconButton>

          <IconButton
            onClick={handleProfileMenuOpen}
            sx={{ p: 0 }}
          >
            <Avatar
              src="https://i.pravatar.cc/150?img=12"
              alt="Profile"
              sx={{ width: { xs: 26, sm: 40 }, height: { xs: 26, sm: 40 } }} 
            />
          </IconButton>

          <Typography
            sx={{
              fontWeight: 600,
              display: { xs: "none", sm: "block" },
            }}
          >
            Adedeji
          </Typography>

          {/* Dropdown Menu Profile */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            disableScrollLock
          >
            <MenuItem onClick={handleProfileMenuClose} sx={{ display: { xs: "block", sm: "none" } }}>
              Docs
            </MenuItem>
            
            <MenuItem onClick={handleProfileMenuClose}>
              Profile
            </MenuItem>

            <MenuItem
              onClick={handleLogout}
              sx={{ color: "error.main" }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;