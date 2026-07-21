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
  const [autoRenewLoading, setAutoRenewLoading] = useState(false);
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
  const handleAutoRenewOff = async () => {
    if (!data?._id) {
      setError("No active subscription found.");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      navigateToLink("/register-account", "Dashboard");
      return;
    }

    setAutoRenewLoading(true);

    try {
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.put(
        `${baseUrl}/user/subscription/cancel`,
        { subscription: data?._id, cancelAtPeriodEnd: true, },
        { headers }
      );

      if (response.status === 200) {
        // ✅ Refresh package info
        getPackageInfo();

        // ✅ Update isSubscribed flag in cookies

      }
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Failed to cancel subscription."
      );
    } finally {
      setAutoRenewLoading(false);
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
      <div className="w-full flex justify-between items-start flex-wrap gap-4 py-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Plan */}
          <div className="px-4 h-9 flex items-center justify-center text-white text-sm font-medium bg-[#C20028] rounded-full">
            {data?.subscriptionPlan?.name}
          </div>

          {/* Interval */}
          <span className="px-3 h-7 flex items-center rounded-full bg-gray-100 text-xs font-medium capitalize">
            {data?.subscriptionPlan?.interval}ly
          </span>

          {/* Status */}
          <span
            className={`px-3 h-7 flex items-center rounded-full text-xs font-medium capitalize ${data?.status === "paid" || data?.subscriptionPlan?.planType === "free"
              ? "bg-green-100 text-green-600"
              : "bg-gray-200 text-gray-500"
              }`}
          >
            {data?.status === "paid" || data?.subscriptionPlan?.planType === "free" ? "Active" : "Inactive"}
          </span>
          {data?.subscriptionPlan?.planType === "free" && (
            <span className="h-7 px-3.5 rounded-full flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-[11px] font-bold tracking-wide shadow-sm border border-emerald-400/20 uppercase">
              Free Plan
            </span>
          )}

          {/* One-Time Trial Badge */}
          {data?.subscriptionPlan?.isOneTime && (
            <span className="h-7 px-3 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold border border-indigo-400/20 shadow-sm animate-pulse">
              One-Time Trial
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Cancel */}
          {/* Auto Renewal */}
          {data?.subscriptionPlan?.planType !== "free" && (
            <>
              <button
                onClick={() => setShowCancelModal(true)}
                disabled={cancelLoading || data?.status !== "paid"}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${cancelLoading || data?.status !== "paid"
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
              >
                {cancelLoading ? "Loading..." : "Cancel Subscription"}
              </button>


              <button
                onClick={handleAutoRenewOff}
                disabled={autoRenewLoading || data?.cancelAtPeriodEnd === true}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition  ${autoRenewLoading || data?.cancelAtPeriodEnd
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : " bg-amber-500 hover:bg-amber-600 text-white"
                  }"`}
              >
                {autoRenewLoading ? "Loading..." : "Turn Off Auto-Renewal"}
              </button>
            </>
          )}

          {/* Dealer */}
          <button
            onClick={() =>
              navigateToLink(
                `/profile/dealer/${data?.subscriptionPlan?.dealership?._id}`,
                "Service History"
              )
            }
            className="px-4 py-2 rounded-lg border border-[#FF204E] text-[#FF204E] hover:bg-[#FF204E] hover:text-white transition"
          >
            View Dealer
          </button>
        </div>
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
