import { Product, Products } from '../models/product'
import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import auth from '../middleware/auth'

const productStore = new Products()
dotenv.config()
const secret: any = process.env.TOKEN_SECRET

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', auth, createProduct)
}

const index = async (_req: Request, res: Response) => {
  try {
    const products = await productStore.index()
    res.json(products)
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}

const show = async (_req: Request, res: Response) => {
  try {
    const productShown: Product = await productStore.show(_req.body.id)
    res.json(productShown)
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}

const createProduct = async (_req: Request, res: Response) => {
  const product: Product = {
    name: _req.body.name,
    price: _req.body.price
  }

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
    const newProduct = await productStore.create(product.name, product.price)
    const token = jwt.sign({ product: newProduct }, secret)
    res.json(token)
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}

export default productRoutes
