import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { BiCertification } from "react-icons/bi";
import { GlobalContext } from "../context/GlobalContext";

const SettingsLayout = ({ page }) => {
  const { navigateToLink } = useContext(GlobalContext);
  return (
    <>
      <div className="hidden w-full h-[94vh] bg-white rounded-3xl  lg:flex justify-start items-start">
        <div className="w-[30%] p-8  h-full flex flex-col justify-start items-start gap-6">
          <button
            onClick={() =>
              navigateToLink("/settings/notifications", "Settings")
            }
            className="w-auto text-md font-medium text-[#7c7c7c] hover:text-[#ff204e] flex gap-2 justify-start items-center"
          >
            <MdOutlineNotificationsNone className="text-lg" />
            <span>Notifications</span>
          </button>
          <button
            onClick={() =>
              navigateToLink("/settings/change-password", "Settings")
            }
            className="w-auto text-md font-medium text-[#7c7c7c] hover:text-[#ff204e] flex gap-2 justify-start items-center"
          >
            <IoKeyOutline className="text-lg" />
            <span>Change Password</span>
          </button>
          <button
            onClick={() =>
              navigateToLink("/settings/terms-and-services", "Settings")
            }
            className="w-auto text-md font-medium text-[#7c7c7c] hover:text-[#ff204e] flex gap-2 justify-start items-center"
          >
            <BiCertification className="text-lg" />
            <span>Terms and Services</span>
          </button>
          <button
            onClick={() =>
              navigateToLink("/settings/privacy-policy", "Settings")
            }
            className="w-auto text-md font-medium text-[#7c7c7c] hover:text-[#ff204e] flex gap-2 justify-start items-center"
          >
            <AiOutlineSafetyCertificate className="text-lg" />
            <span>Privacy Policy</span>
          </button>
        </div>
        <span className="h-full  w-[2px] bg-[#d6d6d6]/[0.5] rounded-full" />
        <div className="p-8 w-[70%] h-full overflow-y-auto">{page}</div>
      </div>

      {/* Mobile Page */}
      <div className="flex flex-col w-full h-auto bg-white rounded-3xl  lg:hidden justify-start items-start">
        <div className="w-full p-8  h-full flex flex-wrap justify-start items-start gap-4">
          <button
            onClick={() =>
              navigateToLink("/settings/notifications", "Settings")
            }
            className="w-[47%] h-10 rounded-full text-sm font-medium text-[#fff] bg-[#ff204e] flex gap-2 justify-center items-center"
          >
            <span>Notifications</span>
          </button>
          <button
            onClick={() =>
              navigateToLink("/settings/change-password", "Settings")
            }
            className="w-[47%] h-10 rounded-full text-sm font-medium text-[#fff] bg-[#ff204e] flex gap-2 justify-center items-center"
          >
            <span>Change Password</span>
          </button>
          <button
            onClick={() =>
              navigateToLink("/settings/terms-and-services", "Settings")
            }
            className="w-[47%] h-10 rounded-full text-sm font-medium text-[#fff] bg-[#ff204e] flex gap-2 justify-center items-center"
          >
            <span>Terms and Services</span>
          </button>
          <button
            onClick={() =>
              navigateToLink("/settings/privacy-policy", "Settings")
            }
            className="w-[47%] h-10 rounded-full text-sm font-medium text-[#fff] bg-[#ff204e] flex gap-2 justify-center items-center"
          >
            <span>Privacy Policy</span>
          </button>
        </div>
        <div className="p-8 w-full overflow-y-auto">{page}</div>
      </div>
    </>
  );
};

export default SettingsLayout;
