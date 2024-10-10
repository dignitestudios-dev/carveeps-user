import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const AuthInput = ({ icon, state, setState, text, type, error }) => {
  const [isPassVisible, setIsPassVisible] = useState(false);

  return (
    <div className="w-full h-auto flex   flex-col gap-1 justify-start items-start  ">
      {/* <label className="ml-1 text-sm font-medium text-[#7c7c7c] capitalize">
        {text}
      </label> */}
      <div
        className={`w-full h-14 focus-within:ring-2 ring-[#FF204E]/[0.4] rounded-lg bg-white flex items-center justify-start  ${
          error && "error"
        } `}
      >
        <span
          className={`w-[12%] md:w-[8%] focus-within:border-[#FF204E] ${
            error
              ? "border-[1px] border-red-600"
              : "border-[1px] border-[#FF204E]"
          }  text-lg text-[#FF204E] h-full flex items-center rounded-l-lg justify-center `}
        >
          {icon}
        </span>
        <div
          className={` w-[88%] md:w-[92%]  h-full flex items-center justify-center    rounded-r-lg relative`}
          style={{
            borderRight: error ? `1px solid red` : `1px solid #FF204E`,
            borderTop: error ? `1px solid red` : `1px solid #FF204E`,
            borderBottom: error ? `1px solid red` : `1px solid #FF204E`,
          }}
        >
          <input
            type={isPassVisible ? "text" : type}
            placeholder={text}
            className="w-full outline-none  rounded-r-lg  h-full px-3 text-sm font-medium "
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <button
            onClick={() => setIsPassVisible((prev) => !prev)}
            className="absolute top-4 text-xl right-2"
            style={{
              color: "#7c7c7c",
            }}
          >
            {type == "password" &&
              (!isPassVisible ? <BsEye /> : <BsEyeSlash />)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthInput;
