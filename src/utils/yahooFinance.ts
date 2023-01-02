import axios from "axios"
import yahooFinance from "yahoo-finance2"
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
  const queryOptions = { count: 20, lang: 'en-US' };
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

  console.log(duplicableResult);

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

const sampleResponse  = {
  trendingTickers: {
    "finance": {
      "result": [
        {
          "count": 20,
          "quotes": [
            {
              "language": "en-US",
              "region": "US",
              "quoteType": "EQUITY",
              "triggerable": true,
              "quoteSourceName": "Nasdaq Real Time Price",
              "sourceInterval": 15,
              "exchangeTimezoneName": "America/New_York",
              "exchangeTimezoneShortName": "EST",
              "gmtOffSetMilliseconds": -18000000,
              "esgPopulated": false,
              "tradeable": false,
              "shortName": "Shopify Inc.",
              "marketState": "REGULAR",
              "market": "us_market",
              "regularMarketPreviousClose": 889.5,
              "fullExchangeName": "NYSE",
              "longName": "Shopify Inc.",
              "exchange": "NYQ",
              "exchangeDataDelayedBy": 0,
              "priceHint": 2,
              "regularMarketChangePercent": -18.937592,
              "regularMarketPrice": 721.0501,
              "regularMarketTime": 1645027304,
              "regularMarketChange": -168.44989,
              "symbol": "SHOP"
            },
            {
              "language": "en-US",
              "region": "US",
              "quoteType": "EQUITY",
              "triggerable": true,
              "quoteSourceName": "Nasdaq Real Time Price",
              "sourceInterval": 15,
              "exchangeTimezoneName": "America/New_York",
              "exchangeTimezoneShortName": "EST",
              "gmtOffSetMilliseconds": -18000000,
              "esgPopulated": false,
              "tradeable": false,
              "shortName": "Roblox Corporation",
              "marketState": "REGULAR",
              "market": "us_market",
              "regularMarketPreviousClose": 73.3,
              "fullExchangeName": "NYSE",
              "longName": "Roblox Corporation",
              "exchange": "NYQ",
              "exchangeDataDelayedBy": 0,
              "priceHint": 2,
              "regularMarketChangePercent": -24.22238,
              "regularMarketPrice": 55.545,
              "regularMarketTime": 1645027309,
              "regularMarketChange": -17.755005,
              "symbol": "RBLX"
            },
            {
              "language": "en-US",
              "region": "US",
              "quoteType": "EQUITY",
              "triggerable": true,
              "quoteSourceName": "Nasdaq Real Time Price",
              "sourceInterval": 15,
              "exchangeTimezoneName": "America/New_York",
              "exchangeTimezoneShortName": "EST",
              "gmtOffSetMilliseconds": -18000000,
              "esgPopulated": false,
              "tradeable": false,
              "shortName": "Meta Platforms, Inc.",
              "marketState": "REGULAR",
              "market": "us_market",
              "regularMarketPreviousClose": 221,
              "fullExchangeName": "NasdaqGS",
              "longName": "Meta Platforms, Inc.",
              "exchange": "NMS",
              "exchangeDataDelayedBy": 0,
              "priceHint": 2,
              "regularMarketChangePercent": -2.3981915,
              "regularMarketPrice": 215.7,
              "regularMarketTime": 1645027309,
              "regularMarketChange": -5.300003,
              "symbol": "FB"
            },
            {
              "language": "en-US",
              "region": "US",
              "quoteType": "EQUITY",
              "triggerable": true,
              "quoteSourceName": "Nasdaq Real Time Price",
              "sourceInterval": 15,
              "exchangeTimezoneName": "America/New_York",
              "exchangeTimezoneShortName": "EST",
              "gmtOffSetMilliseconds": -18000000,
              "esgPopulated": false,
              "tradeable": false,
              "shortName": "Upstart Holdings, Inc.",
              "marketState": "REGULAR",
              "market": "us_market",
              "regularMarketPreviousClose": 109.11,
              "fullExchangeName": "NasdaqGS",
              "longName": "Upstart Holdings, Inc.",
              "exchange": "NMS",
              "exchangeDataDelayedBy": 0,
              "priceHint": 2,
              "regularMarketChangePercent": 33.984055,
              "regularMarketPrice": 146.19,
              "regularMarketTime": 1645027309,
              "regularMarketChange": 37.08,
              "symbol": "UPST"
            },
            {
              "language": "en-US",
              "region": "US",
              "quoteType": "EQUITY",
              "triggerable": true,
              "quoteSourceName": "Nasdaq Real Time Price",
              "sourceInterval": 15,
              "exchangeTimezoneName": "America/New_York",
              "exchangeTimezoneShortName": "EST",
              "gmtOffSetMilliseconds": -18000000,
              "esgPopulated": false,
              "tradeable": false,
              "shortName": "Airbnb, Inc.",
              "marketState": "REGULAR",
              "market": "us_market",
              "regularMarketPreviousClose": 180.07,
              "fullExchangeName": "NasdaqGS",
              "longName": "Airbnb, Inc.",
              "exchange": "NMS",
              "exchangeDataDelayedBy": 0,
              "priceHint": 2,
              "regularMarketChangePercent": 4.989718,
              "regularMarketPrice": 189.055,
              "regularMarketTime": 1645027308,
              "regularMarketChange": 8.984985,
              "symbol": "ABNB"
            },
            {
              "language": "en-US",
              "region": "US",
              "quoteType": "EQUITY",
              "triggerable": true,
              "quoteSourceName": "Nasdaq Real Time Price",
              "sourceInterval": 15,
              "exchangeTimezoneName": "America/New_York",
              "exchangeTimezoneShortName": "EST",
              "gmtOffSetMilliseconds": -18000000,
              "esgPopulated": false,
              "tradeable": false,
              "shortName": "The Kraft Heinz Company",
              "marketState": "REGULAR",
              "market": "us_market",
              "regularMarketPreviousClose": 34.68,
              "fullExchangeName": "NasdaqGS",
              "longName": "The Kraft Heinz Company",
              "exchange": "NMS",
              "exchangeDataDelayedBy": 0,
              "priceHint": 2,
              "regularMarketChangePercent": 4.1810865,
              "regularMarketPrice": 36.13,
              "regularMarketTime": 1645027308,
              "regularMarketChange": 1.4500008,
              "symbol": "KHC"
            },
            {
              "language": "en-US",
              "region": "US",
              "quoteType": "EQUITY",
              "triggerable": true,
              "quoteSourceName": "Nasdaq Real Time Price",
              "sourceInterval": 15,
              "exchangeTimezoneName": "America/New_York",
              "exchangeTimezoneShortName": "EST",
              "gmtOffSetMilliseconds": -18000000,
              "esgPopulated": false,
              "tradeable": false,
              "shortName": "ViacomCBS Inc.",
              "marketState": "REGULAR",
              "market": "us_market",
              "regularMarketPreviousClose": 35.99,
              "fullExchangeName": "NasdaqGS",
              "longName": "ViacomCBS Inc.",
              "exchange": "NMS",
              "exchangeDataDelayedBy": 0,
              "priceHint": 2,
              "regularMarketChangePercent": -21.214231,
              "regularMarketPrice": 28.355,
              "regularMarketTime": 1645027308,
              "regularMarketChange": -7.635002,
              "symbol": "VIAC"
            },
            {
              "language": "en-US",
              "region": "US",
              "quoteType": "EQUITY",
              "triggerable": true,
              "quoteSourceName": "Free Realtime Quote",
              "sourceInterval": 15,
              "exchangeTimezoneName": "America/Toronto",
              "exchangeTimezoneShortName": "EST",
              "gmtOffSetMilliseconds": -18000000,
              "esgPopulated": false,
              "tradeable": false,
              "shortName": "SHOPIFY INC",
              "marketState": "REGULAR",
              "market": "ca_market",
              "regularMarketPreviousClose": 1132.62,
              "fullExchangeName": "Toronto",
              "longName": "Shopify Inc.",
              "exchange": "TOR",
              "exchangeDataDelayedBy": 15,
              "priceHint": 2,
              "regularMarketChangePercent": -19.125566,
              "regularMarketPrice": 916,
              "regularMarketTime": 1645027302,
              "regularMarketChange": -216.62,
              "symbol": "SHOP.TO"
            },
            {
              "language": "en-US",
              "region": "US",
              "quoteType": "EQUITY",
              "triggerable": true,
              "quoteSourceName": "Nasdaq Real Time Price",
              "sourceInterval": 15,
              "exchangeTimezoneName": "America/New_York",
              "exchangeTimezoneShortName": "EST",
              "gmtOffSetMilliseconds": -18000000,
              "esgPopulated": false,
              "tradeable": false,
              "shortName": "The Trade Desk, Inc.",
              "marketState": "REGULAR",
              "market": "us_market",
              "regularMarketPreviousClose": 80.52,
              "fullExchangeName": "NasdaqGM",
              "longName": "The Trade Desk, Inc.",
              "exchange": "NGM",
              "exchangeDataDelayedBy": 0,
              "priceHint": 2,
              "regularMarketChangePercent": -8.202926,
              "regularMarketPrice": 73.915,
              "regularMarketTime": 1645027308,
              "regularMarketChange": -6.6049957,
              "symbol": "TTD"
            },
            {
              "language": "en-US",
              "region": "US",
              "quoteType": "EQUITY",
              "triggerable": true,
              "quoteSourceName": "Nasdaq Real Time Price",
              "sourceInterval": 15,
              "exchangeTimezoneName": "America/New_York",
              "exchangeTimezoneShortName": "EST",
              "gmtOffSetMilliseconds": -18000000,
              "esgPopulated": false,
              "tradeable": false,
              "shortName": "Corsair Gaming, Inc.",
              "marketState": "REGULAR",
              "market": "us_market",
              "regularMarketPreviousClose": 21.53,
              "fullExchangeName": "NasdaqGS",
              "longName": "Corsair Gaming, Inc.",
              "exchange": "NMS",
              "exchangeDataDelayedBy": 0,
              "priceHint": 2,
              "regularMarketChangePercent": 9.918248,
              "regularMarketPrice": 23.6654,
              "regularMarketTime": 1645027308,
              "regularMarketChange": 2.1353989,
              "symbol": "CRSR"
            },
            {
              "language": "en-US",
              "region": "US",
              "quoteType": "EQUITY",
              "triggerable": true,
              "quoteSourceName": "Nasdaq Real Time Price",
              "sourceInterval": 15,
              "exchangeTimezoneName": "America/New_York",
              "exchangeTimezoneShortName": "EST",
              "gmtOffSetMilliseconds": -18000000,
              "esgPopulated": false,
              "tradeable": false,
              "shortName": "Wix.com Ltd.",
              "marketState": "REGULAR",
              "market": "us_market",
              "regularMarketPreviousClose": 115.76,
              "fullExchangeName": "NasdaqGS",
              "longName": "Wix.com Ltd.",
              "exchange": "NMS",
              "exchangeDataDelayedBy": 0,
              "priceHint": 2,
              "regularMarketChangePercent": -25.535595,
              "regularMarketPrice": 86.2,
              "regularMarketTime": 1645027305,
              "regularMarketChange": -29.560005,
              "symbol": "WIX"
            },
            {
              "language": "en-US",
              "region": "US",
              "quoteType": "EQUITY",
              "triggerable": true,
              "quoteSourceName": "Nasdaq Real Time Price",
              "sourceInterval": 15,
              "exchangeTimezoneName": "America/New_York",
              "exchangeTimezoneShortName": "EST",
              "gmtOffSetMilliseconds": -18000000,
              "esgPopulated": false,
              "tradeable": false,
              "shortName": "HOOKIPA Pharma Inc.",
              "marketState": "REGULAR",
              "market": "us_market",
              "regularMarketPreviousClose": 1.34,
              "fullExchangeName": "NasdaqGS",
              "longName": "HOOKIPA Pharma Inc.",
              "exchange": "NMS",
              "exchangeDataDelayedBy": 0,
              "priceHint": 4,
              "regularMarketChangePercent": 57.83582,
              "regularMarketPrice": 2.115,
              "regularMarketTime": 1645027308,
              "regularMarketChange": 0.775,
              "symbol": "HOOK"
            },
            {
              "language": "en-US",
              "region": "US",
              "quoteType": "EQUITY",
              "triggerable": true,
              "quoteSourceName": "Nasdaq Real Time Price",
              "sourceInterval": 15,
              "exchangeTimezoneName": "America/New_York",
              "exchangeTimezoneShortName": "EST",
              "gmtOffSetMilliseconds": -18000000,
              "esgPopulated": false,
              "tradeable": false,
              "shortName": "Barrick Gold Corporation",
              "marketState": "REGULAR",
              "market": "us_market",
              "regularMarketPreviousClose": 20.68,
              "fullExchangeName": "NYSE",
              "longName": "Barrick Gold Corporation",
              "exchange": "NYQ",
              "exchangeDataDelayedBy": 0,
              "priceHint": 2,
              "regularMarketChangePercent": 6.2137322,
              "regularMarketPrice": 21.965,
              "regularMarketTime": 1645027309,
              "regularMarketChange": 1.2849998,
              "symbol": "GOLD"
            },
            {
              "language": "en-US",
              "region": "US",
              "quoteType": "EQUITY",
              "triggerable": true,
              "quoteSourceName": "Nasdaq Real Time Price",
              "sourceInterval": 15,
              "exchangeTimezoneName": "America/New_York",
              "exchangeTimezoneShortName": "EST",
              "gmtOffSetMilliseconds": -18000000,
              "esgPopulated": false,
              "tradeable": false,
              "shortName": "Crocs, Inc.",
              "marketState": "REGULAR",
              "market": "us_market",
              "regularMarketPreviousClose": 101.23,
              "fullExchangeName": "NasdaqGS",
              "longName": "Crocs, Inc.",
              "exchange": "NMS",
              "exchangeDataDelayedBy": 0,
              "priceHint": 2,
              "regularMarketChangePercent": -5.788896,
              "regularMarketPrice": 95.3699,
              "regularMarketTime": 1645027305,
              "regularMarketChange": -5.8601,
              "symbol": "CROX"
            },
            {
              "language": "en-US",
              "region": "US",
              "quoteType": "EQUITY",
              "triggerable": true,
              "quoteSourceName": "Nasdaq Real Time Price",
              "sourceInterval": 15,
              "exchangeTimezoneName": "America/New_York",
              "exchangeTimezoneShortName": "EST",
              "gmtOffSetMilliseconds": -18000000,
              "esgPopulated": false,
              "tradeable": false,
              "shortName": "Masimo Corporation",
              "marketState": "REGULAR",
              "market": "us_market",
              "regularMarketPreviousClose": 228.84,
              "fullExchangeName": "NasdaqGS",
              "longName": "Masimo Corporation",
              "exchange": "NMS",
              "exchangeDataDelayedBy": 0,
              "priceHint": 2,
              "regularMarketChangePercent": -34.347137,
              "regularMarketPrice": 150.24,
              "regularMarketTime": 1645027308,
              "regularMarketChange": -78.59999,
              "symbol": "MASI"
            },
            {
              "language": "en-US",
              "region": "US",
              "quoteType": "EQUITY",
              "triggerable": true,
              "quoteSourceName": "Nasdaq Real Time Price",
              "sourceInterval": 15,
              "exchangeTimezoneName": "America/New_York",
              "exchangeTimezoneShortName": "EST",
              "gmtOffSetMilliseconds": -18000000,
              "esgPopulated": false,
              "tradeable": false,
              "shortName": "Ericsson",
              "marketState": "REGULAR",
              "market": "us_market",
              "regularMarketPreviousClose": 12.45,
              "fullExchangeName": "NasdaqGS",
              "longName": "Telefonaktiebolaget LM Ericsson (publ)",
              "exchange": "NMS",
              "exchangeDataDelayedBy": 0,
              "priceHint": 2,
              "regularMarketChangePercent": -14.538148,
              "regularMarketPrice": 10.64,
              "regularMarketTime": 1645027301,
              "regularMarketChange": -1.8099995,
              "symbol": "ERIC"
            },
            {
              "language": "en-US",
              "region": "US",
              "quoteType": "EQUITY",
              "triggerable": true,
              "quoteSourceName": "Nasdaq Real Time Price",
              "sourceInterval": 15,
              "exchangeTimezoneName": "America/New_York",
              "exchangeTimezoneShortName": "EST",
              "gmtOffSetMilliseconds": -18000000,
              "esgPopulated": false,
              "tradeable": false,
              "shortName": "NVIDIA Corporation",
              "marketState": "REGULAR",
              "market": "us_market",
              "regularMarketPreviousClose": 264.95,
              "fullExchangeName": "NasdaqGS",
              "longName": "NVIDIA Corporation",
              "exchange": "NMS",
              "exchangeDataDelayedBy": 0,
              "priceHint": 2,
              "regularMarketChangePercent": -1.0643545,
              "regularMarketPrice": 262.13,
              "regularMarketTime": 1645027309,
              "regularMarketChange": -2.8200073,
              "symbol": "NVDA"
            },
            {
              "language": "en-US",
              "region": "US",
              "quoteType": "EQUITY",
              "triggerable": true,
              "quoteSourceName": "Nasdaq Real Time Price",
              "sourceInterval": 15,
              "exchangeTimezoneName": "America/New_York",
              "exchangeTimezoneShortName": "EST",
              "gmtOffSetMilliseconds": -18000000,
              "esgPopulated": false,
              "tradeable": false,
              "shortName": "Alteryx, Inc.",
              "marketState": "REGULAR",
              "market": "us_market",
              "regularMarketPreviousClose": 52.19,
              "fullExchangeName": "NYSE",
              "longName": "Alteryx, Inc.",
              "exchange": "NYQ",
              "exchangeDataDelayedBy": 0,
              "priceHint": 2,
              "regularMarketChangePercent": 9.915699,
              "regularMarketPrice": 57.365,
              "regularMarketTime": 1645027308,
              "regularMarketChange": 5.175003,
              "symbol": "AYX"
            },
            {
              "language": "en-US",
              "region": "US",
              "quoteType": "EQUITY",
              "triggerable": true,
              "quoteSourceName": "Nasdaq Real Time Price",
              "sourceInterval": 15,
              "exchangeTimezoneName": "America/New_York",
              "exchangeTimezoneShortName": "EST",
              "gmtOffSetMilliseconds": -18000000,
              "esgPopulated": false,
              "tradeable": false,
              "shortName": "Toast, Inc.",
              "marketState": "REGULAR",
              "market": "us_market",
              "regularMarketPreviousClose": 28.12,
              "fullExchangeName": "NYSE",
              "longName": "Toast, Inc.",
              "exchange": "NYQ",
              "exchangeDataDelayedBy": 0,
              "priceHint": 2,
              "regularMarketChangePercent": -19.096731,
              "regularMarketPrice": 22.75,
              "regularMarketTime": 1645027309,
              "regularMarketChange": -5.370001,
              "symbol": "TOST"
            },
            {
              "language": "en-US",
              "region": "US",
              "quoteType": "EQUITY",
              "triggerable": true,
              "quoteSourceName": "Nasdaq Real Time Price",
              "sourceInterval": 15,
              "exchangeTimezoneName": "America/New_York",
              "exchangeTimezoneShortName": "EST",
              "gmtOffSetMilliseconds": -18000000,
              "esgPopulated": false,
              "tradeable": false,
              "shortName": "Vinco Ventures, Inc.",
              "marketState": "REGULAR",
              "market": "us_market",
              "regularMarketPreviousClose": 3.53,
              "fullExchangeName": "NasdaqCM",
              "longName": "Vinco Ventures, Inc.",
              "exchange": "NCM",
              "exchangeDataDelayedBy": 0,
              "priceHint": 4,
              "regularMarketChangePercent": 4.55241,
              "regularMarketPrice": 3.6907,
              "regularMarketTime": 1645027306,
              "regularMarketChange": 0.16070008,
              "symbol": "BBIG"
            }
          ],
          "jobTimestamp": 1645024171268,
          "startInterval": 202202161400
        }
      ],
      "error": null
    }
  },
  quoteList: ["AAPL", "GOOG", "AMD", "IBM", "META"],
}