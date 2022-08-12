import { Product, Products } from '../models/product'

const productStore = new Products()

const testProduct: Product = { name: 'test', price: 100 }

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

  it('index method should return a list of users', async () => {
    const result = await productStore.index()
    if (result) {
      expect(result[0].name).toBe(testProduct.name)
      expect(result[0].price).toBe(testProduct.price)
    }
  })

  it('show method should return the correct user', async () => {
    const result = await productStore.show(1)
    if (result) {
      expect(result.name).toBe(testProduct.name)
      expect(result.price).toBe(testProduct.price)
    }
  })
})
