import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import express, { Request, Response, NextFunction } from 'express'

dotenv.config()
const secret: any = process.env.TOKEN_SECRET

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader: any = req.headers.authorization
  const token = authorizationHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, secret)
    next()
  } catch (err) {
    res.status(401)
    res.json('Access denied, invalid token')
  }
}

export default auth
