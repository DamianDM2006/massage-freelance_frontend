import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../authentications/AuthContext.jsx";
import { getPatient } from "../../api/patients.js";
import { usePath } from "../../assets/PathContext.jsx";

import PatientAddress from "../addresses/PatientAddress.jsx";
import SetApptPatient from "../appointments/SetApptPatient.jsx";
import DisplayPatientAppt from "../appointments/DisplayPatientAppt.jsx";

const PatientDetails = () => {
  const { token } = useAuth();
  const [patient, setPatient] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { patientName, setPatientName } = usePath();
  const { clientId, serviceId, patientId} = useParams();

  const syncPatient = async() => {
    try{
      const patientData = await getPatient(patientId, token);
      setPatient(patientData);
    } catch(err) {
      setError(err);
    }
  };

  useEffect(() => {syncPatient()}, [])

  const PatientListItems = () => {
    const birthDate = patient.birthdate?.split("T")[0];

    return (
      <>
        <li>
          <p><strong>Account holder:</strong>
            {`  ${patient.client_first} ${patient.client_last}`}
          </p>
        </li>
        <li>
          <p><strong>Goes by</strong>
            {` ${patient.nickname}`}
          </p>
        </li>
        <li>
          <strong>Email:</strong>{`  ${patient.email !== "null" ? patient.email : ""}`}
        </li>
        <li>
          <strong>Line ID:</strong>{`  ${patient.line_user_id !== "null" ? patient.line_user_id : ""}`}
        </li>
        <li>
          <strong>Phone:</strong>{`  ${patient.phone !== "+1 " ? patient.phon : ""}`}
        </li>
        <li>
          <strong>Birthdate:</strong>{`  ${birthDate}`}
        </li>
      </>
    )
  };
  
  return (
    <>
      {error
        ? <h3>{error.message}</h3>
        : <h2>{`Patient: ${patient.first_name} ${patient.last_name}`}</h2>}
      <ul className="ptList">
        {!error && <PatientListItems />}
      </ul>
      {patient.patient_id && <PatientAddress pt={patient.patient_id} />}
      <button className="credsSmBtn"
        onClick={() => {navigate(`/home/${clientId}/service/${serviceId}/profile`)}}>
        Return to Profile
      </button>
      <SetApptPatient id={patient.patient_id}/>
      {patient.patient_id && <DisplayPatientAppt id={patient.patient_id}/>}
    </>
  )
};

export default PatientDetails;