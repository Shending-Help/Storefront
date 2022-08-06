import client from '../database'

export type Order = {
  id: number
  product_id: number
  quantity: number
  price: number
  status: string
  user_id: number
}

export class Orders {
  async current_user_orders(): Promise<Order[]> {
    try {
      const conn: any = await client.connect()
      const sql = `SELECT * FROM orders WHERE user_id = $1`
      const result = await conn.query(sql, [1])
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`the error is ${err}`)
    }
  }
}
