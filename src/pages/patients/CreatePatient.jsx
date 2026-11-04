const CreatePatient = (whatFunction) => {
  console.log(whatFunction);
  const { thisFunct } = whatFunction;
  thisFunct();

  // remember to focus cursor. after enter-> cursor will move to the next field.
  // hmmm?  should I rename this file CreatePatient/:id ???

  return (
    <form action={whatFunction} className="patForm">
      <label>first_name:</label>
      <label>last_name:</label>
      <label>nickname:</label>
      <label>gender:</label>
      <label>address_id:</label> {/* default will be 1 */}
      <label>email:</label>
      <label>line_user_id:</label>
      <label>countryCode:</label> {/* will combine w/ phone as a string to accomodate server requirements */}
      <label>phone:</label> {/* convert to string. encourage country code using placeholder */}
      <label>birthYear</label>
      <label>birthMonth</label>
      <label>birthDay</label>
      {/*<label>birthdate:</label>*/} {/* will combine in to "YYYY-MM-DD" format */}
    </form>
  )
};

export default CreatePatient;