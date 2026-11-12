import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { usePath } from "../assets/PathContext.jsx";
import { useAuth } from "../authentications/AuthContext.jsx";
import { getClientData } from "../api/clients.js";
import { getPatients } from "../api/patients.js";

import ClientDetails from "./patients/ClientDetails.jsx";
import PatientsList from "./patients/PatientsList.jsx";

const ProfilePage = () => {
  const { isExisting, setIsExisting } = usePath();
  const { token } = useAuth();
  const [client, setClient] = useState({});
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { serviceId } = useParams();

  if (!token) throw new Error(`Unathorized Attempt`);

  //  *  DISPLAY THE PATIENTS ASSOCIATED WITH THE CLIENT.
  const syncClient = async () => {
    try {
      const clientData = await getClientData(token);
      if (clientData.patient_id !== null && !isExisting) {
        setIsExisting(true);
      };
      setClient(clientData);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {syncClient()}, []);

  const syncPatients = async () => {
    try {
      const patientData = await getPatients(token);
      setPatients(patientData);
    } catch (err) {
      setError(err);
    }
  };

    useEffect(() => {syncPatients()}, []);

  const ProfileOptions = () => {
    if (!isExisting) {
      return (
        <>
          <p>In order to continue, please complete the intake form.</p>
          <button
            className="credsSmBtn"
            onClick={() => {
              navigate(`/home/${client.id}/service/${serviceId}/patient/`);
            }}
          >
            Continue to <strong>Intake</strong> Form
          </button>
        </>
      );
    };

    return (
      <div className="withh2">
        <h3>Add a new member to your account.</h3>
        <button
          className="credsSmBtn"
          onClick={() => {
            navigate(`/home/${client.id}/service/${serviceId}/patient/`);
          }}
        >
          Add Patient
        </button>
      </div>
    );
  };

  return (
    <div className="profile">
      <ClientDetails client={client} />
      {isExisting && <PatientsList patients={patients} />}
      <ProfileOptions />
    </div>
  );
};

export default ProfilePage;
