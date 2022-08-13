import { User, userStore } from '../models/user'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import supertest from 'supertest'
import app from '..'
import jwt from 'jsonwebtoken'
import client from '../database'

const token = jwt.sign(
  { username: 'test', password: 'test123' },
  process.env.TOKEN_SECRET as string
)

dotenv.config()
const store = new userStore()

const request = supertest(app) // supertest is a testing framework for express

const pepper = process.env.BCRYPT_PASSWORD + ''

const user: User = { username: 'test', password: 'test123' }

const pass = bcrypt.hashSync('test123' + pepper, 10)

describe('User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })
})

describe('User Model methods are working properly', () => {
  it('create method should add a user', async () => {
    const result = await store.create(user)
    if (result) {
      expect(result.username).toBe('test')
      expect(result.password).toBe(pass)
    }
  })

  it('index method should return a list of users', async () => {
    const result = await store.index()
    expect(result[0].username).toBe('test')
    expect(bcrypt.compareSync(user.password + pepper, result[0].password)).toBe(true)
  })

  it('show method should return the correct user', async () => {
    const result = await store.show(1)
    expect(result.username).toBe('test')
    expect(bcrypt.compareSync(user.password + pepper, result.password)).toBe(true)
  })
})

describe('User Routes', () => {
  it('should have a users route', async () => {
    const result = await request.get('/users').set('Authorization', `Bearer ${token}`)
    expect(result.status).toBe(200)
  })

  it('should have a users/:id route', async () => {
    const result = await request.get('/users/1').set('Authorization', `Bearer ${token}`)
    expect(result.status).toBe(200)
  })

  it('should have a users/create route', async () => {
    const result = await request.post('/users').send(user)
    expect(result.status).toBe(200)
  })
})
