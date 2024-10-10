import React, { useState } from "react";
import PersonalProfile from "./PersonalProfile";
import CarProfile from "./CarProfile";

const ProfileHeader = ({ profile, setUpdate, profileLoading }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(true);
  return (
    <div className="w-full flex flex-col justify-start items-start gap-8">
      <h1 className="text-2xl font-bold text-black">Profile</h1>

      <div className="w-full flex flex-col justify-start items-start gap-4 lg:px-32">
        <div className="w-auto flex justify-start items-start gap-4">
          <button
            type="button"
            onClick={() => setIsProfileOpen(true)}
            className={`${
              isProfileOpen
                ? "bg-[#FF204E] text-white"
                : "bg-[#eaeaea] text-black"
            } flex justify-center items-center hover:bg-[#ff204e] hover:text-white transition-all duration-300 text-sm font-medium h-12 px-3 rounded-full`}
          >
            Personal Information
          </button>
          <button
            type="button"
            onClick={() => setIsProfileOpen(false)}
            className={`${
              !isProfileOpen
                ? "bg-[#FF204E] text-white"
                : "bg-[#eaeaea] text-black"
            } flex justify-center items-center hover:bg-[#ff204e] hover:text-white transition-all duration-300 text-sm font-medium h-12 px-3 rounded-full`}
          >
            Car Details
          </button>
        </div>
        {isProfileOpen ? (
          <PersonalProfile
            profile={profile}
            setUpdate={setUpdate}
            profileLoading={profileLoading}
          />
        ) : (
          <CarProfile profile={profile} profileLoading={profileLoading} />
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
