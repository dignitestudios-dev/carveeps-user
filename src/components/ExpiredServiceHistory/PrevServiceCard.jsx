import React from "react";

const PrevServiceCard = ({ service }) => {
  const formatDateFromEpoch = (epoch) => {
    const date = new Date(epoch);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };
  const formatDateFromISOString = (isoString) => {
    const splittedString = String(isoString).split("T")[0];
    const [year, month, day] = splittedString.split("-");
    const formattedString = `${month}-${day}-${year}`;
    const date = new Date(formattedString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <div className="w-full h-auto flex flex-col p-4 bg-gray-50 rounded-2xl gap-4">
      <div className="w-full h-auto flex justify-between items-start">
        <div className="w-1/2 flex flex-col justify-start items-start ">
          <h1 className="text-md font-medium text-black">Last Service Date</h1>
          <p className="text-xs font-medium text-[#7c7c7c]">
            {service?.lastUsed
              ? formatDateFromISOString(service?.lastUsed)
              : "N/A"}
          </p>
        </div>
        <div className="w-1/2 flex flex-col justify-start items-start ">
          <h1 className="text-md font-medium text-black">Service</h1>
          <p className="text-xs font-medium text-[#7c7c7c]">
            {service?.service?.name}
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start ">
        <h1 className="text-md font-medium text-black">Service Details</h1>
        <p className="text-xs font-medium text-[#7c7c7c]">
          {service?.service?.details}
        </p>
      </div>
      <div className="w-full flex flex-col justify-start items-start ">
        <h1 className="text-md font-medium text-black">Status</h1>
        <p className="text-[9px] flex justify-center items-center w-16 px-1 h-6 rounded-full font-medium text-[#000] bg-[#000]/[0.1]">
          {service.status}
        </p>
      </div>
    </div>
  );
};

export default PrevServiceCard;
