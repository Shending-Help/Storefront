import { User, userStore } from '../models/user'
import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const store = new userStore()
const secret: any = process.env.TOKEN_SECRET

const userRoutes = (app: express.Application) => {
  app.get('/users', store.index)
  app.get('/users/{:id}', store.show)
  app.post('/users', createUser)
}

const createUser = async (req: Request, res: Response) => {
  const user: User = {
    id: req.body.id,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    password: req.body.password
  }
  try {
    const newUser = await store.create(user)
    const token = jwt.sign({ user: newUser }, secret)
    res.json(token)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

export default userRoutes
