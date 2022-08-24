import { User, userStore } from '../models/user'
import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import app from '..'
import auth from '../middleware/auth'

dotenv.config()
const store = new userStore()
const secret: any = process.env.TOKEN_SECRET

const userRoutes = (app: express.Application) => {
  app.get('/users', auth, index)
  app.get('/users/:id', auth, show)
  app.post('/users', createUser)
  app.post('/users/authenticate', authenticate)
}
const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index()
    res.json(users)
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}

const show = async (_req: Request, res: Response) => {
  
  try {
    const user = await store.show(Number(_req.params.id))
    res.json(user)
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}

const createUser = async (_req: Request, res: Response) => {
  const user: User = {
    username: _req.body.username,
    password: _req.body.password
  }

  try {
    const newUser = await store.create(user)

    const token = jwt.sign({ user: newUser }, secret)
    res.json(token)
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}

const authenticate = async (_req: Request, res: Response) => {
  const user: User = {
    username: _req.body.username,
    password: _req.body.password
  }
  try {
    const foundUser = await store.authenticate(user.username, user.password)
    if (foundUser) {
      const token = jwt.sign({ user: foundUser }, secret)
      res.json(token)
    } else {
      res.status(401)
      res.json({ message: 'unauthorized' })
    }
  } catch (err) {
    res.status(500)
    res.json(err)
  }
}



export default userRoutes
