import { Pool, PoolConfig } from 'pg';

const config: PoolConfig = {
  connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?options`,
}

const pool = new Pool(config);
export default pool;

const createUserQuery = 'INSERT INTO users (username, email, password) VALUES ($1,	$2,	$3) RETURNING *';
export const createUser = async ( username: string, email: string, password: string ) => {
  let success = true;

  const client = await pool.connect()
 
  const result = await client
    .query(createUserQuery, [username, email, password])
    .then(res => {
      return res.rows[0]
    })
    .catch((e)=> {
      success = false;
      return e;
    }
  )

  client.release(true)
  
  if (success) return result;
  else throw result;
}

const findUserQuery = 'SELECT * FROM users WHERE ($1 = username OR $1 = email)';
export const findUser = async (usernameOrEmail: string) => {
  console.assert(pool.totalCount === 0)
  console.assert(pool.idleCount === 0)

  let success = true;

  const client = await pool.connect()
 
  const result = await client
    .query(findUserQuery, [usernameOrEmail])
    .then(res => {
      return res.rows[0]
    })
    .catch((e)=> {
      success = false;
      return e;
    }
  )

  client.release(true)
  
  if (success) return result;
  else throw result;
}

const findUserByIdQuery = 'SELECT * FROM users WHERE ($1 = user_id)';
export const findUserById = async (id: string) => {
  let success = true;

  const client = await pool.connect()
 
  const result = await client
    .query(findUserByIdQuery, [id])
    .then(res => {
      return res.rows[0]
    })
    .catch((e)=> {
      success = false;
      return e;
  })

  
  client.release(true)
  
  if (success) return result;
  else throw result;
}