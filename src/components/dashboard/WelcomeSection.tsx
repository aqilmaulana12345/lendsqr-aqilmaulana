import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem,
  InputBase,
  Select,
  Button,
  TablePagination,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Pagination from "@mui/material/Pagination"; // Pastikan import ini ditambahkan di atas file

import { getUsersApi, type UserRow } from "../../api/userApi.js";
import FilterImage from "../../assets/images/filter.png";
import ActivateImage from "../../assets/images/activate.png";
import BlacklistImage from "../../assets/images/blacklist.png";
import ViewImage from "../../assets/images/view.png";

const WelcomeSection = () => {
  const [rows, setRows] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // State Management Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // State Input Filter
  const [filters, setFilters] = useState({
    organization: "",
    username: "",
    email: "",
    phoneNumber: "",
    dateJoined: "",
    status: "",
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(null);

  const [actionAnchorEl, setActionAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsersApi();
        setRows(data);
      } catch (error) {
        console.error("Gagal memuat data dari IndexedDB:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, column: string) => {
    setAnchorEl(event.currentTarget);
    setActiveFilterColumn(column);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveFilterColumn(null);
  };

  const handleOpenActionMenu = (event: React.MouseEvent<HTMLButtonElement>, id: string | number) => {
    setActionAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleCloseActionMenu = () => {
    setActionAnchorEl(null);
    setSelectedRowId(null);
  };

  // 1. HELPER UNTUK MENYERAGAMKAN STATUS INDONESIA / INGGRIS KE STANDAR LOWERCASE
  const normalizeStatus = (status: string = "") => {
    const s = status.toLowerCase().trim();
    if (s === "aktif" || s === "active") return "active";
    if (s === "pending") return "pending";
    if (s === "nonaktif" || s === "inactive") return "inactive";
    if (s === "blacklist") return "blacklist";
    return s;
  };

  // Logika Filter Data (Menggunakan Normalisasi agar pencarian presisi)
  const filteredRows = rows.filter((row) => {
    const rowStatusNormalized = normalizeStatus(row.status);
    const filterStatusNormalized = normalizeStatus(filters.status);

    return (
      (row.organization?.toLowerCase() || "").includes(filters.organization.toLowerCase()) &&
      (row.username?.toLowerCase() || "").includes(filters.username.toLowerCase()) &&
      (row.email?.toLowerCase() || "").includes(filters.email.toLowerCase()) &&
      (row.phoneNumber?.toLowerCase() || "").includes(filters.phoneNumber.toLowerCase()) &&
      (row.dateJoined?.toLowerCase() || "").includes(filters.dateJoined.toLowerCase()) &&
      (rowStatusNormalized).includes(filterStatusNormalized)
    );
  });

  const displayedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const cellStyle = {
    fontFamily: "'Work Sans', sans-serif",
    fontWeight: 400,
    fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem" },
    p: { xs: "8px 6px", sm: "12px 10px", md: "16px" },
    whiteSpace: "nowrap",
  };

  const headers = [
    { label: "Organization", key: "organization" },
    { label: "Username", key: "username" },
    { label: "Email", key: "email" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Date Joined", key: "dateJoined" },
    { label: "Status", key: "status" },
  ];

  // 2. LOGIKA WARNA DAN TEKS DISESUAIKAN (Mendukung fallback multi-bahasa)
  const getStatusBadgeStyles = (status: string = "") => {
    const s = normalizeStatus(status);
    if (s === "active") return { bg: "#f3fbf7", color: "#39CD62", label: "Active" };
    if (s === "pending") return { bg: "#fdf7ed", color: "#E9B200", label: "Pending" };
    if (s === "inactive") return { bg: "#f5f5f7", color: "#545F7D", label: "Inactive" };
    if (s === "blacklist") return { bg: "#fcebeb", color: "#9E0000", label: "Blacklisted" };
    return { bg: "#f5f5f7", color: "#545F7D", label: status };
  };

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: "12px",
          border: "1px solid #e0e0e0",
          overflowX: "auto",
          maxWidth: "100%",
        }}
      >
        <Table sx={{ minWidth: { xs: 700, sm: 900, md: 1000 } }} aria-label="user table">
          <TableHead sx={{ backgroundColor: "#f4f6f8" }}>
            <TableRow>
              {headers.map((head) => (
                <TableCell 
                  key={head.label} 
                  sx={{ ...cellStyle, fontWeight: 600, color: "#4a5568" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <span>{head.label}</span>
                    <Box
                      component="img"
                      src={FilterImage}
                      alt="filter icon"
                      sx={{
                        width: { xs: "12px", sm: "14px" },
                        height: "auto",
                        cursor: "pointer",
                        transition: "opacity 0.2s",
                        opacity: filters[head.key as keyof typeof filters] ? 1 : 0.5,
                        "&:hover": { opacity: 0.9 },
                      }}
                      onClick={(e) => handleOpenMenu(e, head.key)}
                    />
                  </Box>
                </TableCell>
              ))}
              <TableCell sx={{ ...cellStyle, width: "50px" }} />
            </TableRow>
          </TableHead>
    
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ ...cellStyle, py: 6, color: "text.secondary" }}>
                  Memuat data dari database lokal...
                </TableCell>
              </TableRow>
            ) : displayedRows.length > 0 ? (
              displayedRows.map((row) => {
                const badge = getStatusBadgeStyles(row.status);
                return (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": { backgroundColor: "#f8fafc" },
                    }}
                  >
                    <TableCell sx={{ ...cellStyle, fontWeight: 700, color: "#2d3748" }}>
                      {row.organization}
                    </TableCell>
                    <TableCell sx={cellStyle}>{row.username}</TableCell>
                    <TableCell sx={cellStyle}>{row.email}</TableCell>
                    <TableCell sx={cellStyle}>{row.phoneNumber}</TableCell>
                    <TableCell sx={cellStyle}>{row.dateJoined}</TableCell>
                    <TableCell sx={cellStyle}>
                      <Box
                        component="span"
                        sx={{
                          px: { xs: 1, sm: 1.5 },
                          py: 0.5,
                          borderRadius: "100px",
                          fontSize: { xs: "0.65rem", sm: "0.75rem" },
                          fontWeight: 500,
                          fontFamily: "'Work Sans', sans-serif",
                          display: "inline-block",
                          backgroundColor: badge.bg,
                          color: badge.color,
                        }}
                      >
                        {badge.label}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ ...cellStyle, p: "4px" }} align="center">
                      <IconButton size="small" onClick={(e) => handleOpenActionMenu(e, row.id)}>
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ ...cellStyle, py: 6, color: "text.secondary" }}>
                  Tidak ada data pengguna yang cocok dengan filter kamu.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    
      <TablePagination
  rowsPerPageOptions={[10, 25, 50]}
  component="div"
  count={filteredRows.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
  labelRowsPerPage="Showing:"
  
  // --- HANYA MENAMPILKAN "out of [total]" ---
  labelDisplayedRows={({ count }) => {
    return `out of ${count}`;
  }}

  // --- MENGGANTI TOMBOL PANAH MENJADI ANGKA 1, 2, 3 ---
  ActionsComponent={({ count, page, rowsPerPage, onPageChange }) => {
    const pageCount = Math.ceil(count / rowsPerPage);
    return (
      <Pagination
        count={pageCount}
        page={page + 1} // Di MUI Pagination halaman dimulai dari 1, sedangkan TablePagination dimulai dari 0
        onChange={(_, newPage) => onPageChange(null as any, newPage - 1)}
        shape="rounded"
        variant="outlined"
        sx={{
          ml: 2,
          // Mengatur gaya kotak untuk setiap tombol angka dan panah
          "& .MuiPaginationItem-root": {
            fontFamily: "'Work Sans', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 600,
            borderRadius: "8px",
            backgroundColor: "#213F7D1A", // Background sesuai request
            border: "1px solid #e0e0e0",
            color: "#213F7D",
            margin: "0 3px",
            padding: "4px 8px",
            "&:hover": {
              backgroundColor: "#213F7D2E",
              borderColor: "#b0b0b0",
            },
            // Gaya saat tombol angka tersebut aktif/diklik (Halaman yang sedang dibuka)
            "&.Mui-selected": {
              backgroundColor: "#213F7D", // Warna solid untuk menandakan halaman aktif
              color: "#ffffff",
              borderColor: "#213F7D",
              "&:hover": {
                backgroundColor: "#162e5c",
              },
            },
            // Gaya saat tombol mati/disabled
            "&.Mui-disabled": {
              backgroundColor: "#f5f5f5",
              color: "#a0aec0",
              border: "1px solid #e2e8f0",
              opacity: 0.6,
            },
          },
        }}
      />
    );
  }}
  // ----------------------------------------------------

  sx={{
    borderTop: "1px solid #e0e0e0",
    fontFamily: "'Work Sans', sans-serif",
    "& .MuiTablePagination-toolbar": { 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      px: 2 
    },
    "& .MuiTablePagination-spacer": { display: "none" },
    "& .MuiTablePagination-selectLabel": { 
      fontFamily: "'Work Sans', sans-serif",
      color: "#545F7D",
      fontSize: "0.875rem",
    },
    
    // Kotak untuk Select Dropdown (Showing)
    "& .MuiInputBase-root": {
      fontFamily: "'Work Sans', sans-serif",
      borderRadius: "8px",
      backgroundColor: "#213F7D1A",
      marginLeft: "8px",
      marginRight: "24px",
      "& .MuiSelect-select": {
        paddingTop: "6px",
        paddingBottom: "6px",
        paddingLeft: "12px",
        paddingRight: "32px !important",
        fontSize: "0.875rem",
        fontWeight: 600,
        color: "#21407e",
      },
      "&:hover": {
        borderColor: "#b0b0b0",
      },
      "&.Mui-focused": {
        borderColor: "#39CDCC",
      }
    },

    "& .MuiTablePagination-displayedRows": { 
      fontFamily: "'Work Sans', sans-serif", 
      marginRight: "auto",
      color: "#545F7D",
      fontSize: "0.875rem",
    },
    
    // Sembunyikan pembungkus bawaan karena sudah diganti Pagination baru di atas
    "& .MuiTablePagination-actions": { 
      marginLeft: 0,
    },
  }}
/>
    
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        elevation={3}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        disableAutoFocusItem
        slotProps={{
          paper: { sx: { p: 2, borderRadius: "10px", border: "1px solid #e0e0e0", minWidth: "260px", mt: 1 } },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Filter Organization */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography sx={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.85rem", fontWeight: 500, color: "#4a5568" }}>
              Organization
            </Typography>
            <Select
              fullWidth
              size="small"
              value={filters.organization}
              onChange={(e) => { setFilters(prev => ({ ...prev, organization: e.target.value })); setPage(0); }}
              displayEmpty
              sx={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.8rem", borderRadius: "6px" }}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="lendsqr">Lendsqr</MenuItem>
              <MenuItem value="irenelbl">Irenelbl</MenuItem>
              <MenuItem value="google">Google</MenuItem>
              <MenuItem value="microsoft">Microsoft</MenuItem>
            </Select>
          </Box>

          {/* Filter Username */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography sx={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.85rem", fontWeight: 500, color: "#4a5568" }}>Username</Typography>
            <InputBase
              type="text"
              placeholder="User"
              value={filters.username}
              onChange={(e) => { setFilters(prev => ({ ...prev, username: e.target.value })); setPage(0); }}
              sx={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.8rem", width: "100%", px: 1, py: 0.5, border: "1px solid #ccc", borderRadius: "6px" }}
            />
          </Box>

          {/* Filter Email */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography sx={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.85rem", fontWeight: 500, color: "#4a5568" }}>Email</Typography>
            <InputBase
              type="email"
              placeholder="Email"
              value={filters.email}
              onChange={(e) => { setFilters(prev => ({ ...prev, email: e.target.value })); setPage(0); }}
              sx={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.8rem", width: "100%", px: 1, py: 0.5, border: "1px solid #ccc", borderRadius: "6px" }}
            />
          </Box>

          {/* Filter Date */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography sx={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.85rem", fontWeight: 500, color: "#4a5568" }}>Date</Typography>
            <InputBase
              type="date"
              value={filters.dateJoined}
              onChange={(e) => { setFilters(prev => ({ ...prev, dateJoined: e.target.value })); setPage(0); }}
              sx={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.8rem", width: "100%", px: 1, py: 0.5, border: "1px solid #ccc", borderRadius: "6px" }}
            />
          </Box>

          {/* Filter Phone */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography sx={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.85rem", fontWeight: 500, color: "#4a5568" }}>Phone Number</Typography>
            <InputBase
              type="tel"
              placeholder="Phone Number"
              value={filters.phoneNumber}
              onChange={(e) => { setFilters(prev => ({ ...prev, phoneNumber: e.target.value })); setPage(0); }}
              sx={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.8rem", width: "100%", px: 1, py: 0.5, border: "1px solid #ccc", borderRadius: "6px" }}
            />
          </Box>

          {/* Filter Status (Value menggunakan format standar lowercase) */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography sx={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.85rem", fontWeight: 500, color: "#4a5568" }}>
              Status
            </Typography>
            <Select
              fullWidth
              size="small"
              value={filters.status}
              onChange={(e) => {
                setFilters(prev => ({ ...prev, status: e.target.value }));
                setPage(0);
              }}
              displayEmpty
              sx={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.8rem", borderRadius: "6px" }}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="blacklisted">Blacklisted</MenuItem>
            </Select>
          </Box>

          {/* Tombol Reset & Filter */}
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1.5, mt: 1 }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setFilters({ organization: "", username: "", email: "", phoneNumber: "", dateJoined: "", status: "" });
                setPage(0);
                handleCloseMenu();
              }}
              sx={{ 
                fontFamily: "'Work Sans', sans-serif", fontSize: "0.75rem", textTransform: "none", flex: 1, borderRadius: "6px",
                backgroundColor: "#ffffff", color: "#4a5568", border: "1px solid #ccc", fontWeight: 500,
                "&:hover": { backgroundColor: "#f7fafc", border: "1px solid #a0aec0" }
              }}
            >
              Reset
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={handleCloseMenu}
              sx={{ 
                fontFamily: "'Work Sans', sans-serif", fontSize: "0.75rem", textTransform: "none", flex: 1, boxShadow: "none", borderRadius: "6px",
                backgroundColor: "#39CDCC", color: "#ffffff", fontWeight: 500,
                "&:hover": { backgroundColor: "#2db1b0", boxShadow: "none" }
              }}
            >
              Filter
            </Button>
          </Box>
        </Box>
      </Menu>

      {/* Dropdown Menu Tiga Titik */}
      <Menu
        anchorEl={actionAnchorEl}
        open={Boolean(actionAnchorEl)}
        onClose={handleCloseActionMenu}
        elevation={2}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleCloseActionMenu} sx={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.875rem", color: "#545F7D", py: 1, display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box component="img" src={ViewImage} alt="view" sx={{ width: "16px", height: "16px", objectFit: "contain" }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleCloseActionMenu} sx={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.875rem", color: "#545F7D", py: 1, display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box component="img" src={BlacklistImage} alt="blacklist" sx={{ width: "16px", height: "16px", objectFit: "contain" }} />
          Blacklist User
        </MenuItem>
        <MenuItem onClick={handleCloseActionMenu} sx={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.875rem", color: "#545F7D", py: 1, display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box component="img" src={ActivateImage} alt="activate" sx={{ width: "16px", height: "16px", objectFit: "contain" }} />
          Activate User
        </MenuItem>
      </Menu>
    </>
  );
};

export default WelcomeSection;