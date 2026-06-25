import axios from "axios";

const BASE_URL = "http://4.224.186.213/evaluation-service";

const REGISTER_PAYLOAD = {
  email: "24wh5a0510@bvrithyderabad.edu.in",
  name: "sravanireddygavinolla",
  mobileNo: "7842583524",
  githubUsername: "sravanireddy23",
  rollNo: "24wh5a0510",
  accessCode: "ahXjvp",
};

let cachedToken = null;

async function getAccessToken() {
  if (cachedToken) return cachedToken;

  try {
    // Step 1: Register and get client credentials
    const registerResponse = await axios.post(
      `${BASE_URL}/register`,
      REGISTER_PAYLOAD,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const clientID = registerResponse.data?.clientID;
    const clientSecret = registerResponse.data?.clientSecret;

    if (!clientID || !clientSecret) {
      throw new Error("Registration failed: client credentials not received");
    }

    // Step 2: Authenticate and get bearer token
    const authPayload = {
      email: REGISTER_PAYLOAD.email,
      name: REGISTER_PAYLOAD.name,
      rollNo: REGISTER_PAYLOAD.rollNo,
      accessCode: REGISTER_PAYLOAD.accessCode,
      clientID,
      clientSecret,
    };

    const authResponse = await axios.post(`${BASE_URL}/auth`, authPayload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const token = authResponse.data?.access_token;

    if (!token) {
      throw new Error("Authentication failed: access token not received");
    }

    cachedToken = token;
    return token;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to get access token"
    );
  }
}

export async function fetchNotifications({
  page = 1,
  limit = 10,
  notificationType = "",
} = {}) {
  try {
    const token = await getAccessToken();

    const params = {
      page,
      limit,
    };

    if (notificationType && notificationType !== "All") {
      params.type = notificationType;
    }

    const response = await axios.get(`${BASE_URL}/notifications`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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