import {
  Box,
  IconButton,
  Autocomplete,
  TextField,
  InputAdornment,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useMemo, useState } from "react";
import { UI_STRINGS } from "../ui-strings";
import { useSearchAirport } from "../hooks/useSearchAirport";
import debounce from "lodash.debounce";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { Airport } from "../types";

const { From, To, WhereFrom, WhereTo } = UI_STRINGS;

type Option = Pick<Airport, "skyId"> &
  Pick<Airport["presentation"], "suggestionTitle"> &
  Pick<Airport["navigation"]["relevantFlightParams"], "flightPlaceType">;

export const AirportsPicker = () => {
  const [origin, setOrigin] = useState<Option | null>(null);
  const [destination, setDestination] = useState<Option | null>(null);

  const [query, setQuery] = useState("");

  const { data: fromData, isLoading } = useSearchAirport({ query: query });

  const options: Option[] = useMemo(() => {
    if (!fromData) return [];
    return fromData.map((airportData) => ({
      skyId: airportData.skyId,
      suggestionTitle: airportData.presentation.suggestionTitle,
      flightPlaceType:
        airportData.navigation.relevantFlightParams.flightPlaceType,
    }));
  }, [fromData]);

  const handleSwap = () => {
    //TODO: Implement swap logic
  };

  const debouncedSetQuery = debounce((value: string) => {
    setQuery(value);
  }, 300);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        width: "100%",
      }}
    >
      <Autocomplete
        freeSolo
        loading={isLoading}
        value={origin}
        options={options}
        getOptionLabel={(option) => (option as Option).suggestionTitle}
        onInputChange={(_, value) => debouncedSetQuery(value)}
        onChange={(_, value) => {
          setOrigin(value as Option);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={From}
            placeholder={WhereFrom}
            fullWidth
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <PlaceOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>{option.suggestionTitle}</li>
        )}
        fullWidth
      />

      <IconButton onClick={handleSwap} sx={{ mx: 1 }}>
        <SwapHorizIcon />
      </IconButton>

      <Autocomplete
        freeSolo
        loading={isLoading}
        value={destination}
        options={options}
        getOptionLabel={(option) => (option as Option).suggestionTitle}
        onInputChange={(_, value) => debouncedSetQuery(value)}
        onChange={(_, value) => {
          setDestination(value as Option);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={To}
            placeholder={WhereTo}
            fullWidth
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <PlaceOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>{option.suggestionTitle}</li>
        )}
        fullWidth
      />
    </Box>
  );
};
