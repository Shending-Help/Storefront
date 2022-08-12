import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const POSTGRES_HOST = process.env.POSTGRES_HOST
const POSTGRES_USER = process.env.POSTGRES_USER
const POSTGRES_PASSWORD: string = process.env.POSTGRES_PASSWORD!
const POSTGRES_DB = process.env.POSTGRES_DB
const POSTGRES_TEST_DB = process.env.POSTGRES_TEST_DB
const POSTGRES_TEST_PASSWORD = process.env.POSTGRES_TEST_PASSWORD
const ENV = process.env.ENV

const client = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DB
})

export default client
