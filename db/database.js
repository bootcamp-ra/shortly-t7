import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pg;

//TODO string connection
//https://node-postgres.com/api/client
const connection = new Pool({ connectionString: process.env.DATABASE_URL });

export { connection };
