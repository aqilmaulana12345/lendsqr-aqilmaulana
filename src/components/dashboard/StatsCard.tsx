import { Paper, Typography, Box } from "@mui/material";

interface StatsCardProps {
  icon: string; // Menerima hasil import gambar / URL string
  value: string;
  subtitle: string; 
  color?: string; // Tetap opsional jika ingin custom dari luar
  valueSize?: any;   
  subtitleSize?: any;
}

const StatsCard = ({
  icon,
  value,
  subtitle,
  valueSize,
  subtitleSize,
}: StatsCardProps) => {
  return (
    <Paper
      sx={{
        p: 2.5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end", // Membawa semua konten ke arah bawah kartu
        alignItems: "flex-start",    // Tetap rata di pojok kiri
        textAlign: "left",           
        borderRadius: 3,          
        width: "220px",           
        height: "160px",          
        boxSizing: "border-box",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)", 
        transition: "transform 0.2s ease-in-out",
        
        // POKOK PERUBAHAN ALA SCSS:
        // Set font global di level parent agar semua teks di dalamnya otomatis memakai Work Sans
        fontFamily: "'Work Sans', sans-serif", 

        "&:hover": {
          transform: "translateY(-4px)", 
        },

        // Anda juga bisa nge-drop style custom anak di sini layaknya nesting SCSS jika mau,
        // tapi menaruhnya langsung di properti bawaan inline sx jauh lebih clean di MUI.
      }}
    >
      {/* Box Pembungkus Gambar Ikon */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
        <Box 
          component="img"
          src={icon} 
          alt="stats-icon"
          sx={{ 
            width: "40px", 
            height: "40px", 
            objectFit: "contain" 
          }} 
        />
      </Box>

      {/* Teks Subtitle & Angka */}
      <Box sx={{ width: "100%" }}>
        {/* Subtitle di atas */}
        <Typography 
          sx={{ 
            fontFamily: "inherit", // Otomatis warisin Work Sans dari Paper
            color: "#545F7D", 
            fontWeight: "600",
            fontSize: subtitleSize || "0.65rem",
            whiteSpace: "nowrap" 
          }}
        >
          {subtitle}
        </Typography>

        {/* Value (Angka) di bawah */}
        <Typography 
          sx={{ 
            fontFamily: "inherit", // Otomatis warisin Work Sans dari Paper
            fontWeight: "bold", 
            color: "#213F7D", 
            fontSize: valueSize || "1.4rem", 
            lineHeight: 1.2,
            mt: 0.5 
          }}
        >
          {value}
        </Typography>
      </Box>
    </Paper>
  );
};

export default StatsCard;