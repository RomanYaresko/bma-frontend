import AppLayout from "@/components/layouts/AppLayout";
import { routes } from "@/router";
import { createTheme, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useUserStore } from "./stores";

const App = () => {
  const userStore = useUserStore();

  useEffect(() => {
    userStore.populate();
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const routeComponents = Object.values(routes).map(
    ({ path, element }, key) => (
      <Route path={path} element={element} key={key} />
    )
  );

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={darkTheme}>
          <AppLayout>
            <Routes>{routeComponents}</Routes>
          </AppLayout>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
};

export default App;
