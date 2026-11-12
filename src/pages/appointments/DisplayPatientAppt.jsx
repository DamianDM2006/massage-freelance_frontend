import { useState, useEffect } from "react";
import { useAuth } from "../../authentications/AuthContext.jsx";
import { getPatientAppts } from "../../api/appointments.js";
import { ApptsList } from "./ApptPatient.jsx";

const DisplayPatientAppt = (ptid) => {
  const {id} = ptid;
  const [appts, setAppts] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const syncPatientAppts = async() => {
    try {
    const apptsData = await getPatientAppts(id, token);
    setAppts(apptsData);
    } catch(err) {
      console.log(err);
      setError(err);
    }
  };

  useEffect(() => {syncPatientAppts()}, []);

  if (Object.keys(appts).length >= 1) {
    return (
    <>
      <ApptsList appts={appts} />
    </>
  )} else return
};

export default DisplayPatientAppt;