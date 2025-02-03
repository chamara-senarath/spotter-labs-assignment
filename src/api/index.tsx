import { Airport, FlightData, SearchFlightsParams } from "../types";

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

export const searchAirport = async ({
  query,
}: {
  query: string;
}): Promise<Airport[] | undefined> => {
  const searchParams = new URLSearchParams({
    query: query,
  });
  const url = `${apiURL}/flights/searchAirport?${searchParams}`;

  try {
    const response = await fetch(url, options);
    const jsonResponse = await response.json();
    return jsonResponse.data;
  } catch (error) {
    console.error(error);
  }
};

export const searchFlights = async (
  params: SearchFlightsParams
): Promise<FlightData[] | undefined> => {
  const searchParams = new URLSearchParams({
    originSkyId: params.origin.skyId ?? "",
    destinationSkyId: params.destination.skyId ?? "",
    originEntityId: params.origin.entityId ?? "",
    destinationEntityId: params.destination.entityId ?? "",
    date: params.fromDate ?? "",
    returnDate: params.toDate ?? "",
    cabinClass: params.cabinClass ?? "",
    adults: params.passengers.adults.toString() ?? "",
    childrens: params.passengers.children.toString() ?? "",
    infants: params.passengers.infantsInSeat.toString() ?? "",
    limit: "10",
  });

  const url = `${apiURL}/flights/searchFlights?${searchParams}`;

  try {
    const response = await fetch(url, options);
    const jsonResponse = await response.json();
    return jsonResponse?.data?.itineraries;
  } catch (error) {
    console.error(error);
  }
};
