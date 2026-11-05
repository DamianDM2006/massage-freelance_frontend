// /** THIS PAGE WILL DO ==>
import { useState, useEffect } from "react";
import { usePath } from "../assets/PathContext.jsx";
import { useAuth } from "../authentications/AuthContext.jsx";
import { getClientData } from "../api/clients.js";
import { getPatients } from "../api/patients.js";

import CreatePatient from "./patients/CreatePatient.jsx";
import ClientDetails from "./patients/ClientDetails.jsx";
import PatientsList from "./patients/PatientsList.jsx";

const ProfilePage = () => {
  const { destination, isExisting } = usePath();
  const { token } = useAuth();
  const [client, setClient] = useState({});
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState();

//  *  DISPLAY THE PATIENTS ASSOCIATED WITH THE CLIENT.
//  *    as a list <ul>
  const syncClient = async () => {
    try {
    const clientData = await getClientData(token);
    setClient(clientData);
    } catch(err) {
      setError(err);
    }
  };

  useEffect(() => {syncClient()}, []);



  const syncPatients = async () => {
    try {
      const patientData = await getPatients(token);
      setPatients(patientData);
    } catch(err) {
      setError(err);
    }
  };

  useEffect(() => {syncPatients()}, []);

//  *  IF CLIENT DOES NOT HAVE A PATIENT (or needs to add a patient to the account)==> go to "/createPatient/:id"????
//  *    id = client.id
//  *      (from "/createPatient/:id" the user will be prompted to create an address for the patient)

//  *  USER WILL BE ABLE TO SELECT WHICH PATIENT TO VIEW DETAILS OF ==> to "/patient/:id"????
//  *    id = patient's id
//  *      (from "/patient/:id" the user will be prompted to edit patient details if needed)

//  *  IF THIS PAGE IS NOT THE DESTINATION TO USER WILL BE PROMPTED TO CONTINUE TO APPOINTMENTS

  // console.log(`ProfilePage client:`, client);
  // console.log(`ProfilePage patients:`, patients);
  // console.log(`ProfilePage error:`, error);
  // console.log(`ProfilePage destination:`, destination);

  return (
    <div className="profile">
      <ClientDetails client={client} />
      <PatientsList patients={patients}/>
      <CreatePatient />
    </div>
  )
};

export default ProfilePage;