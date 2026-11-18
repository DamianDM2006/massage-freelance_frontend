// This page is used to Primarily to render Appointment Request.
// How to bring in the Patient's name?

import { usePath } from "../assets/PathContext.jsx";
import { useAuth } from "../authentications/AuthContext.jsx";
import AppointmentRequest from "./appointments/AppointmentForms.jsx";

const AppointmentsPage = () => {
  const { patientName } = usePath();
  const { token } = useAuth();

  if (!token) throw new Error(`Unathorized Attempt`);
  
  return (
    <div className="Appts">
      <h2>Appointment Request for {patientName} </h2>
      <AppointmentRequest />
    </div>
  )
};

export default AppointmentsPage;