import client from '../database'

export type Order = {
  id?: number
  status: string
  user_id: number
}

export class Orders {
  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2);'
      const result = await conn.query(sql, [o.status, o.user_id])
      const order = result.rows[0]
      conn.release()
      return order
    } catch (err) {
      throw new Error(`unable to create order: ${err}`)
    }
  }

  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders'
      const result = await conn.query(sql)
      const orders = result.rows
      conn.release()
      return orders
    } catch (err) {
      throw new Error(`unable to get orders: ${err}`)
    }
  }
  async show(id: number): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders WHERE id = $1;'
      const result = await conn.query(sql, [id])
      const order = result.rows[0]
      conn.release()
      return order
    } catch (err) {
      throw new Error(`unable to get order: ${err}`)
    }
  }
  async showOrderByUserId(user_id: number): Promise<Order[]> {
    try {
      const conn: any = await client.connect()
      const sql = 'SELECT * FROM orders WHERE user_id = ($1) ;'
      const result = await conn.query(sql, [user_id])
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`the error is ${err}`)
    }
  }
  async addProductToOrder(quantity: number, order_id: number, product_id: number): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *;'
      const result = await conn.query(sql, [quantity, order_id, product_id])
      const order = result.rows[0]
      conn.release()
      return order
    } catch (err) {
      throw new Error(`unable to add product to order: ${err}`)
    }
  }
}
