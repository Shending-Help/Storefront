import { Order, Orders } from '../models/order'
import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User, userStore } from '../models/user'
import app from '..'

dotenv.config()

const orderStore = new Orders()
const request = supertest(app)

const token = jwt.sign(
  { username: 'test', password: 'test123' },
  process.env.TOKEN_SECRET as string
)

const store = new userStore()

beforeAll(async () => {
  const u: User = {
    username: 'test',
    password: 'test123'
  }
  await store.create(u)
})

const testOrder: Order = {
  status: 'active',
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
      expect(result.status).toBe(testOrder.status)
      expect(result.user_id).toBe(testOrder.user_id)
    }
  })

  it('showOrderByUserId method should return the correct order', async () => {
    const result = await orderStore.showOrderByUserId(1)
    if (result) {
      expect(result[0].status).toBe('active')
      expect(Number(result[0].user_id)).toBe(1)
    }
  })
})

describe('Orders Routes', () => {
  it('should have a /orders/:id route', async () => {
    const result = await request.get('/orders/1').set('Authorization', `Bearer ${token}`)

    expect(result.status).toBe(200)
  })
})
