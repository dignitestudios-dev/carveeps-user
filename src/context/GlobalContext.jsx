import React, { createContext, useState, useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getFCMToken from "../firebase/getFcmToken";
import { onMessageListener } from "../firebase/messages";
export const GlobalContext = createContext();
import axios from "axios";
import Cookies from "js-cookie";
//

export const GlobalContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const baseUrl = "https://api.carveeps.com";

  // Sidebar link toggle
  const [activeLink, setActiveLink] = useState("Dashboard");
  const navigateToLink = (link, name) => {
    navigate(link);
    setActiveLink(name);
  };

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  const [error, setError] = useState(false);

  // Send fcm to backend:
  const fetchToken = async () => {
    const token = await getFCMToken(setTokenFound);
    const authToken = Cookies.get("token");
    if (!authToken) {
      // setError("FCM Token Not found");
    } else if (authToken) {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      axios
        .post(
          `${baseUrl}/auth/updateFCM`,
          {
            fcmToken: token,
          },
          { headers }
        )
        .then((response) => {})
        .catch((err) => {
          // setError(err?.response?.data?.message);
        });
    }

    // You can send this token to your server or use it as needed
  };

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
    })
    .catch((err) => console.log("failed: ", err));

  // for profile
  const [update, setUpdate] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        activeLink,
        setActiveLink,
        navigateToLink,
        baseUrl,
        navigate,
        show,
        notification,
        error,
        setError,
        setShow,
        fetchToken,
        update,
        setUpdate,
      }}
    >
      <div>{children}</div>
    </GlobalContext.Provider>
  );
};
