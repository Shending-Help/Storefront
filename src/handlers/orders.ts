import { Order, Orders } from '../models/order'
import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import auth from '../middleware/auth'

const orderStore = new Orders()
dotenv.config()
const secret: any = process.env.TOKEN_SECRET

const orderRoutes = (app: express.Application) => {
  app.get('/orders/:id', auth, showOrderByUserId)
}

const showOrderByUserId = async (_req: Request, res: Response) => {
  // try {
  //   const authorizationHeader: any = _req.headers.authorization
  //   const token = authorizationHeader.split(' ')[1]
  //   jwt.verify(token, secret)
  // } catch (err) {
  //   res.status(401)
  //   res.json('Access denied, invalid token')
  //   return
  // }

  try {
    const orders = await orderStore.showOrderByUserId(_req.body.id)
    res.json(orders)
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}

export default orderRoutes
