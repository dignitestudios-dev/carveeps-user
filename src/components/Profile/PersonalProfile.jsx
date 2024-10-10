import React, { useContext, useEffect, useState } from "react";
import { AmericaIcon } from "../../assets/export";
import { Link } from "react-router-dom";
import { RiImageEditFill } from "react-icons/ri";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";
import axios from "axios";

const PersonalProfile = ({ profile, setUpdate, profileLoading }) => {
  const { baseUrl, navigateToLink } = useContext(GlobalContext);
  const [imageFile, setImageFile] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const formdata = new FormData();
  const handleImageClick = (e) => {
    e.preventDefault();
    document.getElementById("profileImage").click();
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const updateProfile = () => {
    const token = Cookies.get("token");
    if (token) {
      if (imageFile == null) {
        setError("Profile picture must be provided.");
      } else {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        setLoading(true);
        formdata.append("profilePicture", imageFile);
        axios
          .put(`${baseUrl}/user`, formdata, { headers })
          .then((response) => {
            Cookies.set("userProfile", base64Image);
            setLoading(false);
            setUpdate((prev) => !prev);
            // Show profile update success later
          })
          .catch((error) => {
            setError(error?.response?.data?.message);
          });
      }
    } else {
      setError("Your session has expired. Logging you out.");
      navigateToLink("/auth/login", "Login");
    }
  };

  useEffect(() => {
    updateProfile();
  }, [imageFile]);

  return profileLoading ? (
    <div className="w-full h-auto rounded-3xl flex flex-col justify-start items-start bg-white animate-pulse">
      {/* Header */}
      <div className="w-full h-auto min-h-36 p-4 flex justify-start items-center gap-3 lg:gap-8 px-4">
        <div className="relative lg:w-32 w-20 h-20 lg:h-32 rounded-full flex items-center justify-center bg-gray-200">
          {/* Placeholder for profile picture */}
          <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-white text-lg font-bold">...</span>
          </div>
          <span className="w-8 h-8 cursor-not-allowed rounded-full flex justify-center items-center absolute bottom-4 -right-1 bg-gray-300"></span>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
          />
        </div>
        <div className="w-auto flex flex-col justify-start items-start">
          <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
          <div className="flex gap-2 justify-start items-center mt-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="w-full h-auto p-4 lg:p-12 gap-4 lg:gap-16 grid grid-cols-1 relative md:grid-cols-2 lg:grid-cols-3 border-t-2 border-[#D2D2D2]">
        <div className="w-full flex flex-col gap-4 lg:gap-12 justify-start items-start">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-auto flex flex-col justify-start items-start"
            >
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
              <div className="w-32 h-4 bg-gray-300 rounded mt-2"></div>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col gap-4 lg:gap-12 justify-start items-start">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-auto flex flex-col justify-start items-start"
            >
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
              <div className="w-32 h-4 bg-gray-300 rounded mt-2"></div>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col gap-4 lg:gap-12 justify-start items-end">
          <div className="w-24 h-10 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-auto rounded-3xl  flex flex-col justify-start items-start bg-white">
      <div className="w-full h-auto min-h-36 p-4 flex justify-start items-center gap-3 lg:gap-8 px-4">
        <div className="relative lg:w-32 w-20 h-20  lg:h-32 rounded-full flex items-center justify-center">
          {loading ? (
            <span className="w-full h-full rounded-full bg-black/90 text-white text-lg font-bold  flex items-center justify-center">
              ...
            </span>
          ) : (
            <img
              src={
                profile?.profilePicture
                  ? profile?.profilePicture
                  : "https://t3.ftcdn.net/jpg/06/33/54/78/240_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg"
              }
              className=" w-20 h-20 lg:h-32 lg:w-32 rounded-full object-contain bg-gray-200 border-4 border-[#D2D2D2]"
            />
          )}

          <span
            onClick={handleImageClick}
            className="w-8 h-8 cursor-pointer rounded-full flex justify-center items-center absolute bottom-4 -right-1 bg-[#FF204E] text-white"
          >
            <RiImageEditFill className="text-md" />
          </span>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="w-auto flex flex-col justify-start items-start ">
          <h1 className="text-lg lg:text-2xl font-bold text-black">
            {profile?.name ? profile?.name : "N/A"}
          </h1>
          {profile?.city && profile?.country ? (
            <span className="flex gap-2 justify-start items-center">
              <img src={AmericaIcon} className="w-8 h-8 rounded-full" />
              <p className="text-sm lg:text-lg font-medium text-[#7c7c7c]">
                {profile?.city}, {profile?.country}
              </p>
            </span>
          ) : null}
        </div>
      </div>
      <div className="w-full h-auto p-4 lg:p-12 gap-4 lg:gap-16  grid grid-cols-1 relative md:grid-cols-2 lg:grid-cols-3 border-t-2 border-[#D2D2D2]">
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
              {profile?.country ? profile?.country : "N/A"}
            </span>
          </div>
          <div className="w-auto flex flex-col justify-start items-start">
            <label className="text-sm font-medium text-[#7c7c7c]">State</label>
            <span className="text-sm font-medium text-black">
              {profile?.state ? profile?.state : "N/A"}
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 lg:gap-12 justify-start items-start">
          <div className="w-auto flex flex-col justify-start items-start">
            <label className="text-sm font-medium text-[#7c7c7c]">Email</label>
            <span className="text-sm font-medium text-black">
              {profile?.email}
            </span>
          </div>
          <div className="w-auto flex flex-col justify-start items-start">
            <label className="text-sm font-medium text-[#7c7c7c]">
              Street Address
            </label>
            <span className="text-sm font-medium text-black">
              {profile?.address ? profile?.address : "N/A"}
            </span>
          </div>
          <div className="w-auto flex flex-col justify-start items-start">
            <label className="text-sm font-medium text-[#7c7c7c]">City</label>
            <span className="text-sm font-medium text-black">
              {profile?.city ? profile?.city : "N/A"}
            </span>
          </div>
          <div className="w-auto flex flex-col justify-start items-start">
            <label className="text-sm font-medium text-[#7c7c7c]">
              Zip Code
            </label>
            <span className="text-sm font-medium text-black">
              {profile?.zipCode ? profile?.zipCode : "N/A"}
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 lg:gap-12 justify-start items-end">
          <Link
            to={"/profile/edit"}
            className="bg-[#FF204E]/[0.24] absolute top-4 right-4 lg:static text-[#FF204E] text-sm font-medium hover:bg-[#FF204E] hover:text-white transition-all duration-300 w-auto px-5 h-10 rounded-full flex items-center justify-center"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PersonalProfile;
