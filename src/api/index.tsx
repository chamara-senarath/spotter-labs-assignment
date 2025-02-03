const apiURL = import.meta.env.VITE_SKY_SCRAPER_URL;
const apiKey = import.meta.env.VITE_RAPID_API_KEY;
const host = import.meta.env.VITE_RAPID_API_HOST;

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": apiKey,
    "x-rapidapi-host": host,
  },
};

export const searchAirport = async ({ query }: { query: string }) => {
  const url = `${apiURL}/flights/searchAirport?query=${encodeURI(
    query
  )}&locale=en-US`;

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
