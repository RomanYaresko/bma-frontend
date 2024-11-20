import AppDrawer from "@/components/navbar/AppDrawer";
import { AppBar, Box, Toolbar } from "@mui/material";

const AppNavbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            gap: "1em",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppDrawer />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default AppNavbar;
