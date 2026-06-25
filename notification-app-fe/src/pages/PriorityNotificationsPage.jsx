import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { NotificationCard } from "../components/NotificationCard";
import { useNotifications } from "../hooks/useNotifications";

const priorityWeight = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export function PriorityNotificationsPage() {
  const [topN, setTopN] = useState(10);

  const { notifications, loading, error } = useNotifications({
    page: 1,
    limit: 50,
    filter: "All",
  });

  const [viewedIds, setViewedIds] = useState(() => {
    const saved = localStorage.getItem("viewedNotifications");
    return saved ? JSON.parse(saved) : [];
  });

  const priorityNotifications = useMemo(() => {
    return [...notifications]
      .sort((a, b) => {
        const weightDiff =
          (priorityWeight[b.Type] || 0) - (priorityWeight[a.Type] || 0);

        if (weightDiff !== 0) return weightDiff;

        return new Date(b.Timestamp) - new Date(a.Timestamp);
      })
      .slice(0, topN);
  }, [notifications, topN]);

  const handleMarkViewed = (id) => {
    if (viewedIds.includes(id)) return;

    const updated = [...viewedIds, id];
    setViewedIds(updated);
    localStorage.setItem("viewedNotifications", JSON.stringify(updated));
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", px: 2, py: 4 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={3}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <StarIcon color="warning" />
          <Typography variant="h5" fontWeight={700}>
            Priority Notifications
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2">Top N:</Typography>
          <Select
            size="small"
            value={topN}
            onChange={(e) => setTopN(Number(e.target.value))}
          >
            {[5, 10, 15, 20].map((n) => (
              <MenuItem key={n} value={n}>
                {n}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {loading && (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error">Failed to load notifications: {error}</Alert>
      )}

      {!loading && !error && priorityNotifications.length === 0 && (
        <Alert severity="info">No priority notifications found.</Alert>
      )}

      {!loading && !error && priorityNotifications.length > 0 && (
        <Stack spacing={1.5}>
          {priorityNotifications.map((n) => (
            <NotificationCard
              key={n.ID}
              notification={n}
              viewed={viewedIds.includes(n.ID)}
              onClick={handleMarkViewed}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}