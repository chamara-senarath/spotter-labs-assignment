import { Paper } from "@mui/material";
import banner from "../assets/banner.png";
import { SearchBar } from "./SearchBar";

export const Home = () => {
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
      <Paper sx={{ px: 4, py: 1, borderRadius: 2 }}>
        <SearchBar />
      </Paper>
    </>
  );
};
