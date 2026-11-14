import { useState } from "react";
import { usePath } from "../../assets/PathContext.jsx";
import { useNavigate, useParams, NavLink } from "react-router";

const SetApptPatient = (id) => {
  const { destination } = usePath();
  const { clientId, serviceId } = useParams();
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
    
    return (
      <nav>
        <NavLink to={`/home/${clientId}`}>
          Please choose a service you would like to schedule an appointment for.
        </NavLink>
      </nav>
    )
  };

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