import React, { useState, useContext } from "react";
import { LoginMockup } from "../assets/export";
import AuthCard from "../components/Authentication/AuthCard";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { MdOutlineMailLock } from "react-icons/md";
import { MdOutlineLockPerson } from "react-icons/md";
import Error from "../components/global/Error";
import Cookies from "js-cookie";
import { validateEmail } from "../utils/validators";
import BtnLoader from "../components/global/BtnLoader";

const Login = () => {
  const { navigateToLink, baseUrl, error, setError } =
    useContext(GlobalContext);

  // Loading States
  const [loading, setLoading] = useState(false);
  // States to manage the data
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [rePassword, setRePassword] = useState("");
  const [reShowPass, setReShowPass] = useState(false);

  function handleSignup(e) {
    e.preventDefault();
    const planId = Cookies.get("planId");
    if (planId) {
      if (email == "") {
        setError("Email is required.");
        setTimeout(() => {
          setError(false);
        }, 3000);
      } else if (!validateEmail(email)) {
        setError("Email not in correct format.");
        setTimeout(() => {
          setError(false);
        }, 3000);
      } else if (password == "") {
        setError("Password is required.");
        setTimeout(() => {
          setError(false);
        }, 3000);
      } else if (rePassword == "") {
        setError("You must confirm your password.");
        setTimeout(() => {
          setError(false);
        }, 3000);
      } else if (rePassword !== password) {
        setError("Password's doesn't match.");
        setTimeout(() => {
          setError(false);
        }, 3000);
      } else if (password.length < 6) {
        setError("Minimum password length is 6.");
        setTimeout(() => {
          setError(false);
        }, 3000);
      } else {
        setLoading(true);
        axios
          .post(`${baseUrl}/auth/signUp/user`, {
            email: email,
            name: fullName,
            phoneNumber: phone,
            password: password,
            subscriptionPlan: planId,
          })
          .then(
            (response) => {
              Cookies.set("email", email, { expires: 1 });
              navigateToLink("/verify-otp", "Dashboard");
              setLoading(false);
            },
            (error) => {
              setLoading(false);
              setError(error?.response?.data?.message);
            }
          );
      }
    } else {
      setError(
        "You don't have any plan. Please try to scan the QR Code again."
      );
    }
  }
  return (
    <div className="w-screen h-screen  lg:h-screen flex justify-start items-start ">
      {error && <Error error={error} setError={setError} />}
      <div className="w-full lg:w-1/2 h-full bg-white flex flex-col justify-center items-center gap-6">
        <form
          onSubmit={handleSignup}
          className="w-full  h-auto flex flex-col justify-start items-start gap-6 p-4 lg:p-24  bg-white "
        >
          <span className="w-[71px] h-[71px] mt-14 bg-[#FF204E]/[0.1] rounded-md flex items-center justify-center">
            <FaUser className="text-2xl text-[#FF204E]" />
          </span>
          <div className="w-auto flex flex-col justify-start items-start">
            <h2 className="text-black text-4xl font-bold">Email Address</h2>
            <span className="text-md font-medium text-[#7c7c7c] ">
              To proceed with subscription plan {Cookies?.get("planName")}
            </span>
          </div>

          <div className="w-full h-auto flex flex-col gap-5 justify-start items-start">
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="email" className="font-medium text-base">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border w-full text-base font-normal h-[50px] rounded-lg px-4 bg-[#f7f7f7] focus:bg-white focus:ring-1 focus:ring-[#FF204E] outline-[#FF204E]"
                placeholder="e.g. Jack Anderson"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="email" className="font-medium text-base">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border w-full text-base font-normal h-[50px] rounded-lg px-4 bg-[#f7f7f7] focus:bg-white focus:ring-1 focus:ring-[#FF204E] outline-[#FF204E]"
                placeholder="info.abcautocare.com"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="email" className="font-medium text-base">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                maxLength={11}
                onChange={(e) => setPhone(e.target.value)}
                className="border w-full text-base font-normal h-[50px] rounded-lg px-4 bg-[#f7f7f7] focus:bg-white focus:ring-1 focus:ring-[#FF204E] outline-[#FF204E]"
                placeholder="1234567890"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="password" className="font-medium text-base">
                Password
              </label>
              <div className="border w-full rounded-lg flex items-center bg-[#f7f7f7] focus:bg-white focus:ring-1 focus:ring-[#FF204E] outline-[#FF204E]">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-base font-normal h-[50px] rounded-lg bg-inherit outline-none px-4 "
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="px-4"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <LuEye /> : <LuEyeOff />}
                </button>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="password" className="font-medium text-base">
                Confirm Password
              </label>
              <div className="border w-full rounded-lg flex items-center bg-[#f7f7f7] focus:bg-white focus:ring-1 focus:ring-[#FF204E] outline-[#FF204E]">
                <input
                  type={reShowPass ? "text" : "password"}
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  className="w-full text-base font-normal h-[50px] rounded-lg bg-inherit outline-none px-4 "
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  className="px-4"
                  onClick={() => setReShowPass(!reShowPass)}
                >
                  {reShowPass ? <LuEye /> : <LuEyeOff />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-14 mt-4 rounded-lg flex items-center justify-center bg-[#FF204E] text-white text-md font-medium"
          >
            {loading ? <BtnLoader /> : "Next"}
          </button>
        </form>
      </div>
      <div className="w-1/2 h-full hidden bg-gray-50 lg:flex justify-center items-center">
        <img src={LoginMockup} alt="loginn_mockup" className="w-[70%]" />
      </div>
    </div>
  );
};

export default Login;
