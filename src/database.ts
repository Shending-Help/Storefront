import dotenv from 'dotenv'
import pool from 'pg'

dotenv.config()

const POSTGRES_HOST = process.env.POSTGRES_HOST
const POSTGRES_USER = process.env.POSTGRES_USER
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
const POSTGRES_DB = process.env.POSTGRES_DB

const client: pool.Client = new pool.Client({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB
})

export default client