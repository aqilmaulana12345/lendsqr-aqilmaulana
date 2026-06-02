import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import LoginForm from "./LoginForm.js";

const LoginRight: React.FC = () => {
  return (
    <Box
      sx={{
        // 🚀 HP: Lebar penuh 100%, Desktop: Setengah layar 50%
        width: { xs: "100%", md: "50%" }, 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        fontFamily: '"Avenir Next", sans-serif',
        // 🚀 Tambahkan padding vertikal di HP agar konten tidak nempel ke atas/bawah layar saat di-scroll
        py: { xs: 4, md: 0 }, 
      }}
    >
      <Paper 
        elevation={0} 
        sx={{ 
          width: "100%", 
          maxWidth: "400px", 
          // 🚀 HP: Padding lebih kecil (3), Desktop: Padding lega (5)
          p: { xs: 3, sm: 4, md: 5 }, 
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: "bold", 
            mb: 1, 
            fontFamily: '"Avenir Next", sans-serif',
            // 🚀 Ukuran font teks utama mengecil sedikit di HP agar hemat space
            fontSize: { xs: "28px", md: "34px" } 
          }}
        >
          Welcome
        </Typography>

        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            mb: { xs: 3, md: 4 }, // 🚀 Jarak margin bottom mengecil di HP
            fontFamily: '"Avenir Next", sans-serif',
            fontSize: { xs: "14px", md: "16px" }
          }}
        >
          Enter Details to Login
        </Typography>

        <LoginForm />
      </Paper>
    </Box>
  );
};

export default LoginRight;