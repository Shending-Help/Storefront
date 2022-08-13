import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import express, { Request, Response, NextFunction } from 'express'

dotenv.config()
const secret = process.env.TOKEN_SECRET as string

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, secret)
    next()
  } catch (err) {
    res.status(401)
    res.json('Access denied, invalid token')
  }
}

export default auth
