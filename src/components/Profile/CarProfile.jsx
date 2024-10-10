import React from "react";

const CarProfile = ({ profile, profileLoading }) => {
  return profileLoading ? (
    <div className="w-full h-auto rounded-3xl flex flex-col justify-start items-start bg-white animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-auto min-h-56 p-4 flex justify-start items-center gap-8 px-4">
        <div className="w-full h-56 rounded-xl bg-gray-200"></div>
      </div>

      {/* Details Placeholder */}
      <div className="w-full h-auto p-4 lg:p-12 gap-4 lg:gap-16 grid grid-cols-1 border-t-2 border-[#D2D2D2]">
        <div className="w-full flex flex-col justify-start items-start gap-4 lg:gap-8">
          {/* Model/Make/Year */}
          <div className="w-auto flex flex-col justify-start items-start">
            <div className="w-32 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-48 h-4 bg-gray-300 rounded"></div>
          </div>

          {/* License Plate Number */}
          <div className="w-auto flex flex-col justify-start items-start">
            <div className="w-48 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
          </div>

          {/* Color */}
          <div className="w-auto flex flex-col justify-start items-start">
            <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
          </div>

          {/* VIN */}
          <div className="w-auto flex flex-col justify-start items-start">
            <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-auto rounded-3xl flex flex-col justify-start items-start bg-white">
      <div className="w-full h-auto min-h-36 p-4 flex justify-start items-center gap-8 px-4">
        <div className="w-full h-56 rounded-xl">
          <img
            src={
              profile?.vehicle?.image
                ? profile?.vehicle?.image
                : "https://dummyimage.com/600x400/000/fff"
            }
            className="h-56 w-full bg-gray-200 rounded-xl object-contain "
          />
        </div>
      </div>
      <div className="w-full h-auto p-4 lg:p-12 gap-4 lg:gap-16 grid grid-cols-1 border-t-2 border-[#D2D2D2]">
        <div className="w-full flex flex-col justify-start items-start gap-4 lg:gap-8">
          <div className="w-auto flex flex-col justify-start items-start">
            <label className="text-sm font-medium text-[#7c7c7c]">
              Model/Make/Year
            </label>
            <span className="text-sm font-medium text-black">
              {profile?.vehicle?.make}/{profile?.vehicle?.model}/
              {profile?.vehicle?.year}
            </span>
          </div>
          <div className="w-auto flex flex-col justify-start items-start">
            <label className="text-sm font-medium text-[#7c7c7c]">
              License Plate Number
            </label>
            <span className="text-sm font-medium text-black">
              {profile?.vehicle?.licensePlate}
            </span>
          </div>
          <div className="w-auto flex flex-col justify-start items-start">
            <label className="text-sm font-medium text-[#7c7c7c]">Color</label>
            <span className="text-sm font-medium text-black">
              {profile?.vehicle?.color}
            </span>
          </div>
          <div className="w-auto flex flex-col justify-start items-start">
            <label className="text-sm font-medium text-[#7c7c7c]">VIN</label>
            <span className="text-sm font-medium text-black">
              {profile?.vehicle?.vin}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarProfile;
