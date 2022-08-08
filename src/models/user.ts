import client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { Pool, PoolClient } from 'pg'

dotenv.config()
export type User = {
  id: number
  firstName: string
  lastName: string
  password: string
}

export class userStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`the error is ${err}`)
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn: any = await client.connect()
      const sql = `SELECT * FROM users WHERE id = $1`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`the error is ${err}`)
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn: any = await client.connect()
      const sql = `INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *`
      const hash = bcrypt.hashSync(
        u.password + process.env.BCRYPT_PASSWORD,
        parseInt(process.env.SALT_ROUNDS as string)
      )
      const result = await conn.query(sql, [u.firstName, u.lastName, hash])
      const user = result.rows[0]
      conn.release()
      return user
    } catch (err) {
      throw new Error(`the error is ${err}`)
    }
  }

  async authenticate(username: string, password: string) {
    try {
      const conn: any = await client.connect()
      const sql = `SELECT * FROM users WHERE firstName = $1`
      const result = await conn.query(sql, [username])
      conn.release()
      const user = result.rows[0]
      if (user && bcrypt.compareSync(password + process.env.BCRYPT_PASSWORD, user.password)) {
        return user
      }
    } catch (err) {
      throw new Error(`the error is ${err}`)
    }
  }
}
