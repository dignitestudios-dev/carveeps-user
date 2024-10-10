import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ExpiredPackageCard from "../components/ExpiredServiceHistory/ExpiredPackageCard";
import ExpiredServiceRecordsList from "../components/ExpiredServiceHistory/ExpiredServiceRecordsList";
import { GlobalContext } from "../context/GlobalContext";

const ViewAllExpiredSubscriptions = () => {
  const { navigateToLink } = useContext(GlobalContext);
  return (
    <div className="w-full flex flex-col justify-start items-start gap-2">
      <h1 className="text-2xl font-bold text-black">Service History</h1>
      <ExpiredPackageCard />
      <ExpiredServiceRecordsList />
      <div className="w-full flex justify-end items-center mt-4">
        <button
          onClick={() => navigateToLink(-1, "Service History")}
          className="w-40 h-12 rounded-lg bg-[#FF204E] flex items-center justify-center text-md font-medium text-white"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewAllExpiredSubscriptions;
