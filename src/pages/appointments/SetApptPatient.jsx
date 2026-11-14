import { useState } from "react";
import { usePath } from "../../assets/PathContext.jsx";
import { useNavigate, useParams, NavLink } from "react-router";

const SetApptPatient = (id) => {
  const { destination, setDestination } = usePath();
  const { clientId, serviceId, patientId } = useParams();
  const navigate = useNavigate();
  const [choseSvc, setChoseSvc] = useState(true);

  console.log(`destineation:`, destination);

  const requestAppt = () => {
    console.log(`destination.split:`, destination?.split("/")[4])

    setDestination(`/home/${clientId}/service/undefined/patient/${id.id}`);
    
    if (destination && destination.split("/")[4]) {
      setChoseSvc(true);
      navigate(`/home/${clientId}/service/${serviceId}/patient/${id.id}/appointments`);
    } else {
      setChoseSvc(false);
    }
  };

  const NoSvcChosen = () => {
    console.log(`destination:`, destination);
      // setDestination(`/home/${clientId}/service/${serviceId}/patient/${id.id}/appointments`);
  // HERE!!!  needs to reset the destination to incorporate clientId AND patientId 
  // in HOME page to where function: if destination has clientId, serviceId, & patiendId then DO NOT go back to patient details.
    // instead.... navigate to appointment forms from the HOME page. 
    return (
      <nav>
        <NavLink to={`/home/${clientId}`}>
          Please choose a service you would like to schedule an appointment for.
        </NavLink>
      </nav>
    )
  };

  // console.log(`destination & id:`, destination, id.id);

  return (
    <nav>
      <button className="credsThin"
        onClick={() => requestAppt()}>
        Schedule an appointment.
      </button>
      {!choseSvc && <NoSvcChosen />}
    </nav>
  )
};

export default SetApptPatient;