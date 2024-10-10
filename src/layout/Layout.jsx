import React, { useContext, useEffect, useRef, useState } from "react";
// import Sidebar from "./Sidebar";
import { PiCaretDown } from "react-icons/pi";
// import { ProfileImage } from "../../assets/export";
import { HiMenu, HiOutlineMenuAlt2 } from "react-icons/hi";
import { Logo } from "../assets/export";
import Sidebar from "../components/global/Sidebar";
import { MdOutlineDashboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import { GlobalContext } from "../context/GlobalContext";
import Cookies from "js-cookie";
import axios from "axios";
import Error from "../components/global/Error";

const Layout = ({ pages }) => {
  const sidebarRef = useRef(null);
  const [isOpen, setisOpen] = useState(false);
  const toggleModal = () => {
    setisOpen(!isOpen);
  };
  const {
    navigateToLink,
    baseUrl,
    error,
    notification,
    show,
    setShow,
    setError,
    fetchToken,
    setUpdate,
  } = useContext(GlobalContext);
  const getProfile = () => {
    const token = Cookies.get("token");

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios.get(`${baseUrl}/user`, { headers }).then(
        (response) => {
          const data = response?.data?.data;
          Cookies?.set("userName", data?.name);
          Cookies?.set("userProfile", data?.profilePicture);
          Cookies?.set("appointmentLink", data?.dealership?.appointmentLink);
        },
        (error) => {
          if (error?.response?.status == 401) {
            Cookies.remove("token");
            navigateToLink("/auth/login");
          }
        }
      );
    } else {
      navigateToLink("/auth/login");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 5000);
  }, [show]);

  useEffect(() => {
    const isVehicleAdded = Cookies.get("isVehicleAdded") === "true";
    const isSubscribed = Cookies.get("isSubscribed") === "true";
    const isCardAdded = Cookies.get("isCardAdded") === "true";
    const token = Cookies.get("token");
    if (token && (!isVehicleAdded || !isSubscribed || !isCardAdded)) {
      console.log("first");
      Cookies.remove("isVehicleAdded");
      Cookies.remove("isSubscribed");
      Cookies.remove("isCardAdded");
      Cookies.remove("userName");
      Cookies.remove("userProfile");
      Cookies.remove("appointmentLink");
      Cookies.remove("token");
      navigateToLink("/auth/login");
    }
    getProfile();
    setUpdate((prev) => !prev);
    fetchToken();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex justify-start items-start">
      {error && <Error error={error} setError={setError} />}
      {show && (
        <div
          class="min-w-64 max-w-96 fixed animate-pulse z-[100000] bottom-4 right-8 bg-white shadow border text-sm text-gray-800 rounded-2xl "
          role="alert"
          tabindex="-1"
          aria-labelledby="hs-toast-soft-color-teal-label"
        >
          <div
            id="hs-toast-soft-color-teal-label"
            class="w-full flex justify-between items-center p-4"
          >
            <div className="w-auto flex gap-3 justify-start items-center">
              <span className="bg-gray-300 flex items-center justify-center w-16 h-12 rounded-xl">
                <img
                  src="https://carweep-dealer.vercel.app/assets/logo-BrlGc4a0.svg"
                  alt=""
                  className="w-full h-full"
                />
              </span>

              <div className="w-[70%] flex flex-col justify-start items-start">
                <span className="font-bold">{notification?.title}</span>
                <span>{notification?.body}</span>
              </div>
            </div>
            <div class="ms-auto">
              <button
                onClick={() => setShow(false)}
                type="button"
                class="inline-flex shrink-0 justify-center items-center size-5 rounded-lg text-gray-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 "
                aria-label="Close"
              >
                <span class="sr-only">Close</span>
                <svg
                  class="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        onClick={toggleModal}
        className={`w-screen h-screen fixed top-0 left-0 transition-all duration-500 bg-transparent  ${
          isOpen ? " lg:translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:static  z-[2000] lg:z-auto px-3 lg:w-60 xl:w-72 flex flex-col gap-3 items-center justify-start py-0 lg:h-full `}
      >
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 transition-all duration-200  ${
            isOpen ? " lg:translate-x-0" : "-translate-x-full lg:translate-x-0"
          } lg:static w-[60%] z-[2000] lg:z-auto px-3 lg:w-60 xl:w-72 flex flex-col gap-3 items-center justify-start py-0 h-full bg-white border-r border-gray-200 `}
        >
          <img src={Logo} alt="" className="w-[154px]" />
          <Sidebar />

          <button
            onClick={() => {
              window.open(
                Cookies.get("appointmentLink"),
                "_blank",
                "noopener, noreferrer"
              );
            }}
            className="w-[94%] absolute bottom-2 left-2 h-12 bg-[#FF204E]/[0.1] transition-all duration-300 hover:bg-[#ff204e] hover:text-white text-[#FF204E] rounded-xl  flex justify-center items-center gap-3"
          >
            <span className="text-md font-medium">Schedule Booking</span>
          </button>
        </div>
      </div>

      <div className="w-full relative lg:w-[calc(100%-15rem)] xl:w-[calc(100%-18rem)] h-full  overflow-y-auto overflow-x-hidden">
        <div className="sticky top-0 left-0 w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between lg:justify-end px-4 z-20">
          <button
            onClick={() => setisOpen((prev) => !prev)}
            className="lg:hidden block"
          >
            <HiOutlineMenuAlt2 className="text-2xl" />
          </button>
          <div className="flex gap-3 items-center  py-4 font-normal text-gray-900">
            <div className="flex items-center gap-6 py-4 font-normal text-gray-900">
              <button
                onClick={() =>
                  navigateToLink("/notifications", "Notifications")
                }
                className="w-[29px] h-[29px] rounded-lg flex items-center justify-center bg-[#FF204E] p-1 relative"
              >
                <IoNotificationsOutline className="text-white w-full h-full" />
                <GoDotFill className="w-[10px] h-[10px] text-[#3FB743] absolute top-1 right-1" />
              </button>
              <div className="flex items-center gap-2">
                <img
                  src={
                    Cookies.get("userProfile") !== "null"
                      ? Cookies.get("userProfile")
                      : "https://dummyimage.com/600x400/000/fff"
                  }
                  alt=""
                  className="w-[28px] h-[28px] rounded-full"
                />
                <p className="text-xs font-medium">{Cookies.get("userName")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`w-full p-2 lg:p-6 bg-[#fafafa] min-h-[91vh]`}>
          {pages}
        </div>
      </div>
    </div>
  );
};

export default Layout;
