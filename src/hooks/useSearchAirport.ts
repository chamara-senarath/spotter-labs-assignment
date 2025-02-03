import { useQuery } from "@tanstack/react-query";
import { searchAirport } from "../api";
import { Airport } from "../types";

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
    enabled: !!params.query,
  });

  if (error) {
    console.log(error);
  }

  return { data, isLoading };
};
