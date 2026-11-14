// This page is used to Primarily to render Appointment Request.
// How to bring in the Patient's name?

import { usePath } from "../assets/PathContext.jsx";
import AppointmentRequest from "./appointments/AppointmentForms.jsx";

const AppointmentsPage = () => {
  const { patientName } = usePath();
  
  return (
    <div className="Appts">
      <h2>Appointment Request for {patientName} </h2>
      <AppointmentRequest />
    </div>
  )
};

export default AppointmentsPage;