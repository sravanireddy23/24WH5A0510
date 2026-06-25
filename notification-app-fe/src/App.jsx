
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import { NotificationsPage } from "./pages/NotificationsPage";
import { PriorityNotificationsPage } from "./pages/PriorityNotificationsPage";

function Navbar() {
  const location = useLocation();

  return (
    <AppBar position="sticky" color="primary" elevation={2}>
      <Toolbar>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          width="100%"
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1.2} alignItems="center">
            <NotificationsActiveIcon />
            <Typography variant="h6" fontWeight={700}>
              Campus Notifications
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Button
              component={Link}
              to="/"
              variant={location.pathname === "/" ? "contained" : "outlined"}
              color="inherit"
              sx={{
                backgroundColor:
                  location.pathname === "/" ? "rgba(255,255,255,0.18)" : "transparent",
              }}
            >
              All Notifications
            </Button>
            <Button
              component={Link}
              to="/priority"
              variant={location.pathname === "/priority" ? "contained" : "outlined"}
              color="inherit"
              sx={{
                backgroundColor:
                  location.pathname === "/priority"
                    ? "rgba(255,255,255,0.18)"
                    : "transparent",
              }}
            >
              Priority
            </Button>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg">
        <Box py={2}>
          <Routes>
            <Route path="/" element={<NotificationsPage />} />
            <Route path="/priority" element={<PriorityNotificationsPage />} />
          </Routes>
        </Box>
      </Container>
    </BrowserRouter>
  );
}