import React from "react";
import { AddCardMockup, LoginMockup } from "../assets/export";
import AddCreditCard from "../components/Authentication/AddCreditCard";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const CreditCard = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);
  return (
    <div className="w-screen h-screen  lg:h-screen flex justify-start items-start ">
      <div className="w-full lg:w-1/2 h-full  flex flex-col justify-center items-center gap-6">
        <Elements stripe={stripePromise}>
          <AddCreditCard />
        </Elements>
      </div>
      <div className="w-1/2 h-full hidden bg-[#FF204E]/[0.05] lg:flex justify-center items-center">
        <img src={AddCardMockup} alt="loginn_mockup" className="w-[70%]" />
      </div>
    </div>
  );
};

export default CreditCard;
