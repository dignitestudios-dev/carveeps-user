import React, { useContext, useEffect, useState } from "react";
import BillingsTable from "../components/BillingsAndSubscriptions/BillingsTable";
import BillingCard from "../components/BillingsAndSubscriptions/BillingCard";
import Cookies from "js-cookie";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";

const BillingsAndSubscription = () => {
  const [data, setData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const { navigateToLink, baseUrl } = useContext(GlobalContext);
  const [error, setError] = useState(false);

  const [card, setCard] = useState(null);
  const [cardLoading, setCardLoading] = useState(false);
  const [cardUpdate, setCardUpdate] = useState(false);

  const getData = () => {
    const token = Cookies.get("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setDataLoading(true);
      axios
        .get(`${baseUrl}/user/transaction`, { headers })
        .then((response) => {
          setData(response?.data?.data);
          setDataLoading(false);
        })
        .catch((error) => {
          setError(error?.response?.data?.message);
          setDataLoading(false);
          if (error?.response?.status == 401) {
            Cookies.remove("token");
            navigateToLink("/auth/login", "Login");
          }
        });
    }
  };

  const getCard = () => {
    const token = Cookies.get("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setCardLoading(true);
      axios
        .get(`${baseUrl}/user/card`, { headers })
        .then((response) => {
          setCard(response?.data?.data);
          setCardLoading(false);
        })
        .catch((error) => {
          setCardLoading(false);

          setError(error?.response?.data?.message);
        });
    }
  };

  const [subscription, setSubscription] = useState(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);

  const getSubscription = () => {
    const token = Cookies.get("token");
    if (token) {
      setSubscriptionLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${baseUrl}/user/subscription`, { headers })
        .then((response) => {
          setSubscription(response?.data?.data);
          setSubscriptionLoading(false);
        })
        .catch((error) => {
          setSubscriptionLoading(false);
          setError(error?.response?.data?.message);
          if (error?.response?.status == 401) {
            Cookies.remove("token");
            navigateToLink("/auth/login", "Login");
          }
        });
    }
  };

  useEffect(() => {
    getData();
    getSubscription();
  }, []);
  useEffect(() => {
    getCard();
  }, [cardUpdate]);
  return (
    <div className="w-full flex flex-col justify-start items-start gap-5">
      <div>
        <h1 className="text-2xl font-bold text-black">
          Billings & Subscriptions
        </h1>
        <p className="text-md text-[#7c7c7c] w-[90%]">
          Stay on top of your expenses, plans, and payment history with our
          comprehensive billing features.
        </p>
      </div>
      <div className="w-full">
        <h1 className="text-lg font-bold text-black">Current Plan</h1>
        <BillingCard
          card={card}
          cardLoading={cardLoading}
          subscription={subscription}
          setSubscription={setSubscription}
          subscriptionLoading={subscriptionLoading}
          updateCard={setCardUpdate}
        />
      </div>
      <BillingsTable data={data} dataLoading={dataLoading} />
    </div>
  );
};

export default BillingsAndSubscription;
