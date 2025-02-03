import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Typography,
  IconButton,
  Button,
  Popover,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SyncAltOutlinedIcon from "@mui/icons-material/SyncAltOutlined";
import { UI_STRINGS } from "../ui-strings";

const {
  Adults,
  Aged,
  Business,
  Children,
  Economy,
  First,
  Infants,
  InSeat,
  MultiCity,
  OneWay,
  OnLap,
  PremiumEconomy,
  RoundTrip,
} = UI_STRINGS;

interface PassengerCounts {
  adults: number;
  children: number;
  infantsInSeat: number;
  infantsOnLap: number;
}

enum TripType {
  RoundTrip = "roundTrip",
  OneWay = "oneWay",
  MultiCity = "multiCity",
}

enum CabinSeats {
  Economy = "economy",
  PremiumEconomy = "premiumEconomy",
  Business = "business",
  First = "first",
}

const OptionsBar = () => {
  const [tripType, setTripType] = useState(TripType.RoundTrip);
  const [passengers, setPassengers] = useState<PassengerCounts>({
    adults: 1,
    children: 0,
    infantsInSeat: 0,
    infantsOnLap: 0,
  });
  const [cabinClass, setCabinClass] = useState(CabinSeats.Economy);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleCabinClassChange = (event: SelectChangeEvent<string>) => {
    setCabinClass(event.target.value as CabinSeats);
  };

  const handleTripTypeChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setTripType(value as TripType);
  };

  const handlePassengerChange = (
    type: keyof PassengerCounts,
    increment: boolean
  ) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : Math.max(0, prev[type] - 1),
    }));
  };

  const getTotalPassengers = () => {
    return Object.values(passengers).reduce((sum, count) => sum + count, 0);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <FormControl sx={{ minWidth: 120 }}>
        <Select
          value={tripType}
          onChange={handleTripTypeChange}
          displayEmpty
          inputProps={{ "aria-label": "Trip type selector" }}
          input={
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">
                  <SyncAltOutlinedIcon />
                </InputAdornment>
              }
            />
          }
        >
          <MenuItem value="roundTrip">{RoundTrip}</MenuItem>
          <MenuItem value="oneWay">{OneWay}</MenuItem>
          <MenuItem value="multiCity">{MultiCity}</MenuItem>
        </Select>
      </FormControl>

      <Box>
        <Button
          variant="outlined"
          endIcon={anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          startIcon={<PersonOutlineOutlinedIcon />}
          disableRipple
          disableElevation
          sx={{
            textTransform: "none",
            height: 56,
            borderRadius: "4px",
            padding: "10px 14px",
            justifyContent: "space-between",
            color: "text.primary",
            borderColor: "rgba(0, 0, 0, 0.23)",
            "&:hover": {
              borderColor: "rgba(0, 0, 0, 0.87)",
            },
          }}
          onClick={handleOpenPopover}
        >
          {getTotalPassengers()}
        </Button>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Box sx={{ p: 3, width: 300 }}>
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="subtitle1">{Adults}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    onClick={() => handlePassengerChange("adults", false)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{passengers.adults}</Typography>
                  <IconButton
                    onClick={() => handlePassengerChange("adults", true)}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="subtitle1">{Children}</Typography>
                  <Typography variant="caption">{Aged} 2-11</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    onClick={() => handlePassengerChange("children", false)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{passengers.children}</Typography>
                  <IconButton
                    onClick={() => handlePassengerChange("children", true)}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="subtitle1">{Infants}</Typography>
                  <Typography variant="caption">{InSeat}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    onClick={() =>
                      handlePassengerChange("infantsInSeat", false)
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{passengers.infantsInSeat}</Typography>
                  <IconButton
                    onClick={() => handlePassengerChange("infantsInSeat", true)}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="subtitle1">{Infants}</Typography>
                  <Typography variant="caption">{OnLap}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    onClick={() => handlePassengerChange("infantsOnLap", false)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{passengers.infantsOnLap}</Typography>
                  <IconButton
                    onClick={() => handlePassengerChange("infantsOnLap", true)}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button onClick={handleClosePopover}>Cancel</Button>
              <Button onClick={handleClosePopover} variant="contained">
                Done
              </Button>
            </Box>
          </Box>
        </Popover>
      </Box>

      <FormControl sx={{ minWidth: 120 }}>
        <Select
          value={cabinClass}
          onChange={handleCabinClassChange}
          displayEmpty
          inputProps={{ "aria-label": "Cabin class selector" }}
        >
          <MenuItem value="economy">{Economy}</MenuItem>
          <MenuItem value="premiumEconomy">{PremiumEconomy}</MenuItem>
          <MenuItem value="business">{Business}</MenuItem>
          <MenuItem value="first">{First}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default OptionsBar;
