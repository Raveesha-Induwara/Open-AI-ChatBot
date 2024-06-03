import { Box, useMediaQuery, useTheme } from "@mui/material";
import TypingAnimation from "../components/typer/TypingAnimation";
import Footer from "../components/Footer";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        flex: "flex",
        mx: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
        }}
      >
        <TypingAnimation />
      </Box>

      {/* Icon image container */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { md: "row", xs: "column", sm: "column" },
          gap: 5,
          my: 10,
        }}
      >
        <img
          src="/robot.png"
          alt="robot"
          style={{ width: "150px", margin: "auto" }}
        />
        <img
          className="image-inverted rotate"
          src="/openai.png"
          alt="openai"
          style={{ width: "120px", margin: "auto" }}
        />
      </Box>

      {/* Chat image */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          mx: "auto",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
          mb: 5,
        }}
      >
        <img
          src="/chat.png"
          alt="chat-img"
          style={{
            width: isBelowMd ? "80%" : "60%",
            display: "flex",
            margin: "auto",
            borderRadius: "20px",
            boxShadow: "-5px -5px 100px #64f3d5",
          }}
        />
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;
