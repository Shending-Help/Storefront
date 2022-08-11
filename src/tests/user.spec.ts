import { User, userStore } from '../models/user'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()
const store = new userStore()
const pepper = process.env.BCRYPT_PASSWORD

const pass = bcrypt.hashSync('test_password' + pepper, 10)

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

  it('create method should add a user', async () => {
    const result = await store.create({
      username: 'test _user',
      password: 'test_password'
    })
    expect(result).toEqual({
      id: 1,
      username: 'test _user',
      password: pass
    })
  })

  it('index method should return a list of users', async () => {
    const result = await store.index()
    expect(result).toEqual([
      {
        id: 1,
        username: 'test _user',
        password: pass
      }
    ])
  })

  it('show method should return the correct book', async () => {
    const result = await store.show(1)
    expect(result).toEqual({
      id: 1,
      username: 'test _user',
      password: pass
    })
  })
})
