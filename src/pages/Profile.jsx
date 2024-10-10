import React from "react";
import ProfileHeader from "../components/Profile/ProfileHeader";
import { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { baseUrl, navigateToLink, update, setUpdate } =
    useContext(GlobalContext);
  const [profileLoading, setProfileLoading] = useState(false);

  const getProfile = () => {
    const token = Cookies.get("token");

    if (token) {
      setProfileLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios.get(`${baseUrl}/user`, { headers }).then(
        (response) => {
          setProfile(response?.data?.data);
          const data = response?.data?.data;
          Cookies?.set("userName", data?.name);
          Cookies?.set("userProfile", data?.profilePicture);
          Cookies?.set("appointmentLink", data?.dealership?.appointmentLink);

          setProfileLoading(false);
        },
        (error) => {
          setProfileLoading(false);
          if (error?.response?.status == 401) {
            Cookies.remove("token");
            navigateToLink("/auth/login");
          }
        }
      );
    } else {
      navigateToLink("/login");
    }
  };

  useEffect(() => {
    getProfile();
  }, [update]);
  return (
    <div className="w-full flex flex-col gap-4 justify-start items-start  ">
      <ProfileHeader
        profile={profile}
        setUpdate={setUpdate}
        profileLoading={profileLoading}
      />
    </div>
  );
};

export default Profile;
