import AppAvatar from "@/components/base/AppAvatar";
import { routes } from "@/router";
import { useUserStore } from "@/stores";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  ButtonGroup,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AppDrawer = () => {
  const userStore = useUserStore();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const handleLogoutOnClick = async () => {
    try {
      await userStore.logout();
      navigate(routes.homePage.path);
    } catch (e) {
      const error = e as AxiosError;
      console.error(error);
    }
  };

  const drawerContent = (
    <>
      <Box
        sx={Object.assign(
          {},
          {
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            margin: "0.5rem",
          },
          isMobile ? { flexDirection: "column" } : { flexDirection: "row" }
        )}
      >
        {userStore.user ? (
          <>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                variant="h6"
              >
                {userStore.user?.given_name}
              </Typography>
              <AppAvatar user={userStore.user} />
            </Box>
            <ButtonGroup
              orientation={isMobile ? "vertical" : "horizontal"}
              variant="text"
              color="error"
            >
              <Button
                component={Link}
                to={routes.userUpdate.path}
                variant="contained"
                color="warning"
                size="small"
              >
                Update
              </Button>
              <Button
                onClick={handleLogoutOnClick}
                variant="contained"
                color="error"
                size="small"
              >
                Logout
              </Button>
            </ButtonGroup>
          </>
        ) : (
          <>
            <ButtonGroup
              orientation={isMobile ? "vertical" : "horizontal"}
              variant="text"
              color="success"
            >
              <Button
                component={Link}
                to={routes.login.path}
                variant="contained"
                color="primary"
              >
                Login
              </Button>
              <Button
                component={Link}
                to={routes.register.path}
                variant="contained"
                color="secondary"
              >
                Register
              </Button>
            </ButtonGroup>
          </>
        )}
        <ButtonGroup
          orientation={isMobile ? "vertical" : "horizontal"}
          variant="text"
          color="success"
        >
          <Button
            component={Link}
            to={routes.homePage.path}
            variant="outlined"
            color="success"
          >
            Home
          </Button>
          <Button
            component={Link}
            to={routes.authorList.path}
            variant="outlined"
            color="success"
          >
            Authors
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );

  return (
    <>
      {isMobile ? (
        <>
          <Drawer open={drawerIsOpen} onClose={() => setDrawerIsOpen(false)}>
            {drawerContent}
          </Drawer>
          <IconButton onClick={() => setDrawerIsOpen(!drawerIsOpen)}>
            <MenuIcon sx={{ color: "white", fontSize: "1.5em" }} />
          </IconButton>
        </>
      ) : (
        <>{drawerContent}</>
      )}
    </>
  );
};
export default AppDrawer;
