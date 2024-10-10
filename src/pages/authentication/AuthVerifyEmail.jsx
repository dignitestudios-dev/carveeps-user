import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { AuthVector, LoginMockup } from "../../assets/export";
import AuthCard from "../../components/Authentication/AuthCard";
import AuthInput from "../../components/Authentication/AuthInput";
import { MdOutlineLockPerson, MdOutlineMailLock } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import Error from "../../components/global/Error";
import BtnLoader from "../../components/global/BtnLoader";
import axios from "axios";
import Cookies from "js-cookie";
import { validateEmail } from "../../utils/validators";

const AuthVerifyEmail = () => {
  const { navigateToLink, baseUrl } = useContext(GlobalContext);
  // Error States
  const [emailError, setEmailError] = useState(false);
  const [formError, setFormError] = useState(false);
  // Loading States
  const [loading, setLoading] = useState(false);
  // States to manage the data
  const [email, setEmail] = useState("");

  function handleVerifyEmail(e) {
    e.preventDefault();
    if (email == "") {
      setEmailError("Email is required.");
      setTimeout(() => {
        setEmailError(false);
      }, 3000);
    } else if (!validateEmail(email)) {
      setEmailError("Email not in correct format.");
      setTimeout(() => {
        setEmailError(false);
      }, 3000);
    } else {
      setLoading(true);
      axios
        .post(`${baseUrl}/auth/forgot`, {
          email: email,
          role: "user",
        })
        .then(
          (response) => {
            Cookies.set("email", email);
            navigateToLink("/auth/verify-otp", "Dashboard");
            setLoading(false);
          },
          (error) => {
            setLoading(false);
            setFormError(error?.response?.data?.message);
          }
        );
    }
  }

  return (
    <div className="w-screen h-screen bg-white lg:h-screen flex justify-start items-start ">
      {emailError && <Error error={emailError} setError={setEmailError} />}
      {formError && <Error error={formError} setError={setFormError} />}
      <div className="w-full lg:w-1/2 h-full bg-white flex flex-col justify-center items-center gap-6">
        <div className="w-full  h-auto flex flex-col justify-start items-start gap-6 p-4 lg:p-24  bg-white ">
          <button onClick={() => navigateToLink(-1, "Dashboard")}>
            <IoArrowBack className="text-3xl" />
          </button>
          <div className="w-auto flex flex-col justify-start items-start">
            <h2 className="text-black text-4xl font-bold">Forgot Password?</h2>
            <p className="text-[14px] text-[#7c7c7c]">
              Enter your email to reset your password and swiftly resume your
              experience.
            </p>
          </div>

          <div className="w-full h-auto flex flex-col gap-5 justify-start items-start">
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="email" className="font-medium text-base">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border w-full text-base font-normal h-[54px] rounded-lg px-4 bg-[#f7f7f7] focus:bg-white focus:ring-1 focus:ring-[#FF204E] outline-[#FF204E]"
                placeholder="info.abcautocare.com"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => handleVerifyEmail(e)}
            className="w-full h-14 mt-0 rounded-lg flex items-center justify-center bg-[#FF204E] text-white text-md font-medium"
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

export default AuthVerifyEmail;
