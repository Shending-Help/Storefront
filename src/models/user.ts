import client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { Pool, PoolClient } from 'pg'

dotenv.config()

const pepper = process.env.BCRYPT_PASSWORD
//const saltRounds = 10

export type User = {
  id?: number
  username: string
  password: string
}

export class userStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users ;'
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
      const sql = `SELECT * FROM users WHERE id = $1;`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`the error is ${err}`)
    }
  }

  async create(u: User): Promise<User> {
    try {
      // @ts-ignore

      const conn = await client.connect()
      const sql = 'INSERT INTO users (username, password) VALUES ($1, $2);'

      const hash = bcrypt.hashSync(u.password + pepper, 10)

      const result = await conn.query(sql, [u.username, hash])

      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error(`unable create user (${u.username}): ${err}`)
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await client.connect()
    const sql = 'SELECT password FROM users WHERE username=($1);'

    const result = await conn.query(sql, [username])

    console.log(password + pepper)

    if (result.rows.length) {
      const user = result.rows[0]

      console.log(user)

      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user
      }
    }

    return null
  }
}
