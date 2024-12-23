import React from "react";
import { Link } from "react-router-dom";
import BillingTableCard from "./BillingTableCard";
import { NoData } from "../../assets/export";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import exportToExcel from "../../utils/dataExport";
const BillingsTable = ({ data, dataLoading }) => {
  const arr = [1, 2, 4, 54, 5];
  const handleDownload = async (elementId, filename) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error("Element not found");
      return;
    }

    const padding = 3; // Padding at the top of each page in pixels
    element.style.backgroundColor = "#fff";
    element.style.padding = `${padding}px`;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight() - padding * 2; // Adjusted height to account for padding

    let imgProps = pdf.getImageProperties(imgData);
    let imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    let heightLeft = imgHeight;
    let position = padding;

    // Add the first page with top padding
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Add extra pages with consistent padding at the top
    while (heightLeft > 0) {
      position = padding; // Reset position for each new page to start at the padding
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(filename);

    element.style.backgroundColor = "";
    element.style.padding = "";
  };

  const dataToExport = data?.map((item, key) => ({
    InvoiceNo: key + 1,
    Plan: item?.subscriptionPlan || "N/A",
    Price: item?.price || 0,
    Status: item?.status === "paid" ? "Paid" : "Unpaid",
  }));

  const dataWidths = [
    { wch: 10 }, // Name
    { wch: 20 }, // Email
    { wch: 10 }, // Price
    { wch: 10 }, // Status
  ];
  return (
    <div className="w-full bg-white rounded-[18px] p-6 flex flex-col items-start gap-6">
      <div className="w-full flex justify-between items-center">
        <div className="w-[80%]">
          <h1 className="text-2xl font-bold">Billing History</h1>
          <p className="text-sm text-[#7c7c7c] lg:w-[70%]">
            Track and access your detailed invoices effortlessly. Stay organized
            with a clear record of your finnacial transactions for each billing
            cycle.
          </p>
        </div>
        <button
          disabled={dataLoading}
          onClick={() =>
            exportToExcel(dataToExport, "Billing Table", dataWidths)
          }
          className="w-auto px-2 h-6 text-xs rounded-full bg-[#000] text-[#fff]"
        >
          Download
        </button>
      </div>
      <div id="billing-table" class="w-full px-2 hidden lg:flex flex-col">
        <div class="w-full -m-1.5 overflow-x-auto">
          <div class="p-1.5 w-full inline-block align-middle">
            <div class="w-full overflow-hidden">
              <table class="w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      class=" py-3 text-start text-xs font-medium text-gray-500 "
                    >
                      Invoice
                    </th>
                    <th
                      scope="col"
                      class=" py-3 text-start text-xs font-medium text-gray-500 "
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      class=" py-3 text-start text-xs font-medium text-gray-500 "
                    >
                      Subscription Plan
                    </th>
                    <th
                      scope="col"
                      class=" py-3 text-start text-xs font-medium text-gray-500 "
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  {data?.length < 1 ? (
                    <div className="w-full bg-white rounded-b-[18px] flex items-center justify-center">
                      <img src={NoData} alt="" className="w-96 my-10" />
                    </div>
                  ) : dataLoading ? (
                    arr?.map((item) => {
                      return (
                        <tr key={item}>
                          <td className="py-4 whitespace-nowrap">
                            <div className="w-24 h-4 bg-gray-200 rounded-md animate-pulse"></div>
                          </td>
                          <td className="py-4 whitespace-nowrap">
                            <div className="w-24 h-4 bg-gray-200 rounded-md animate-pulse"></div>
                          </td>
                          <td className="py-4 whitespace-nowrap">
                            <div className="w-32 h-4 bg-gray-200 rounded-md animate-pulse"></div>
                          </td>
                          <td className="py-4">
                            <div className="w-16 h-6 bg-gray-200 rounded-full flex justify-center items-center font-medium text-transparent  animate-pulse"></div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    data?.map((transaction, key) => {
                      return (
                        <tr key={key}>
                          <td class=" py-4 whitespace-nowrap text-xs font-medium text-gray-800">
                            Invoice #{key + 1}
                          </td>
                          <td class=" py-4 whitespace-nowrap text-xs text-gray-800">
                            USD ${transaction?.price}
                          </td>
                          <td class=" py-4 whitespace-nowrap text-xs text-gray-800">
                            {transaction?.subscriptionPlan}
                          </td>

                          <td class=" py-4 ">
                            <span className="capitalize  text-xs font-bold  text-[#05FA00] ">
                              {transaction?.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 gap-2 md:grid-cols-2 lg:hidden">
        {data?.length < 1 ? (
          <div className="w-full bg-white rounded-b-[18px] flex items-center justify-center">
            <img src={NoData} alt="" className="w-96 my-10" />
          </div>
        ) : dataLoading ? (
          arr?.map((item) => {
            return (
              <div
                key={item}
                className="w-full h-auto flex flex-col p-4 bg-gray-50 rounded-2xl gap-4"
              >
                <div className="w-full h-auto flex justify-between items-start">
                  <div className="w-1/2 flex flex-col justify-start items-start">
                    <div className="w-24 h-4 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="w-24 h-4 mt-2 bg-gray-200 rounded-md animate-pulse"></div>
                  </div>
                  <div className="w-1/2 flex flex-col justify-start items-start">
                    <div className="w-24 h-4 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="w-24 h-4 mt-2 bg-gray-200 rounded-md animate-pulse"></div>
                  </div>
                </div>
                <div className="w-full h-auto flex justify-between items-start">
                  <div className="w-1/2 flex flex-col justify-start items-start">
                    <div className="w-24 h-4 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="w-24 h-4 mt-2 bg-gray-200 rounded-md animate-pulse"></div>
                  </div>
                  <div className="w-1/2 flex flex-col justify-start items-start">
                    <div className="w-24 h-4 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="w-16 h-6 mt-2  rounded-full flex justify-center items-center text-transparent bg-gray-300 animate-pulse"></div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          data?.map((transaction, key) => {
            return (
              <BillingTableCard
                transaction={transaction}
                key={key}
                number={key}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default BillingsTable;
