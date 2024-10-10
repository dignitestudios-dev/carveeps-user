import React, { useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";
import BtnLoader from "../components/global/BtnLoader";

const NotificationSettings = () => {
  const [data, setData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  const { navigateToLink, baseUrl, setError } = useContext(GlobalContext);

  const getSettings = () => {
    const token = Cookies.get("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setDataLoading(true);
      axios
        .get(`${baseUrl}/user/settings`, { headers })
        .then((response) => {
          setData(response?.data?.data);
          setDataLoading(false);
        })
        .catch((error) => {
          setError(error?.response?.data?.message);
          setDataLoading(false);
          if (error?.response?.status == 401) {
            Cookies.remove("token");
            navigateToLink("/auth/login", "Login");
          }
        });
    }
  };

  useEffect(() => {
    getSettings();
  }, [update]);

  useEffect(() => {
    if (data) {
      setSettings({
        serviceRedeemed: data.serviceRedeemed,
        subscriptionActivated: data.subscriptionActivated,
        subscriptionExpired: data.subscriptionExpired,
      });
    }
  }, [data]);

  const [settings, setSettings] = useState({
    serviceRedeemed: false,
    subscriptionActivated: false,
    subscriptionExpired: false,
  });

  const updateSettings = (newSettings) => {
    const token = Cookies.get("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setDataLoading(true);
      axios
        .put(`${baseUrl}/user/settings`, newSettings, { headers })
        .then((response) => {
          setUpdate((prev) => !prev);
          setDataLoading(false);
        })
        .catch((error) => {
          setError(error?.response?.data?.message);
          setDataLoading(false);
        });
    }
  };

  const handleCheckboxChange = (e, settingName) => {
    const newSettings = {
      ...settings,
      [settingName]: e.target.checked,
    };
    setSettings(newSettings);
    updateSettings(newSettings);
  };

  const arr = [1, 2, 4];

  return (
    <div className="w-full flex flex-col justify-start items-start gap-8">
      <div>
        <h1 className="text-2xl font-bold text-black">Notifications</h1>
        <p className="text-[#7c7c7c] w-full lg:w-2/3">
          Stay updated with important alerts and reminders. Manage your
          notifications for a personalized experience.
        </p>
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-6">
        {dataLoading ? (
          arr?.map((item) => {
            return (
              <div
                key={item}
                className="animate-pulse w-full flex justify-between items-start gap-6"
              >
                <div className="w-[90%] h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-11 h-6 bg-gray-300 rounded-full"></div>
              </div>
            );
          })
        ) : (
          <>
            <div className="w-full h-auto flex justify-between items-start">
              <div className="w-[90%] h-auto flex flex-col gap-1 justify-start items-start">
                <h1 className="font-bold text-black text-md ">
                  Subscription Activated
                </h1>
              </div>
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    checked={settings.subscriptionActivated}
                    type="checkbox"
                    disabled={dataLoading}
                    onChange={(e) =>
                      handleCheckboxChange(e, "subscriptionActivated")
                    }
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF204E]"></div>
                </label>
              </div>
            </div>

            <div className="w-full h-auto flex justify-between items-start">
              <div className="w-[90%] h-auto flex flex-col gap-1 justify-start items-start">
                <h1 className="font-bold text-black text-md ">
                  Subscription Expired
                </h1>
              </div>
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    checked={settings.subscriptionExpired}
                    type="checkbox"
                    disabled={dataLoading}
                    onChange={(e) =>
                      handleCheckboxChange(e, "subscriptionExpired")
                    }
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF204E]"></div>
                </label>
              </div>
            </div>

            <div className="w-full h-auto flex justify-between items-start">
              <div className="w-[90%] h-auto flex flex-col gap-1 justify-start items-start">
                <h1 className="font-bold text-black text-md ">
                  Service Redeemed
                </h1>
              </div>
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    disabled={dataLoading}
                    checked={settings.serviceRedeemed}
                    type="checkbox"
                    onChange={(e) => handleCheckboxChange(e, "serviceRedeemed")}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF204E]"></div>
                </label>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationSettings;
