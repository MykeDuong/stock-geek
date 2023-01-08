import axios from "axios"
import yahooFinance from "yahoo-finance2"
import type { QuoteSummaryOptions } from "yahoo-finance2/dist/esm/src/modules/quoteSummary";

export const headers = {
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': process.env.API_HOST,
}

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

export const getMultipleTickers = async ( tickers: string[] ) => {
  const result = await yahooFinance.quote(tickers);
  return result;
}

export const getMultipleTickersAsObjects = async ( tickers: string[] ) => {
  const result = await yahooFinance.quote(tickers, { return: 'object' });
  return result;
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

const sampleResponse  = {
  quoteList: ["AAPL", "GOOG", "AMD", "IBM", "META"],
}