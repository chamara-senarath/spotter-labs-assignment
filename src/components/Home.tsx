import { Box, Paper, Typography } from "@mui/material";
import banner from "../assets/banner.png";
import { SearchBar } from "./SearchBar";
import { useState } from "react";
import { SearchFlightsParams } from "../types";
import { FlightDetails } from "./FlightDetails";
import { UI_STRINGS } from "../ui-strings";
import { useSearchFlights } from "../hooks";

const { DepartingFlights } = UI_STRINGS;

export const Home = () => {
  const [params, setParams] = useState<SearchFlightsParams | undefined>();
  const { data: flightData, isLoading } = useSearchFlights(params);

  return (
    <>
      <img
        src={banner}
        style={{
          height: 300,
          width: "100%",
          objectFit: "cover",
          objectPosition: "0 25%",
          WebkitMaskImage:
            "radial-gradient(circle, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
          maskImage:
            "radial-gradient(circle, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
        }}
        alt="banner"
      />
      <Box display={"flex"} flexDirection={"column"} gap={6}>
        <Paper sx={{ px: 4, py: 1, borderRadius: 2 }}>
          <SearchBar onClickSearch={setParams} isLoading={isLoading} />
        </Paper>
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          {flightData && flightData?.length > 0 && (
            <Typography variant="h5">{DepartingFlights}</Typography>
          )}
          {flightData?.map((data) => (
            <FlightDetails key={data.id} flightData={data} />
          ))}
        </Box>
      </Box>
    </>
  );
};
