import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import CreditCard from "./pages/CreditCard";
import PaymentSummary from "./pages/PaymentSummary";
import CarProfileSetup from "./pages/CarProfileSetup";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import SettingsLayout from "./layout/SettingsLayout";
import NotificationSettings from "./pages/NotificationSettings";
import TermsAndServices from "./pages/TermsAndServices";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ChangePassword from "./pages/ChangePassword";
import ServiceHitory from "./pages/ServiceHitory";
import BillingsAndSubscription from "./pages/BillingsAndSubscription";
import ViewAllPrevioussubscriptions from "./pages/ViewAllPrevioussubscriptions";
import ViewAllExpiredSubscriptions from "./pages/ViewAllExpiredSubscriptions";
import Notifications from "./pages/Notifications";
import EditPersonalInformation from "./pages/EditPersonalInformation";
import DealersProfile from "./pages/DealersProfile";
import AuthLogin from "./pages/authentication/AuthLogin";
import AuthVerifyEmail from "./pages/authentication/AuthVerifyEmail";
import AuthVerifyOtp from "./pages/authentication/AuthVerifyOtp";
import AuthChangePass from "./pages/authentication/AuthChangePass";
import MainHelloScreen from "./pages/MainHelloScreen";
import { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";

function App() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/auth/login" element={<AuthLogin />} />
      <Route path="/auth/verify-email" element={<AuthVerifyEmail />} />
      <Route path="/auth/verify-otp" element={<AuthVerifyOtp />} />
      <Route path="/auth/change-password" element={<AuthChangePass />} />
      {/*  */}
      <Route path="/" element={<MainHelloScreen />} />
      <Route path="/:id" element={<Home />} />
      <Route path="/register-account" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/add-card" element={<CreditCard />} />
      <Route path="/payment-summary" element={<PaymentSummary />} />
      <Route path="/car-profile-setup" element={<CarProfileSetup />} />

      <Route path="/dashboard" element={<Layout pages={<Dashboard />} />} />
      <Route
        path="/service-history"
        element={<Layout pages={<ServiceHitory />} />}
      />
      <Route
        path="/subscriptions/previous/all"
        element={<Layout pages={<ViewAllPrevioussubscriptions />} />}
      />
      <Route
        path="/subscriptions/previous/expired/:id"
        element={<Layout pages={<ViewAllExpiredSubscriptions />} />}
      />
      <Route
        path="/notifications"
        element={<Layout pages={<Notifications />} />}
      />

      <Route
        path="/billing-and-subscriptions"
        element={<Layout pages={<BillingsAndSubscription />} />}
      />
      <Route path="/profile" element={<Layout pages={<Profile />} />} />
      <Route
        path="/profile/edit"
        element={<Layout pages={<EditPersonalInformation />} />}
      />
      <Route
        path="/profile/dealer/:id"
        element={<Layout pages={<DealersProfile />} />}
      />

      <Route
        path="/settings/notifications"
        element={
          <Layout pages={<SettingsLayout page={<NotificationSettings />} />} />
        }
      />
      <Route
        path="/settings/terms-and-services"
        element={
          <Layout pages={<SettingsLayout page={<TermsAndServices />} />} />
        }
      />
      <Route
        path="/settings/privacy-policy"
        element={
          <Layout pages={<SettingsLayout page={<PrivacyPolicyPage />} />} />
        }
      />
      <Route
        path="/settings/change-password"
        element={
          <Layout pages={<SettingsLayout page={<ChangePassword />} />} />
        }
      />
    </Routes>
  );
}

export default App;
