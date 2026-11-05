import { Routes, Route } from "react-router";

import Layout from "./layout/Layout.jsx";
import AppointmentsPage from "./pages/AppointmentsPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./authentications/LoginPage.jsx";
import RegisterPage from "./authentications/RegisterPage.jsx";
import ContinueTo from "./authentications/ContinueTo.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ServiceDetailsPage from "./pages/ServiceDetailsPage.jsx";
import PatientDetails from "./pages/patients/PatientDetails.jsx";
import CreatePatient from "./pages/patients/CreatePatient.jsx";
import Error404 from "./Error404.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/appointments/:id" element={<AppointmentsPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/continue" element={<ContinueTo />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/home/:id" element={<ServiceDetailsPage />} />
        <Route path="/createPatient" element={<CreatePatient />} />
        <Route path="/patient/:id" element={<PatientDetails />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export default App;
