import React, { useEffect } from "react";
import { BigShieldIcon } from "../../assets/export";
import { useNavigate } from "react-router-dom";

const OtpVerifiedModal = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
      navigate("/add-card");
    }, 2000);
  }, []);
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-screen flex  justify-center items-center  bg-white  ${
        isOpen ? "scale-1" : "scale-0"
      } `}
    >
      <div className="  w-full  lg:w-96 h-96 flex flex-col gap-3 justify-center p-4 items-center rounded-3xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] bg-white ">
        <img src={BigShieldIcon} />
        <h1 className="text-3xl font-bold text-black text-center">
          Your email has been successfully verified!
        </h1>
      </div>
    </div>
  );
};

export default OtpVerifiedModal;
