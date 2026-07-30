import React, { useContext, useRef, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";
import BtnLoader from "../global/BtnLoader";
import Error from "../global/Error";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);

const EditCardForm = ({ isOpen, setIsOpen, updateCard }) => {
  const editRef = useRef();
  const stripe = useStripe();
  const elements = useElements();

  const toggleModal = (e) => {
    if (editRef.current && !editRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  const { navigateToLink, baseUrl } = useContext(GlobalContext);
  // Error States
  const [error, setError] = useState(false);
  // Loading States
  const [loading, setLoading] = useState(false);
  // States to manage the data
  const [fullName, setFullName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    const token = Cookies.get("token");
    if (!token) {
      setError("You're not authorized.");
      navigateToLink("/register-account", "Dashboard");
      return;
    }

    if (!fullName.trim()) {
      setError("Card holder name is required.");
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet.");
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      setError("Card details are required.");
      return;
    }

    setLoading(true);

    const { error: stripeError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardNumberElement,
        billing_details: {
          name: fullName,
        },
      });

    if (stripeError) {
      setLoading(false);
      setError(stripeError.message);
    } else {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.post(
          `${baseUrl}/user/card`,
          {
            name: fullName,
            paymentMethodId: paymentMethod.id,
          },
          { headers }
        );

        if (response.status === 200 || response.data?.success) {
          updateCard((prev) => !prev);
          setFullName("");
          cardNumberElement.clear();
          elements.getElement(CardExpiryElement)?.clear();
          elements.getElement(CardCvcElement)?.clear();
          setIsOpen(false);
        }
      } catch (apiError) {
        setError(
          apiError?.response?.data?.message || "An error occurred."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const elementOptions = {
    style: {
      base: {
        fontSize: "14px",
        color: "#000000",
        fontFamily: "inherit",
        "::placeholder": {
          color: "#9ca3af",
        },
      },
      invalid: {
        color: "#ef4444",
      },
    },
  };

  return (
    <div
      onClick={toggleModal}
      className={`fixed top-0 left-0 transition-all duration-300 w-screen h-screen flex justify-center items-center bg-transparent ${isOpen ? "scale-1" : "scale-0"
        }`}
    >
      <form
        onSubmit={handleSubmit}
        ref={editRef}
        className="w-[679px] h-auto p-10 shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col gap-6 justify-start items-start bg-white rounded-3xl"
      >
        {error && <Error error={error} setError={setError} />}
        <h1 className="text-3xl font-bold text-black">Edit Bank Details</h1>
        <div className="w-full h-auto flex flex-col gap-5 justify-start items-start">
          <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label className="text-sm font-medium text-black">
              Card Holder Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-14 outline-none bg-gray-50 focus:ring-2 ring-[#ff204e]/[0.4] rounded-lg px-3"
            />
          </div>

          <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label className="text-sm font-medium text-black">
              Card Number
            </label>
            <div className="w-full h-14 bg-gray-50 focus-within:ring-2 ring-[#ff204e]/[0.4] rounded-lg px-3 flex items-center">
              <CardNumberElement className="w-full !border-none !p-0 !bg-transparent !shadow-none" options={elementOptions} />
            </div>
          </div>

          <div className="w-full flex justify-start items-center gap-4">
            <div className="w-[65%] flex flex-col gap-2 justify-start items-start">
              <label className="text-sm font-medium text-black">
                Valid Through
              </label>
              <div className="w-full h-14 bg-gray-50 focus-within:ring-2 ring-[#ff204e]/[0.4] rounded-lg px-3 flex items-center">
                <CardExpiryElement className="w-full !border-none !p-0 !bg-transparent !shadow-none" options={elementOptions} />
              </div>
            </div>
            <div className="w-[35%] flex flex-col gap-2 justify-start items-start">
              <label className="text-sm font-medium text-black">CVC</label>
              <div className="w-full h-14 bg-gray-50 focus-within:ring-2 ring-[#ff204e]/[0.4] rounded-lg px-3 flex items-center">
                <CardCvcElement className="w-full !border-none !p-0 !bg-transparent !shadow-none" options={elementOptions} />
              </div>
            </div>
          </div>

          <div className="w-full h-auto flex gap-2 justify-start items-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-lg flex items-center justify-center bg-[#FF204E] text-[#fff] text-md font-medium"
            >
              {loading ? <BtnLoader /> : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const EditCardModal = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <EditCardForm {...props} />
    </Elements>
  );
};

export default EditCardModal;
