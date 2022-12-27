export const options = {
  method: 'GET',
  url: 'https://yh-finance.p.rapidapi.com/auto-complete',
  headers: {
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': process.env.API_HOST,
  }
};