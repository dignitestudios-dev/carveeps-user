import React, { useContext, useEffect, useState } from "react";
import HeadStats from "../components/Dashboard/HeadStats";
import CarDetails from "../components/Dashboard/CarDetails";
import SubscriptionTable from "../components/Dashboard/SubscriptionTable";
import Cookies from "js-cookie";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState(false);

  const { navigateToLink, baseUrl, setUpdate } = useContext(GlobalContext);

  const getDashboardData = () => {
    const token = Cookies.get("token");
    if (token) {
      setDataLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${baseUrl}/user/dashboard`, { headers })
        .then((response) => {
          setData(response?.data?.data);
          setDataLoading(false);
        })
        .catch((error) => {
          setError(error?.response?.data?.message);
          if (error?.response?.status == 401) {
            Cookies.remove("token");
            navigateToLink("/auth/login", "Login");
          }
          setDataLoading(false);
        });
    }
  };

  useEffect(() => {
    getDashboardData();
    setUpdate((prev) => !prev);
  }, []);
  const [monthlyServices, setMonthlyServices] = useState([]);
  const [yearlyServices, setYearlyServices] = useState([]);

  useEffect(() => {
    const filterMonthlyServices =
      data?.subscription?.subscriptionPlan?.services?.filter(
        (service) => service.interval === "month"
      );
    const filterYearlyServices =
      data?.subscription?.subscriptionPlan?.services?.filter(
        (service) => service.interval === "year"
      );

    setMonthlyServices(filterMonthlyServices);
    setYearlyServices(filterYearlyServices);
  }, [data]);
  return (
    <div className="w-full flex flex-col gap-4 justify-start items-start  ">
      <HeadStats data={data} loading={dataLoading} />
      <SubscriptionTable
        data={data}
        loading={dataLoading}
        monthlyServices={monthlyServices}
        yearlyServices={yearlyServices}
      />
      <CarDetails data={data} loading={dataLoading} />
    </div>
  );
};

export default Dashboard;
