import { Order, Orders } from '../models/order'
import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import app from '..'

dotenv.config()

const orderStore = new Orders()
const request = supertest(app)

const token = jwt.sign(
  { username: 'test', password: 'test123' },
  process.env.TOKEN_SECRET as string
)

const testOrder: Order = {
  product_id: 1,
  quantity: 1,
  status: 'pending',
  user_id: 1
}

describe('Order Model', () => {
  it('should have an showOrderByUserId method', () => {
    expect(orderStore.showOrderByUserId).toBeDefined()
  })
})

describe('Order Model methods are working properly', () => {
  it('Create an order', async () => {
    const result = await orderStore.create(testOrder)
    if (result) {
      expect(result.product_id).toBe(testOrder.product_id)
      expect(result.quantity).toBe(testOrder.quantity)
      expect(result.status).toBe(testOrder.status)
      expect(result.user_id).toBe(testOrder.user_id)
    }
  })

  it('showOrderByUserId method should return the correct order', async () => {
    const result = await orderStore.showOrderByUserId(1)
    if (result) {
      expect(result[0].product_id).toBe(1)
      expect(result[0].quantity).toBe(1)
      expect(result[0].status).toBe('pending')
      expect(result[0].user_id).toBe(1)
    }
  })
})

describe('Orders Routes', () => {
  it('should have a /orders/:id route', async () => {
    const result = await request.get('/orders/:id').set('Authorization', `Bearer ${token}`)

    expect(result.status).toBe(200)
  })
})
