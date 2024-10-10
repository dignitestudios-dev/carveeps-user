import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";
import Error from "../components/global/Error";
import BtnLoader from "../components/global/BtnLoader";

const EditPersonalInformation = () => {
  const { navigateToLink, baseUrl } = useContext(GlobalContext);
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleEditProfile = (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    if (token) {
      if (address == "") {
        setError("Address cannot be left empty.");
      } else if (country == "") {
        setError("Country cannot be left empty.");
      } else if (city == "") {
        setError("City cannot be left empty.");
      } else if (state == "") {
        setError("State cannot be left empty.");
      } else if (zipCode == "") {
        setError("Zip Code cannot be left empty.");
      } else {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        setLoading(true);
        axios
          .put(
            `${baseUrl}/user`,
            {
              country: country,
              city: city,
              state: state,
              zipCode: zipCode,
              address: address,
            },
            { headers }
          )
          .then((response) => {
            setLoading(false);
            // Show profile update success later
            navigateToLink("/profile", "Profile");
          })
          .catch((error) => {
            setError(error?.response?.data?.message);
          });
      }
    } else {
      setError("Your session has expired. Logging you out.");
      navigateToLink("/auth/login", "Login");
    }
  };

  return (
    <form
      onSubmit={handleEditProfile}
      className="w-full bg-white rounded-2xl flex flex-col justify-start items-start gap-6 p-6"
    >
      <h1 className="text-2xl font-bold text-black">
        Edit Personal Informations
      </h1>
      {error && <Error error={error} setError={setError} />}

      <div className="w-full flex flex-col justify-start items-start gap-6">
        <div className="w-full flex gap-4 justify-between items-center">
          <div className="w-1/2 flex flex-col gap-2 justify-start items-start">
            <label className="text-sm font-medium text-black">
              Street Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="w-full h-14  outline-none bg-gray-50 focus:ring-2 ring-[#ff204e]/[0.4]  rounded-lg px-3"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-2 justify-start items-start">
            <label className="text-sm font-medium text-black">Country</label>
            <input
              placeholder="US"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full h-14  outline-none bg-gray-50 focus:ring-2 ring-[#ff204e]/[0.4]  rounded-lg px-3"
            />
          </div>
        </div>

        <div className="w-full flex gap-4 justify-between items-center">
          <div className="w-1/3 flex flex-col gap-2 justify-start items-start">
            <label className="text-sm font-medium text-black">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="New York"
              className="w-full h-14  outline-none bg-gray-50 focus:ring-2 ring-[#ff204e]/[0.4]  rounded-lg px-3"
            />
          </div>
          <div className="w-1/3 flex flex-col gap-2 justify-start items-start">
            <label className="text-sm font-medium text-black">State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="NY"
              className="w-full h-14  outline-none bg-gray-50 focus:ring-2 ring-[#ff204e]/[0.4]  rounded-lg px-3"
            />
          </div>
          <div className="w-1/3 flex flex-col gap-2 justify-start items-start">
            <label className="text-sm font-medium text-black">Zip Code</label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="12345"
              maxLength={5}
              className="w-full h-14  outline-none bg-gray-50 focus:ring-2 ring-[#ff204e]/[0.4]  rounded-lg px-3"
            />
          </div>
        </div>
      </div>

      <div className="w-full h-auto flex gap-2 justify-start items-center">
        <button
          type="button"
          onClick={() => navigateToLink(-1, "")}
          className="w-48 h-14 mt-10 rounded-lg flex items-center justify-center bg-[#FF204E]/[0.05] text-[#FF204E] text-md font-medium"
        >
          Back
        </button>
        <button
          type="submit"
          className="w-48 h-14 mt-10 rounded-lg flex items-center justify-center bg-[#FF204E] text-white text-md font-medium"
        >
          {loading ? <BtnLoader /> : "Save"}
        </button>
      </div>
    </form>
  );
};

export default EditPersonalInformation;
