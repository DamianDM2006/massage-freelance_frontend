import { useState } from "react";

const PatientFormInputs = () => {
  const [selectedGender, setSelectedGender] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  return (
    <>
        <label><span>firstName:</span>
          <input
            name="firstName"
            type="text"
            maxLength="30"
            autoFocus/>
        </label>
        <label><span>lastName:</span>
          <input
            name="lastName"
            required
            maxLength="35"
            placeholder="Required"/>
        </label>
        <label><span>nickname:</span>
          <input
            name="nickname"
            required
            maxLength="30"
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
        <label><span>addressId:</span>
          <input
            name="addressId"
            value="1"
            type="hidden"/>
        </label> 
        <label><span>email:</span>
          <input
            name="email"
            type="email"
            maxLength="100"/>
        </label>
        <label><span>lineId:</span>
          <input
            name="line_user_id"
            type="text"maxLength="50"
            defaultValue="none"/>
        </label>
        <label><span>countryCode:</span>
          <input
            name="countryCode"
            maxLength="4"
            defaultValue="+1" />
{/* will combine w/ phone as a string to accomodate server requirements */}
        </label> 
        <label><span>phoneNum</span>
{/* backend uses phone: as key */}
          <input
            name="phoneNum"
            type="tel"
            maxLength="20"/>
{/* convert to string. encourage country code using placeholder */}
        </label> 
        <label><span>birthYear</span>
          <input
            name="bYear"
            type="number"
            maxLength="4"
            min="1800"
            max="2700"
            required
            placeholder="Required"/>
        </label>
        <label><span>birthMonth</span>
          <select
            name="bMonth"
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
            name="bDay"
            type="number"
            max="31"
            required
            placeholder="Required"/>
        </label>    
    </>
  )
};

export default PatientFormInputs;