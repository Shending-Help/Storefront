import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const POSTGRES_HOST = process.env.POSTGRES_HOST
const POSTGRES_USER = process.env.POSTGRES_USER
const POSTGRES_PASSWORD: string = process.env.POSTGRES_PASSWORD + ''
const POSTGRES_DB = process.env.POSTGRES_DB
const POSTGRES_TEST_DB = process.env.POSTGRES_TEST_DB
const ENV = process.env.ENV

let database

if (ENV === 'dev') {
  database = {
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB
  }
} else if (ENV === 'test') {
  database = {
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: '19992001'
  }
}

const client = new Pool(database)

export default client
