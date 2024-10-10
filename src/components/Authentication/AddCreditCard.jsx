import React, { useContext, useEffect, useState } from "react";
import { CiCreditCard1 } from "react-icons/ci";
import { GlobalContext } from "../../context/GlobalContext";
import Error from "../global/Error";
import Cookies from "js-cookie";
import axios from "axios";
import BtnLoader from "../global/BtnLoader";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const AddCreditCard = () => {
  const { navigateToLink, baseUrl } = useContext(GlobalContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [fullName, setFullName] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      setError("Stripe has not loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Create a payment method
    const { error: stripeError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

    if (stripeError) {
      setLoading(false);
      setError(stripeError.message);
    } else {
      const token = Cookies.get("token");
      if (token) {
        if (fullName == "") {
          setError("Full Name cannot be left empty.");
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
            if (response) {
              navigateToLink("/payment-summary", "Dashboard");
            }
          } catch (apiError) {
            setError(apiError?.response?.data?.message || "An error occurred.");
          } finally {
            setLoading(false);
          }
        }
      } else {
        setLoading(false);
        setError("You need to be logged in.");
        navigateToLink("/register-account", "Dashboard");
      }
    }
  };

  useEffect(() => {
    const isCardAdded = Cookies.get("isCardAdded") === "true";
    if (isCardAdded) {
      navigateToLink("/payment-summary", "Dashboard");
    }
  }, [navigateToLink]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full flex flex-col p-4 lg:p-24 bg-white"
    >
      {error && <Error error={error} setError={setError} />}
      <span className="w-16 h-16 bg-[#FF204E]/10 rounded-md flex items-center justify-center mb-4">
        <CiCreditCard1 className="text-3xl text-[#FF204E]" />
      </span>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-black">Add Card Details</h2>
        <p className="text-md font-medium text-[#7c7c7c] mt-2">
          Please enter your card details below to securely connect your card to
          our platform. This will enable seamless transactions and payments
          within the app.
        </p>
      </div>
      <div className="w-full h-auto flex flex-col gap-5 justify-start items-start">
        <div className="w-full flex flex-col gap-2 justify-start items-start">
          <input
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            placeholder="Card Holder Name"
            className="border w-full text-base font-normal h-[54px] rounded-lg px-4 ] focus:bg-white outline-none placeholder:text-[rgb(137,137,137)] placeholder:text-[13px] placeholder:font-medium"
          />
        </div>
        <CardElement className="mb-6 w-full" />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => navigateToLink(-1, "Dashboard")}
          className="flex-1 h-14 rounded-lg bg-[#FF204E]/10 text-[#FF204E] text-md font-medium"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex-1 h-14 rounded-lg bg-[#FF204E] text-white text-md font-medium"
          disabled={loading}
        >
          {loading ? <BtnLoader /> : "Next"}
        </button>
      </div>
    </form>
  );
};

export default AddCreditCard;
