import React, { useContext } from "react";
import { Logo } from "../assets/export";
import { GlobalContext } from "../context/GlobalContext";

const MainHelloScreen = () => {
  const { navigateToLink } = useContext(GlobalContext);
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center ">
      <img src={Logo} alt="logo" className="w-[160px]" />
      <h3 className="text-4xl font-bold text-center mt-20 leading-tight text-gray-800">
        Scan QR Code to register <br /> new account?
      </h3>
      <div className="w-auto my-4 flex justify-start items-center gap-2">
        <span className="w-40 h-[1px] bg-gray-600"></span>
        <span className="text-xs font-medium text-gray-600">OR</span>
        <span className="w-40 h-[1px] bg-gray-600"></span>
      </div>
      <span className="text-lg mb-2 font-medium text-gray-900">
        If you already have an account?
      </span>

      <button
        onClick={() => navigateToLink("/auth/login", "Login")}
        className={`bg-[#FF204E] text-white w-[300px] lg:w-[460px] h-[52px] font-bold text-base rounded-lg`}
      >
        Log in
      </button>
    </div>
  );
};

export default MainHelloScreen;
