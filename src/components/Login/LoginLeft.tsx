import React from "react";
import { Box } from "@mui/material";

interface Props {
  loginImage: string;
  logo: string;
}

const LoginLeft: React.FC<Props> = ({ loginImage, logo }) => {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "50%" }, 
        display: "flex",
        flexDirection: "column", 
        justifyContent: "center",
        alignItems: "center",
        // 🚀 Menaikkan padding di desktop (md: 10) agar konten otomatis terdorong ke dalam (mengecilkan area gambar secara alami)
        p: { xs: 3, sm: 6, md: 10 }, 
        position: "relative",
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src={logo}
        alt="Logo"
        sx={{
          position: { xs: "static", md: "absolute" }, 
          top: { md: "6%" }, // 🚀 Sedikit dinaikkan agar seimbang dengan padding baru
          left: { md: "10%" },
          width: { xs: 130, sm: 150, md: 177 }, 
          height: "auto",
          mb: { xs: 4, md: 0 }, 
          zIndex: 2,
          objectFit: "contain",
          alignSelf: { xs: "flex-start", md: "auto" }, 
        }}
      />

      {/* Image Ilustrasi */}
      <Box
        component="img"
        src={loginImage}
        alt="Login"
        sx={{
          // 🚀 Di layar md (desktop), kita set ke 85% atau 90% supaya ada napas space kosong di kanan-kirinya
          width: { xs: "100%", md: "85%" },
          // 🚀 Batas maksimal lebar dipangkas (dari 651px ke 500px) agar gambar tidak terlalu raksasa
          maxWidth: { xs: "240px", sm: "380px", md: "500px" }, 
          height: "auto",
          borderRadius: "20px",
          objectFit: "contain", 
          mt: { md: 2 }, 
        }}
      />
    </Box>
  );
};

export default LoginLeft;