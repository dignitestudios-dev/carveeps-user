import React, { useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import PreviousSubscriptionCard from "./PreviousSubscriptionCard";
import { NoData } from "../../assets/export";

const PreviousSubscriptionsTable = () => {
  const [data, setData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState(false);

  const { navigateToLink, baseUrl } = useContext(GlobalContext);

  const getPreviousSubscriptions = () => {
    const token = Cookies.get("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setDataLoading(true);
      axios
        .get(`${baseUrl}/user/subscription/previous`, { headers })
        .then((response) => {
          setData(response?.data?.data);
          setDataLoading(false);
        })
        .catch((error) => {
          setDataLoading(false);

          setError(error?.response?.data?.message);
        });
    }
  };

  useEffect(() => {
    getPreviousSubscriptions();
  }, []);

  const formatDateFromISOString = (isoString) => {
    const splittedString = String(isoString).split("T")[0];
    const date = new Date(splittedString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };
  return dataLoading ? (
    <div className="bg-white w-full p-6 rounded-[18px] mt-6 flex flex-col gap-6 animate-pulse">
      <div className="w-full flex items-center justify-start lg:justify-between gap-6">
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="h-8 bg-gray-300 rounded-full w-24"></div>
      </div>
      <div className="w-full hidden lg:flex flex-col">
        <div className="w-full grid grid-cols-6 gap-6 py-4 border-b">
          <div>
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
          <div></div>
        </div>
        <div className="w-full grid grid-cols-6 gap-6 py-4 border-b">
          <div>
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:hidden gap-6">
        <div className="w-full h-auto flex flex-col p-4 bg-gray-50 rounded-2xl gap-4">
          <div className="w-full h-auto flex justify-between items-start flex-col gap-3">
            <div className="w-full flex justify-between items-start ">
              <div className="h-4 bg-gray-300 rounded w-32"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
            <div className="w-full flex justify-between items-start ">
              <div className="h-4 bg-gray-300 rounded w-32"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
            <div className="w-full flex items-start justify-between">
              <div className="h-4 bg-gray-300 rounded w-32"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
            <div className="w-full flex items-start justify-between">
              <div className="h-4 bg-gray-300 rounded w-32"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
          <div className="w-full flex justify-end items-start ">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full bg-white rounded-[18px] p-6 flex flex-col items-start gap-6">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold">Previous Subscription's</h1>
        <button
          onClick={() =>
            navigateToLink("/subscriptions/previous/all", "Service History")
          }
          className="w-auto px-2 h-6 text-xs flex items-center justify-center rounded-full bg-[#c00000]/[0.12] text-[#c00000]"
        >
          View All
        </button>
      </div>
      <div class="w-full hidden lg:flex flex-col">
        <div class="w-full -m-1.5 overflow-x-auto">
          <div class="p-1.5 w-full inline-block align-middle">
            <div class="w-full overflow-hidden">
              <table class="w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      class=" py-3 text-start text-xs font-medium text-gray-500 "
                    >
                      Subscription Date
                    </th>
                    <th
                      scope="col"
                      class=" py-3 text-start text-xs font-medium text-gray-500 "
                    >
                      Subscription Plan
                    </th>
                    <th
                      scope="col"
                      class=" py-3 text-start text-xs font-medium text-gray-500 "
                    >
                      Duration
                    </th>
                    <th
                      scope="col"
                      class=" py-3 text-start text-xs font-medium text-gray-500 "
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      class=" py-3 text-start text-xs font-medium text-gray-500 "
                    >
                      Sold by
                    </th>
                    <th
                      scope="col"
                      class=" py-3 text-end text-xs font-medium text-gray-500 "
                    ></th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  {data?.length < 1 ? (
                    <div className="w-full bg-white rounded-b-[18px] flex items-center justify-center">
                      <img src={NoData} alt="" className="w-96 my-10" />
                    </div>
                  ) : (
                    data?.map((subscription, key) => {
                      return (
                        <tr key={key}>
                          <td class=" py-4 whitespace-nowrap text-xs font-medium text-gray-800">
                            {formatDateFromISOString(subscription?.createdAt)}
                          </td>
                          <td class=" py-4 whitespace-nowrap text-xs text-gray-800">
                            {subscription?.subscriptionPlan}
                          </td>
                          <td class=" py-4 whitespace-nowrap capitalize text-xs text-gray-800">
                            {subscription?.interval}ly
                          </td>
                          <td class=" py-4 whitespace-nowrap text-xs text-gray-800">
                            USD ${subscription?.price}
                          </td>
                          <td class=" py-4 whitespace-nowrap text-xs text-gray-800">
                            {subscription?.soldBy}
                          </td>
                          <td class=" py-4 whitespace-nowrap text-end text-xs font-medium">
                            <button
                              onClick={() =>
                                navigateToLink(
                                  `/subscriptions/previous/expired/${subscription?._id}`,
                                  "Service History"
                                )
                              }
                              class="inline-flex items-center underline underline-offset-4 gap-x-2 text-xs font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                            >
                              View Detail
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 gap-2 md:grid-cols-2 lg:hidden">
        {data?.length < 1 ? (
          <div className="w-full bg-white rounded-b-[18px] flex items-center justify-center">
            <img src={NoData} alt="" className="w-96 my-10" />
          </div>
        ) : (
          data?.map((subscription, key) => {
            return (
              <PreviousSubscriptionCard key={key} subscription={subscription} />
            );
          })
        )}
      </div>
    </div>
  );
};

export default PreviousSubscriptionsTable;
