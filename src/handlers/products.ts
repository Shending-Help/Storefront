import { Product, Products } from '../models/product'
import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const productStore = new Products()
dotenv.config()
const secret: any = process.env.TOKEN_SECRET

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', createProduct)
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
