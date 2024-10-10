import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const ChangePassword = () => {
  const { navigateToLink } = useContext(GlobalContext);
  return (
    <div className="w-full flex flex-col justify-start items-start gap-2">
      <h1 className="text-2xl font-bold text-black">Change Password</h1>
      <p>
        To reset your password, please click on the link below. You will receive
        an email with instructions on how to reset your password.
      </p>
      <button
        onClick={() => navigateToLink("/")}
        className="text-[#167EFB] font-medium"
      >
        Reset Password
      </button>
    </div>
  );
};

export default ChangePassword;
