import { Box, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useState } from "react";
import { UI_STRINGS } from "../ui-strings";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { SearchFlightsParams } from "../types";
import OptionsBar from "./OptionsBar";
import { AirportsPicker } from "./AirportsPicker";

const { Search } = UI_STRINGS;

type Props = {
  onClickSearch: (params: SearchFlightsParams) => void;
};

export const SearchBar = ({ onClickSearch }: Props) => {
  const [searchParams, setSearchParams] = useState<SearchFlightsParams>({
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

  const disableSearch =
    !searchParams.origin.entityId ||
    !searchParams.origin.skyId ||
    !searchParams.destination.entityId ||
    !searchParams.destination.skyId ||
    !searchParams.fromDate;

  const handleSearch = () => {
    onClickSearch(searchParams);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <OptionsBar
        onChange={({ cabinClass, passengers }) => {
          setSearchParams((prev) => ({
            ...prev,
            cabinClass,
            passengers,
          }));
        }}
      />
      <Box sx={{ display: "flex", gap: 4 }} width={"100%"}>
        <Box sx={{ display: "flex" }} flex={1}>
          <AirportsPicker
            onChange={(origin, destination) => {
              setSearchParams((prev) => ({
                ...prev,
                origin: {
                  skyId: origin?.skyId,
                  entityId: origin?.entityId,
                },
                destination: {
                  skyId: destination?.skyId,
                  entityId: destination?.entityId,
                },
              }));
            }}
          />
        </Box>
        <Box sx={{ display: "flex" }} flex={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              onChange={(dates) => {
                setSearchParams((prev) => ({
                  ...prev,
                  fromDate: dates[0]?.format("YYYY-MM-DD"),
                  toDate: dates[1]?.format("YYYY-MM-DD"),
                }));
              }}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      <Button
        variant="contained"
        onClick={handleSearch}
        disabled={disableSearch}
      >
        <SearchOutlinedIcon />
        {Search}
      </Button>
    </Box>
  );
};
