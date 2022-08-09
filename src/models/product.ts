import client from '../database'

export type Product = {
  id?: number
  name: string
  price: number
}

export class Products {
  async index(): Promise<Product[]> {
    try {
      const conn: any = await client.connect()
      const sql = `SELECT * FROM products`
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`the error is ${err}`)
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn: any = await client.connect()
      const sql = `SELECT * FROM products WHERE id = $1`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`the error is ${err}`)
    }
  }

  async create(name: string, price: number): Promise<Product> {
    try {
      const conn: any = await client.connect()
      const sql = `INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *`
      const result = await conn.query(sql, [name, price])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`the error is ${err}`)
    }
  }
}
