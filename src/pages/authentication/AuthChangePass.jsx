import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { GlobalContext } from "../../context/GlobalContext";
import { AuthVector, LoginMockup } from "../../assets/export";
import AuthCard from "../../components/Authentication/AuthCard";
import AuthInput from "../../components/Authentication/AuthInput";
import { MdOutlineLockPerson, MdOutlineMailLock } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { LuEye, LuEyeOff } from "react-icons/lu";
import Error from "../../components/global/Error";
import BtnLoader from "../../components/global/BtnLoader";

const AuthChangePass = () => {
  // Error States
  const [passwordError, setPasswordError] = useState(false);
  const [formError, setFormError] = useState(false);
  const { navigateToLink, baseUrl } = useContext(GlobalContext);
  // Loading States
  const [loading, setLoading] = useState(false);
  // States to manage the data
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isConfPassVisible, setIsConfPassVisible] = useState(false);

  function handleChangePass(e) {
    e.preventDefault();
    if (password == "") {
      setPasswordError("Password is required.");
      setTimeout(() => {
        setPasswordError(false);
      }, 3000);
    } else if (password.length < 6) {
      setPasswordError("Minimum Password length is 6.");
      setTimeout(() => {
        setPasswordError(false);
      }, 3000);
    } else if (password !== confPass) {
      setPasswordError("Password doesn't match");
      setTimeout(() => {
        setPasswordError(false);
      }, 3000);
    } else {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${Cookies.get("verifyToken")}`,
      };
      axios
        .post(
          `${baseUrl}/auth/updatePassword`,

          {
            password: password,
          },
          { headers }
        )
        .then(
          (response) => {
            if (response?.status == 200) {
              navigateToLink("/auth/login", "Dashboard");
            }
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
      {/* Email Error */}
      {passwordError && (
        <Error error={passwordError} setError={setPasswordError} />
      )}

      {/* Form Error */}
      {formError && <Error error={formError} setError={setFormError} />}
      <div className="w-full lg:w-1/2 h-full bg-white flex flex-col justify-center items-center gap-6">
        <div className="w-full  h-auto flex flex-col justify-start items-start gap-6 p-4 lg:p-24  bg-white ">
          <button onClick={() => navigateToLink(-1, "Dashboard")}>
            <IoArrowBack className="text-3xl" />
          </button>
          <div className="w-auto flex flex-col justify-start items-start">
            <h2 className="text-black text-4xl font-bold">Update Password</h2>
          </div>

          <div className="w-full h-auto flex flex-col gap-5 justify-start items-start">
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="password" className="font-medium text-base">
                Password
              </label>
              <div className="border w-full rounded-lg flex items-center bg-[#f7f7f7] focus:bg-white focus:ring-1 focus:ring-[#FF204E] outline-[#FF204E]">
                <input
                  type={isPassVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-base font-normal h-[54px] rounded-lg bg-inherit outline-none px-4 "
                  placeholder="Password"
                />
                <span
                  className="px-4 cursor-pointer"
                  onClick={() => setIsPassVisible(!isPassVisible)}
                >
                  {isPassVisible ? <LuEye /> : <LuEyeOff />}
                </span>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="password" className="font-medium text-base">
                Re-Enter Password
              </label>
              <div className="border w-full rounded-lg flex items-center bg-[#f7f7f7] focus:bg-white focus:ring-1 focus:ring-[#FF204E] outline-[#FF204E]">
                <input
                  type={isConfPassVisible ? "text" : "password"}
                  value={confPass}
                  onChange={(e) => setConfPass(e.target.value)}
                  className="w-full text-base font-normal h-[54px] rounded-lg bg-inherit outline-none px-4 "
                  placeholder="Password"
                />
                <span
                  className="px-4 cursor-pointer"
                  onClick={() => setIsConfPassVisible(!isConfPassVisible)}
                >
                  {isConfPassVisible ? <LuEye /> : <LuEyeOff />}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleChangePass}
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

export default AuthChangePass;
