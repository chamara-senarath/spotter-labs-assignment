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
import { DatePicker } from "@mui/x-date-pickers-pro";
const { Search } = UI_STRINGS;

type Props = {
  isLoading: boolean;
  onClickSearch: (params: SearchFlightsParams) => void;
};

export const SearchBar = ({ isLoading, onClickSearch }: Props) => {
  const [searchParams, setSearchParams] = useState<SearchFlightsParams>({
    isOneWay: false,
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
        onChange={({ isOneWay, cabinClass, passengers }) => {
          setSearchParams((prev) => ({
            ...prev,
            isOneWay,
            cabinClass,
            passengers,
          }));
        }}
      />
      <Box display={"flex"} flexWrap={"wrap"} gap={4} width={"100%"}>
        <Box display={"flex"} flex={1}>
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
        <Box display={"flex"} flex={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {searchParams.isOneWay ? (
              <DatePicker
                label="Select Date"
                onChange={(newValue) => {
                  setSearchParams((prev) => ({
                    ...prev,
                    fromDate: newValue?.format("YYYY-MM-DD"),
                    toDate: undefined,
                  }));
                }}
              />
            ) : (
              <DateRangePicker
                onChange={(dates) => {
                  setSearchParams((prev) => ({
                    ...prev,
                    fromDate: dates[0]?.format("YYYY-MM-DD"),
                    toDate: dates[1]?.format("YYYY-MM-DD"),
                  }));
                }}
              />
            )}
          </LocalizationProvider>
        </Box>
      </Box>
      <Button
        variant="contained"
        onClick={handleSearch}
        disabled={disableSearch}
        loading={isLoading}
      >
        <SearchOutlinedIcon />
        {Search}
      </Button>
    </Box>
  );
};
