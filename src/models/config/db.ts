import mysql from 'mysql2/promise';
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: 'localhost',
  database: process.env.DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10
});

export default pool;