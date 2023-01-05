import axios from "axios"
import yahooFinance from "yahoo-finance2"
import { QuoteSummaryOptions } from "yahoo-finance2/dist/esm/src/modules/quoteSummary";
import { tickerRouter } from "../server/trpc/router/ticker";

export const headers = {
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': process.env.API_HOST,
}

// export const getTrending = async () => {
//   const options = {
//     headers,
//     method: 'GET',
//     url: 'https://yh-finance.p.rapidapi.com/market/get-trending-tickers',
//     params: {region: 'US'},
//   }
  
//   if (process.env.NODE_ENV !== 'production') {
//     return sampleResponse.trendingTickers;
//   } 

//   try {
//     return axios.request(options).then(async (response) => {
//       return response.data
//     }).catch((error) => {
//       throw error;
//     })
//   } catch (error) {
//     throw error;
//   }
// }

export const getTrending = async () => {
  const queryOptions = { count: 30, lang: 'en-US' };
  const { quotes } = await yahooFinance.trendingSymbols('US', queryOptions);
  
  const symbols = quotes.map((quote) => quote.symbol)

  const result = await yahooFinance.quote(symbols)
  return result;
}

export const getRecommendations = async (searchTickers: string[] ) => {
  const queryResult = await yahooFinance.recommendationsBySymbol(searchTickers);

  const duplicableResult = queryResult
    .map((recommendation) => {
      return recommendation.recommendedSymbols
    })
    .flat(1)
    .map(ticker => ticker.symbol)

  const result =  duplicableResult.filter((ticker, index) => {
      return duplicableResult.indexOf(ticker) === index;
    });

  return shuffleArray(result);
}


export const getQuoteList = async () => {
  return sampleResponse.quoteList;
}

const shuffleArray = (array: any[]) => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export const search = async ( searchText: string ) => {
  const queryOptions = {
    region: "US",
    lang: "en-US"
  }

  const { quotes } = await yahooFinance.search(searchText, queryOptions);

  const result = quotes
    .filter(quote => quote.quoteType === 'EQUITY')
    .filter(quote => quote.exchDisp === "NASDAQ" || quote.exchDisp === "NYSE")
    .map(quote => ({ symbol: quote.symbol, name: quote.shortname }))

  return result;
}

export const getTickerInfo = async ( ticker: string ) => {
  const queryOptions: QuoteSummaryOptions = { modules: ['price', 'summaryDetail', "assetProfile"] };
  const result = await yahooFinance.quoteSummary(ticker, queryOptions);
  return result;
}


const sampleResponse  = {
  quoteList: ["AAPL", "GOOG", "AMD", "IBM", "META"],
}