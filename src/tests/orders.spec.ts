import { Orders } from '../models/order'

const orderStore = new Orders()

describe('Order Model', () => {
  it('should have an showOrderByUserId method', () => {
    expect(orderStore.showOrderByUserId).toBeDefined()
  })
})
