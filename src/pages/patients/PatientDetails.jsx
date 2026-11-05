import { useState, useEffect } from "react";
import { useAuth } from "../../authentications/AuthContext.jsx";
import { getPatient } from "../../api/patients.js";

const PatientDetails = (pId) => {
  const { token } = useAuth();
  const [patient, setPatient] = useState({});
  const { id } = pId;

  const syncPatient = async() => {
    try{
      const patientData = await getPatient(id, token);
      setPatient(patientData);
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {syncPatient()}, [])

  const PatientListItems = () => {
    const birthDate = patient.birthdate.split("T")[0];
    console.log(`birthDate:`, birthDate, typeof birthDate);
    return (
      <>
        <li>
          <p><strong>Account holder:</strong>
            {`  ${patient.client_first} ${patient.client_last}`}
          </p>
        </li>
        <li>
          <p><strong>Patient:</strong>
            {`  ${patient.first_name} ${patient.last_name}`}
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

  console.log(`PatientDetails patient:`, patient)
  
  return (
    <>
      <ul className="ptList">
        <PatientListItems />
      </ul>
    </>
  )
};

export default PatientDetails;