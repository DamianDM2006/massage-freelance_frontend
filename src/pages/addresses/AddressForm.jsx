import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../authentications/AuthContext.jsx";
import { updatePatientAddress } from "../../api/patients.js";

export const AddressForm = () => {
  const id = useParams();
  const { token } = useAuth();
  const [address, setAddress] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const tryUpdateAddress = async(formData) => {
    const allData = Object.fromEntries(formData.entries());

    try{
      const addData = await updatePatientAddress(id.patientId, allData, token);
      setAddress(addData);
      setError(null);
      navigate("/patient/" + id.patientId);
    } catch(err) {
      setError(err);
    }
  };

  useEffect(() => {tryUpdateAddress()}, []);
  
  // console.log(`address:`, address)
  // console.log(error ? error : "no error");

  return (
    <>
      <h3>Fill in the below relevant fields of your address.</h3>
      <p><strong>Leave irrelevant fields empty.</strong></p>
      <form
        action={tryUpdateAddress}
        className="patForm">
        <label><span>Address_1:</span>
          <input
            name="street1"
            maxLength="100"
            placeholder="Begin typing to update your address."
            autoFocus/>
        </label>
        <label><span>Address_2:</span>
          <input
            name="street2"
            maxLength="100"/>
        </label>
        <label><span>Bldg/Apt/Unit:</span>
          <input
          name="unit"
          maxLength="10"/>
        </label>
        <label><span>City:</span>
          <input
          name="city"
          maxLength="30"/>
        </label>
        <label><span>Sub-District:</span>
          <input
          name="subDistrict"
          maxLength="40"
          placeholder="Country Dependent"/>
        </label>
        <label><span>District:</span>
          <input
          name="district"
          maxLength="40"
          placeholder="Country Dependent"/>
        </label>
        <label><span>State/Provence:</span>
          <input
          name="state"
          maxLength="40"/>
        </label>
        <label><span>Postal Code:</span>
          <input
          name="postalCode"
          style={{"max-width": "7em"}}
          type="number"
          maxLength="5"/>
        </label>
        <button className="credsBtn">Submit</button>
      </form>
      <h3>Needs a "Back" Button</h3>
    </>
  )
};

export default AddressForm;