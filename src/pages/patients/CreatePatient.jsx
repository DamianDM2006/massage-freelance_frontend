import { useState } from "react";

const CreatePatient = () => {
  const [selectedGender, setSelectedGender] = useState("");
  const [birthMonth, setBirthMonth] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // remember to focus cursor. after enter-> cursor will move to the next field.
  // hmmm?  should I rename this file CreatePatient/:id ???

  return (
    <>
      <h3>CreatePatient Form</h3>
      <form /* action={whatFunction} i.e. onSubmit=handleSubmit*/ className="patForm">
        <label><span>first_name:</span>
          <input
            name="first_name"
            type="text"
            maxLength="30"
            autoFocus/>
        </label>
        <label><span>last_name:</span>
          <input
            name="last_name"
            required
            maxLenght="35"
            placeholder="Required"/>
        </label>
        <label><span>nickname:</span>
          <input
            name="nickname"
            required
            maxLenght="30"
            placeholder="Required"/>
        </label>
        <label><span>gender:</span>
          <select
            name="gender"
            className="gender"
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            required>
              <option value="">Gender: Required</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
          </select>
        </label>
        <label><span>address_id:</span>
          <input
            name="address_id"
            value="1"
            type="hidden"/>{/* default will be 1 */}
        </label> 
        <label><span>email:</span>
          <input
            name="email"
            type="email"
            maxLength="100"/>
        </label>
        <label><span>line_user_id:</span>
          <input
            name="line_user_id"
            type="text"maxLength="50"
            defaultValue="none"/>
        </label>
        <label><span>countryCode:</span>
          <input
            name="countryCode"
            maxLenth="4"
            defaultValue="+1" />
          {/* will combine w/ phone as a string to accomodate server requirements */}
        </label> 
        <label><span>phone:</span>
          <input
            name="phone"
            type="tel"
            maxLength="20"/>{/* convert to string. encourage country code using placeholder */}
        </label> 
        <label><span>birthYear</span>
          <input
            name="year"
            type="number"
            maxLength="4"
            min="1800"
            max="2700"
            required
            placeholder="Required"/>
        </label>
        <label><span>birthMonth</span>
          <select
            name="month"
            className="month"
            type="month"
            value={birthMonth}
            onChange={(e) => setBirthMonth(e.target.value)}
            required>
              <option value="">Select your birth month: Required</option>
              <option value="01" >January</option>
              <option value="02" >February</option>
              <option value="03" >March</option>
              <option value="04" >April</option>
              <option value="05" >May</option>
              <option value="06" >June</option>
              <option value="07" >July</option>
              <option value="08" >August</option>
              <option value="09" >September</option>
              <option value="10" >October</option>
              <option value="11" >November</option>
              <option value="12" >December</option>
          </select>
        </label>
        <label><span>birthDay</span>
          <input
            name="birthDay"
            type="number"
            max="31"
            required
            placeholder="Required"/>
        </label>
        {/*<label>birthdate:</label>*/} {/* will combine in to "YYYY-MM-DD" format */}
      </form>
    </>
  )
};

export default CreatePatient;