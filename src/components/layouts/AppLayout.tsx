import AppNavbar from "@/components/navbar/AppNavbar";
import { Container, Paper } from "@mui/material";
import React from "react";

const AppLayout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <AppNavbar />
      <Paper square>
        <Container maxWidth="xl">
          <Paper
            sx={{
              padding: "0.5rem",
              paddingTop: "80px",
              gap: "1rem",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            square
            elevation={6}
          >
            {props.children}
          </Paper>
        </Container>
      </Paper>
    </>
  );
};

export default AppLayout;
