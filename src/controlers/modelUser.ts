import User from "../models/userInterface";
import db from "../db";
import DataBaseError from "./errors/dataBaseError";

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
    try {
      const query = `
    SELECT uuid, username FROM aplication_users WHERE uuid = $1
    `;
      const values = [uuid];
      const result = await db.query<User>(query, values);
      const [user] = result.rows;
      return user;
    } catch (error) {
      throw new DataBaseError("Error to consult byId", error);
    }
  }

  static async create(user: User): Promise<string> {
    try {
      const query = `
    INSERT INTO aplication_users(username, password) VALUES ($1,crypt($2, $3))
    RETURNING uuid
    `;
      const values = [user.username, user.password, process.env.MY_SALT];
      const result = await db.query<{ uuid: string }>(query, values);
      const [newUser] = result.rows;

      return newUser.uuid;
    } catch (error) {
      throw new DataBaseError("Error to create user", error);
    }
  }

  static async updateUser(user: User) {
    const query = `
    Update aplication_users SET username = $1 , password = crypt($2, $3) WHERE uuid = $4
    `;
    const values = [
      user.username,
      user.password,
      process.env.MY_SALT,
      user.uuid,
    ];
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
    try {
      const query = `
    SELECT uuid, username FROM aplication_users WHERE username = $1 and password = crypt($2, $3)
    `;
      const values = [user.username, user.password, process.env.MY_SALT];
      const result = await db.query<User>(query, values);
      const [userInfo] = result.rows;
      return userInfo || null;
    } catch (error) {
      throw new DataBaseError("Error to consult byName and ByPassword", error);
    }
  }
}

export default ModelUser;
