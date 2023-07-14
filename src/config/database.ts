import { knex } from 'knex'
import dotenv from 'dotenv'

dotenv.config()

export const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5433,
        database: 'gestion_citas',
        user: 'postgres',
        password: process.env.PWS
    }
})

export default db