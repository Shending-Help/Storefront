import client from '../database'

export type Order = {
  id?: number
  product_id: number
  quantity: number
  status: string
  user_id: number
}

export class Orders {
  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO orders (product_id, quantity, status, user_id) VALUES ($1, $2, $3, $4);'
      const result = await conn.query(sql, [o.product_id, o.quantity, o.status, o.user_id])
      const order = result.rows[0]
      conn.release()
      return order
    } catch (err) {
      throw new Error(`unable to create order (${o.product_id}): ${err}`)
    }
  }

  async showOrderByUserId(user_id: number): Promise<Order[]> {
    try {
      const conn: any = await client.connect()
      const sql = 'SELECT * FROM orders WHERE user_id = $1'
      const result = await conn.query(sql, [user_id])
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`the error is ${err}`)
    }
  }
}
