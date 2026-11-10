import { useState } from "react";
import { usePath } from "../../assets/PathContext.jsx";
import { useNavigate, useParams, NavLink } from "react-router";

const SetApptPatient = (id) => {
  const { destination } = usePath();
  const { clientId, serviceId, patientId } = useParams();
  const navigate = useNavigate();
  const [choseSvc, setChoseSvc] = useState(true);

  const requestAppt = () => {
    if (destination && destination.split("/")[4]) {
      setChoseSvc(true);
      navigate(`/home/${clientId}/service/${serviceId}/patient/${id.id}/appointments`);
    } else {
      setChoseSvc(false);
    };
  };

  const NoSvcChosen = () => {
    console.log(`noSvcChosen. Please choose a service you'd like to schedule.`);
    return (
      <nav>
        <NavLink to={`/home/${clientId}`}>
          Please choose a service you would like to schedule an appointment for.
        </NavLink>
      </nav>
    )
  };
  /**
   * if !destination: display services list
   *   it would be nice to have a drop down selection
  *      but, I think the existing list will work. I'll see.
   */

  console.log(`destination:`, destination);
  return (
    <nav>
      <button onClick={() => requestAppt()}>
        SetApptPatient
      </button>
      {!choseSvc && <NoSvcChosen />}
    </nav>
  )
};

export default SetApptPatient;