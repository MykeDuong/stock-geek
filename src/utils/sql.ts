// USERS
export const createUserQuery = `
  INSERT INTO users (
    username,
    email, 
    password
  ) 
  VALUES (
    $1,	
    $2,	
    $3
  ) 
  RETURNING *
`

export const findUserQuery = `
  SELECT * FROM users 
  WHERE ($1 = username OR $1 = email)
`

export const findUserByIdQuery = `
  SELECT * FROM users 
  WHERE ($1 = user_id)
`

// SCREENER
export const saveScreener = `
  INSERT INTO screener (
    user_id,
    screener_name,
    market_cap_max,
    market_cap_min,
    volume_min,
    volume_max,
    pe_min,
    pe_max,
    de_min,
    de_max,
    beta_min,
    beta_max,
    price_min,
    price_max)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
`

export const getScreeners = `
  SELECT screener_id,screener_name,create_time FROM screener
  WHERE user_id = $1
  ORDER BY create_time
`

export const getScreenerById = `
  SELECT * FROM screener
  WHERE screener_id = $1
`

export const deleteScreenerById = `
  DELETE FROM screener
  WHERE screener_id = $1
`

// WATCHLIST
export const addToWatchlist = `
  INSERT INTO watchlist(
    user_id,
    ticker
  )
  VALUES (
    $1,
    upper($2)
  )
`
export const deleteFromWatchlist = `
  DELETE FROM watchlist
  WHERE (user_id = $1 AND ticker ILIKE $2)
`

export const findInWatchlist = `
  SELECT * FROM watchlist
	WHERE user_id = $1 AND ticker = $2
`

export const viewWatchlist = `
  SELECT * FROM watchlist
  WHERE user_id = $1
`

// TRANSACTIONS - TRADE HISTORY
export const viewTransactions = `
  SELECT *, (quantity*stock_price) AS Total_Value FROM transactions
  WHERE user_id = $1
  ORDER BY date
`

// HOLDINGS
export const viewHoldingsByTicker = `
  SELECT SUM(quantity) AS quantity FROM holdings
  WHERE user_id = $1 AND ticker = upper($2)
`

export const viewHoldings = `
  SELECT ticker, SUM(quantity), SUM(price*quantity)/SUM(quantity) AS purchase_price FROM holdings
  WHERE user_id=$1
  GROUP BY ticker
`

// TRANSACTIONS
export const addNewTransaction = `
  INSERT INTO transactions (user_id,ticker,transaction_type,stock_price,quantity)
  VALUES ($1,UPPER($2),$3,$4,$5)
`