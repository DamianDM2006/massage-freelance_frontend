import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../authentications/AuthContext.jsx";
import { getPatientAddress } from "../../api/patients.js";

const PatientAddress = (input) => {
  const [address, setAddress] = useState();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  console.log(`input.pt:`, input.pt);

  const syncAddress = async() => {
    try {
      const addData = await getPatientAddress(input.pt, token);
      setAddress(addData);
      setError(null);
    } catch(err) {
      setError(err);
    }
  };

  useEffect(() => {syncAddress()}, []);
  
  console.log(`address:`, address);
  console.log(`error:`, error ? error : "no error");

  if ( !address || address.id === 1) {
    return (
      <>
        <h3>There is no address on file.</h3>
        <p>{`Currious about the error ${error}`}</p>
        <button
          className="credsSmBtn"
          onClick={() => navigate("/createAddress")}>
            Add Address Now
        </button>
      </>
    )
  };

  return (
    <>
      <h3>Patient's Address{`ready to render address`}</h3>
    </>
  )
};

export default PatientAddress;