import { Order, Orders } from '../models/order'
import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import auth from '../middleware/auth'

const orderStore = new Orders()
dotenv.config()
const secret: any = process.env.TOKEN_SECRET

const orderRoutes = (app: express.Application) => {
  app.get('/orders', auth, index)
  app.get('/orders/:id', auth, show)
  app.post('/orders', auth, create)
  app.post('/orders/:id/products', auth, addProduct)
  app.get('/orders/user/:id', auth, showOrderByUserId)
}

const showOrderByUserId = async (_req: Request, res: Response) => {
  try {
    const orders = await orderStore.showOrderByUserId(Number(_req.params.id))
    res.json(orders)
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}

const addProduct = async (_req: Request, res: Response) => {
  const newProduct = {
    order_id: _req.params.id,
    product_id: _req.body.product_id,
    quantity: parseInt(_req.body.quantity)
  }
  try {
    const addedProduct = await orderStore.addProductToOrder(
      newProduct.quantity,
      Number(newProduct.order_id),
      newProduct.product_id
    )
    res.json(addedProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await orderStore.index()
    res.json(orders)
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}

const show = async (_req: Request, res: Response) => {
  const id: string = _req.params.id
  try {
    const order = await orderStore.show(Number(id))
    res.json(order)
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}

const create = async (_req: Request, res: Response) => {
  const order: Order = {
    status: _req.body.status,
    user_id: _req.body.user_id
  }
  try {
    const newOrder = await orderStore.create(order)
    res.json(newOrder)
  } catch (err) {
    res.status(500)
    console.log(err)
    res.json(err)
  }
}
export default orderRoutes
