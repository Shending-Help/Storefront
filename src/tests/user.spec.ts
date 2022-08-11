import { User, userStore } from '../models/user'

const store = new userStore()

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
      password: 'test_password'
    })
  })

  it('index method should return a list of users', async () => {
    const result = await store.index()
    expect(result).toEqual([
      {
        id: 1,
        username: 'test _user',
        password: 'test_password'
      }
    ])
  })

  it('show method should return the correct book', async () => {
    const result = await store.show(1)
    expect(result).toEqual({
      id: 1,
      username: 'test _user',
      password: 'test_password'
    })
  })
})
