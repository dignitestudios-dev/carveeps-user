import React from "react";

const CancelConfirmModal = ({ isOpen, onClose, onConfirm, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-[#ffffff] to-[#f8f8f8] rounded-3xl shadow-2xl w-[520px] p-8 text-gray-800 border border-gray-100 relative">
        {/* Decorative Line */}

        {/* Title */}
        <h3 className="text-[24px] font-bold text-[#FF204E] mb-3  tracking-wide">
          Refund Policy Disclaimer
        </h3>

     
        {/* Divider */}
      

        {/* Refund Policy Section */}
        <div className="bg-gray-50 rounded-2xl p-6 text-[15px] md:text-[16px] space-y-3 border border-gray-200 shadow-sm">
          <ul className="list-disc mx-auto text-gray-800 leading-relaxed space-y-3 max-w-[420px]">
            <li>
              <strong className="text-gray-900">Within 30 days:</strong>{" "}
              A full refund will be issued.
            </li>
            <li>
              <strong className="text-gray-900">Between 30 and 60 days:</strong>{" "}
              A 50% refund will be issued, applicable to the{" "}
              <span className="font-semibold text-[#FF204E]">
                Dealer portion only.
              </span>
            </li>
            <li>
              <strong className="text-gray-900">After 60 days:</strong>{" "}
              No refunds will be issued. Auto-enrollment will be discontinued.
            </li>
            <li>
              <strong className="text-gray-900">
                If services have been utilized:
              </strong>{" "}
              No refunds will be issued at any point, regardless of the time
              frame.
            </li>
            <li>
              <strong className="text-gray-900">
                Carveeps reserves the right
              </strong>{" "}
              to modify or update this refund policy at its discretion.
            </li>
          </ul>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 my-6" />

        {/* Buttons */}
        <div className="flex w-full justify-center gap-4 mt-2">
          <button
            onClick={onClose}
            className="px-5 w-full py-2.5 rounded-lg bg-gray-300 hover:bg-gray-200 text-gray-800 font-medium shadow-sm transition"
          >
            Close
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-6 w-full py-2.5 rounded-lg text-white font-semibold shadow-md transition-all duration-300 ${
              loading
                ? "bg-[#ff6b88] cursor-not-allowed"
                : "bg-[#FF204E] hover:bg-[#d91b43]"
            }`}
          >
            {loading ? "Cancelling..." : "Cancel Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelConfirmModal;
