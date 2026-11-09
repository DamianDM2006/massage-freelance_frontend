import { useState } from "react";
import { useAuth } from "../../authentications/AuthContext.jsx";
import { getAvailability } from "../../api/appointments.js";

const AppointmentRequest = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const checkAvailability = async(formData) => {
    try {
      const request = Object.fromEntries(formData.entries());
      const today = Temporal.Now.plainDateISO().toString();

      console.log(`request:`,request, typeof request.startTime, request.startTime.length);

      if (request.date.length !== 10) throw new Error(`Invalid "Date" syntax. Must be in the form "YYYY-MM-DD".`);
      if (request.date < today) throw new Error(`Invalid "Date" request. The requested date must be in the future.`);
      if (request.startTime.length !== 5 || request.endTime.length !== 5) {
        throw new Error(`Invalid "Time" syntax.  Must be in the form "HH:MM".`)
      };
      if (request.startTime >= request.endTime) throw new Error('Invalid "Time" request. "Finished Time" must be after "Start Time".');
    const available = await getAvailability();
    } catch(err) {
      setError(err);
    }

  };

  console.log(`error:`, error?.message);

  return (
    <>
      <p>When would you prefer to make this appointment for?</p>
      <form
        action={checkAvailability}
        className="appt">
        <label>Date
          <input
            name="date"
            type="date"/>
        </label>
        <label>Start Time
          <input
            name="startTime"
            type="time"/>
        </label>
        <label>Finished Time
          <input
            name="endTime"
            type="time"/>
        </label>
        <button className="credsSmBtn">
          Check availability
        </button>
        <p>Once availability is confirmed. The button will change to "Schedule Appointment"</p>
        <p>Upon submit "Schedule Appointment": will navigate to PatientDetails AND render future appointments.  Will also render
          appointment dates on Profile page to show which patients have future appointments. Adding a prompt to cancel appoints (two step process).
        </p>
      </form>
    </>
  )
  };

  export default AppointmentRequest;
