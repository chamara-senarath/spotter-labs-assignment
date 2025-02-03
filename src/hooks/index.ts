import { useQuery } from "@tanstack/react-query";
import { searchAirport, searchFlights } from "../api";
import { Airport, FlightData, SearchFlightsParams } from "../types";

export const useSearchAirport = (params: { query: string }) => {
  const { data, isLoading, error } = useQuery<Airport[]>({
    queryFn: async () => {
      const result = await searchAirport(params);
      if (!result) {
        throw new Error("No airport data found");
      }
      return result;
    },
    queryKey: ["search-airport", params.query],
    // enabled: !!params.query,
    enabled: false,
  });

  if (error) {
    console.log(error);
  }

  return { data, isLoading };
};

export const useSearchFlights = (params: SearchFlightsParams) => {
  const { data, isLoading, error } = useQuery<FlightData[]>({
    queryFn: async () => {
      const result = await searchFlights(params);
      if (!result) {
        throw new Error("No flight data found");
      }
      return result;
    },
    queryKey: ["search-flights", params],
    // enabled: !!params.query,
    enabled: false,
  });

  if (error) {
    console.log(error);
  }

  return { data, isLoading };
};
