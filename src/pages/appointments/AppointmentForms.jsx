import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../authentications/AuthContext.jsx";
import { getAvailability, scheduleAppt } from "../../api/appointments.js";

const AppointmentRequest = () => {
  const { serviceId } = useParams();
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const [isAvailable, setIsAvailable] = useState(false);
  const [requested, setRequested] = useState({});

  const checkAvailability = async(formData) => {
    const request = Object.fromEntries(formData.entries());
    const today = Temporal.Now.plainDateISO().toString();
    
    if (request.date.length !== 10) throw new Error(`Invalid "Date" syntax. Must be in the form "YYYY-MM-DD".`);
    if (request.date < today) throw new Error(`Invalid "Date" request. The requested date must be in the future.`);
    if (request.startTime.length !== 5 || request.endTime.length !== 5) {
      throw new Error(`Invalid "Time" syntax.  Must be in the form "HH:MM".`)
    };
    if (request.startTime >= request.endTime) throw new Error('Invalid "Time" request. "Finished Time" must be after "Start Time".');
    
    try {
      const result = await getAvailability(request, token);
      setIsAvailable(result.available);
      if (result.available === false) {
        throw new Error(`The requested slot on ${result.requested.date} from ${result.requested.startTime} to ${result.requested.endTime} is not available.`)
      }
      let newResult = result;
      newResult.requested.serviceId = serviceId; 
      setRequested(newResult);
      setError(null);
    } catch(err) {
      setError(err);
    }
  };

  const ResetError = () => {
    setError(null);
  };

  const HandleError = () => {
    return (
      <>
        <p>{error.message}</p>
        <button onClick={() => ResetError()}>Reset Request Form</button>
      </>
    )
  };

  const AppointmentForm = () => {
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
          {!isAvailable && <button className="credsSmBtn">Check availability</button>}
        </form>
      </>
    )
  };

  return (
    <>
      {!error && !isAvailable && <AppointmentForm />}
      {isAvailable && <SetAppointment requested={requested.requested} />}
      {error && <HandleError />}
    </>
  )
  };

export default AppointmentRequest;
  
export const SetAppointment = (reqBody) => {
  const { clientId, serviceId, patientId } = useParams();
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const [appoint, setAppoint] = useState({});
  const navigate = useNavigate();

  const trySchedule = async() => {

    try {
      const scheduled = await scheduleAppt(patientId, reqBody.requested, token);
      setAppoint(scheduled);
      navigate(`/home/${clientId}/service/${serviceId}/patient/${patientId}`);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <>
      <div>
        <h3>Confirmed Availability for </h3>
        <p>{`Date & Time: ${reqBody.requested.date} From: ${reqBody.requested.startTime} To: ${reqBody.requested.endTime}`}</p>
      </div>
      <form action={trySchedule}>
        <button>
          Sets Appointment After Check Availability
        </button>
      </form>
      {error && <p>{error.message}</p>}
    </>
  )
};