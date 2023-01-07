import { Pool, PoolConfig } from 'pg';

import * as sql from './sql';

const config: PoolConfig = {
  connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?options`,
}

const pool = new Pool(config);
export default pool;

// User
export const createUser = async ( username: string, email: string, password: string ) => {
  let success = true;

  const client = await pool.connect()
 
  const result = await client
    .query(sql.createUserQuery, [username, email, password])
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

export const findUser = async (usernameOrEmail: string) => {
  console.assert(pool.totalCount === 0)
  console.assert(pool.idleCount === 0)

  let success = true;

  const client = await pool.connect()
 
  const result = await client
    .query(sql.findUserQuery, [usernameOrEmail])
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

export const findUserById = async (id: string) => {
  let success = true;

  const client = await pool.connect()
 
  const result = await client
    .query(sql.findUserByIdQuery, [id])
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

// Watchlist
export const findInWatchlist  =async ( userId: string, ticker: string ) => {
  let success = true;

  const client = await pool.connect()
 
  const result = await client
    .query(sql.findInWatchlist, [userId, ticker])
    .then(res => {
      return res
    })
    .catch((e)=> {
      success = false;
      return e;
  })

  
  client.release(true)
  
  if (success) return result;
  else throw result;
}

export const getWatchlist = async ( userId: string ) => {
  let success = true;

  const client = await pool.connect()
 
  const result = await client
    .query(sql.viewWatchlist, [userId])
    .then(res => {
      return res.rows;
    })
    .catch((e)=> {
      success = false;
      return e;
  })

  client.release(true)
  
  if (success) return result;
  else throw result;
}

export const addToWatchlist = async ( userId: string, ticker: string ) => {
  let success = true;

  const client = await pool.connect()
 
  try {
    const existed = await findInWatchlist(userId, ticker);
    if (existed.rows.length !== 0) {
      console.log(existed);
      throw Error( 'Watchlisted ')
    } 
  } catch (err) {
    throw err;
  }


  const result = await client
    .query(sql.addToWatchlist, [userId, ticker])
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