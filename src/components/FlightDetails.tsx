import { Box, Typography, Stack } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { FlightData } from "../types";
import { UI_STRINGS } from "../ui-strings";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const { SelfTransfer, Stop, Stops, NonStop } = UI_STRINGS;

type Props = {
  flightData: FlightData;
};

export const FlightDetails = ({ flightData }: Props) => {
  const flight = flightData.legs[0];
  const fromAirport = flight.origin.displayCode;
  const toAirport = flight.destination.displayCode;
  const totalMinutes = flight.durationInMinutes;
  const totalDuration = dayjs
    .duration(totalMinutes, "minutes")
    .format("H [hr] m [min]");
  const layoverAirports = flight.segments
    .map((segment) => segment.destination.displayCode)
    .slice(0, -1)
    .join(", ");

  const flightCarriers = new Set();

  flightData.legs.forEach((leg) => {
    leg.carriers.marketing.forEach((carrier) => {
      flightCarriers.add(carrier.name);
    });

    if (leg.carriers.operating) {
      leg.carriers.operating.forEach((carrier) => {
        flightCarriers.add(carrier.name);
      });
    }
  });

  const formattedFlightTime = (departureISO: string, arrivalISO: string) => {
    const depTime = dayjs(departureISO).format("hh:mm A");
    const arrTime = dayjs(arrivalISO).format("hh:mm A");

    const isNextDay = dayjs(arrivalISO).date() > dayjs(departureISO).date();

    return (
      <>
        {depTime} - {arrTime}
        {isNextDay && <sup>+1</sup>}
      </>
    );
  };

  const formattedTime = formattedFlightTime(flight.departure, flight.arrival);

  const formattedStops = () => {
    const stops = Math.max(flightData.legs.length - 1, 0);
    switch (stops) {
      case 0:
        return NonStop;
      case 1:
        return `${stops} ${Stop}`;
      default:
        return `${stops} ${Stops}`;
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 1.5, sm: 2 },
        border: "1px solid #e0e0e0",
        borderRadius: 1,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={{ xs: 2, sm: 0 }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <FlightTakeoffIcon color="primary" />
          <Stack>
            <Typography variant="subtitle1" fontWeight="bold">
              {formattedTime}
            </Typography>

            {flightData.isSelfTransfer && (
              <Typography variant="body2" color="error">
                {SelfTransfer}
              </Typography>
            )}
            <Box display={"flex"} gap={2} flexWrap="wrap">
              {Array.from(flightCarriers).map((carrier) => (
                <Typography
                  key={carrier as string}
                  variant="body2"
                  color="text.secondary"
                >
                  {carrier as string}
                </Typography>
              ))}
            </Box>
          </Stack>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 4 }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          width={{ xs: "100%", sm: "auto" }}
        >
          <Box textAlign={{ xs: "left", sm: "center" }}>
            <Typography variant="body1">{totalDuration}</Typography>
            <Typography variant="body2" color="text.secondary">
              {fromAirport}-{toAirport}
            </Typography>
          </Box>

          <Box textAlign={{ xs: "left", sm: "center" }}>
            <Typography variant="body1">{formattedStops()}</Typography>
            <Typography variant="body2" color="text.secondary">
              {layoverAirports}
            </Typography>
          </Box>

          <Box textAlign={{ xs: "left", sm: "right" }}>
            <Typography variant="h6" fontWeight="bold">
              {flightData.price.formatted}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              round trip
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
