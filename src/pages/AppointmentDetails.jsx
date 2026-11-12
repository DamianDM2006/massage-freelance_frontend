import { useParams } from "react-router";
import { ApptDetails } from "./appointments/ApptPatient.jsx";
import DisplayPatientAppt from "./appointments/DisplayPatientAppt.jsx";

const AppointmentDetails = () => {
  const { clientId, patientId, apptId } = useParams();

  return (
    <>
      <h4>AppointmentDetails Page</h4>
      <DisplayPatientAppt id={patientId}/>
      <ApptDetails id={apptId} pd={patientId} />
    </>
  )
};

export default AppointmentDetails;