import { useState, useEffect } from "react";
import { useAuth } from "../../authentications/AuthContext.jsx";
import { getPatient } from "../../api/patients.js";

const DisplayClient = (pId) => {
  const { token } = useAuth();
  const [patient, setPatient] = useState({});
  const [error, setError] = useState(null);
  const { id } = pId;

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
        <span className="withh2">
          <p>Account Holder:</p>
          <h2>
            {`  ${patient.client_first} ${patient.client_last}`}
          </h2>
        </span>
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
          <strong>Phone:</strong>{`  ${patient.phone !== "+1 " ? patient.phone : ""}`}
        </li>
        <li>
          <strong>Birthdate:</strong>{`  ${birthDate}`}
        </li>
      </>
    )
  };
  
  return (
    <>
      <ul className="ptList">
        <PatientListItems />
      </ul>
    </>
  )
};

export default DisplayClient;