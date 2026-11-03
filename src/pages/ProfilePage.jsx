import { usePath } from "../assets/PathContext.jsx";
import { useAuth } from "../authentications/AuthContext.jsx";

const ProfilePage = () => {
  const { destination, isExisting } = usePath();
  const { token } = useAuth();

/**
 *  if client does not have a patient_id (!isExisting) then create patient
 *    set <h2>Message to "Prior to scheduling an appointment, we need to know more about you."
 *    
 *    
 *  
 *  once the patient is created then proceed to destination. (which is probably appointment/service id)
 */

  return (
    <div className="profile">
      <h2>Profile page</h2>
    </div>
  )
};

export default ProfilePage;