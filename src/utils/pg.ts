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

// Screener
export interface ScreenerInfoInterface {
  screener_id: string,
  screener_name: string,
  create_time: Date,
}

export interface ScreenerInterface {
  screener_id: number,
  user_id: number,
  create_time: Date,
  screener_name: string,
  market_cap_max: number | null,
  market_cap_min: number | null,
  volume_min: number | null,
  volume_max: number | null,
  pe_min: number,
  pe_max: number,
  de_min: number,
  de_max: number,
  beta_min: number,
  beta_max: number,
  price_min: number,
  price_max: number
}

export const saveScreener = async (inputQuery: {
  userId: string,
  name: string,
  marketCapMax: number | null,
  marketCapMin: number | null,
  volumeMin: number | null,
  volumeMax: number | null,
  peMin: number,
  peMax: number,
  deMin: number,
  deMax: number,
  betaMin: number,
  betaMax: number,
  priceMin: number,
  priceMax: number,
}) => {
  let success = true;

  const client = await pool.connect()
 
  const result = await client
    .query(sql.saveScreener, [
      inputQuery.userId,
      inputQuery.name,
      inputQuery.marketCapMax,
      inputQuery.marketCapMin,
      inputQuery.volumeMin,
      inputQuery.volumeMax,
      inputQuery.peMin,
      inputQuery.peMax,
      inputQuery.deMin,
      inputQuery.deMax,
      inputQuery.betaMin,
      inputQuery.betaMax,
      inputQuery.priceMin,
      inputQuery.priceMax,
    ])
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

export const viewScreeners = async ( userId: string ) => {
  let success = true;

  const client = await pool.connect()
 
  const result = await client
    .query(sql.getScreeners, [userId])
    .then(res => {
      return res.rows
    })
    .catch((e)=> {
      success = false;
      return e;
  })

  
  client.release(true)
  
  if (success) return result;
  else throw result;
}

export const getScreenerById = async ( id: number ) => {
  let success = true;

  const client = await pool.connect()
 
  const result = await client
    .query(sql.getScreenerById, [id])
    .then(res => {
      const result = res.rows[0]
      if (typeof (result.market_cap_max) === 'string') {
        result.market_cap_max = parseInt(result.market_cap_max)
      }
      if (typeof (result.market_cap_min) === 'string') {
        result.market_cap_min = parseInt(result.market_cap_min)
      }
      if (typeof (result.volume_max) === 'string') {
        result.volume_max = parseInt(result.volume_max)
      }
      if (typeof (result.volume_min) === 'string') {
        result.volume_min = parseInt(result.volume_min)
      }
      return result
    })
    .catch((e)=> {
      success = false;
      return e;
  })

  
  client.release(true)
  
  if (success) return result;
  else throw result;
}

export const deleteScreener = async ( id: number ) => {
  let success = true;

  const client = await pool.connect()
 
  const result = await client
    .query(sql.deleteScreenerById, [id])
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

export const deleteFromWatchlist = async ( userId: string, ticker: string ) => {
  let success = true;

  const client = await pool.connect()
 
  const result = await client
    .query(sql.deleteFromWatchlist, [userId, ticker])
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

// Trade History - Transactions
export interface HistoryRowInterface {
  user_id: number;
  date: Date;
  ticker: string;
  transaction_type:'buy' | 'sell';
  stock_price: number;
  quantity: number;
  total_value: number;
}

export const getHistory = async ( userId: string ) => {
  let success = true;

  const client = await pool.connect()
 
  const result = await client
    .query(sql.viewTransactions, [userId])
    .then(res => {
      return res.rows
    })
    .catch((e)=> {
      success = false;
      return e;
  })

  
  client.release(true)
  
  if (success) return result;
  else throw result;
}

export const makeTransaction = async ( userId: string, ticker: string, type: string, price: number, quantity: number) => {
  let success = true;

  const client = await pool.connect()
 
  const result = await client
    .query(sql.addNewTransaction, [userId, ticker, type, price, quantity])
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

// Holdings
export const getHoldingsByTicker = async ( userId: string, ticker: string ) => {
  let success = true;

  const client = await pool.connect()
 
  const result = await client
    .query(sql.viewHoldingsByTicker, [userId, ticker])
    .then(res => {
      if (res.rows[0].quantity) {
        return parseInt(res.rows[0].quantity)
      }
      return 0;
    })
    .catch((e)=> {
      success = false;
      return e;
  })

  
  client.release(true)
  
  if (success) return result;
  else throw result;
}