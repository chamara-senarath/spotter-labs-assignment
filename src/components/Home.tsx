import { Box } from "@mui/system";
import banner from "../assets/banner.png";
import SearchBar from "./SearchBar";

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
        }}
        alt="banner"
      />
      <Box>
        <SearchBar />
      </Box>
    </>
  );
};
