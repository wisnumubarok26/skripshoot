import express from "express";
import mysql from "mysql";
import cors from "cors";
import RelawanRoute from "./routes/RelawanRoute.js";
import KriteriaRoute from "./routes/KriteriaRoute.js"
import PenilaianRoute from "./routes/PenilaianRoute.js"
import dotenv from 'dotenv';
dotenv.config();

const app = express();


// Konfigurasi koneksi ke database MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: '',
  database: process.env.DB_DATABASE
});

// Membuka koneksi ke database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
  
  // Lakukan operasi lain di sini setelah terhubung
});


app.use(cors())
app.use(express.json())
app.use(RelawanRoute);
app.use(KriteriaRoute)
app.use(PenilaianRoute)


app.listen(process.env.PORT, ()=>{console.log("Server sedang berjalan....")})