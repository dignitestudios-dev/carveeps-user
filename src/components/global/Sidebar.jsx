import React, { useContext } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { WiTime5 } from "react-icons/wi";
import { TiCreditCard } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import { RiUser3Line } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";

const Sidebar = () => {
  const { navigateToLink, activeLink } = useContext(GlobalContext);
  return (
    <div className="w-full  h-auto flex flex-col gap-3 justify-start items-start">
      <button
        onClick={() => navigateToLink("/dashboard", "Dashboard")}
        className={`w-full h-12 ${
          activeLink == "Dashboard"
            ? "bg-[#ff204e] text-white"
            : "bg-[#fff] text-[#7c7c7c]"
        } transition-all duration-300 hover:bg-[#ff204e] hover:text-white rounded-xl px-4 flex justify-start items-center gap-3`}
      >
        <MdOutlineDashboard className="text-2xl" />
        <span className="text-md font-medium">Dashboard</span>
      </button>
      <button
        onClick={() => navigateToLink("/service-history", "Service History")}
        className={`w-full h-12 ${
          activeLink == "Service History"
            ? "bg-[#ff204e] text-white"
            : "bg-[#fff] text-[#7c7c7c]"
        } transition-all duration-300 hover:bg-[#ff204e] hover:text-white rounded-xl px-4 flex justify-start items-center gap-3`}
      >
        <WiTime5 className="text-2xl" />
        <span className="text-md font-medium">Service History</span>
      </button>
      <button
        onClick={() =>
          navigateToLink(
            "/billing-and-subscriptions",
            "Billing and Subscription"
          )
        }
        className={`w-full h-12 ${
          activeLink == "Billing and Subscription"
            ? "bg-[#ff204e] text-white"
            : "bg-[#fff] text-[#7c7c7c]"
        } transition-all duration-300 hover:bg-[#ff204e] hover:text-white rounded-xl px-4 flex justify-start items-center gap-3`}
      >
        <TiCreditCard className="text-2xl" />
        <span className="text-md font-medium">Billing and Subscriptions</span>
      </button>
      <button
        onClick={() => navigateToLink("/settings/notifications", "Settings")}
        className={`w-full h-12 ${
          activeLink == "Settings"
            ? "bg-[#ff204e] text-white"
            : "bg-[#fff] text-[#7c7c7c]"
        } transition-all duration-300 hover:bg-[#ff204e] hover:text-white rounded-xl px-4 flex justify-start items-center gap-3`}
      >
        <IoSettingsOutline className="text-2xl" />
        <span className="text-md font-medium">Settings</span>
      </button>
      <button
        onClick={() => navigateToLink("/profile", "Profile")}
        className={`w-full h-12 ${
          activeLink == "Profile"
            ? "bg-[#ff204e] text-white"
            : "bg-[#fff] text-[#7c7c7c]"
        } transition-all duration-300 hover:bg-[#ff204e] hover:text-white rounded-xl px-4 flex justify-start items-center gap-3`}
      >
        <RiUser3Line className="text-2xl" />
        <span className="text-md font-medium">Profile</span>
      </button>
      <button
        onClick={() => {
          navigateToLink("/auth/login", "Logout");
          Cookies?.remove("token");
          Cookies.remove("isCardAdded");
          Cookies.remove("isSubscribed");
          Cookies.remove("isVehicleAdded");
        }}
        className={`w-full h-12 ${
          activeLink == "Logout"
            ? "bg-[#ff204e] text-white"
            : "bg-[#fff] text-[#7c7c7c]"
        } transition-all duration-300 hover:bg-[#ff204e] hover:text-white rounded-xl px-4 flex justify-start items-center gap-3`}
      >
        <IoLogOutOutline className="text-2xl" />
        <span className="text-md font-medium">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
