import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { AuthVector, LoginMockup } from "../../assets/export";
import AuthCard from "../../components/Authentication/AuthCard";
import AuthInput from "../../components/Authentication/AuthInput";
import { MdOutlineLockPerson, MdOutlineMailLock } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { LuEye, LuEyeOff } from "react-icons/lu";
import Error from "../../components/global/Error";
import { validateEmail } from "../../utils/validators";
import axios from "axios";
import Cookies from "js-cookie";
import BtnLoader from "../../components/global/BtnLoader";

const AuthLogin = () => {
  const { navigateToLink, baseUrl, fetchToken } = useContext(GlobalContext);
  const [showPass, setShowPass] = useState(false);
  // Error States
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formError, setFormError] = useState(false);
  // Loading States
  const [loading, setLoading] = useState(false);
  // States to manage the data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
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
    } else if (password == "") {
      setPasswordError("Password is required.");
      setTimeout(() => {
        setPasswordError(false);
      }, 3000);
    } else if (password.length < 6) {
      setPasswordError("Minimum password length is 6.");
      setTimeout(() => {
        setPasswordError(false);
      }, 3000);
    } else {
      setLoading(true);
      axios
        .post(`${baseUrl}/auth/signIn/user`, {
          email: email,
          password: password,
        })
        .then(
          (response) => {
            if (response?.data?.data?.token) {
              Cookies.set("email", email);
              const data = response?.data?.data;
              Cookies.set("token", data?.token, { expires: 7 });
              Cookies.set("isCardAdded", JSON.stringify(data?.isCardAdded), {
                expires: 7,
              });
              Cookies.set("isSubscribed", data?.isSubscribed, { expires: 7 });
              Cookies.set("isVehicleAdded", data?.isVehicleAdded, {
                expires: 7,
              });
              if (data?.isSubscribed === false) {
                navigateToLink("/payment-summary", "Dashboard");
                setLoading(false);
                return;
              }
              if (
                data?.isVerified &&
                data?.isCardAdded &&
                data?.isSubscribed &&
                data?.isVehicleAdded
              ) {
                fetchToken().then(() => {
                  navigateToLink("/dashboard", "Dashboard");
                });
              } else if (
                !data?.isVerified &&
                !data?.isCardAdded &&
                !data?.isSubscribed &&
                !data?.isVehicleAdded
              ) {
                navigateToLink("/verify-otp", "Dashboard");
              } else if (
                data?.isVerified &&
                !data?.isCardAdded &&
                !data?.isSubscribed &&
                !data?.isVehicleAdded
              ) {
                navigateToLink("/add-card", "Dashboard");
              } else if (
                data?.isVerified &&
                data?.isCardAdded &&
                !data?.isSubscribed &&
                !data?.isVehicleAdded
              ) {
                navigateToLink("/payment-summary", "Dashboard");
              } else if (
                data?.isVerified &&
                data?.isCardAdded &&
                data?.isSubscribed &&
                !data?.isVehicleAdded
              ) {
                navigateToLink("/car-profile-setup", "Dashboard");
              }
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
      {formError && <Error error={formError} setError={setFormError} />}
      {emailError && <Error error={emailError} setError={setEmailError} />}
      {passwordError && (
        <Error error={passwordError} setError={setPasswordError} />
      )}

      <div className="w-full lg:w-1/2 h-full bg-white flex flex-col justify-center items-center gap-6">
        <form
          onSubmit={handleLogin}
          className="w-full  h-auto flex flex-col justify-start items-start gap-6 p-4 lg:p-24  bg-white "
        >
          <div className="w-auto flex flex-col justify-start items-start">
            <h2 className="text-black text-4xl font-bold">Login</h2>
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
            <div className="w-full flex flex-col justify-start items-start gap-1">
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="password" className="font-medium text-base">
                  Password
                </label>
                <div className="border w-full rounded-lg flex items-center bg-[#f7f7f7] focus:bg-white focus:ring-1 focus:ring-[#FF204E] outline-[#FF204E]">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPass ? "text" : "password"}
                    className="w-full text-base font-normal h-[54px] rounded-lg bg-inherit outline-none px-4 "
                    placeholder="Password"
                  />
                  <span className="px-4" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <LuEye /> : <LuEyeOff />}
                  </span>
                </div>
              </div>
              <div className="w-full flex justify-end items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    navigateToLink("auth/verify-email", "Dashboard")
                  }
                  className="text-sm text-blue-500 font-medium"
                >
                  Forgot Password?
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-14 mt-0 rounded-lg flex items-center justify-center bg-[#FF204E] text-white text-md font-medium"
          >
            {loading ? <BtnLoader /> : "Log In"}
          </button>
        </form>
      </div>
      <div className="w-1/2 h-full hidden bg-[#FF204E]/[0.05] lg:flex justify-center items-center">
        <img src={LoginMockup} alt="loginn_mockup" className="w-[70%] " />
      </div>
    </div>
  );
};

export default AuthLogin;
