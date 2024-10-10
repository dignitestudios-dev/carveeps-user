import React, { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import AuthInput from "./AuthInput";
import { CiCreditCard1 } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { MasterCardIcon } from "../../assets/export";
import SubscriptionActivatedModal from "./SubscriptionActivatedModal";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";
import axios from "axios";
import BtnLoader from "../global/BtnLoader";
import Error from "../global/Error";

const PaymentSummaryCard = () => {
  const [isPaymentSucceeded, setIsPaymentSucceeded] = useState(false);
  const { navigateToLink, baseUrl } = useContext(GlobalContext);
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [error, setError] = useState(false);

  const getSummary = () => {
    const token = Cookies.get("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setSummaryLoading(true);
      axios
        .get(`${baseUrl}/user/summary`, { headers })
        .then((response) => {
          if (
            response?.data?.data?.card?.status == "active" ||
            response?.data?.data?.card?.status == "pending"
          ) {
            Cookies?.set("isCardAdded", true);
            Cookies.set("planId", response?.data?.data?.subscriptionPlan?._id, {
              expires: 7,
            });
            setSummary(response?.data?.data);
          } else {
            Cookies?.set("isCardAdded", false);
            setError("Your card details was not accepted please resubmit.");
            navigateToLink("/add-card", "Dashboard");
          }
          setSummaryLoading(false);
        })
        .catch((error) => {
          setSummaryLoading(false);

          setError(error?.response?.data?.message);
        });
    }
  };

  useEffect(() => {
    // Apply the conditions here later as well
    //get summary only if user has not subscribed
    getSummary();
  }, []);

  const [buyLoading, setBuyLoading] = useState(false);
  const buyPlan = () => {
    console.log(summary?.subscriptionPlan);
    const token = Cookies.get("token");
    const planId = Cookies.get("planId");
    if (token) {
      setBuyLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .post(
          `${baseUrl}/user/subscription/buy`,
          {
            subscriptionPlanId: summary?.subscriptionPlan?._id,
          },
          { headers }
        )
        .then((response) => {
          setBuyLoading(false);
          Cookies?.set("isSubscribed", true);
          setIsPaymentSucceeded(true);
        })
        .catch((error) => {
          setBuyLoading(false);
          setError(error?.response?.data?.message);
        });
    }
  };
  useEffect(() => {
    const isSubscribed = Cookies.get("isSubscribed") == "true";
    if (isSubscribed) {
      navigateToLink("/car-profile-setup", "Dashboard");
    }
  }, []);
  return summaryLoading ? (
    <div className="w-full relative h-full flex flex-col justify-start items-start gap-6 p-4 lg:p-24 bg-white">
      <div className="w-full flex flex-col justify-start items-center">
        <h2 className="text-black text-3xl font-bold animate-pulse bg-gray-200 w-32 h-8 rounded-md"></h2>
      </div>
      <div className="w-full h-auto flex flex-col gap-5 justify-start items-start">
        <div className="w-full flex flex-col gap-2 justify-start items-start">
          <label className="text-lg font-medium text-black bg-gray-200 w-48 h-6 rounded-md animate-pulse"></label>
          <div className="w-full h-auto rounded-3xl py-6 px-8 bg-[#fafafa] flex flex-col gap-3 justify-start items-start">
            <div className="w-auto flex justify-start items-center gap-2">
              <div className="w-36 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-1">
              <ul className="w-auto ml-5 list-disc flex flex-col justify-start items-start gap-1 text-sm font-normal text-black">
                {Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <li
                      className="w-32 h-4 bg-gray-200 rounded-md animate-pulse"
                      key={index}
                    ></li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 justify-start items-start">
          <label className="text-lg font-medium text-black bg-gray-200 w-48 h-6 rounded-md animate-pulse"></label>
          <div className="w-auto flex justify-start items-center gap-2">
            <div className="w-32 h-6 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="w-24 h-6 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
          <div className="w-full rounded-3xl grid gap-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-8 p-4 h-auto bg-[#fafafa]">
            <div className="w-16 h-8 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="w-36 h-8 bg-gray-200 rounded-md animate-pulse lg:col-span-3"></div>
            <div className="w-auto lg:col-span-2 flex flex-col justify-center items-start lg:items-center">
              <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
            <div className="w-auto lg:col-span-2 flex flex-col justify-center items-start lg:items-center">
              <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-end">
          <div className="w-auto flex gap-1 justify-start items-end">
            <span className="text-lg font-normal text-black bg-gray-200 w-32 h-6 rounded-md animate-pulse"></span>
            <span className="text-4xl font-bold text-black bg-gray-200 w-48 h-8 rounded-md animate-pulse"></span>
            <span className="text-md text-black font-medium bg-gray-200 w-24 h-6 rounded-md animate-pulse"></span>
          </div>
        </div>
      </div>
      <div className="w-full h-auto flex gap-2 justify-start items-center">
        <button
          disabled
          className="w-1/2 h-14 rounded-lg flex items-center justify-center bg-gray-200 text-[#FF204E] text-md font-medium cursor-not-allowed"
        >
          <div className="w-16 h-6 bg-gray-300 rounded-md animate-pulse"></div>
        </button>
        <button
          disabled
          className="w-1/2 h-14 rounded-lg flex items-center justify-center bg-gray-300 text-white text-md font-medium cursor-not-allowed"
        >
          <div className="w-16 h-6 bg-gray-300 rounded-md animate-pulse"></div>
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full relative h-full flex flex-col justify-start items-start gap-6 p-4 lg:p-24  bg-white ">
      {error && <Error error={error} setError={setError} />}
      <div className="w-full flex flex-col justify-start items-center">
        <h2 className="text-black text-3xl font-bold">Summary</h2>
      </div>
      <div className="w-full h-auto flex flex-col gap-5 justify-start items-start">
        <div className="w-full flex flex-col gap-2 justify-start items-start">
          <label className="text-lg font-medium text-black">
            Subscription Plan
          </label>
          <div className="w-full h-auto rounded-3xl py-6 px-8 bg-[#fafafa] flex flex-col gap-3 justify-start items-start">
            <div className="w-auto flex justify-start items-center gap-2">
              <span className="w-36 h-8 rounded-full flex items-center justify-center bg-[#c00000] font-medium text-white text-sm">
                {summary?.subscriptionPlan?.name}
              </span>
            </div>

            <div className="w-full flex flex-col justify-start items-start gap-1">
              <ul className="w-auto ml-5 list-disc flex flex-col justify-start items-start gap-1 text-sm font-normal text-black">
                {summary?.subcriptionPlan?.services?.map((service) => {
                  return <li>{service?.name}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 justify-start items-start">
          <label className="text-lg font-medium text-black">
            Payment Method
          </label>
          <div className="w-auto flex justify-start items-center gap-2">
            <label className="text-md font-medium text-black">
              Credit/Debit Card
            </label>
          </div>

          <div className="w-full rounded-3xl grid gap-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-8  p-4 h-auto bg-[#fafafa]">
            <img src={MasterCardIcon} alt="master_card_icon" />
            <span className="lg:col-span-3 flex justify-start items-center text-xl font-normal text-black">
              ****-****-****-{summary?.card?.number}
            </span>
            <div className="w-auto lg:col-span-2 flex flex-col justify-center items-start lg:items-center">
              <span className="text-sm text-center font-medium text-black">
                Account Holder Name
              </span>
              <span className="text-sm font-normal text-black">
                {summary?.card?.name}
              </span>
            </div>
            <div className="w-auto lg:col-span-2 flex flex-col justify-center items-start lg:items-center">
              <span className="text-sm font-medium text-black">Expires On</span>
              <span className="text-sm font-normal text-black">
                {summary?.card?.expireOn}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-end">
          <div className="w-auto flex gap-1 justify-start items-end">
            <span className="text-lg font-normal text-black">
              Total Amount:
            </span>{" "}
            <span className="text-4xl font-bold text-black">
              ${summary?.subscriptionPlan?.price}{" "}
            </span>{" "}
            <span className="text-md text-black font-medium">
              /
              {summary?.subscriptionPlan?.interval === "year"
                ? "Yearly"
                : summary?.subscriptionPlan?.interval === "month" &&
                  summary?.subscriptionPlan?.intervalCount === 6
                ? "BiAnnually"
                : "Monthly"}
            </span>
          </div>
        </div>
      </div>
      {isPaymentSucceeded && (
        <SubscriptionActivatedModal
          isOpen={isPaymentSucceeded}
          setIsOpen={setIsPaymentSucceeded}
        />
      )}

      <div className="w-full h-auto flex gap-2 justify-start items-center">
        <button
          onClick={() => navigateToLink(-1, "Dashboard")}
          className="w-1/2 h-14 rounded-lg flex items-center justify-center bg-[#FF204E]/[0.05] text-[#FF204E] text-md font-medium"
        >
          Back
        </button>
        <button
          disabled={summaryLoading}
          onClick={() => {
            buyPlan();
          }}
          className="w-1/2 h-14 rounded-lg flex items-center justify-center bg-[#FF204E] text-white text-md font-medium"
        >
          {buyLoading ? <BtnLoader /> : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentSummaryCard;
