import React, { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import AuthInput from "./AuthInput";
import { MdOutlineMailLock } from "react-icons/md";
import { MdOutlineLockPerson } from "react-icons/md";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { LuEye, LuEyeOff } from "react-icons/lu";

const AuthCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { navigateToLink } = useContext(GlobalContext);
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="w-full  h-auto flex flex-col justify-start items-start gap-6 p-4 lg:p-24  bg-white ">
      <span className="w-[71px] h-[71px] bg-[#FF204E]/[0.1] rounded-md flex items-center justify-center">
        <FaUser className="text-2xl text-[#FF204E]" />
      </span>
      <div className="w-auto flex flex-col justify-start items-start">
        <h2 className="text-black text-4xl font-bold">Email Address</h2>
        <span className="text-md font-medium text-[#7c7c7c] ">
          To proceed with subscription plan *Subscription Plan Name*
        </span>
      </div>

      <div className="w-full h-auto flex flex-col gap-5 justify-start items-start">
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="email" className="font-medium text-base">
            Full Name
          </label>
          <input
            type="email"
            className="border w-full text-base font-normal h-[54px] rounded-lg px-4 bg-[#f7f7f7] focus:bg-white focus:ring-1 focus:ring-[#FF204E] outline-[#FF204E]"
            placeholder="info.abcautocare.com"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="email" className="font-medium text-base">
            Email
          </label>
          <input
            type="email"
            className="border w-full text-base font-normal h-[54px] rounded-lg px-4 bg-[#f7f7f7] focus:bg-white focus:ring-1 focus:ring-[#FF204E] outline-[#FF204E]"
            placeholder="info.abcautocare.com"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="email" className="font-medium text-base">
            Phone Number
          </label>
          <input
            type="email"
            className="border w-full text-base font-normal h-[54px] rounded-lg px-4 bg-[#f7f7f7] focus:bg-white focus:ring-1 focus:ring-[#FF204E] outline-[#FF204E]"
            placeholder="info.abcautocare.com"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="password" className="font-medium text-base">
            Password
          </label>
          <div className="border w-full rounded-lg flex items-center bg-[#f7f7f7] focus:bg-white focus:ring-1 focus:ring-[#FF204E] outline-[#FF204E]">
            <input
              type={showPass ? "text" : "password"}
              className="w-full text-base font-normal h-[54px] rounded-lg bg-inherit outline-none px-4 "
              placeholder="Password"
            />
            <button className="px-4" onClick={() => setShowPass(!showPass)}>
              {showPass ? <LuEye /> : <LuEyeOff />}
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigateToLink("/verify-otp", "Dashboard")}
        className="w-full h-14 mt-4 rounded-lg flex items-center justify-center bg-[#FF204E] text-white text-md font-medium"
      >
        Next
      </button>
    </div>
  );
};

export default AuthCard;
