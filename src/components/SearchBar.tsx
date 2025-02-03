import { Box, Button } from "@mui/material";
import OptionsBar from "./OptionsBar";
import { AirportsPicker } from "./AirportsPicker";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useRef } from "react";
import { UI_STRINGS } from "../ui-strings";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { PassengerCounts } from "../types";

const { Search } = UI_STRINGS;

interface SearchParams {
  origin: {
    skyId: string | undefined;
    entityId: string | undefined;
  };
  destination: {
    skyId: string | undefined;
    entityId: string | undefined;
  };
  fromDate: Date | undefined;
  toDate: Date | undefined;
  cabinClass: string | undefined;
  passengers: PassengerCounts;
}

export const SearchBar = () => {
  const searchParams = useRef<SearchParams>({
    origin: {
      skyId: undefined,
      entityId: undefined,
    },
    destination: {
      skyId: undefined,
      entityId: undefined,
    },
    fromDate: undefined,
    toDate: undefined,
    cabinClass: undefined,
    passengers: {
      adults: 0,
      children: 0,
      infantsInSeat: 0,
      infantsOnLap: 0,
    },
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <OptionsBar />
      <Box sx={{ display: "flex", gap: 4 }} width={"100%"}>
        <Box sx={{ display: "flex" }} flex={1}>
          <AirportsPicker
            onChange={(origin, destination) => {
              searchParams.current.origin = {
                skyId: origin?.skyId,
                entityId: origin?.entityId,
              };
              searchParams.current.destination = {
                skyId: destination?.skyId,
                entityId: destination?.entityId,
              };
            }}
          />
        </Box>
        <Box sx={{ display: "flex" }} flex={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              onChange={(dates) => {
                searchParams.current.fromDate = dates[0]?.toDate();
                searchParams.current.toDate = dates[1]?.toDate();
              }}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      <Button variant="contained">
        <SearchOutlinedIcon />
        {Search}
      </Button>
    </Box>
  );
};
