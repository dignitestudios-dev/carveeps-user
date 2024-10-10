import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const BillingTableCard = ({ transaction, number }) => {
  const { navigateToLink } = useContext(GlobalContext);
  return (
    <div className="w-full h-auto flex flex-col p-4 bg-gray-50 rounded-2xl gap-4">
      <div className="w-full h-auto flex justify-between items-start">
        <div className="w-1/2 flex flex-col justify-start items-start ">
          <h1 className="text-md font-medium text-black">Invoice</h1>
          <p className="text-xs font-medium text-[#7c7c7c]">
            Invoice #{number + 1}
          </p>
        </div>
        <div className="w-1/2 flex flex-col justify-start items-start ">
          <h1 className="text-md font-medium text-black">Amount</h1>
          <p className="text-xs font-medium text-[#7c7c7c]">
            USD ${transaction?.price}
          </p>
        </div>
      </div>
      <div className="w-full h-auto flex justify-between items-start">
        <div className="w-1/2 flex flex-col justify-start items-start ">
          <h1 className="text-md font-medium text-black">Subscription Plan</h1>
          <p className="text-xs font-medium text-[#7c7c7c]">
            {transaction?.subscriptionPlan}
          </p>
        </div>
        <div className="w-1/2 flex flex-col justify-start items-start ">
          <h1 className="text-md font-medium text-black">Status</h1>
          <p className="text-[9px] flex justify-center capitalize items-center w-16 px-1 h-6 rounded-full font-medium text-[#05FA00] bg-[#05FA00]/[0.1]">
            {transaction?.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BillingTableCard;
