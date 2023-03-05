import { createTheme, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { Route, Routes } from "react-router";
import { Comments } from "./components/Comments";
import { Stories } from "./components/Stories";
//import { Comments } from "./components/Comments";
import "./styles.css";

export default function App() {
  const stateTheme = "dark";
  const themeToUse = useMemo(
    () =>
      createTheme({
        palette: {
          mode: stateTheme,
          text: {
            primary: stateTheme === "light" ? "#18191A" : "#ffffff",
          },
          divider: stateTheme === "light" ? "#18191A" : "#ffffff",
          primary: {
            main: stateTheme === "dark" ? "#18191A" : "#ffffff",
            dark: "#18191A",
            light: "#ffffff",
            contrastText:
              stateTheme === "light" ? "#18191A" : "rgb(150,150,150)",
          },
          common: {
            black: "#18191A",
            white: "#F0F2F5",
          },
        },
      }),
    [stateTheme]
  );
  return (
    <ThemeProvider theme={themeToUse}>
      <Routes>
        <Route path="/stories" element={<Stories />} />
        <Route path="/feed" element={<Comments />} />
      </Routes>
    </ThemeProvider>
  );
}
