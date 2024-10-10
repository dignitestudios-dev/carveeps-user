import React, { useEffect } from "react";
import { BigShieldIcon } from "../../assets/export";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const SubscriptionActivatedModal = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
      navigate("/car-profile-setup");
    }, 5000);
  }, []);
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-screen flex  justify-center items-center  bg-white  ${
        isOpen ? "scale-1" : "scale-0"
      } `}
    >
      <div className="  w-full  lg:w-96 h-96 flex flex-col gap-3 justify-center p-4 items-center rounded-3xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] bg-white ">
        <span className="bg-[#FF204E]/[0.2] w-24 h-24 rounded-full flex items-center justify-center text-[#FF204E] text-3xl">
          <FaCheck />
        </span>
        <h1 className="text-3xl font-bold text-black text-center">
          Congratulations
        </h1>
        <p className="text-xl font-medium text-gray-700 text-center">
          Your subscription is now active. Let’s keep your car in top shape
        </p>
      </div>
    </div>
  );
};

export default SubscriptionActivatedModal;
