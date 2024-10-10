import React, { useContext, useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import { FiUpload } from "react-icons/fi";
import CompleteProfileSuccess from "../components/Authentication/CompleteProfileSuccess";
import axios from "axios";
import Cookies from "js-cookie";
import BtnLoader from "../components/global/BtnLoader";
import Error from "../components/global/Error";
import { GlobalContext } from "../context/GlobalContext";

const CarProfileestup = () => {
  const [isProfileSuccess, setIsProfileSuccess] = useState(false);
  // States to manage the data:
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [license, setLicense] = useState("");
  const [vin, setVin] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { baseUrl, navigateToLink } = useContext(GlobalContext);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };
    if (token) {
      if (make == "") {
        setError("Make/Model/Year cannot be left empty.");
      } else if (model == "") {
        setError("Make/Model/Year cannot be left empty.");
      } else if (year == "") {
        setError("Make/Model/Year cannot be left empty.");
      } else if (color == "") {
        setError("Color cannot be left empty.");
      } else if (license == "") {
        setError("License Number cannot be left empty.");
      } else if (vin == "") {
        setError("VIN# cannot be left empty.");
      } else if (imageFile == null) {
        setError("Vehicle Image is required.");
      } else {
        setLoading(true);

        formdata.append("make", make);
        formdata.append("licensePlate", license);
        formdata.append("model", model);
        formdata.append("year", year);
        formdata.append("color", color);
        formdata.append("vin", vin);
        formdata.append("picture", imageFile);

        axios.post(`${baseUrl}/user/vehicle`, formdata, { headers }).then(
          (response) => {
            Cookies.set("isVehicleAdded", true, { expires: 7 });
            setIsProfileSuccess(true);
            setLoading(false);
          },
          (error) => {
            setLoading(false);

            setError(error?.response?.data?.message);
          }
        );
      }
    } else {
      setError("Token expired please resignup");
    }
  };
  const handleImageClick = (e) => {
    e.preventDefault();
    document.getElementById("image").click();
  };

  useEffect(() => {
    const isVehicleAdded = Cookies.get("isVehicleAdded") == "true";
    if (isVehicleAdded) {
      navigateToLink("/dashboard", "Dashboard");
    }
  }, []);
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-white w-full  rounded-lg p-6 lg:p-24 flex flex-col gap-6 h-auto  relative">
        <h1 className="font-bold text-[18px]">Vehicle Details</h1>
        <div
          className={`bg-[#f7f7f7] border-2 border-gray-200 rounded-lg p-4 lg:p-6  flex flex-col items-center justify-center gap-3`}
        >
          {error && <Error error={error} setError={setError} />}
          <GoAlertFill className="text-7xl text-red-600" />
          <p className="font-medium text-[18px] text-center">
            Please take a moment to review the details of your car. Once
            submitted, you won't be able to change this information later.
            Ensuring that your car details are correct now will help us provide
            you with the best service.
          </p>
        </div>
        <div className="w-full border mt-4" />
        <div className="w-full flex flex-col  items-start justify-between gap-6  ">
          <h1 className="font-bold text-[18px]">Car Photo</h1>
          <div
            className={`bg-[#f7f7f7] cursor-pointer w-full h-48 border-2 border-gray-200 rounded-lg   flex flex-col items-center justify-center gap-3`}
          >
            {base64Image ? (
              <img
                onClick={handleImageClick}
                src={base64Image}
                className="w-full h-full rounded-lg object-contain"
              />
            ) : (
              <>
                <FiUpload
                  onClick={handleImageClick}
                  className="text-3xl text-[#ff204e]"
                />

                <span
                  onClick={handleImageClick}
                  className="text-[#ff204e] text-md font-medium "
                >
                  Upload Car Photo
                </span>
              </>
            )}
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="w-full border mt-4" />
        <div className="w-full flex flex-col  items-start justify-between gap-6 ">
          <h1 className="font-bold text-[18px]">Car Information</h1>

          <div className="w-full flex flex-col gap-6  justify-start items-start">
            <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="w-full flex flex-col gap-2 justify-start items-start">
                <label className="text-sm font-medium text-black">Make</label>
                <input
                  type="text"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="border w-full text-base font-normal h-[54px] rounded-lg px-4 bg-[#f7f7f7] focus:bg-white focus:ring-1 focus:ring-[#FF204E] outline-[#FF204E]"
                />
              </div>
              <div className="w-full flex flex-col gap-2 justify-start items-start">
                <label className="text-sm font-medium text-black">Model</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="border w-full text-base font-normal h-[54px] rounded-lg px-4 bg-[#f7f7f7] focus:bg-white focus:ring-1 focus:ring-[#FF204E] outline-[#FF204E]"
                />
              </div>
              <div className="w-full flex flex-col gap-2 justify-start items-start">
                <label className="text-sm font-medium text-black">Year</label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="border w-full text-base font-normal h-[54px] rounded-lg px-4 bg-[#f7f7f7] focus:bg-white focus:ring-1 focus:ring-[#FF204E] outline-[#FF204E]"
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="w-full flex flex-col gap-2 justify-start items-start">
                <label className="text-sm font-medium text-black">Color</label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="border w-full text-base font-normal h-[54px] rounded-lg px-4 bg-[#f7f7f7] focus:bg-white focus:ring-1 focus:ring-[#FF204E] outline-[#FF204E]"
                />
              </div>
              <div className="w-full flex flex-col gap-2 justify-start items-start">
                <label className="text-sm font-medium text-black">
                  License Plate Number
                </label>
                <input
                  type="text"
                  value={license}
                  maxLength={20}
                  onChange={(e) => setLicense(e.target.value)}
                  className="border w-full text-base font-normal h-[54px] rounded-lg px-4 bg-[#f7f7f7] focus:bg-white focus:ring-1 focus:ring-[#FF204E] outline-[#FF204E]"
                />
              </div>
              <div className="w-full flex flex-col gap-2 justify-start items-start">
                <label className="text-sm font-medium text-black">
                  VIN{" "}
                  <span className="text-xs text-[#7c7c7c]">
                    (Vehicle Identification Number)
                  </span>
                </label>
                <input
                  type="text"
                  value={vin}
                  maxLength={17}
                  onChange={(e) => setVin(e.target.value)}
                  className="border w-full text-base font-normal h-[54px] rounded-lg px-4 bg-[#f7f7f7] focus:bg-white focus:ring-1 focus:ring-[#FF204E] outline-[#FF204E]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end items-center">
          {isProfileSuccess && (
            <CompleteProfileSuccess
              isOpen={isProfileSuccess}
              setIsOpen={setIsProfileSuccess}
            />
          )}

          <button
            type="submit"
            className={`bg-[#FF204E] text-white font-medium text-base rounded-lg w-full lg:w-[250px] h-[50px] `}
          >
            {loading ? <BtnLoader /> : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CarProfileestup;
