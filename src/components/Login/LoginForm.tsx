import React, { useState } from "react";
import { Box, Button, TextField, Typography, InputAdornment, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    if (email && password) {
      navigate("/dashboard");
    } else {
      alert("Fill it in with a random email and password. ");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2, md: 2.5 }, 
        width: "100%",
        maxWidth: "447px",
        mx: "auto",
        backgroundColor: "#ffffff",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      {/* Input Email */}
      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        slotProps={{
          input: {
            sx: {
              width: "100%",
              height: "50px",
              borderRadius: "5px",
              fontFamily: '"Avenir Next", sans-serif',
              fontSize: { xs: "14px", md: "15px" }, 
              backgroundColor: "#ffffff",
            },
          },
          inputLabel: {
            sx: { 
              fontFamily: '"Avenir Next", sans-serif',
              fontSize: { xs: "13px", md: "14px" }, // 🚀 Teks label lebih kecil di HP
              lineHeight: "1.2",
            },
          },
        }}
      />

      {/* Input Password dengan Tombol SHOW */}
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        slotProps={{
          input: {
            sx: {
              width: "100%",
              height: "50px",
              borderRadius: "5px",
              fontFamily: '"Avenir Next", sans-serif',
              fontSize: { xs: "14px", md: "15px" }, // 🚀 Teks input lebih kecil di HP
              backgroundColor: "#ffffff",
            },
            endAdornment: (
              <InputAdornment position="end">
                <ButtonBase
                  onClick={handleClickShowPassword}
                  sx={{
                    fontFamily: '"Avenir Next", sans-serif',
                    fontWeight: "700",
                    fontSize: { xs: "11px", md: "12px" }, // 🚀 Tulisan SHOW/HIDE mengecil di HP
                    color: "#39CDCC",
                    letterSpacing: "0.5px",
                    padding: "4px 6px",
                    borderRadius: "4px",
                    "&:hover": { backgroundColor: "rgba(57, 205, 204, 0.08)" },
                  }}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </ButtonBase>
              </InputAdornment>
            ),
          },
          inputLabel: {
            sx: { 
              fontFamily: '"Avenir Next", sans-serif',
              fontSize: { xs: "13px", md: "14px" }, // 🚀 Teks label lebih kecil di HP
              lineHeight: "1.2",
            },
          },
        }}
      />

      {/* Forgot Password */}
      <Typography 
        sx={{ 
          color: "#39CDCC", 
          cursor: "pointer",
          fontFamily: '"Avenir Next", sans-serif',
          fontSize: { xs: "11px", md: "12px" }, // 🚀 Tulisan Forgot Password mengecil di HP agar tidak meluber
          fontWeight: "600",
          letterSpacing: "0.5px",
          alignSelf: "flex-start",
          mt: -0.5,
          "&:hover": { textDecoration: "underline" }
        }}
      >
        Forgot Password?
      </Typography>

      {/* Tombol Login */}
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{
          width: "100%",
          height: "50px",
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontWeight: "700",
          borderRadius: "5px",
          backgroundColor: "#39CDCC",
          fontFamily: '"Avenir Next", sans-serif',
          fontSize: { xs: "13px", md: "14px" }, // 🚀 Teks tombol LOGIN menyesuaikan ukuran layar
          boxShadow: "none",
          mt: { xs: 0.5, md: 1 },
          "&:hover": {
            backgroundColor: "#2eb8b7",
            boxShadow: "none",
          }
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;