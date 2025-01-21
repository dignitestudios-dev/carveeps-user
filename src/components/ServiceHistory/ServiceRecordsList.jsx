import React, { useState, useContext, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { ServiceHistory } from "../../constants/serviceHistory";
import { IoMdArrowDropup } from "react-icons/io";
import { Link } from "react-router-dom";
import { CiCalendarDate } from "react-icons/ci";
import DateModal from "./DateModal";
import ServiceCard from "./ServiceCard";
import axios from "axios";
import Cookies from "js-cookie";
import { GlobalContext } from "../../context/GlobalContext";
import { NoData } from "../../assets/export";

const ServiceRecordsList = () => {
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [data, setData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState(false);

  const { navigateToLink, baseUrl } = useContext(GlobalContext);

  const getPackageInfo = () => {
    const token = Cookies.get("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setDataLoading(true);
      axios
        .get(`${baseUrl}/user/subscription`, { headers })
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
    getPackageInfo();
  }, []);
  const formatDateFromEpoch = (epoch) => {
    if (epoch == null) return "N/A";
    const date = new Date(epoch);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };
  const formatDateFromISOString = (isoString) => {
    if (isoString == null) return "N/A";
    const splittedString = String(isoString).split("T")[0];
    const [year, month, day] = splittedString.split("-");
    const formattedString = `${month}-${day}-${year}`;
    const date = new Date(formattedString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  const [filter, setFilter] = useState({
    filter: "12months",
    date: null,
  });
  const [services, setServices] = useState(null);
  const [servicesLoading, setServicesLoading] = useState(false);

  const getServices = () => {
    const token = Cookies.get("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setServicesLoading(true);
      axios
        .get(
          filter?.date == null
            ? `${baseUrl}/user/service?subscriptionId=${data?._id}&filter=${filter?.filter}`
            : `${baseUrl}/user/service?subscriptionId=${data?._id}&particularDate=${filter?.date}`,
          {
            headers,
          }
        )
        .then((response) => {
          setServices(response?.data?.data);
          setServicesLoading(false);
        })
        .catch((error) => {
          setError(error?.response?.data?.message);
          setServicesLoading(false);
        });
    }
  };

  useEffect(() => {
    data?._id && getServices();
  }, [data, filter]);
  return (
    <>
      <div className="w-full bg-white rounded-[18px] p-6 flex flex-col items-start gap-6">
        <div className="w-full flex items-start lg:items-center justify-between flex-col lg:flex-row gap-6">
          {dataLoading ? (
            <div className="w-full flex items-start lg:items-center justify-between flex-col lg:flex-row gap-6">
              <h1 className="text-2xl font-bold bg-gray-200 animate-pulse w-48 h-8 rounded"></h1>
              <div className="w-full lg:w-[506px] lg:h-[36px] grid grid-cols-3 lg:grid-cols-3 gap-6">
                <div className="flex flex-col text-center">
                  <p className="text-xs text-[#5C5C5C] bg-gray-200 animate-pulse w-24 h-4 rounded"></p>
                  <p className="text-lg font-semibold bg-gray-200 animate-pulse w-24 h-6 rounded"></p>
                </div>
                <div className="flex flex-col text-center">
                  <p className="text-xs text-[#5C5C5C] bg-gray-200 animate-pulse w-24 h-4 rounded"></p>
                  <p className="text-lg font-semibold bg-gray-200 animate-pulse w-24 h-6 rounded"></p>
                </div>
                <div className="flex flex-col text-center">
                  <p className="text-xs text-[#5C5C5C] bg-gray-200 animate-pulse w-24 h-4 rounded"></p>
                  <p className="text-lg font-semibold bg-gray-200 animate-pulse w-24 h-6 rounded"></p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold">
                {data?.subscriptionPlan?.name}
              </h1>
              <div className="w-full lg:w-[506px] lg:h-[36px] grid grid-cols-3 lg:grid-cols-3  gap-6">
                <div className="flex flex-col text-center">
                  <p className="text-xs text-[#5C5C5C]">Subscribed Date</p>
                  <p className="text-lg font-semibold">
                    {formatDateFromISOString(data?.createdAt)}
                  </p>
                </div>
                <div className="flex flex-col text-center">
                  <p className="text-xs text-[#5C5C5C]">Expire Date</p>
                  <p className="text-lg font-semibold">
                    {formatDateFromEpoch(data?.expireOn)}
                  </p>
                </div>
                <div className="flex flex-col text-center">
                  <p className="text-xs text-[#5C5C5C]">Duration</p>
                  <p className="text-lg font-semibold">
                    {new Date(data?.createdAt).getFullYear()} -{" "}
                    {new Date(data?.expireOn).getFullYear()}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="w-auto flex justify-start items-center gap-2">
            {data?.subscriptionPlan?.interval == "year" ? (
              <button
                onClick={() =>
                  setFilter({
                    filter: "12months",
                    date: null,
                  })
                }
                className={`w-auto px-2 h-7 hover:bg-[#ff204e] hover:text-white rounded-full flex items-center justify-center cursor-pointer text-xs  ${
                  filter?.filter == "12months"
                    ? "bg-[#ff204e] text-white"
                    : "text-black bg-[#eaeaea]"
                }`}
              >
                12 months
              </button>
            ) : (
              data?.subscriptionPlan?.interval == "month" &&
              data?.subscriptionPlan?.intervalCount == 6 && (
                <button
                  onClick={() =>
                    setFilter({
                      filter: "6months",
                      date: null,
                    })
                  }
                  className={`w-auto px-2 h-7 hover:bg-[#ff204e] hover:text-white rounded-full flex items-center justify-center cursor-pointer text-xs text-black bg-[#eaeaea] ${
                    filter?.filter == "6months"
                      ? "bg-[#ff204e] text-white"
                      : "text-black bg-[#eaeaea]"
                  }`}
                >
                  06 months
                </button>
              )
            )}

            <button
              onClick={() =>
                setFilter({
                  filter: "30days",
                  date: null,
                })
              }
              className={`w-auto px-2 h-7 hover:bg-[#ff204e] hover:text-white rounded-full flex items-center justify-center cursor-pointer text-xs text-black bg-[#eaeaea] ${
                filter?.filter == "30days"
                  ? "bg-[#ff204e] text-white"
                  : "text-black bg-[#eaeaea]"
              }`}
            >
              30 days
            </button>
            <button
              onClick={() =>
                setFilter({
                  filter: "7days",
                  date: null,
                })
              }
              className={`w-auto px-2 h-7 hover:bg-[#ff204e] hover:text-white rounded-full flex items-center justify-center cursor-pointer text-xs text-black bg-[#eaeaea] ${
                filter?.filter == "7days"
                  ? "bg-[#ff204e] text-white"
                  : "text-black bg-[#eaeaea]"
              }`}
            >
              07 days
            </button>
            <button
              onClick={() =>
                setFilter({
                  filter: "24hours",
                  date: null,
                })
              }
              className={`w-auto px-2 h-7 hover:bg-[#ff204e] hover:text-white rounded-full flex items-center justify-center cursor-pointer text-xs text-black bg-[#eaeaea] ${
                filter?.filter == "24hours"
                  ? "bg-[#ff204e] text-white"
                  : "text-black bg-[#eaeaea]"
              }`}
            >
              24 hours
            </button>
          </div>

          <button
            onClick={() => setIsDateModalOpen(true)}
            className="w-auto px-2 h-7 hover:bg-[#ff204e] hover:text-white rounded-full flex gap-2 items-center justify-center cursor-pointer text-xs text-black bg-[#eaeaea]"
          >
            <CiCalendarDate className="text-sm " />
            <span>Select Date</span>
          </button>
          <DateModal
            isOpen={isDateModalOpen}
            setIsOpen={setIsDateModalOpen}
            setFilter={setFilter}
          />
        </div>
        {/* Large screen */}
        <div className="w-full lg:block hidden overflow-x-auto">
          <div className="w-full grid grid-cols-4 gap-6 py-4 border-b">
            <p className="text-xs font-medium text-[#7C7C7C]">
              Last Service Date
            </p>

            <p className="text-xs font-medium text-[#7C7C7C] flex items-center gap-1">
              Service
            </p>
            <p className="text-xs font-medium text-[#7C7C7C]">
              Service Details
            </p>

            <p className="text-xs font-medium flex justify-center text-[#7C7C7C]">
              Status
            </p>
          </div>
          {services?.length < 1 ? (
            <div className="w-full bg-white rounded-b-[18px] flex items-center justify-center">
              <img src={NoData} alt="" className="w-96 my-10" />
            </div>
          ) : dataLoading || servicesLoading ? (
            <div className="w-full bg-white rounded-[18px]  flex flex-col items-start gap-6">
              {/* Large screen */}
              <div className="w-full lg:block hidden overflow-x-auto">
                <div className="w-full grid grid-cols-4 gap-6 py-4 border-b">
                  <p className="text-xs font-medium text-[#7C7C7C] bg-gray-200 animate-pulse w-24 h-4 rounded"></p>
                  <p className="text-xs font-medium text-[#7C7C7C] bg-gray-200 animate-pulse w-24 h-4 rounded"></p>
                  <p className="text-xs font-medium text-[#7C7C7C] bg-gray-200 animate-pulse w-24 h-4 rounded"></p>
                  <p className="text-xs font-medium text-[#7C7C7C] bg-gray-200 animate-pulse w-24 h-4 rounded"></p>
                </div>

                {/* If there were services, map through them */}
                <div className="w-full h-auto grid grid-cols-4 gap-6 py-4 border-b">
                  <p className="text-xs font-normal bg-gray-200 animate-pulse w-24 h-4 rounded"></p>
                  <p className="text-xs font-normal bg-gray-200 animate-pulse w-24 h-4 rounded"></p>
                  <p className="text-xs font-normal bg-gray-200 animate-pulse w-24 h-4 rounded"></p>
                  <div className="w-full flex justify-center items-center">
                    <p className="text-[9px] bg-gray-200 animate-pulse w-16 h-6 rounded-full"></p>
                  </div>
                </div>
              </div>
              {/* Mobile Screen */}
              <div className="w-full grid grid-cols-1 gap-2 md:grid-cols-2 lg:hidden">
                <div className="w-full h-auto flex flex-col p-4 bg-gray-50 rounded-2xl gap-4">
                  <div className="w-full h-auto flex justify-between items-start">
                    <div className="w-1/2 flex flex-col justify-start items-start">
                      <h1 className="text-md font-medium text-black bg-gray-200 animate-pulse w-24 h-6 rounded"></h1>
                      <p className="text-xs font-medium text-[#7c7c7c] bg-gray-200 animate-pulse w-24 h-4 rounded"></p>
                    </div>
                    <div className="w-1/2 flex flex-col justify-start items-start">
                      <h1 className="text-md font-medium text-black bg-gray-200 animate-pulse w-24 h-6 rounded"></h1>
                      <p className="text-xs font-medium text-[#7c7c7c] bg-gray-200 animate-pulse w-24 h-4 rounded"></p>
                    </div>
                  </div>
                  <div className="w-full flex flex-col justify-start items-start">
                    <h1 className="text-md font-medium text-black bg-gray-200 animate-pulse w-24 h-6 rounded"></h1>
                    <p className="text-xs font-medium text-[#7c7c7c] bg-gray-200 animate-pulse w-24 h-4 rounded"></p>
                  </div>
                  <div className="w-full flex flex-col justify-start items-start">
                    <h1 className="text-md font-medium text-black bg-gray-200 animate-pulse w-24 h-6 rounded"></h1>
                    <p className="text-[9px] bg-gray-200 animate-pulse w-16 h-6 rounded-full"></p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            services?.map((service, index) => {
              return (
                <div
                  className="w-full h-auto grid grid-cols-4 gap-6 py-4 border-b"
                  key={index}
                >
                  <p className="text-xs font-normal">
                    {service?.lastUsed
                      ? formatDateFromEpoch(service.lastUsed)
                      : "N/A"}
                  </p>
                  <p className="text-xs font-normal">{service.service?.name}</p>
                  <p className="text-xs font-normal">
                    {service?.service?.details}
                  </p>
                  <div className="w-full flex justify-center items-center">
                    <p className="text-[9px] flex justify-center items-center w-16 px-1 h-6 rounded-full font-medium text-[#05FA00] bg-[#05FA00]/[0.1]">
                      {service.status == "active"
                        ? "Remaining"
                        : service.status == "complete"
                        ? "Availed"
                        : service.status == "expire" && "Expired"}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {/* mobile Screen */}
        <div className="w-full grid grid-cols-1 gap-2 md:grid-cols-2 lg:hidden">
          {services?.map((service, index) => {
            return <ServiceCard service={service} key={index} />;
          })}
        </div>
      </div>
    </>
  );
};

export default ServiceRecordsList;
