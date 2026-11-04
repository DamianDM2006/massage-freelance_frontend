import { usePath } from "../assets/PathContext.jsx";
import { useAuth } from "../authentications/AuthContext.jsx";

import CreatePatient from "./patients/CreatePatient.jsx";

const ProfilePage = () => {
  const { destination, isExisting } = usePath();
  const { token } = useAuth();

  const thisFunct = () => {
    console.log(`I'm able to move this to patient form.`);
  };

/** THIS PAGE WILL DO ==>
 *  
 *  DISPLAY THE PATIENTS ASSOCIATED WITH THE CLIENT.
 *    as a list <ul>
 * 
 *  IF CLIENT DOES NOT HAVE A PATIENT (or needs to add a patient to the account)==> go to "/createPatient/:id"????
 *    id = client.id
 *      (from "/createPatient/:id" the user will be prompted to create an address for the patient)
 * 
 *  USER WILL BE ABLE TO SELECT WHICH PATIENT TO VIEW DETAILS OF ==> to "/patient/:id"????
 *    id = patient's id
 *      (from "/patient/:id" the user will be prompted to edit patient details if needed)
 *  
 *  IF THIS PAGE IS NOT THE DESTINATION TO USER WILL BE PROMPTED TO CONTINUE TO APPOINTMENTS
 */

  return (
    <div className="profile">
      <CreatePatient thisFunct={thisFunct}/>
    </div>
  )
};

export default ProfilePage;