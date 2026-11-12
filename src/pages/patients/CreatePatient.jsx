import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../authentications/AuthContext.jsx";
import { usePath } from "../../assets/PathContext.jsx";
import { createPatient } from "../../api/patients.js";

import PatientFormInputs from "./PatientFormInputs.jsx";

const CreatePatient = () => {
  const [error, setError] = useState();
  const { token } = useAuth();
  const { setIsExisting } = usePath();
  const navigate = useNavigate();
  const { clientId, serviceId } = useParams();

  const preProcessB4send = (event) => {
    event.preventDefault();
   
    const form = event.target;
    const formData = new FormData(form);
    const lastName = formData.get("lastName");
    const nickname = formData.get("nickname");
    const firstName = formData.get("firstName") ? formData.get("firstName") : nickname;
    const gender = formData.get("gender");
    const addressId = formData.get("addressId");
    const email = formData.get("email");
    const lineId = formData.get("lineId");
    const countryCode = formData.get("countryCode");
    const phoneNum = formData.get("phoneNum");
    const phone = countryCode[0] !== "+" ? "+" + countryCode + " " + phoneNum : countryCode + " " + phoneNum;
    const bYear = formData.get("bYear");
    const bMonth = formData.get("bMonth");
    const bDay = formData.get("bDay");
    const birthdate = [bYear, bMonth, bDay].join("-");

    const processed = {
      firstName,
      lastName,
      nickname,
      gender,
      addressId,
      email,
      lineId,
      phone,
      birthdate
    };

    tryToCreatePatient(processed);
  };


  const tryToCreatePatient = async (data) => {
    try {
      const newPatient = await createPatient(data, token);
      alert(`${newPatient.nickname} has been added to your account.`)
      setIsExisting(true);
      navigate(`/home/${clientId}/service/${serviceId}/profile`);
    } catch(err) {
      console.log(err);
      setError(err);
    }
  };

  const ToProfile = () => {
    return (
      <>
        <p>{error.message}</p>
        <button
          className="credsSmBtn"
          onClick={() => {navigate(`/home/${clientId}/service/${serviceId}/profile`)}}>
            Return to Profile
        </button>
      </>
    )
  };

  return (
    <>
      <h3>CreatePatient Form:</h3>
      <p>Insure to fill in ALL the required fields.  </p>
      <form onSubmit={preProcessB4send} className="patForm">
        <PatientFormInputs />
        <button className="credsBtn">Submit </button>
      </form>
      {error && <ToProfile />}
    </>
  )
};

export default CreatePatient;