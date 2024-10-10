import React, { useState, useContext, useRef, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { AuthVector, LoginMockup, ShieldIcon } from "../../assets/export";
import AuthCard from "../../components/Authentication/AuthCard";
import AuthInput from "../../components/Authentication/AuthInput";
import { MdOutlineLockPerson, MdOutlineMailLock } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import Cookies from "js-cookie";
import axios from "axios";
import Error from "../../components/global/Error";
import BtnLoader from "../../components/global/BtnLoader";

const AuthVerifyOtp = () => {
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
  const { navigateToLink, baseUrl } = useContext(GlobalContext);
  const [error, setError] = useState(false);

  function handleVerifyOtp(e) {
    e.preventDefault();
    console.log("here");
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
              Cookies.set("verifyToken", data?.token, { expires: 7 });
              navigateToLink("/auth/change-password", "Dashboard");

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
  function resendOTP(e) {
    e.preventDefault();

    setResendLoading(true);
    axios
      .post(`${baseUrl}/auth/resendOTP`, {
        email: Cookies.get("email"),
        role: "user",
      })
      .then(
        (response) => {
          setResendLoading(false);
        },
        (error) => {
          setResendLoading(false);
          setError(error?.response?.data?.message);
        }
      );
  }

  return (
    <div className="w-screen h-screen bg-white lg:h-screen flex justify-start items-start ">
      {error && <Error error={error} setError={setError} />}
      <div className="w-full lg:w-1/2 h-full bg-white flex flex-col justify-center items-start gap-6">
        <div className="w-full   h-auto flex flex-col justify-start items-start gap-6 p-4 lg:p-24  bg-white ">
          <button onClick={() => navigateToLink(-1, "Dashboard")}>
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
              <button onClick={resendOTP} className="text-[#FF204E] font-bold">
                {resendLoading ? "Sending" : "Resend"}
              </button>
            </div>
          </div>

          <button
            onClick={handleVerifyOtp}
            className="w-full h-14  rounded-lg flex items-center justify-center bg-[#FF204E] text-white text-md font-medium"
          >
            {loading ? <BtnLoader /> : "Next"}
          </button>
        </div>
      </div>
      <div className="w-1/2 h-full hidden bg-[#FF204E]/[0.05] lg:flex justify-center items-center">
        <img src={LoginMockup} alt="loginn_mockup" className="w-[70%]" />
      </div>
    </div>
  );
};

export default AuthVerifyOtp;
