import { useEffect, useState } from "react";
import { useAuth } from "../../authentications/AuthContext.jsx";
import { getApptDetails } from "../../api/appointments.js";

const ApptDetails = (input) => {
  const { id, pd } = input;
  const { token } = useAuth();
  const [appointmnt, setAppointmnt] = useState({});
  const [error, setError] = useState();

  const syncAppt = async () => {
    try {
    const apptData = await getApptDetails(id, pd, token);
    setAppointmnt(apptData);
  } catch(err) {
    console.log(err);
    setError(err);
  }
  };

  useEffect(() => {syncAppt()}, [input]);
  
  if (Object.keys(appointmnt).length >= 1) {
    const splitDate = appointmnt.date.split("T")[0];
    const sliceStart = appointmnt.start_time.slice(0,5);
    const sliceEnd = appointmnt.end_time.slice(0, 5);

    return (
      <section className="apptdtls">
        <p>Select an appointment above to view it's details.</p>
        <h3>Appointment Details for <u>{splitDate}</u> Beginning {sliceStart}</h3>
        <h4>Patient: {appointmnt.nickname} {appointmnt.last_name}</h4>
        <h3>{appointmnt.title}</h3>
        <h4>
          Time scheduled: <u>From </u>{sliceStart} <u>to</u> {sliceEnd}
        </h4>
        <h6>
          {appointmnt.description}
        </h6>
      </section>
    )

  } else return

};

export default ApptDetails;