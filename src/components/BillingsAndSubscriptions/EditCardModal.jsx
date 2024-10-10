import React, { useContext, useRef, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";
import BtnLoader from "../global/BtnLoader";
import Error from "../global/Error";

const EditCardModal = ({ isOpen, setIsOpen, updateCard }) => {
  const editRef = useRef();
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
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState(null);
  const [cvv, setCvv] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
    const selectedDate = new Date(e.target.value);
    const selectedMonth = selectedDate.getMonth() + 1; // getMonth() returns month index (0-11), so add 1
    const selectedYear = selectedDate.getFullYear();

    setMonth(selectedMonth);
    setYear(selectedYear);
  };

  function addCard(e) {
    e.preventDefault();
    const token = Cookies.get("token");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      if (fullName == "") {
        setError("Card holder name is required.");
        setTimeout(() => {
          setError(false);
        }, 3000);
      } else if (cardNumber == "") {
        setError("Card Number is required.");
        setTimeout(() => {
          setError(false);
        }, 3000);
      } else if (date == null) {
        setError("Date is required.");
        setTimeout(() => {
          setError(false);
        }, 3000);
      } else if (cvv == "") {
        setError("CVC is required.");
        setTimeout(() => {
          setError(false);
        }, 3000);
      } else {
        setLoading(true);
        axios
          .post(
            `${baseUrl}/user/card`,
            {
              number: cardNumber,
              expMonth: month,
              expYear: year,
              cvc: cvv,
              name: fullName,
            },
            { headers }
          )
          .then(
            (response) => {
              updateCard((prev) => !prev);
              setCardNumber("");
              setFullName("");
              setCvv("");
              setDate(null);
              setIsOpen(false);
              setLoading(false);
            },
            (error) => {
              setLoading(false);
              setError(error?.response?.data?.message);
            }
          );
      }
    } else {
      setError("You're not authorized.");
      navigateToLink("/register-account", "Dashboard");
    }
  }
  return (
    <div
      onClick={toggleModal}
      className={`fixed top-0 left-0 transition-all duration-300 w-screen h-screen flex justify-center items-center bg-transparent ${
        isOpen ? "scale-1" : "scale-0"
      }`}
    >
      <form
        onSubmit={addCard}
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
              className="w-full h-14  outline-none bg-gray-50 focus:ring-2 ring-[#ff204e]/[0.4]  rounded-lg px-3"
            />
          </div>
          <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label className="text-sm font-medium text-black">
              Card Number
            </label>
            <input
              type="text"
              value={cardNumber}
              maxLength={16}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full h-14  outline-none bg-gray-50 focus:ring-2 ring-[#ff204e]/[0.4]   rounded-lg px-3"
            />
          </div>

          <div className="w-full flex justify-start items-center gap-4">
            <div className="w-[65%] flex flex-col gap-2 justify-start items-start">
              <label className="text-sm font-medium text-black">
                Valid Through
              </label>
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className="w-full h-14  outline-none bg-gray-50 focus:ring-2 ring-[#ff204e]/[0.4]  rounded-lg px-3"
              />
            </div>
            <div className="w-[35%] flex flex-col gap-2 justify-start items-start">
              <label className="text-sm font-medium text-black">CVC</label>
              <input
                type="text"
                value={cvv}
                maxLength={3}
                onChange={(e) => setCvv(e.target.value)}
                className="w-full h-14  outline-none bg-gray-50 focus:ring-2 ring-[#ff204e]/[0.4]   rounded-lg px-3"
              />
            </div>
          </div>
          <div className="w-full h-auto flex gap-2 justify-start items-center">
            <button
              type="submit"
              className="w-full h-14  rounded-lg flex items-center justify-center bg-[#FF204E] text-[#fff] text-md font-medium"
            >
              {loading ? <BtnLoader /> : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCardModal;
