import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import { PropsWithChildren } from "react";
import { UI_STRINGS } from "../ui-strings";
const { Flights } = UI_STRINGS;

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="relative" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h5" color="primary" component="div">
            {Flights}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
    </Box>
  );
};
