import { useState, useEffect } from "react";
import { useNavigate, useParams, NavLink } from "react-router";
import { useAuth } from "../../authentications/AuthContext.jsx";
import { getPatientAddress } from "../../api/patients.js";

const PatientAddress = (input) => {
  const [address, setAddress] = useState();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { clientId, serviceId, patientId} = useParams();
  const { token } = useAuth();

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
  
  // console.log(`address:`, address);
  // console.log(`error:`, error ? error : "no error");

  const Address = () => {
    return (
      <>
        <section id="addpt">
          <h4>{address.street_number_1}</h4>
          {address.street_number_2 && <h4>{address.street_number_2}</h4>}
          {address.sub_district && <h4>{address.sub_district}</h4>}
          {address.district && <h4>{address.district}</h4>}
          {address.city && <h4>{address.city}</h4>}
          {address.provence_state && <h4>{address.provence_state}</h4>}
          {address.postal_code && <h4>{address.postal_code}</h4>}
        <NavLink id="addedt" to={`/home/${clientId}/service/${serviceId}/patient/${input.pt}/createAddress`}>
          Edit address.
        </NavLink>
        </section>
      </>
    )
  };

  if ( !address || address.id === 1) {
    return (
      <div className="ptaddress">
        <h3>There is not an address on file.</h3>
        {error && <p>{`Oops! ${error.message}`}</p>}
        <button
          className="credsSmBtn"
          onClick={() => navigate(`/home/${clientId}/service/${serviceId}/patient/${patientId}/createAddress`)}>
            Add Address Now
        </button>
      </div>
    )
  };

  return (
    <div className="ptaddress">
      <h3>Patient's Address:</h3>
      <Address />
    </div>
  )
};

export default PatientAddress;