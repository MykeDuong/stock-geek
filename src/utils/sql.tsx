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

export const findInWatchlist = `
  SELECT * FROM watchlist
	WHERE user_id = $1 AND ticker = $2
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



// Holdings
export const viewHoldingsByTicker = `
  SELECT SUM(quantity) AS quantity FROM holdings
  WHERE user_id = $1 AND ticker = upper($2)
`

export const addNewTransaction = `
  INSERT INTO transactions (user_id,ticker,transaction_type,stock_price,quantity)
  VALUES ($1,UPPER($2),$3,$4,$5)
`