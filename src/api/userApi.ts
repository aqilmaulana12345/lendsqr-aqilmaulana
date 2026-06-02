import { openDB, type IDBPDatabase } from "idb";

// 1. DEFINISI TIPE DATA PENGGUNA (Lengkap & Sinkron dengan UI)
export interface UserRow {
  id: number;
  organization: string; 
  username: string;     
  nama: string;         // Ditambahkan kembali untuk nama lengkap display
  email: string;
  phoneNumber: string;  
  dateJoined: string;   
  status: string;
}

const DB_NAME = "LendsqrDashboardDB";
const STORE_NAME = "users";
const DB_VERSION = 3; // Naikkan versi DB agar skema baru ter-apply otomatis

// 2. INISIALISASI DATABASE
const initDB = async (): Promise<IDBPDatabase> => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Jika object store sudah ada, hapus dulu untuk memastikan perubahan skema berjalan lancar
      if (db.objectStoreNames.contains(STORE_NAME)) {
        db.deleteObjectStore(STORE_NAME);
      }
      db.createObjectStore(STORE_NAME, { keyPath: "id" });
    },
  });
};

// 3. GENERATOR 500 DATA OTOMATIS
const generate500Users = (): UserRow[] => {
  const firstNames = [
    "Andi", "Budi", "Citra", "Dewi", "Eko", "Fajar", "Gita", "Hendra", "Indah", "Joko",
    "Kevin", "Lestari", "Mahendra", "Nadia", "Oni", "Putri", "Rian", "Siti", "Taufik", "Wulan"
  ];
  const lastNames = [
    "Wijaya", "Santoso", "Purnama", "Prasetyo", "Kurniawan", "Hidayat", "Saputra", "Utami", "Nugroho", "Wibowo",
    "Siregar", "Setiawan", "Ramadhan", "Pratama", "Kusuma", "Gunawan", "Sutrisno", "Pambudi", "Laksana", "Subagjo"
  ];
  const organizations = ["Lendsqr", "Irenelbl", "Google", "Microsoft", "Meta", "Netflix", "Amazon"];
  const statuses = ["active", "pending", "inactive", "blacklisted"];

  const users: UserRow[] = [];

  for (let i = 1; i <= 500; i++) {
    const fIdx = (i * 7) % firstNames.length;
    const lIdx = (i * 13) % lastNames.length;
    
    const fName = firstNames[fIdx]!;
    const lName = lastNames[lIdx]!;
    
    // Set properti data sesuai instruksi
    const organization = organizations[i % organizations.length]!;
    const nama = `${fName} ${lName}`; // Nama asli tampilan teks biasa
    const username = `${fName.toLowerCase()}_${lName.toLowerCase()}${i}`; // Username format web
    const email = `${fName.toLowerCase()}.${lName.toLowerCase()}${i}@lendsqr-mock.com`;
    const phoneNumber = `08${Math.floor(120000000 + Math.random() * 870000000)}`;
    const status = statuses[(i * 3) % statuses.length]!;
    
    // Rentang tanggal join tahun 2026
    const day = String((i % 28) + 1).padStart(2, "0");
    const month = String((i % 5) + 1).padStart(2, "0"); 
    const dateJoined = `2026-${month}-${day}`;

    users.push({ 
      id: i, 
      organization, 
      username, 
      nama,
      email, 
      phoneNumber, 
      status, 
      dateJoined 
    });
  }

  return users;
};

// 4. FUNGSI API: GET ALL DATA
export const getUsersApi = async (): Promise<UserRow[]> => {
  const db = await initDB();
  const data = await db.getAll(STORE_NAME) as UserRow[];

  if (data.length === 0) {
    console.log("IndexedDB kosong, otomatis seeding 500 data baru...");
    return await resetAndGenerate500UsersApi();
  }

  return data;
};

// 5. FUNGSI API: UPSERT DATA
export const saveUserApi = async (user: UserRow): Promise<void> => {
  const db = await initDB();
  await db.put(STORE_NAME, user);
};

// 6. FUNGSI API: RE-SEED DATA
export const resetAndGenerate500UsersApi = async (): Promise<UserRow[]> => {
  const db = await initDB();
  
  await db.clear(STORE_NAME);
  const initialRows = generate500Users();

  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  
  for (const row of initialRows) {
    await store.put(row);
  }
  await tx.done;

  console.log("Database berhasil di-reset dengan skema kolom yang baru!");
  return initialRows;
};