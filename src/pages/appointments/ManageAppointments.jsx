import { useState, useEffect } from "react";
import { useNavigate, NavLink, useParams } from "react-router";
import { useAuth } from "../../authentications/AuthContext.jsx";
import { deleteAppt } from "../../api/appointments.js";

const ManageAppointments = () => {
  const { clientId, serviceId, patientId, apptId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [reqDelete, setReqDelete] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  const [error, setError] = useState(null);
  const [confirmed, setConfirmed] = useState("");

  const tryDeleteAppointment = async() => {
    try {
      const confirmation = await deleteAppt(patientId, apptId, token);
      console.log(`confirmation:`, confirmation);
      setConfirmed(confirmation);
      if (reschedule === true) setReschedule(false);
      if (reqDelete === true) setReqDelete(false);
    } catch(err) {
      console.log(err);
      setError(err);
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
    if (confirmed.length >= 1) {
      setConfirmed("");
    }
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
    if (apptId >= 1) {
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
              <button className="alertbttn">
                Continue.
              </button>
            </form>
            <form action={cancelRequest}>
              <button className="credsSmBtn">
                Cancel.
              </button>
            </form>
          </>
        )
      };
    } else return
  };

  const HandleConfirmed = () => {
    if (confirmed.length >= 1) {
      return (
        <>
          <h2>{confirmed}</h2>
          <button
            className="alertbttn"
            onClick={() => cancelRequest()}>
              OK.
          </button>
        </>
      )
    };
  };

  const HandleError = () => {
    if (error) {
      return (
        <>
          <h2>`${error}`</h2>
          <button
            className="alertbttn"
            onClick={() => cancelRequest()}>
              OK.
          </button>
        </>
      )
    }
  };
  ///home/:clientId/service/:serviceId/patient/:patientId
  return (
    <div className="mngappts">
      <WhichButton />
      <HandleConfirmed />
      <HandleError />
      <div className="renav">
        <button className="credsSmBtn"
          onClick={() => navigate(`/home/${clientId}/service/${serviceId}/patient/${patientId}`)}>
          Patient details.
        </button>
        <button className="credsSmBtn"
          onClick={() => navigate(`/home/${clientId}`)}>
          Select a massage.
        </button>
      </div>
    </div>
  )
};

export default ManageAppointments;