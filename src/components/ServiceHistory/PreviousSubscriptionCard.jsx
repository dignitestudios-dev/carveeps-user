import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const PreviousSubscriptionCard = ({ subscription }) => {
  const { navigateToLink } = useContext(GlobalContext);
  const formatDateFromISOString = (isoString) => {
    const splittedString = String(isoString).split("T")[0];
    const date = new Date(splittedString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <div className="w-full h-auto flex flex-col p-4 bg-gray-50 rounded-2xl gap-4">
      <div className="w-full h-auto flex justify-between items-start">
        <div className="w-1/2 flex flex-col justify-start items-start ">
          <h1 className="text-md font-medium text-black">Subscription Date</h1>
          <p className="text-xs font-medium text-[#7c7c7c]">
            {formatDateFromISOString(subscription?.createdAt)}
          </p>
        </div>
        <div className="w-1/2 flex flex-col justify-start items-start ">
          <h1 className="text-md font-medium text-black">Subscription Plan</h1>
          <p className="text-xs font-medium text-[#7c7c7c]">
            {subscription?.subscriptionPlan}
          </p>
        </div>
      </div>
      <div className="w-full h-auto flex justify-between items-start">
        <div className="w-1/2 flex flex-col justify-start items-start ">
          <h1 className="text-md font-medium text-black">Duration</h1>
          <p className="text-xs font-medium text-[#7c7c7c]">
            {subscription?.interval}ly
          </p>
        </div>
        <div className="w-1/2 flex flex-col justify-start items-start ">
          <h1 className="text-md font-medium text-black">Amount</h1>
          <p className="text-xs font-medium text-[#7c7c7c]">
            USD ${subscription?.price}
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start ">
        <h1 className="text-md font-medium text-black">Sold by</h1>
        <p className="text-xs font-medium text-[#7c7c7c]">
          {subscription?.soldBy}
        </p>
      </div>

      <div className="w-full flex flex-col justify-start items-start ">
        <button
          onClick={() =>
            navigateToLink(
              `subscriptions/previous/expired/${subscription?._id}`,
              "Service History"
            )
          }
          className="text-md w-full h-8 flex justify-center items-center  rounded-full font-medium bg-[#ff204e] text-white"
        >
          View Detail
        </button>
      </div>
    </div>
  );
};

export default PreviousSubscriptionCard;
