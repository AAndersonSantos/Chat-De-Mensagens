import bcrypt from 'bcryptjs';
import pool from '../config/db';

export class LoginModel {

  static async validateCredentials(username: string, password: string): Promise<{id: number, username: string} | null> {
    const [users]: any = await pool.execute(
      'SELECT id, username, password FROM users WHERE username = ? LIMIT 1',
      [username]
    );

    if (!users.length) {
      return null;
    }

    const user = users[0];
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    return isPasswordValid ? { id: user.id, username: user.username } : null;
  }
  
}