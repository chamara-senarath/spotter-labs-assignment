import { useQuery } from "@tanstack/react-query";
import { searchAirport } from "../api";

export const useSearchAirport = (params: { query: string }) => {
  const { data, isLoading, error } = useQuery({
    queryFn: () => searchAirport(params),
    queryKey: ["search-airport", params.query],
    enabled: !!params.query,
  });

  if (error) {
    console.log(error);
  }

  return { data, isLoading };
};
