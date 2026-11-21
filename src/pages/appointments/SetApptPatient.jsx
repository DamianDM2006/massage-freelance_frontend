import { usePath } from "../../assets/PathContext.jsx";
import { useNavigate, useParams, NavLink } from "react-router";

const SetApptPatient = (id) => {
  const { destination, setDestination } = usePath();
  const { clientId, serviceId, patientId } = useParams();
  const navigate = useNavigate();

  const goToHome = () => {
    setDestination(`/home/${clientId}/service/${serviceId}/patient/${id.id}/appointments`);
    navigate(`/home/${clientId}`);
  };

  const RequestAppt = () => {
    if (destination && destination.split("/")[4] !== "undefined") {
      return (
        <>
          <button className="credsThin"
            onClick={() => navigate(`/home/${clientId}/service/${serviceId}/patient/${id.id}/appointments`)}>
            Schedule the appointment for this patient.
          </button>
        </>
      )
    } else {
      return (
        <>
          <button className="credsThin"
            onClick={() => goToHome()}>
            Choose a service to schedule an appointment.
          </button>
        </>
      )
    }
  };

  const NoSvcChosen = () => {
    console.log(`destination:`, destination);
    return (
      <nav>
        <NavLink to={`/home/${clientId}`}>
          Please choose a service you would like to schedule an appointment for.
        </NavLink>
      </nav>
    )
  };

  return (
    <nav id="navappt">
      <RequestAppt />
    </nav>
  )
};

export default SetApptPatient;