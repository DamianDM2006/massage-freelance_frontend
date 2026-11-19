import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../authentications/AuthContext.jsx";
import { updatePatientAddress, getPatientAddress } from "../../api/patients.js";
import ClientAddresses from "./ClientAddresses.jsx";

export const AddressForm = () => {
  const { token } = useAuth();
  const [address, setAddress] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { clientId, serviceId, patientId} = useParams();

  if (!token) throw new Error(`Unathorized Attempt`);
  
  const syncCurrentAddress = async() => {
    try {
      const addData = await getPatientAddress(patientId, token);
      setAddress(addData);
      setError(null);
    } catch(err) {
      setError(err);
    }
  };

  useEffect(() => {syncCurrentAddress()}, []);
  
  const tryUpdateAddress = async(formData) => {
    try{
      const allData = Object.fromEntries(formData.entries());
      const addData = await updatePatientAddress(patientId, allData, token);
      setAddress(addData);
      setError(null);
    navigate(`/home/${clientId}/service/${serviceId}/patient/${patientId}`);
    } catch(err) {
      setError(err);
    }
  };

  useEffect(() => {tryUpdateAddress()}, []);

  return (
    <>
      <h3>Fill in the below relevant fields of your address.</h3>
      <p><strong>Leave irrelevant fields empty.</strong></p>
      <ClientAddresses />
      <form
        action={tryUpdateAddress}
        className="patForm">
        <label><span>Address_1:</span>
          <input
            name="street1"
            maxLength="100"
            defaultValue={address.street_number_1}
            required/>
        </label>
        <label><span>Address_2:</span>
          <input
            name="street2"
            maxLength="100"
            defaultValue={address.street_number_2}/>
        </label>
        <label><span>Bldg/Apt/Unit:</span>
          <input
          name="unit"
          maxLength="10"
          defaultValue={address.apt_unit}/>
        </label>
        <label><span>City:</span>
          <input
          name="city"
          maxLength="30"
          defaultValue={address.city}/>
        </label>
        <label><span>Sub-District:</span>
          <input
          name="subDistrict"
          maxLength="40"
          defaultValue={address.sub_district}/>
        </label>
        <label><span>District:</span>
          <input
          name="district"
          maxLength="40"
          defaultValue={address.district}/>
        </label>
        <label><span>State/Provence:</span>
          <input
          name="state"
          maxLength="40"
          defaultValue={address.provence_state}/>
        </label>
        <label><span>Postal Code:</span>
          <input
          name="postalCode"
          style={{"maxWidth": "7em"}}
          type="number"
          maxLength="5"
          defaultValue={address.postal_code}/>
        </label>
        <button className="credsBtn">Submit</button>
      </form>
      <button
        className="credsSmBtn"
        onClick={() => navigate(-1)}
      >"Back"</button>
      {error && <h3>{error.message}</h3>}
    </>
  )
};

export default AddressForm;