import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AmericaIcon } from "../assets/export";
import { CiGlobe } from "react-icons/ci";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";
import { GlobalContext } from "../context/GlobalContext";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";

const DealersProfile = () => {
  const { navigateToLink, baseUrl } = useContext(GlobalContext);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const { id } = useParams();
  const getProfile = () => {
    const token = Cookies.get("token");
    if (token) {
      setProfileLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${baseUrl}/dealership?dealershipId=${id}`, { headers })
        .then((response) => {
          setProfile(response?.data?.data);
          setProfileLoading(false);
        })
        .catch((error) => {
          setProfileLoading(false);
          setError(error?.response?.data?.message);
          if (error?.response?.status == 401) {
            Cookies.remove("token");
            navigateToLink("/auth/login", "Login");
          }
        });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  function convertTo12HourFormat(time24) {
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12; // Convert to 12-hour format
    const minutesStr = minutes.toString().padStart(2, "0"); // Ensure two-digit minutes

    return `${hours12}:${minutesStr} ${period}`;
  }

  return profileLoading ? (
    <div className="w-full flex flex-col justify-start items-start gap-3 animate-pulse">
      {/* Main Container */}
      <div className="w-full h-auto rounded-3xl flex flex-col justify-start items-start bg-white">
        {/* Header and Logo */}
        <div className="w-full h-auto min-h-36 p-4 flex flex-col relative justify-start items-start gap-3 px-4">
          <div className="w-48 h-8 bg-gray-300 rounded mb-4"></div>
          <div className="w-full gap-3 lg:gap-8 flex justify-start items-center">
            <div className="lg:w-32 w-20 h-20 bg-gray-200 lg:h-32 rounded-full"></div>
            <div className="w-auto flex flex-col justify-start items-start">
              <div className="w-32 h-6 bg-gray-300 rounded mb-2"></div>
              <div className="w-48 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="w-48 h-10 bg-gray-300 rounded absolute bottom-4 right-4"></div>
        </div>

        {/* Business Details */}
        <div className="w-full flex flex-col p-4 lg:p-12 justify-start items-start gap-8 border-t-2 border-[#D2D2D2]">
          <div className="w-48 h-8 bg-gray-300 rounded mb-4"></div>
          <div className="w-full h-auto gap-4 lg:gap-16 grid grid-cols-1 relative md:grid-cols-2 lg:grid-cols-3">
            <div className="w-full flex flex-col gap-4 lg:gap-12 justify-start items-start">
              <div className="w-auto flex flex-col justify-start items-start">
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="w-auto flex flex-col justify-start items-start">
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="w-auto flex flex-col justify-start items-start">
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="w-auto flex flex-col justify-start items-start">
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4 lg:gap-12 justify-start items-start">
              <div className="w-auto flex flex-col justify-start items-start">
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="w-auto flex flex-col justify-start items-start">
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="w-auto flex flex-col justify-start items-start">
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="w-auto flex flex-col justify-start items-start">
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="w-full flex flex-col p-4 lg:p-12 justify-start items-start gap-8 border-t-2 border-[#D2D2D2]">
          <div className="w-48 h-8 bg-gray-300 rounded mb-4"></div>
          <div className="w-full h-auto gap-4 lg:gap-16 grid grid-cols-1 relative md:grid-cols-2 lg:grid-cols-3">
            <div className="w-full flex flex-col gap-4 lg:gap-12 justify-start items-start">
              <div className="w-auto flex flex-col justify-start items-start">
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="w-auto h-auto flex flex-col gap-2 justify-start items-start">
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4 lg:gap-12 justify-start items-start">
              <div className="w-auto flex flex-col justify-start items-start">
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="w-auto h-auto flex flex-col gap-2 justify-start items-start">
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="w-full h-auto flex justify-end">
        <div className="w-48 h-14 mt-10 rounded-lg flex items-center justify-center bg-gray-200"></div>
      </div>
    </div>
  ) : (
    <div className="w-full flex flex-col justify-start items-start gap-3">
      <div className="w-full h-auto rounded-3xl  flex flex-col justify-start items-start bg-white">
        <div className="w-full h-auto min-h-36 p-4 flex flex-col relative justify-start items-start gap-3 px-4">
          <h1 className="text-2xl font-bold text-black ml-2">
            Dealership's Profile
          </h1>
          <div className="w-full gap-3 lg:gap-8 flex justify-start items-center">
            <div className="lg:w-32 w-20 h-20 bg-gray-200 lg:h-32 rounded-full">
              <img
                src={
                  profile?.logo
                    ? profile?.logo
                    : "https://dummyimage.com/600x400/000/fff"
                }
                className=" w-20 h-20 lg:h-32 lg:w-32 rounded-full border-4 border-[#D2D2D2]"
              />
            </div>
            <div className="w-auto flex flex-col justify-start items-start ">
              <h1 className="text-lg lg:text-2xl font-bold text-black">
                {profile?.name}
              </h1>
              <span className="flex gap-2 justify-start items-center">
                <img src={AmericaIcon} className="w-8 h-8 rounded-full" />
                <p className="text-sm lg:text-lg font-medium text-[#7c7c7c]">
                  {profile?.city}, {profile?.state}
                </p>
              </span>
            </div>
          </div>
          <button
            onClick={() =>
              window.open(
                Cookies.get("appointmentLink"),
                "_blank",
                "noopener, noreferrer"
              )
            }
            className="absolute bottom-4 right-4 bg-[#FF204E]  text-white text-[17px] font-semibold flex items-center justify-center w-auto px-2 lg:w-48 h-10 rounded-xl"
          >
            Schedule Booking
          </button>
        </div>

        {/* Businness Details */}
        <div className="w-full flex flex-col  p-4 lg:p-12 justify-start items-start gap-8 border-t-2 border-[#D2D2D2]">
          <h1 className="text-2xl font-bold text-black">Bussiness Details</h1>

          <div className="w-full h-auto gap-4 lg:gap-16  grid grid-cols-1 relative md:grid-cols-2 lg:grid-cols-3 ">
            <div className="w-full flex flex-col gap-4 lg:gap-12 justify-start items-start">
              <div className="w-auto flex flex-col justify-start items-start">
                <label className="text-sm font-medium text-[#7c7c7c]">
                  Full Name
                </label>
                <span className="text-sm font-medium text-black">
                  {profile?.name}
                </span>
              </div>
              <div className="w-auto flex flex-col justify-start items-start">
                <label className="text-sm font-medium text-[#7c7c7c]">
                  Phone Number
                </label>
                <span className="text-sm font-medium text-black">
                  {profile?.phoneNumber}
                </span>
              </div>
              <div className="w-auto flex flex-col justify-start items-start">
                <label className="text-sm font-medium text-[#7c7c7c]">
                  Country
                </label>
                <span className="text-sm font-medium text-black">
                  {profile?.country}
                </span>
              </div>
              <div className="w-auto flex flex-col justify-start items-start">
                <label className="text-sm font-medium text-[#7c7c7c]">
                  State
                </label>
                <span className="text-sm font-medium text-black">
                  {profile?.state}
                </span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4 lg:gap-12 justify-start items-start">
              {/* <div className="w-auto flex flex-col justify-start items-start">
                <label className="text-sm font-medium text-[#7c7c7c]">
                  Email
                </label>
                <span className="text-sm font-medium text-black">
                  {profile?.email}
                </span>
              </div> */}
              <div className="w-auto flex flex-col justify-start items-start">
                <label className="text-sm font-medium text-[#7c7c7c]">
                  Street Address
                </label>
                <span className="text-sm font-medium text-black">
                  {profile?.address}
                </span>
              </div>
              <div className="w-auto flex flex-col justify-start items-start">
                <label className="text-sm font-medium text-[#7c7c7c]">
                  City
                </label>
                <span className="text-sm font-medium text-black">
                  {profile?.city}
                </span>
              </div>
              <div className="w-auto flex flex-col justify-start items-start">
                <label className="text-sm font-medium text-[#7c7c7c]">
                  Zip Code
                </label>
                <span className="text-sm font-medium text-black">
                  {profile?.zipCode}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="w-full flex flex-col  p-4 lg:p-12 justify-start items-start gap-8 border-t-2 border-[#D2D2D2]">
          <h1 className="text-2xl font-bold text-black">Contact Information</h1>

          <div className="w-full h-auto gap-4 lg:gap-16  grid grid-cols-1 relative md:grid-cols-2 ">
            <div className="w-full flex flex-col gap-4 lg:gap-12 justify-start items-start">
              {/* <div className="w-auto flex flex-col justify-start items-start">
                <label className="text-sm font-medium text-[#7c7c7c]">
                  Email
                </label>
                <span className="text-sm font-medium text-black">
                  {profile?.email}
                </span>
              </div> */}
              <div className="w-full  h-auto flex flex-col gap-2 justify-start items-start">
                <label className="text-sm font-medium text-[#7c7c7c]">
                  Business Hours
                </label>
                <p className="text-base w-full  flex flex-col gap-2 justify-start items-start">
                  {profile?.businessHours?.map((item) => {
                    return (
                      <div
                        key={item?.day}
                        className="w-96  flex items-center justify-between gap-2"
                      >
                        <span className="text-md font-medium text-gray-600">
                          {item?.day}
                        </span>

                        {item?.closed && (
                          <div className="w-auto h-12 rounded-md border p-2 flex flex-col justify-center items-center ">
                            <span className="text-[14px] font-medium text-gray-800">
                              Closed
                            </span>
                          </div>
                        )}
                        {item?.open24 && (
                          <div className="w-auto h-12 rounded-md border p-2 flex flex-col justify-center items-center ">
                            <span className="text-[14px] font-medium text-gray-800">
                              Opens 24 Hour
                            </span>
                          </div>
                        )}
                        {!(item?.closed || item?.open24) && (
                          <div className="w-auto flex justify-start items-center gap-2">
                            <div className="w-auto h-12 rounded-md border p-2 flex flex-col justify-center items-center">
                              <span className="text-[13px] font-medium text-gray-500">
                                Opens At
                              </span>
                              <span className="text-[14px] font-medium text-gray-800">
                                {item?.openTime}
                              </span>
                            </div>
                            <div className="w-auto h-12 rounded-md border p-2 flex flex-col justify-center items-center">
                              <span className="text-[13px] font-medium text-gray-500">
                                Closes At
                              </span>
                              <span className="text-[14px] font-medium text-gray-800">
                                {item?.closeTime}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4 lg:gap-12 justify-start items-start">
              <div className="w-auto flex flex-col justify-start items-start">
                <label className="text-sm font-medium text-[#7c7c7c]">
                  Phone Number
                </label>
                <span className="text-sm font-medium text-black">
                  {profile?.phoneNumber}
                </span>
              </div>
              <div className="w-auto h-auto flex flex-col gap-2 justify-start items-start">
                {profile?.website && (
                  <a
                    href={profile?.website}
                    target="_blank"
                    className="w-auto flex justify-start items-center gap-2"
                  >
                    <span className="w-6 h-6 rounded-full flex justify-center items-center bg-[#ff204e] text-white text-sm">
                      <CiGlobe />
                    </span>
                    <span className="text-sm font-medium text-black">
                      Website
                    </span>
                  </a>
                )}
                {profile?.facebook && (
                  <a
                    href={profile?.facebook}
                    target="_blank"
                    className="w-auto flex justify-start items-center gap-2"
                  >
                    <span className="w-6 h-6 rounded-full flex justify-center items-center bg-[#ff204e] text-white text-sm">
                      <FaFacebook />
                    </span>
                    <span className="text-sm font-medium text-black">
                      Facebook
                    </span>
                  </a>
                )}
                {profile?.instagram && (
                  <a
                    href={profile?.instagram}
                    target="_blank"
                    className="w-auto flex justify-start items-center gap-2"
                  >
                    <span className="w-6 h-6 rounded-full flex justify-center items-center bg-[#ff204e] text-white text-sm">
                      <FaInstagram />
                    </span>
                    <span className="text-sm font-medium text-black">
                      Instagram
                    </span>
                  </a>
                )}
                {profile?.twitter && (
                  <a
                    href={profile?.twitter}
                    target="_blank"
                    className="w-auto flex justify-start items-center gap-2"
                  >
                    <span className="w-6 h-6 rounded-full flex justify-center items-center bg-[#ff204e] text-white text-sm">
                      <FaTwitter />
                    </span>
                    <span className="text-sm font-medium text-black">
                      Twitter
                    </span>
                  </a>
                )}
                {profile?.linkedin && (
                  <a
                    href={profile?.linkedin}
                    target="_blank"
                    className="w-auto flex justify-start items-center gap-2"
                  >
                    <span className="w-6 h-6 rounded-full flex justify-center items-center bg-[#ff204e] text-white text-sm">
                      <FaLinkedin />
                    </span>
                    <span className="text-sm font-medium text-black">
                      Linkedin
                    </span>
                  </a>
                )}
                {profile?.tiktok && (
                  <a
                    href={profile?.tiktok}
                    target="_blank"
                    className="w-auto flex justify-start items-center gap-2"
                  >
                    <span className="w-6 h-6 rounded-full flex justify-center items-center bg-[#ff204e] text-white text-sm">
                      <FaTiktok />
                    </span>
                    <span className="text-sm font-medium text-black">
                      Tiktok
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-auto flex justify-end">
        <button
          onClick={() => navigateToLink(-1, "Service History")}
          className="w-48 h-14 mt-10 rounded-lg flex items-center justify-center bg-[#FF204E]/[0.05] text-[#FF204E] text-md font-medium"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default DealersProfile;
