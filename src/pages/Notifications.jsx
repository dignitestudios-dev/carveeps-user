import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { sampleNotifications } from "../constants/notifications.js";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { NoData } from "../assets/export.js";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("all");

  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  const { navigateToLink, baseUrl, setError } = useContext(GlobalContext);

  const getNotifications = () => {
    const token = Cookies.get("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setDataLoading(true);
      axios
        .get(`${baseUrl}/user/notifications?filter=${activeTab}`, { headers })
        .then((response) => {
          setData(response?.data?.data);
          if (activeTab == "all" || activeTab == "unread") {
            const unread = data.filter((notification) => !notification.isRead);
            setUnreadNotifications(unread);
          }
          setDataLoading(false);
        })
        .catch((error) => {
          setError(error?.response?.data?.message);
          if (error?.response?.status == 401) {
            Cookies.remove("token");
            navigateToLink("/auth/login", "Login");
          }
          setDataLoading(false);

          setError(error?.response?.data?.message);
        });
    }
  };

  const deleteNotification = (id) => {
    const token = Cookies.get("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .delete(`${baseUrl}/user/notifications`, {
          headers,
          data: id ? { notificationId: id } : null,
        })
        .then((response) => {
          setUpdate((prev) => !prev);
        })
        .catch((error) => {
          setError(error?.response?.data?.message);
        });
    }
  };
  const readNotification = (id) => {
    const token = Cookies.get("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .post(
          `${baseUrl}/user/notifications`,
          {
            notificationId: id,
          },
          { headers }
        )
        .then((response) => {
          setUpdate((prev) => !prev);
        })
        .catch((error) => {
          setError(error?.response?.data?.message);
        });
    }
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count > 0) {
        return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  };

  useEffect(() => {
    getNotifications();
  }, [activeTab, update]);
  const arr = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="bg-white min-h-[83vh] p-6 rounded-[18px] flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <div className="w-full flex items-center justify-between flex-wrap gap-6">
        <div className="flex items-center">
          <div className="">
            <button
              className={`text-base font-semibold ${
                activeTab === "all" ? "text-[#FF204E]" : "text-[#707070]"
              } px-6`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            {activeTab === "all" ? (
              <div className="w-full h-[1px] flex justify-center items-center bg-[#eaeaea]">
                <div className="bg-[#FF204E] w-[21px] h-[3px] rounded-full mx-auto" />
              </div>
            ) : (
              <div className="bg-[#eaeaea] w-full h-[1px] rounded-full" />
            )}
          </div>
          <div className="">
            <button
              className={`text-base font-semibold ${
                activeTab === "read" ? "text-[#FF204E]" : "text-[#707070]"
              } px-6`}
              onClick={() => setActiveTab("read")}
            >
              Read
            </button>
            {activeTab === "read" ? (
              <div className="w-full h-[1px] flex justify-center items-center bg-[#eaeaea]">
                <div className="bg-[#FF204E] w-[40px] h-[3px] rounded-full mx-auto" />
              </div>
            ) : (
              <div className="bg-[#eaeaea] w-full h-[1px] rounded-full" />
            )}
          </div>
          <div className="">
            <button
              className={`text-base font-semibold ${
                activeTab === "unread" ? "text-[#FF204E]" : "text-[#707070]"
              }  flex gap-2 items-center px-6`}
              onClick={() => setActiveTab("unread")}
            >
              Unread{" "}
              {/* <div className="bg-[#FF204E] text-white w-[18px] h-[18px] rounded-full text-[10px] flex items-center justify-center">
                {unreadNotifications?.length}
              </div> */}
            </button>
            {activeTab === "unread" ? (
              <div className="w-full h-[1px] flex justify-center items-center bg-[#eaeaea]">
                <div className="bg-[#FF204E] w-[70px] h-[3px] rounded-full mx-auto" />
              </div>
            ) : (
              <div className="bg-[#eaeaea] w-full h-[1px] rounded-full" />
            )}
          </div>
        </div>
        <button
          onClick={() => deleteNotification(null)}
          className="bg-[#FF204E] rounded-[10px] text-[13px] font-semibold text-white py-2.5 w-[118px]"
        >
          Clear All
        </button>
      </div>
      <div className="w-full  flex flex-col gap-2 justify-start items-center">
        {dataLoading &&
          arr.map((item) => {
            return (
              <div
                key={item}
                className="w-full grid grid-cols-1 md:grid-cols-5 notification border-b gap-x-4 bg-gray-100 px-3 rounded-t-lg"
              >
                <div className="col-span-3 md:border-b py-4">
                  <div className="w-1/2 h-4 bg-gray-200 animate-pulse mb-2 rounded"></div>
                  <div className="w-3/4 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="col-span-1 flex items-center justify-end text-end md:border-b py-4">
                  <div className="w-12 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="col-span-1 flex gap-4 justify-end items-center md:border-b text-end py-4">
                  <div className="w-20 h-6 bg-gray-200 animate-pulse rounded"></div>
                  <div className="w-20 h-6 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
            );
          })}
        {!dataLoading && data?.length < 1 ? (
          <img src={NoData} className="w-96" />
        ) : (
          data.map((notification) => (
            <div
              key={notification._id}
              className={`w-full grid grid-cols-1 md:grid-cols-5 notification border-b gap-x-4 ${
                notification.isRead
                  ? "read"
                  : "bg-[#FF204E]/[0.02] px-3 border-[#FF204E] rounded-t-lg"
              }`}
            >
              <div className="col-span-3 md:border-b py-4">
                <p className="font-medium text-base text-[#FF204E]">
                  {notification.title}
                </p>
                <p className="font-normal text-base text-[#222222]">
                  {notification.description}
                </p>
              </div>

              <div className="col-span-1 flex items-center justify-end text-end md:border-b py-4">
                <p className="text-[#5C5C5C] text-sm font-medium pt-1">
                  {getTimeAgo(notification?.createdAt)}
                </p>
              </div>
              <div className="col-span-1 flex gap-4 justify-end items-center md:border-b text-end py-4">
                {notification?.isRead == false && (
                  <div className=" lg:col-span-1 text-end  py-4">
                    <button
                      onClick={() => readNotification(notification?._id)}
                      className="text-[#FF204E] text-xs font-medium pt-1"
                    >
                      Mark as read
                    </button>
                  </div>
                )}

                <button
                  onClick={() => deleteNotification(notification?._id)}
                  className="w-[73px] bg-[#FF204E26] text-[11px] text-[#FF204E] font-medium rounded-full flex items-center justify-center gap-1 py-2 float-end"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
