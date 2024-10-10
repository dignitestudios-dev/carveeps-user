import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";

const SubscriptionCard = ({ plan, loading }) => {
  const { navigateToLink } = useContext(GlobalContext);
  useEffect(() => {
    Cookies.set("planName", plan?.name);
  }, []);

  return loading ? (
    <div className="w-full lg:w-[447px] h-auto flex flex-col justify-start items-start gap-6 p-8 rounded-3xl bg-white shadow-[0px_2px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
      <div className="w-10 h-10 bg-gray-200 rounded-md animate-pulse"></div>

      <div className="h-10 w-40 rounded-full flex justify-center items-center px-3 bg-gray-200 text-white text-md font-medium animate-pulse"></div>

      <div className="relative">
        <span className="text-2xl font-semibold absolute top-0 -left-3 text-gray-200">
          $
        </span>
        <span className="text-7xl font-bold text-gray-200 animate-pulse">
          -
        </span>
        <span className="text-lg font-medium text-gray-200 animate-pulse">
          / -
        </span>
      </div>

      <button
        disabled
        className="w-full h-10 rounded-lg flex items-center justify-center bg-gray-300 text-white text-md font-medium cursor-not-allowed"
      >
        <span className="animate-pulse">Buy Now</span>
      </button>

      <div className="w-full flex flex-col gap-2 justify-start items-start">
        <div className="w-full h-auto grid grid-cols-3 gap-4">
          <div className="h-6 w-20 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        <div className="w-full h-auto flex flex-col gap-1">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <div className="w-full h-auto grid grid-cols-3 gap-4" key={index}>
                <div className="h-6 w-20 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="w-full flex justify-center items-center">
                  <div className="w-16 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs text-blue-500 animate-pulse">
                    -
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full lg:w-[447px] h-auto flex flex-col justify-start items-start gap-6 p-8 rounded-3xl bg-white shadow-[0px_2px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
      <div className="w-auto flex gap-2 justify-start items-center">
        <img
          src={plan?.dealership?.logo}
          className="w-10 h-10 bg-gray-200 rounded-md"
        />
        <span className="text-md font-medium text-gray-600">
          {plan?.salesPerson?.name}
        </span>
      </div>

      <span className="h-10 w-40 rounded-full flex justify-center items-center px-3 bg-[#c00000] text-white text-md font-medium">
        {plan?.dealership?.name}
      </span>

      <div className="relative">
        <span className="text-2xl font-semibold absolute top-0 -left-3">$</span>
        <span className="text-7xl font-bold text-black">{plan?.price}</span>
        <span className="text-lg font-medium">
          /{" "}
          {plan?.interval == "year" && plan?.intervalCount == 1
            ? "Annually"
            : plan?.interval == "month" && plan?.intervalCount == 6
            ? "Bi-annual"
            : "Monthly"}
        </span>
      </div>
      <button
        onClick={() => {
          Cookies.set("planId", plan?._id, { expires: 7 });
          navigateToLink("/register-account", "Dashboard");
        }}
        className="w-full h-10 rounded-lg flex items-center justify-center bg-[#FF204E] text-white text-md font-medium"
      >
        Buy Now
      </button>

      <div className="w-full flex flex-col gap-2 justify-start items-start">
        <div className="w-full h-auto grid grid-cols-3">
          <span className="text-sm text-gray-800 font-medium">Name</span>
          <span className="text-sm w-full flex items-center justify-center text-gray-800 font-medium">
            Frequency
          </span>
          <span className="text-sm w-full flex items-center justify-center text-gray-800 font-medium">
            Duration
          </span>
        </div>
        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start gap-1">
          {plan?.services?.map((service, key) => {
            return (
              <div className="w-full h-auto grid grid-cols-3" key={key}>
                <span className="text-xs text-gray-600 font-medium">
                  {service?.name}
                </span>
                <span className="w-full flex items-center justify-center text-xs text-gray-600 font-medium">
                  {service?.frequency}
                </span>
                <div className="w-full flex justify-center items-center">
                  <span className="w-16 px-2 h-6 flex items-center justify-center text-xs bg-blue-500/20 text-blue-500 rounded-full capitalize font-medium">
                    {service?.interval == "year" ? "Yearly" : "Monthly"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
