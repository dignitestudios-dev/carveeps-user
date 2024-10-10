import React, { useContext, useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import AuthInput from "./AuthInput";
import { MdOutlineMailLock } from "react-icons/md";
import { MdOutlineLockPerson } from "react-icons/md";
import { Link } from "react-router-dom";
import { ShieldIcon } from "../../assets/export";
import { IoArrowBack } from "react-icons/io5";
import OtpVerifiedModal from "./OtpVerifiedModal";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";
import axios from "axios";
import BtnLoader from "../global/BtnLoader";
import Error from "../global/Error";

const VerifyOtpCard = () => {
  const otpInputs = Array.from({ length: 6 }, () => useRef(null));
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    otpInputs[0].current.focus();
  }, []);

  const handleInputChange = (index, e) => {
    const input = e.target;
    const newOtp =
      otp.substring(0, index) + input.value + otp.substring(index + 1);

    setOtp(newOtp);

    if (e.inputType === "deleteContentBackward" && index > 0) {
      otpInputs[index - 1].current.focus();
    } else if (index < otpInputs.length - 1 && input.value !== "") {
      otpInputs[index + 1].current.focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      otpInputs[index - 1].current.focus();
    }
  };
  const [isVerified, setIsVerified] = useState(false);
  const { navigateToLink, baseUrl } = useContext(GlobalContext);
  const [error, setError] = useState(false);

  function handleVerifyOtp(e) {
    e.preventDefault();
    const email = Cookies.get("email");
    if (email) {
      if (otp == "") {
        setError("OTP is required.");
        setTimeout(() => {
          setError(false);
        }, 3000);
      } else if (otp.length < 6) {
        setError("OTP must contain 6 digits");
        setTimeout(() => {
          setError(false);
        }, 3000);
      } else {
        setLoading(true);
        axios
          .post(`${baseUrl}/auth/verifyOTP`, {
            email: email,
            otp: otp,
            role: "user",
          })
          .then(
            (response) => {
              const data = response?.data?.data;
              Cookies.set("token", data?.token, { expires: 7 });
              Cookies.set("stripeAccount", data?.dealershipAccountId, {
                expires: 7,
              });
              Cookies.set("isCardAdded", data?.isCardAdded, { expires: 7 });
              Cookies.set("isSubscribed", data?.isSubscribed, { expires: 7 });
              Cookies.set("isVehicleAdded", data?.isVehicleAdded, {
                expires: 7,
              });
              if (
                data?.isCardAdded &&
                data?.isSubscribed &&
                data?.isVehicleAdded
              ) {
                navigateToLink("/dashboard", "Dashboard");
              } else if (
                !data?.isCardAdded &&
                !data?.isSubscribed &&
                !data?.isVehicleAdded
              ) {
                setIsVerified(true);
              } else if (
                data?.isCardAdded &&
                !data?.isSubscribed &&
                !data?.isVehicleAdded
              ) {
                navigateToLink("/payment-summary", "Dashboard");
              } else if (
                data?.isCardAdded &&
                data?.isSubscribed &&
                !data?.isVehicleAdded
              ) {
                navigateToLink("/car-profile-setup", "Dashboard");
              }

              setLoading(false);
            },
            (error) => {
              setLoading(false);
              setError(error?.response?.data?.message);
            }
          );
      }
    } else {
      setError("Your email was removed from storage. Please try to re-signup.");
    }
  }
  const [resendLoading, setResendLoading] = useState(false);
  function resendOtp(e) {
    e.preventDefault();
    const email = Cookies.get("email");
    if (email) {
      setResendLoading(true);
      axios
        .post(`${baseUrl}/auth/resendOTP`, {
          email: email,
          role: "user",
        })
        .then(
          (response) => {
            alert("Otp Resend succcessfully."); //For now
            setResendLoading(false);
          },
          (error) => {
            setResendLoading(false);
            setError(error?.response?.data?.message);
          }
        );
    } else {
      setError("Your email was removed from storage. Please try to re-signup.");
    }
  }
  return (
    <form
      onSubmit={handleVerifyOtp}
      className="w-full   h-auto flex flex-col justify-start items-start gap-6 p-4 lg:p-24  bg-white "
    >
      {error && <Error error={error} setError={setError} />}
      <button type="button" onClick={() => navigateToLink(-1, "Dashboard")}>
        <IoArrowBack className="text-3xl" />
      </button>
      <div className="w-auto flex flex-col gap-1 justify-start items-start">
        <h2 className="text-black text-4xl font-bold">Verification</h2>
        <span className="text-[14px] text-start font-medium text-[#7c7c7c] ">
          Please enter the code that we sent to your email{" "}
          {Cookies?.get("email")}, <br /> to verify your email.
        </span>
      </div>
      <div className="w-full flex flex-col gap-2 justify-start items-start">
        <div className="w-full h-auto flex  gap-1 lg:gap-3 justify-start items-start">
          {otpInputs.map((inputRef, index) => {
            return (
              <input
                type="text"
                ref={inputRef}
                key={index}
                className={`otp-input w-10 lg:w-16 h-10 lg:h-16 text-md lg:text-xl  flex items-center justify-center text-center border-2 bg-[#f7f7f7] outline-none  rounded-xl p-2 mx-1 focus:bg-[#fff] text-[#000]`}
                maxLength="1"
                onChange={(e) => handleInputChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            );
          })}
        </div>
        <div className="w-auto ml-1 flex gap-2 justify-start items-center">
          <span className="text-md font-medium text-[#7c7c7c]">
            Didn’t receive the code?{" "}
          </span>
          <button
            type="button"
            onClick={resendOtp}
            className="text-[#FF204E] font-bold"
          >
            {resendLoading ? "Sending" : "Resend"}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full h-14 mt-8 rounded-lg flex items-center justify-center bg-[#FF204E] text-white text-md font-medium"
      >
        {loading ? <BtnLoader /> : "Next"}
      </button>
      {isVerified && (
        <OtpVerifiedModal isOpen={isVerified} setIsOpen={setIsVerified} />
      )}
    </form>
  );
};

export default VerifyOtpCard;
