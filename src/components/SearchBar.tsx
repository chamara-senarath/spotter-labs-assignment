import { Box } from "@mui/material";
import OptionsBar from "./OptionsBar";
import { AirportsPicker } from "./AirportsPicker";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

export const SearchBar = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <OptionsBar />
      <Box sx={{ display: "flex", gap: 4 }} width={"100%"}>
        <Box sx={{ display: "flex" }} flex={1}>
          <AirportsPicker />
        </Box>
        <Box sx={{ display: "flex" }} flex={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker />
          </LocalizationProvider>
        </Box>
      </Box>
    </Box>
  );
};
