import React, { useContext, useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";
import CancelConfirmModal from "./CancelConfirmModal";

const PackageCard = () => {
  const [data, setData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const { navigateToLink, baseUrl } = useContext(GlobalContext);

  // ✅ Cancel subscription handler
  const handleCancel = async () => {
    if (!data?._id) {
      setError("No active subscription found.");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      navigateToLink("/register-account", "Dashboard");
      return;
    }

    setCancelLoading(true);

    try {
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.put(
        `${baseUrl}/user/subscription/cancel`,
        { subscription: data?._id },
        { headers }
      );

      if (response.status === 200) {
        // ✅ Refresh package info
        getPackageInfo();

        // ✅ Update isSubscribed flag in cookies
        Cookies.set("isSubscribed", "false", { expires: 7 });

        // ✅ Optionally update any global state if needed
        console.log("Subscription cancelled, cookie updated.");

        // ✅ Navigate to summary page
        navigateToLink("/payment-summary", "Payment Summary");
      }
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Failed to cancel subscription."
      );
    } finally {
      setCancelLoading(false);
    }
  };

  // ✅ Fetch package info
  const getPackageInfo = () => {
    const token = Cookies.get("token");
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      setDataLoading(true);
      axios
        .get(`${baseUrl}/user/subscription`, { headers })
        .then((response) => {
          setData(response?.data?.data);
          setDataLoading(false);
        })
        .catch((error) => {
          setError(error?.response?.data?.message);
          setDataLoading(false);
        });
    }
  };

  useEffect(() => {
    getPackageInfo();
  }, []);

  if (dataLoading) {
    return (
      <div className="w-full lg:w-[562px] rounded-2xl flex flex-col px-4 pb-2 bg-white justify-start items-start animate-pulse">
        <div className="w-full h-6 bg-gray-200 rounded mb-4"></div>
        <div className="w-full h-40 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-[562px] rounded-2xl flex flex-col px-4 pb-2 bg-white justify-start items-start">
      <div className="w-full flex justify-between items-center h-16">
        <div className="w-auto flex justify-start items-center gap-2 flex-wrap">
          <div className="w-[135px] h-[36px] flex items-center justify-center gap-1 text-white text-[14px] font-medium bg-[#C20028] rounded-full">
            {data?.subscriptionPlan?.name}
          </div>

          <span className="text-[10px] font-medium flex items-center justify-center w-auto px-2 h-6 bg-[#eaeaea] text-black rounded-full capitalize">
            {data?.subscriptionPlan?.interval}ly
          </span>

          <span
            className={`text-[10px] capitalize font-medium flex items-center justify-center w-auto px-2 h-6 rounded-full ${
              data?.status === "paid"
                ? "bg-[#05FA00]/[0.13] text-[#05FA00]"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {data?.status === "paid" ? "Active" : "Inactive"}
          </span>

          <button
            onClick={() => setShowCancelModal(true)}
            disabled={cancelLoading || data?.status !== "paid"}
            className={`transition-all duration-300 ease-in-out px-4 py-2 rounded-[10px] text-sm font-semibold  active:scale-95 ${
              cancelLoading || data?.status !== "paid"
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#FF204E] hover:bg-[#d91b43] text-white"
            }`}
          >
            {cancelLoading ? "Cancelling..." : "Cancel Subscription"}
          </button>
        </div>

        <button
          onClick={() =>
            navigateToLink(
              `/profile/dealer/${data?.subscriptionPlan?.dealership?._id}`,
              "Service History"
            )
          }
          className="text-[#FF204E] text-xs font-medium underline-offset-4 underline hover:text-[#d91b43] transition-colors duration-200"
        >
          View Dealer
        </button>
      </div>

      <div className="w-full flex flex-col justify-start items-start">
        <h1 className="text-lg font-semibold text-black">Features</h1>
        <div className="w-full grid my-2 grid-cols-2">
          {data?.subscriptionPlan?.services?.map((service, key) => (
            <div
              key={key}
              className="w-auto flex justify-start items-center gap-1"
            >
              <span className="w-2 h-2 bg-[#FF204E] rounded-full"></span>
              <span className="text-xs lg:text-sm font-medium">
                {service?.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <CancelConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        loading={cancelLoading}
        onConfirm={async () => {
          await handleCancel(); // cancel the subscription
          setShowCancelModal(false);
          navigateToLink("/payment-summary", "Payment Summary"); // ✅ redirect after cancel
        }}
      />
    </div>
  );
};

export default PackageCard;
