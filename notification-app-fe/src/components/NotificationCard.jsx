import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  Box,
} from "@mui/material";

const typeColor = {
  Placement: "success",
  Result: "primary",
  Event: "warning",
};

export function NotificationCard({ notification, viewed, onClick }) {
  const { ID, Type, Message, Timestamp } = notification;

  return (
    <Card
      onClick={() => onClick?.(ID)}
      sx={{
        cursor: "pointer",
        borderLeft: viewed ? "4px solid #cfd8dc" : "4px solid #1976d2",
        backgroundColor: viewed ? "#fafafa" : "#f5f9ff",
        transition: "0.2s ease",
        "&:hover": {
          boxShadow: 4,
          transform: "translateY(-1px)",
        },
      }}
    >
      <CardContent>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={1}
        >
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>
              {Message}
            </Typography>

            <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
              <Chip
                label={Type}
                color={typeColor[Type] || "default"}
                size="small"
              />
              <Chip
                label={viewed ? "Viewed" : "New"}
                color={viewed ? "default" : "error"}
                size="small"
                variant={viewed ? "outlined" : "filled"}
              />
            </Stack>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ minWidth: 150 }}
          >
            {new Date(Timestamp).toLocaleString()}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}