import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../authentications/AuthContext.jsx";
import { getPatient } from "../../api/patients.js";

const PatientDetails = () => {
  const { token } = useAuth();
  const [patient, setPatient] = useState({});
  const [error, setError] = useState(null);
  const { id } = useParams();

  const syncPatient = async() => {
    try{
      const patientData = await getPatient(id, token);
      setPatient(patientData);
    } catch(err) {
      console.log(err);
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
          <strong>Email:</strong>{`  ${patient.email}`}
        </li>
        <li>
          <strong>Line ID:</strong>{`  ${patient.line_user_id}`}
        </li>
        <li>
          <strong>Phone:</strong>{`  ${patient.phone}`}
        </li>
        <li>
          <strong>Birthdate:</strong>{`  ${birthDate}`}
        </li>
      </>
    )
  };

  // console.log(`PatientDetails patient:`, patient);
  
  return (
    <>
      <h2>{`Patient: ${patient.first_name} ${patient.last_name}`}</h2>
      <ul className="ptList">
        <PatientListItems />
      </ul>
    </>
  )
};

export default PatientDetails;