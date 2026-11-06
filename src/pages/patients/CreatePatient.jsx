import { useState } from "react";
import PatientFormInputs from "./PatientFormInputs.jsx";

const CreatePatient = () => {
  const [query, setQuery] = useState({});

  const preProcessB4send = (event) => {
    event.preventDefault();
    // alert(`I wonder what this will do.`);
   
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

    // console.log(`formData:`,birthdate);

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

    // console.log(`processed:`, processed);
    setQuery(processed);
  };

  console.log(query);

  const tryToCreatePatient = async () => {};


  return (
    <>
      <h3>CreatePatient Form:</h3>
      <p>Insure to fill in ALL the required fields.  </p>
      <form onSubmit={preProcessB4send} className="patForm">
        <PatientFormInputs />
        <button className="credsBtn">Submit </button>
      </form>
    </>
  )
};

export default CreatePatient;