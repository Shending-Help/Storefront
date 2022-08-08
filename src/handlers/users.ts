import { User, userStore } from '../models/user'
import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import app from '..'

const store = new userStore()
const secret: any = process.env.TOKEN_SECRET

const userRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/{:id}', show)
  app.post('/users', createUser)
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
    const user = await store.show(_req.body.id)
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

export default userRoutes
