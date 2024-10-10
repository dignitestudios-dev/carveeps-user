import React, { useContext, useEffect, useState } from "react";
import { MasterCardIcon } from "../../assets/export";
import { FiDelete, FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import EditCardModal from "./EditCardModal";
import Cookies from "js-cookie";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";

const BillingCard = ({
  card,
  cardLoading,
  subscription,
  setSubscription,
  subscriptionLoading,
  updateCard,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLessThan15Days, setIsLessThan15Days] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState("");

  const checkDate = (createdAt, interval) => {
    const createdAtDate = new Date(createdAt);
    let completionDate;

    switch (interval) {
      case "year":
        completionDate = new Date(createdAtDate);
        completionDate.setFullYear(createdAtDate.getFullYear() + 1);
        break;
      case "month":
        completionDate = new Date(createdAtDate);
        completionDate.setMonth(createdAtDate.getMonth() + 1);
        break;
      case "biannual":
        completionDate = new Date(createdAtDate);
        completionDate.setMonth(createdAtDate.getMonth() + 6);
        break;
      default:
        throw new Error("Invalid interval");
    }

    const currentDate = new Date();
    const timeDifference = completionDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    setDaysRemaining(`${daysDifference > 0 ? daysDifference : 0}`);

    if (daysDifference <= 15) {
      setIsLessThan15Days(true);
    } else {
      setIsLessThan15Days(false);
    }
  };

  useEffect(() => {
    let interval =
      subscription?.subscriptionPlan?.interval == "year"
        ? "year"
        : subscription?.subscriptionPlan?.interval == "month" &&
          subscription?.subscriptionPlan?.intervalCount == 1
        ? "month"
        : subscription?.subscriptionPlan?.interval == "month" &&
          subscription?.subscriptionPlan?.intervalCount == 6 &&
          "biannual";

    subscription !== null && checkDate(subscription?.createdAt, interval);
  }, []);

  const [cancelLoading, setCancelLoading] = useState(false);
  const { navigateToLink } = useContext(GlobalContext);
  const cancelSubscription = () => {
    const token = Cookies.get("token");
    if (token) {
      setCancelLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .put(`${baseUrl}/user/subscription/cancel`, { headers })
        .then((response) => {
          Cookies.remove("isCardAdded");
          Cookies.remove("isVehicleAdded");
          Cookies.remove("isSubscribed");
          Cookies.remove("token");
          navigateToLink("/", "Dashboard");

          setCancelLoading(false);
        })
        .catch((error) => {
          setCancelLoading(false);
          setError(error?.response?.data?.message);
        });
    }
  };

  return cardLoading ? (
    <div className="w-full lg:w-[739px] h-auto flex flex-col gap-2 justify-start items-start bg-white rounded-2xl p-3">
      <div className="w-full h-auto flex justify-between items-start">
        <div>
          <div className="w-auto flex justify-start items-center gap-2">
            <div className="w-32 h-6 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="w-24 h-4 bg-[#FF204E] rounded-md animate-pulse"></div>
          </div>
          <div className="w-48 h-4 mt-1 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        <div className="w-auto flex justify-start items-center">
          <div className="w-24 h-4 bg-green-200 rounded-md animate-pulse"></div>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col gap-2 justify-start items-end">
        <div className="w-auto flex gap-3 justify-start items-start">
          <button disabled>
            <FiEdit className="text-lg text-gray-300 animate-pulse" />
          </button>
        </div>
        <div className="w-full rounded-2xl grid gap-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-8 p-4 h-auto bg-[#fafafa]">
          <div className="w-16 h-8 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="lg:col-span-3 h-8 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="w-auto lg:col-span-2 flex flex-col justify-center items-start lg:items-center">
            <div className="w-24 h-4 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="w-24 h-4 bg-gray-200 rounded-md animate-pulse mt-1"></div>
          </div>
          <div className="w-auto lg:col-span-2 flex flex-col justify-center items-start lg:items-center">
            <div className="w-24 h-4 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="w-24 h-4 bg-gray-200 rounded-md animate-pulse mt-1"></div>
          </div>
        </div>
      </div>
      <div className="w-auto flex justify-start items-center mt-2">
        <button
          type="button"
          disabled
          className="w-48 h-8 bg-gray-200 rounded-md text-[#FF204E] text-md font-medium cursor-not-allowed"
        >
          <div className="w-20 h-6 bg-gray-300 rounded-md animate-pulse mx-auto"></div>
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full lg:w-[739px]  h-auto flex flex-col gap-2 justify-start items-start bg-white rounded-2xl p-3">
      <div className="w-full h-auto flex justify-between items-start">
        <div>
          <div className="w-auto flex justify-start items-center gap-2">
            <h1 className="text-lg font-bold text-black">
              {subscription?.subscriptionPlan?.name}
            </h1>
            <span className="text-sm text-[#FF204E] font-medium">
              {subscription?.subscriptionPlan?.dealership?.name}
            </span>
          </div>
        </div>
        {isLessThan15Days && (
          <p className="text-green-400 text-sm font-medium">
            {daysRemaining} Days remaining
          </p>
        )}
      </div>
      <div className="w-full h-auto flex flex-col gap-2 justify-start items-end">
        <div className="w-auto flex gap-3 justify-start items-start">
          <button onClick={() => setIsEditOpen(true)}>
            <FiEdit className="text-lg text-gray-500" />
          </button>
        </div>
        <div className="w-full rounded-2xl grid gap-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-8  p-4 h-auto bg-[#fafafa]">
          <img src={MasterCardIcon} alt="master_card_icon" />
          <span className="lg:col-span-3 flex justify-start items-center text-xl font-normal text-black">
            ****-****-****-{card?.number}
          </span>
          <div className="w-auto lg:col-span-2 flex flex-col justify-center items-start lg:items-center">
            <span className="text-sm text-center font-medium text-black">
              Account Holder Name
            </span>
            <span className="text-sm font-normal text-black">{card?.name}</span>
          </div>
          <div className="w-auto lg:col-span-2 flex flex-col justify-center items-start lg:items-center">
            <span className="text-sm font-medium text-black">Expires On</span>
            <span className="text-sm font-normal text-black">
              {card?.expireOn}
            </span>
          </div>
        </div>
      </div>
      <EditCardModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        updateCard={updateCard}
      />
      {isLessThan15Days && (
        <button
          type="button"
          onClick={cancelSubscription}
          className="text-md font-medium text-[#FF204E] ml-1"
        >
          Cancel Subscription
        </button>
      )}
    </div>
  );
};

export default BillingCard;
