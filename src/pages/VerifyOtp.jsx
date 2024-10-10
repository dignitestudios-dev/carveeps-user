import React from "react";
import { AuthVector, LoginMockup } from "../assets/export";
import VerifyOtpCard from "../components/Authentication/VerifyOtpCard";

const VerifyOtp = () => {
  return (
    <div className="w-screen h-screen bg-white  lg:h-screen flex justify-start items-start ">
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center gap-6">
        <VerifyOtpCard />
      </div>
      <div className="w-1/2 h-full hidden bg-[#FF204E]/[0.05] lg:flex justify-center items-center">
        <img src={LoginMockup} alt="loginn_mockup" className="w-[70%]" />
      </div>
    </div>
  );
};

export default VerifyOtp;
