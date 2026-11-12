import { useState } from "react";
import { useParams } from "react-router";
import { usePath } from "../assets/PathContext";
import PatientsList from "./patients/PatientsList.jsx";
import { ApptDetails } from "./appointments/ApptPatient.jsx";
import AppointmentRequest from "./appointments/AppointmentForms.jsx";
import DisplayPatientAppt from "./appointments/DisplayPatientAppt.jsx";

const AppointmentsPage = () => {
  const { clientId, serviceId, patientId } = useParams();
  const { destination, isExisting } = usePath();
  
  // const { id } = useParams(); /* references service id */
  // console.log(`location.pathname:`, location.pathname, `destination;`, destination);
  // console.log(`Appointments Page. id:`, id);
  // console.log(`isExisting:`, isExisting);

  return (
    <div className="Appts">
      <h2>Appointments page: </h2>
      {/* {isExisting && <PatientsList />} */}
      <AppointmentRequest />
    </div>
  )
};

export default AppointmentsPage;