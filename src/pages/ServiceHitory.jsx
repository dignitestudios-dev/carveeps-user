import React from "react";
import ServiceRecordsList from "../components/ServiceHistory/ServiceRecordsList";
import PackageCard from "../components/ServiceHistory/PackageCard";
import PreviousSubscriptionsTable from "../components/ServiceHistory/PreviousSubscriptionsTable";

const ServiceHitory = () => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-2">
      <h1 className="text-2xl font-bold text-black">Service History</h1>
      <PackageCard />
      <ServiceRecordsList />
      <PreviousSubscriptionsTable />
    </div>
  );
};

export default ServiceHitory;
