import { Order, Orders } from '../models/order'
import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const orderStore = new Orders()
dotenv.config()
const secret: any = process.env.TOKEN_SECRET

const orderRoutes = (app: express.Application) => {
  app.get('/orders/:id', showOrderById)
}

const showOrderById = async (_req: Request, res: Response) => {
  try {
    const order = await orderStore.showOrderById(_req.body.id)
    res.json(order)
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}

export default orderRoutes
