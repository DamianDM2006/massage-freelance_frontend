import { Routes, Route } from "react-router";

import Layout from "./layout/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./authentications/LoginPage.jsx";
import RegisterPage from "./authentications/RegisterPage.jsx";
import ServiceDetailsPage from "./pages/ServiceDetailsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CreatePatient from "./pages/patients/CreatePatient.jsx";
import PatientDetails from "./pages/patients/PatientDetails.jsx";
import AddressForm from "./pages/addresses/AddressForm.jsx";
import AppointmentsPage from "./pages/AppointmentsPage.jsx";
import Error404 from "./Error404.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/:clientId" element={<HomePage />} />
        <Route path="/home/:clientId/service/:serviceId" element={<ServiceDetailsPage />} />
        <Route path="/home/:clientId/service/:serviceId/profile" element={<ProfilePage />} />
        <Route path="/home/:clientId/service/:serviceId/patient/" element={<CreatePatient />} />
        <Route path="/home/:clientId/service/:serviceId/patient/:patientId" element={<PatientDetails />} />
        <Route path="/home/:clientId/service/:serviceId/patient/:patientId/createAddress" element={<AddressForm />} />
        <Route path="/home/:clientId/service/:serviceId/patient/:patientId/appointments" element={<AppointmentsPage />} />
          {/* <Route path="/home/:clientId/patient/:patientId/appointments/:apptId" element={<ManageAppt />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/service/:serviceId" element={<ServiceDetailsPage />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export default App;
