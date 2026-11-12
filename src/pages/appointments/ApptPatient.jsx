import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useAuth } from "../../authentications/AuthContext.jsx";
import { getApptDetails } from "../../api/appointments.js";

export const ApptsList = (appointments) => {
  const { appts } = appointments;

  const ListItem = ({ appt }) => {
    const splitDate = appt.date.split("T")[0];
    const sliceStart = appt.start_time.slice(0, 5);
    return (
      <nav>
        <NavLink to={`/home/${appt.client_id}/patient/${appt.patient_id}/appointments/${appt.appt_id}`}>
          <p>{`${splitDate} Beginning ${sliceStart}`}</p>
        </NavLink>
      </nav>
    )
  };
// /home/:clientId/patient/:patientId/appointments/:apptId
  if (typeof appts !== "object") {
    return <p>{appts}</p>
  } else {
    return (
      <>
        <h4>Upcoming Appointments</h4>
        <ol>
          {appts.map((appt) => (<ListItem key={appt.appt_id} appt={appt} />))}
        </ol>
      </>
    )
  }
};

export const ApptDetails = (input) => {
  const { id, pd } = input;
  const { token } = useAuth();
  const [appointmnt, setAppointmnt] = useState({});
  const [error, setError] = useState();

  const syncAppt = async () => {
    try {
    const apptData = await getApptDetails(id, pd, token);
    console.log(`apptData:`, apptData);
  } catch(err) {
    console.log(err);
    setError(err);
  }
  };

  useEffect(() => {syncAppt()}, []);

  return (
    <p>
      Patient appointment DETAILS
    </p>
  )
};