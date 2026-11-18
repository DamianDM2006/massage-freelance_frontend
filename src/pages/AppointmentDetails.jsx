import { useParams } from "react-router";
import { useAuth } from "../authentications/AuthContext.jsx";
import ApptDetails from "./appointments/ApptDetails.jsx";
import DisplayPatientAppt from "./appointments/DisplayPatientAppt.jsx";
import ManageAppointments from "./appointments/ManageAppointments.jsx";

const AppointmentDetails = () => {
  const { serviceId, patientId, apptId } = useParams();
  const { token } = useAuth();

  if (!token) throw new Error(`Unathorized Attempt`)

  return (
    <>
      <h4>AppointmentDetails Page</h4>
      <DisplayPatientAppt id={patientId}/>
      <ApptDetails id={apptId} pd={patientId} />
      <ManageAppointments />
    </>
  )
};

export default AppointmentDetails;