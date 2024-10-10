import React, { useContext, useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";
import axios from "axios";

const ExpiredPackageCard = () => {
  const [data, setData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();

  const { navigateToLink, baseUrl } = useContext(GlobalContext);

  const getPackageInfo = () => {
    const token = Cookies.get("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setDataLoading(true);
      axios
        .get(`${baseUrl}/user/subscription?subscriptionId=${id}`, { headers })
        .then((response) => {
          setData(response?.data?.data);
          setDataLoading(false);
        })
        .catch((error) => {
          setError(error?.response?.data?.message);
          setDataLoading(false);
        });
    }
  };

  useEffect(() => {
    getPackageInfo();
  }, []);
  return dataLoading ? (
    <div className="w-full lg:w-[562px] rounded-2xl flex flex-col px-4 pb-2 bg-white justify-start items-start">
      <div className="w-full flex justify-between items-center h-16">
        <div className="w-auto flex justify-start items-center gap-2">
          <div className="w-[135px] h-[36px] bg-gray-200 animate-pulse rounded-full"></div>
          <div className="text-[10px] font-medium flex items-center justify-center w-auto px-2 h-6 bg-gray-200 animate-pulse text-black rounded-full"></div>
          <div className="text-[10px] capitalize font-medium flex items-center justify-center w-auto px-2 h-6 bg-gray-200 animate-pulse text-[#05FA00] rounded-full"></div>
        </div>
        <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
      </div>
      <div className="w-full flex flex-col justify-start items-start">
        <h1 className="text-lg font-semibold text-black bg-gray-200 animate-pulse w-24 h-6 rounded"></h1>
        <div className="w-full grid my-2 grid-cols-2 gap-4">
          <div className="w-full flex flex-col justify-start items-start gap-2">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="w-auto flex justify-start items-center gap-1"
              >
                <span className="w-2 h-2 bg-gray-200 animate-pulse rounded-full"></span>
                <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="w-auto flex justify-start items-center gap-1"
              >
                <span className="w-2 h-2 bg-gray-200 animate-pulse rounded-full"></span>
                <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full lg:w-[562px]  rounded-2xl flex flex-col px-4 pb-2 bg-white justify-start items-start">
      <div className="w-full flex justify-between items-center h-16">
        <div className="w-auto flex justify-start items-center gap-2">
          <div className="w-[135px] h-[36px] flex items-center justify-center gap-1 text-white text-[14px] font-medium bg-[#C20028] rounded-full">
            {data?.subscriptionPlan?.name}
          </div>
          <span className="text-[10px] font-medium flex items-center justify-center w-auto px-2 h-6 capitalize bg-[#eaeaea] text-black rounded-full">
            {data?.subscriptionPlan?.interval}ly
          </span>
          <span className="text-[10px] font-medium flex items-center justify-center w-auto px-2 capitalize h-6 bg-[#eaeaea] text-[#000] rounded-full">
            {data?.status == "paid" ? "Active" : "Inactive"}
          </span>
        </div>
        <button
          onClick={() =>
            navigateToLink(
              `/profile/dealer/${data?.subscriptionPlan?.dealership?._id}`,
              "Service History"
            )
          }
          className="text-[#FF204E] text-xs font-medium underline-offset-4 underline"
        >
          View Dealer
        </button>
      </div>
      <div className="w-full flex flex-col justify-start items-start">
        <h1 className="text-lg font-semibold text-black">Features</h1>
        <div className="w-full grid my-2 grid-cols-2">
          {data?.subscriptionPlan?.services?.map((service, key) => {
            return (
              <div
                key={key}
                className="w-auto flex justify-start items-center gap-1"
              >
                <span className="w-2 h-2 bg-[#FF204E] rounded-full"></span>
                <span className="text-xs lg:text-sm font-medium">
                  {service?.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExpiredPackageCard;
