import React, { useContext } from "react";
import {
  AddCardMockup,
  AuthVector,
  SubscriptionMockup,
} from "../assets/export";
import SubscriptionCard from "../components/HomeSubscription/SubscriptionCard";
import { GlobalContext } from "../context/GlobalContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

const Home = () => {
  const { id } = useParams();
  const { navigateToLink, baseUrl } = useContext(GlobalContext);

  const [plan, setPlan] = useState(null);
  const [planLoading, setPlanLoading] = useState(false);
  const getPlan = () => {
    const token = Cookies.get("token");

    setPlanLoading(true);

    axios.get(`${baseUrl}/dealership/subscription/${id}`).then(
      (response) => {
        setPlan(response?.data?.data);
        setPlanLoading(false);
      },
      (error) => {
        setPlanLoading(false);
        if (error?.response?.status == 404) {
          navigateToLink("/");
        }

        if (error?.response?.status == 401) {
          Cookies.remove("token");
          navigateToLink("/auth/login");
        }
      }
    );
  };

  useEffect(() => {
    getPlan();
  }, []);
  return (
    <div className="w-screen h-auto px-4 bg-white lg:px-0 py-6 lg:py-0 lg:h-screen flex justify-start items-start ">
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center gap-6">
        <div className="w-full lg:w-[80%] flex flex-col text-center gap-3  justify-center items-center">
          <span className="text-xl font-bold text-[#c00000]">
            {" "}
            {plan?.dealership?.name}
          </span>
          <h1 className="text-3xl lg:text-5xl font-bold text-black">
            Subscription Plan
          </h1>
          <p className="text-[#7c7c7c] font-semibold text-sm">
            Discover a world of automotive services tailored to your
            preferences. Choose subscription plan that fits you best and enjoy
            hassle-free access to top-notch car care.
          </p>
        </div>
        <SubscriptionCard plan={plan} loading={planLoading} />
      </div>
      <div className="w-1/2 h-full hidden bg-[#FF204E]/[0.05] lg:flex justify-center items-center">
        <img
          src={AddCardMockup}
          alt="subscription_mockup"
          className="w-full h-full "
        />
      </div>
    </div>
  );
};

export default Home;
