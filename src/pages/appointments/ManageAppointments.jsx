import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../authentications/AuthContext.jsx";
import { deleteAppt } from "../../api/appointments.js";

const ManageAppointments = (apptid) => {
  const { id } = apptid;
  const { clientId, serviceId, patientId, apptId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [reqDelete, setReqDelete] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  const [error, setError] = useState(null);

  const tryDeleteAppointment = async() => {
    console.log(`reqDelete.`, reqDelete, `reschedule.`, reschedule);
    try {
      const confirmation = await deleteAppt(patientId, apptId, token);
      console.log(`confirmation:`, confirmation);
      if (reschedule === true) setReschedule(false);
      if (reqDelete === true) setReqDelete(false);
    } catch(err) {
      console.log(err);
    }
  };

  const requestDelete = () => {
    if (reqDelete === false) {
      setReqDelete(true);
    };
  };

  const deleteAppointment = () => {
    setReqDelete(false);
    tryDeleteAppointment();
  };

  const cancelRequest = () => {
    if (reqDelete === true) {
      setReqDelete(false);
    };
    if (reschedule === true) {
      setReschedule(false);
    };
  };

  const requestReschedule = () => {
    if (reschedule === false) {
      setReschedule(true);
    }
  };

  const rescheduleAppt = () => {
    console.log(`rescheduling`)
    setReschedule(false);
    tryDeleteAppointment();
    navigate(`/home/${clientId}/service/${serviceId}/patient/${patientId}/appointments`)
  };

  const WhichButton = () => {
    if ( reqDelete === false && reschedule === false) {
      return (
        <>
          <form action={requestDelete}>
            <button className="credsSmBtn">
              Cancel Appointment.
            </button>
          </form>
          <form action={requestReschedule}>
            <button className="credsSmBtn">
              Reschedule appointment.
            </button>
          </form>      
        </>
      )
    };
    
    if (reqDelete === true && reschedule === false) {
      return (
        <>
          <form action={deleteAppointment}>
            <h4 className="alert">This action can not be undone. Are you certain you would like to CANCEL the appointment?</h4>
            <button id="alert">
              YES. Cancel Appointment.
            </button>
          </form>
          <form action={cancelRequest}>
            <button className="credsSmBtn">
              No. Keep appointment.
            </button>
          </form>
        </>
      )
    };

    if (reschedule === true && reqDelete === false) {
      return (
        <>
          <h4>
            Rescheduling entails setting a new time and/or date for the same service.  If you'd like to change the type of service, please proceed to the "Home" page and make a different selection.
          </h4>
          <form action={rescheduleAppt}>
            <button className="credsSmBtn">
              Continue to reschedule.
            </button>
          </form>
          <form action={cancelRequest}>
            <button className="credsSmBtn">
              Cancel the request.
            </button>
          </form>
        </>
      )
    }
  };
  
  return (
    <div className="mngappts">
      <WhichButton />
      <div className="renav">
        <button className="credsSmBtn"
          onClick={() => navigate(`/home/${clientId}/service/${serviceId}/profile`)}>
          Return to Profile Page.
        </button>
        <button className="credsSmBtn"
          onClick={() => navigate(`/home/${clientId}`)}>
          Home
        </button>
      </div>
    </div>
  )
};

export default ManageAppointments;