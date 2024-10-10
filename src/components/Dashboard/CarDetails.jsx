import React from "react";

const CarDetails = ({ data, loading }) => {
  return loading ? (
    <div className="bg-white rounded-[18px] p-6 w-full lg:h-[228px] flex flex-col lg:flex-row gap-4 items-center justify-between">
      <div className="w-full lg:w-[25%] bg-gray-200 rounded-xl h-full flex justify-center items-center">
        <div className="rounded-xl w-full h-full bg-gray-200 animate-pulse"></div>
      </div>
      <div className="h-full w-full lg:w-[70%] flex flex-col items-start justify-between gap-4">
        <div className="w-[60%] h-[28px] bg-gray-200 animate-pulse rounded"></div>
        <div className="h-full flex gap-10 lg:gap-x-40">
          <div className="flex flex-col gap-4">
            <div>
              <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="w-32 h-5 bg-gray-200 animate-pulse mt-1 rounded"></div>
            </div>
            <div className="">
              <div className="w-16 h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="w-24 h-5 bg-gray-200 animate-pulse mt-1 rounded"></div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <div className="w-40 h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="w-32 h-5 bg-gray-200 animate-pulse mt-1 rounded"></div>
            </div>
            <div>
              <div className="w-16 h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="w-24 h-5 bg-gray-200 animate-pulse mt-1 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-white rounded-[18px] p-6 w-full lg:h-[228px] flex flex-col lg:flex-row gap-4 items-center justify-between ">
      <div className="w-full lg:w-[20%] bg-gray-200 rounded-xl h-full flex justify-center items-center">
        <img
          src={
            data?.vehicle?.image
              ? data?.vehicle?.image
              : "https://dummyimage.com/600x400/000/fff"
          }
          alt=""
          className="rounded-xl w-full object-contain h-full"
        />
      </div>
      <div className="h-full w-full lg:w-[75%] flex flex-col items-start justify-between gap-4">
        <h1 className="text-[28px] font-semibold lg:mb-3">
          {data?.vehicle?.year} {data?.vehicle?.make} {data?.vehicle?.model}
        </h1>
        <div className="h-full flex gap-10 lg:gap-x-40">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-[#5C5C5C] text-xs font-normal">
                Year/Make/Model
              </p>
              <p className="text-sm font-medium mt-1">
                {data?.vehicle?.year}/{data?.vehicle?.make}/
                {data?.vehicle?.model}
              </p>
            </div>
            <div className="">
              <p className="text-[#5C5C5C] text-xs font-normal">Car Plate</p>
              <p className="text-sm font-medium mt-1">
                {data?.vehicle?.licensePlate}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-[#5C5C5C] text-xs font-normal">
                VIN (Vehicle identification number)
              </p>
              <p className="text-sm font-medium mt-1">{data?.vehicle?.vin}</p>
            </div>
            <div>
              <p className="text-[#5C5C5C] text-xs font-normal">Color</p>
              <p className="text-sm font-medium mt-1">{data?.vehicle?.color}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
