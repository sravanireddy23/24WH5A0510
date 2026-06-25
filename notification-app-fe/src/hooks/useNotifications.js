import { useEffect, useState } from "react";
import { fetchNotifications } from "../api/notifications";

export function useNotifications({ page = 1, limit = 10, filter = "All" }) {
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchNotifications({
          page,
          limit,
          notificationType: filter,
        });

        setNotifications(data.notifications ?? []);
        setTotal(data.total ?? 0);
      } catch (err) {
        setError(err.message || "Failed to load notifications");
        setNotifications([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page, limit, filter]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return { notifications, total, totalPages, loading, error };
}