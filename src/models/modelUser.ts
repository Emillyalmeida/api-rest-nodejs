import User from "../@types/userInterface";
import db from "../db";

class ModelUser {
  static async allUsers(): Promise<User[]> {
    const query = `
    SELECT uuid,username FROM aplication_users
    `;
    const result = await db.query<User>(query);
    const { rows } = result;
    return rows;
  }

  static async getByIdUser(uuid: string): Promise<User> {
    const query = `
    SELECT uuid, username FROM aplication_users WHERE uuid = $1
    `;
    const values = [uuid];
    const result = await db.query<User>(query, values);
    const [user] = result.rows;
    return user;
  }

  static async create(user: User): Promise<string> {
    const query = `
    INSERT INTO aplication_users(username, password) VALUES ($1,crypt($2, 'my_salt'))
    RETURNING uuid
    `;
    const values = [user.username, user.password];
    const result = await db.query<{ uuid: string }>(query, values);
    const [newUser] = result.rows;

    return newUser.uuid;
  }

  static async updateUser(user: User) {
    const query = `
    Update aplication_users SET username = $1 , password = $2 WHERE uuid = $3
    `;
    const values = [user.username, user.password, user.uuid];
    await db.query<{ uuid: string }>(query, values);
  }

  static async deleteUser(uuid: string) {
    const query = ` DELETE FROM aplication_users WHERE uuid = $1
    `;
    const value = [uuid];
    const result = await db.query(query, value);
    return result;
  }

  static async findBynameAndPassword(user: User): Promise<User | null> {
    const query = `
    SELECT uuid, username FROM aplication_users WHERE username = $1 and password = crypt($2, 'my_salt')
    `;
    const values = [user.username, user.password];
    const result = await db.query<User>(query, values);
    const [userInfo] = result.rows;
    return userInfo || null;
  }
}

export default ModelUser;
