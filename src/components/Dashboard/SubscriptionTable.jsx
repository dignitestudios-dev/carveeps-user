import React, { useEffect, useState } from "react";
import { NoData } from "../../assets/export";

const SubscriptionTable = ({
  data,
  loading,
  monthlyServices,
  yearlyServices,
}) => {
  const formatDateFromEpoch = (epoch) => {
    const date = new Date(epoch);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };
  const formatDateFromISOString = (isoString) => {
    const date = new Date(isoString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };
  const [isMonthly, setIsMonthly] = useState(false);
  useEffect(() => {
    setIsMonthly(
      data?.subscription?.subscriptionPlan?.interval == "month" &&
        data?.subscription?.subscriptionPlan?.intervalCount == 1
        ? true
        : false
    );
  }, [data]);
  return (
    <div className="w-full flex flex-col gap-2 justify-start items-start bg-white p-4 rounded-xl">
      <div className="w-full flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between items-start ">
        <div className="w-auto flex flex-col justify-between lg:h-28 items-start">
          {loading ? (
            <div className="w-[150px] h-[20px] bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <h2 className="text-sm lg:text-xl font-semibold text-black">
              Active Subscription Plan
            </h2>
          )}
          <div className="w-auto flex justify-start items-center gap-2">
            {loading ? (
              <div className="w-[100px] h-[28px] bg-gray-200 animate-pulse rounded"></div>
            ) : (
              <h1 className="text-lg lg:text-2xl font-bold text-black">
                {data?.subscription?.subscriptionPlan?.name}
              </h1>
            )}
            {loading ? (
              <div className="w-[100px] h-[28px] bg-gray-200 animate-pulse rounded"></div>
            ) : (
              <span className="text-lg lg:text-md text-[#FF204E] font-medium">
                {data?.subscription?.subscriptionPlan?.dealership?.name}
              </span>
            )}
          </div>
        </div>
        <div className="w-auto flex flex-col justify-start items-start lg:gap-3">
          <div className="w-auto flex gap-1 justify-start items-center">
            <p className="text-[#5C5C5C] text-xs lg:text-sm font-normal">
              Subscribed Date:
            </p>
            {loading ? (
              <div className="w-[100px] h-[20px] bg-gray-200 animate-pulse rounded"></div>
            ) : (
              <p className="text-xs lg:text-md font-medium ">
                {formatDateFromISOString(data?.subscription?.createdAt)}
              </p>
            )}
          </div>
          <div className="w-auto flex gap-1 justify-start items-center">
            <p className="text-[#5C5C5C] text-xs lg:text-sm font-normal">
              Expired Date:
            </p>
            {loading ? (
              <div className="w-[100px] h-[20px] bg-gray-200 animate-pulse rounded"></div>
            ) : (
              <p className="text-xs lg:text-md font-medium ">
                {formatDateFromEpoch(data?.subscription?.expireOn)}
              </p>
            )}
          </div>
          <div className="w-auto flex gap-1 justify-start items-center">
            <p className="text-[#5C5C5C] text-xs lg:text-sm font-normal">
              Duration:
            </p>
            {loading ? (
              <div className="w-[100px] h-[20px] bg-gray-200 animate-pulse rounded"></div>
            ) : (
              <p className="text-xs lg:text-md font-medium ">
                {data?.subscription?.subscriptionPlan?.intervalCount}{" "}
                {data?.subscription?.subscriptionPlan?.interval}
              </p>
            )}
          </div>
        </div>
      </div>

      <div
        className={`w-full h-auto grid gap-4 grid-cols-1 ${
          isMonthly ? "lg:grid-cols-2" : "lg:grid-cols-4"
        } `}
      >
        {!isMonthly && (
          <div className="col-span-2 h-auto py-2 px-4 rounded-lg flex flex-col justify-start overflow-x-auto items-start bg-[#fafafa]">
            <h1 className="text-sm font-semibold text-black py-3 border-b border-[#D6D6D6]/[0.5] w-full">
              {data?.subscription?.subscriptionPlan?.interval == "month" &&
              data?.subscription?.subscriptionPlan?.intervalCount == 6
                ? "Bi-Annual"
                : data?.subscription?.subscriptionPlan?.interval == "year" &&
                  "Annual"}{" "}
              Services
            </h1>
            <div className="w-full flex flex-col justify-start items-start">
              <div className="w-full h-auto py-3 text-xs text-[#7c7c7c] items-center font-medium border-b border-[#d6d6d6]/[0.5] grid grid-cols-3">
                <h2 className="w-full flex justify-start items-center">
                  Services
                </h2>
                <h2 className="w-full flex justify-start items-center">
                  Service Detail
                </h2>
                <h2 className="w-full flex justify-center items-center">
                  Total Services
                </h2>
              </div>
              <div className="w-full flex flex-col justify-start items-start">
                {loading ? (
                  <>
                    {[...Array(3)].map((_, index) => (
                      <div
                        key={index}
                        className="w-full h-auto py-3 text-xs text-[#000] items-center font-normal border-b border-[#d6d6d6]/[0.5] grid grid-cols-3"
                      >
                        <div className="w-full flex justify-start items-center">
                          <div className="w-[100px] h-[20px] bg-gray-200 animate-pulse rounded"></div>
                        </div>
                        <div className="w-full flex justify-start items-center">
                          <div className="w-[150px] h-[20px] bg-gray-200 animate-pulse rounded"></div>
                        </div>
                        <div className="w-full flex justify-center items-center">
                          <div className="w-[50px] h-[20px] bg-gray-200 animate-pulse rounded"></div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : yearlyServices?.length < 1 ? (
                  <div className="w-full bg-white rounded-b-[18px] flex items-center justify-center">
                    <img src={NoData} alt="" className="w-96 my-10" />
                  </div>
                ) : (
                  yearlyServices?.map((service, key) => (
                    <div
                      key={key}
                      className="w-full h-auto py-3 text-xs text-[#000] items-center font-normal border-b border-[#d6d6d6]/[0.5] grid grid-cols-3"
                    >
                      <p className="w-full flex justify-start items-center">
                        {service?.name}
                      </p>
                      <p className="w-full flex justify-start items-center">
                        {service?.details}
                      </p>
                      <p className="w-full flex justify-center items-center">
                        {service?.frequency}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
        <div className="col-span-2 h-auto py-2 px-4 rounded-lg flex flex-col justify-start overflow-x-auto items-start bg-[#fafafa]">
          <h1 className="text-sm font-semibold text-black py-3 border-b border-[#D6D6D6]/[0.5] w-full">
            Monthly Services
          </h1>
          <div className="w-full flex flex-col justify-start items-start">
            <div className="w-full h-auto py-3 text-xs text-[#7c7c7c] items-center font-medium border-b border-[#d6d6d6]/[0.5] grid grid-cols-3">
              <h2 className="w-full flex justify-start items-center">
                Services
              </h2>
              <h2 className="w-full flex justify-start items-center">
                Service Detail
              </h2>
              <h2 className="w-full flex justify-center items-center">
                Total Services
              </h2>
            </div>
            <div className="w-full flex flex-col justify-start items-start">
              {loading ? (
                <>
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="w-full h-auto py-3 text-xs text-[#000] items-center font-normal border-b border-[#d6d6d6]/[0.5] grid grid-cols-3"
                    >
                      <div className="w-full flex justify-start items-center">
                        <div className="w-[100px] h-[20px] bg-gray-200 animate-pulse rounded"></div>
                      </div>
                      <div className="w-full flex justify-start items-center">
                        <div className="w-[150px] h-[20px] bg-gray-200 animate-pulse rounded"></div>
                      </div>
                      <div className="w-full flex justify-center items-center">
                        <div className="w-[50px] h-[20px] bg-gray-200 animate-pulse rounded"></div>
                      </div>
                    </div>
                  ))}
                </>
              ) : monthlyServices?.length < 1 ? (
                <div className="w-full bg-white rounded-b-[18px] flex items-center justify-center">
                  <img src={NoData} alt="" className="w-96 my-10" />
                </div>
              ) : (
                monthlyServices?.map((service, key) => (
                  <div
                    key={key}
                    className="w-full h-auto py-3 text-xs text-[#000] items-center font-normal border-b border-[#d6d6d6]/[0.5] grid grid-cols-3"
                  >
                    <p className="w-full flex justify-start items-center">
                      {service?.name}
                    </p>
                    <p className="w-full flex justify-start items-center">
                      {service?.details}
                    </p>
                    <p className="w-full flex justify-center items-center">
                      {service?.frequency}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTable;
