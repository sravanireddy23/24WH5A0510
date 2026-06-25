import axios from "axios";

const API_URL = "http://4.224.186.213/evaluation-service/notifications";

export async function fetchNotifications({
  page = 1,
  limit = 10,
  notificationType = "",
} = {}) {
  try {
    const params = {
      page,
      limit,
    };

    if (notificationType && notificationType !== "All") {
      params.notification_type = notificationType;
    }

    const response = await axios.get(API_URL, { params });

    return {
      notifications: response.data?.notifications ?? [],
      total: response.data?.total ?? response.data?.notifications?.length ?? 0,
    };
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch notifications"
    );
  }
}