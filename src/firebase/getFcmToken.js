// getFCMToken.js
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

const getFCMToken = async (setTokenFound) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BJ6JFJnbcjg3haaH-azbb0O2VdszwSpupa0gfFEOe3iqozgHghX664-EeDXBoOyOg6u9q3bvBKZch0TWH2TtwjA",
      });
      setTokenFound(true);
      return token;
    } else {
      console.error("Notification permission denied");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

export default getFCMToken;
