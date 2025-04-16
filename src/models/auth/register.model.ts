// src/models/User.model.ts
import bcrypt from 'bcryptjs';
import pool from '../config/db';

export class RegisterModel {
  
  static async create(username: string, password: string): Promise<{ id: number }> {
    const hash = await bcrypt.hash(password, 10);
    
    const [result] = await pool.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hash]
    );
    
    return { id: (result as any).insertId };
  }

  static async findByUsername(username: string): Promise<{ id: number, username: string, password: string } | null> {
    const [users]: any = await pool.execute(
      'SELECT id, username, password FROM users WHERE username = ? LIMIT 1',
      [username]
    );
    
    return users.length ? users[0] : null;
  }

  static async exists(username: string): Promise<boolean> {
    const user = await this.findByUsername(username);
    return !!user;
  }
}