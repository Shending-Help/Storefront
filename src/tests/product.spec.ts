import { Product, Products } from '../models/product'
import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import app from '..'

dotenv.config()

const request = supertest(app)

const productStore = new Products()

const testProduct: Product = { name: 'test', price: 100 }

const token = jwt.sign(
  { username: 'test', password: 'test123' },
  process.env.TOKEN_SECRET as string
)

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(productStore.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(productStore.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(productStore.create).toBeDefined()
  })
})

describe('Product Model methods are working properly', () => {
  it('create method should add a user', async () => {
    const result = await productStore.create(testProduct.name, testProduct.price)
    if (result) {
      expect(result.name).toBe(testProduct.name)
      expect(result.price).toBe(testProduct.price)
    }
  })

  it('index method should return a list of product', async () => {
    const result = await productStore.index()
    if (result) {
      expect(result[0].name).toBe(testProduct.name)
      expect(result[0].price).toBe(testProduct.price)
    }
  })

  it('show method should return the correct product', async () => {
    const result = await productStore.show(1)
    if (result) {
      expect(result.name).toBe(testProduct.name)
      expect(result.price).toBe(testProduct.price)
    }
  })
})

describe('Products Routes', () => {
  it('should have a products route', async () => {
    const result = await request.get('/products')
    expect(result.status).toBe(200)
  })

  it('should have a products/:id route', async () => {
    const result = await request.get('/products/1')
    expect(result.status).toBe(200)
  })

  it('should have a products/create route', async () => {
    const result = await request
      .post('/products')
      .send(testProduct)
      .set('Authorization', `Bearer ${token}`)
    expect(result.status).toBe(200)
  })
})
