import { Pool, PoolConfig } from 'pg';

const config: PoolConfig = {
  connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?options`,
}

const pool = new Pool(config);

export default pool;