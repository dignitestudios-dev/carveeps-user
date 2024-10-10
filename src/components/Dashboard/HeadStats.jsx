import React from "react";
import { CheckIcon, SettingsIcon } from "../../assets/export";
import Cookies from "js-cookie";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const HeadStats = ({ data, loading }) => {
  const { navigate } = useContext(GlobalContext);
  return (
    <div className="w-full h-auto flex flex-col gap-6 justify-start items-start">
      <div className="w-full flex flex-col md:flex-row justify-start md:justify-between items-start gap-3 md:gap-0 md:items-center">
        <div className="w-full md:w-[70%] flex flex-col justify-start items-start gap-1">
          <h1 className="text-3xl lg:text-4xl font-bold text-black">
            Welcome Back, {Cookies.get("userName")}!{" "}
          </h1>
          <p className="text-md lg:text-lg font-normal text-[#7c7c7c]">
            Let’s work together to keep your car running smoothly and ensure
            every journey is a breeze.
          </p>
        </div>
        <button
          onClick={() => {
            window.open(
              Cookies.get("appointmentLink"),
              "_blank",
              "noopener, noreferrer"
            );
          }}
          className="bg-[#FF204E] shadow-2xl text-white text-[17px] font-semibold flex items-center justify-center w-48 h-14 rounded-lg"
        >
          Schedule Booking
        </button>
      </div>
      <div className="w-full md:w-auto flex flex-col md:flex-row justify-start items-center gap-4">
        <div className="w-full md:w-[272px] h-[80px] bg-white rounded-3xl flex gap-2 px-2 justify-start items-center">
          <span className="w-[64px] h-[64px] flex items-center justify-center bg-[#167EFB]/[0.08] rounded-2xl">
            <img src={SettingsIcon} alt="settings_icon" />
          </span>
          <div className="w-auto flex flex-col justify-start items-start">
            {loading ? (
              <div className="w-[100px] h-[20px] bg-gray-200 animate-pulse rounded"></div>
            ) : (
              <h3 className="text-[20px] leading-tight font-bold text-black">
                {data?.subscription?.totalSubscriptionServices}
              </h3>
            )}
            {loading ? (
              <div className="w-[150px] h-[13px] bg-gray-200 animate-pulse rounded mt-2"></div>
            ) : (
              <span className="text-[13px] leading-tight font-medium text-[#7c7c7c]">
                Total Subscription Services
              </span>
            )}
          </div>
        </div>

        <div className="w-full md:w-[272px] h-[80px] bg-white rounded-3xl flex gap-2 px-2 justify-start items-center">
          <span className="w-[64px] h-[64px] flex items-center justify-center bg-[#01D763]/[0.08] rounded-2xl">
            <img src={CheckIcon} alt="settings_icon" />
          </span>
          <div className="w-auto flex flex-col justify-start items-start">
            {loading ? (
              <div className="w-[100px] h-[20px] bg-gray-200 animate-pulse rounded"></div>
            ) : (
              <h3 className="text-[20px] leading-tight font-bold text-black">
                {data?.subscription?.usedSubscriptionServices}
              </h3>
            )}
            {loading ? (
              <div className="w-[100px] h-[13px] bg-gray-200 animate-pulse rounded mt-2"></div>
            ) : (
              <span className="text-[13px] leading-tight font-medium text-[#7c7c7c]">
                Used Services
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadStats;
