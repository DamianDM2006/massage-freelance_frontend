import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../authentications/AuthContext.jsx";
import { usePath } from "../assets/PathContext.jsx";
import { getServiceDetails } from "../api/services.js";

const ServiceDetailsPage = () => {
  const { serviceId, clientId, patientId } = useParams();
  const [service, setService] = useState({});
  const { token } = useAuth();
  const { destination, setDestination, isExisting } = usePath();
  const navigate = useNavigate();

  useEffect(() => {
    const syncService = async() => {
      const detail = await getServiceDetails(serviceId);
      setService(detail);
    };
    syncService();
  }, [serviceId]);

  const goToWhere = () => {
    setDestination(`/home/${clientId ? clientId : ":"}/service/${serviceId}/patient/${patientId ? patientId : ":"}/appointments`);
    if (isExisting) {
      navigate(location.pathname + "/profile");
    };

    if (!isExisting && token) {
      navigate("/continue");
    };

    if (!token) {
      navigate("/login");
    }
  };

  console.log(`current location:`, location.pathname);

  return (
    <div className="serveDetails">
      <h2>{service.title}</h2>
      <p><strong>{service.description}</strong></p>
          <button
            className="credsBtn"
            onClick={() => {goToWhere()}}>
              <strong>Schedule an Appointment</strong> <small>for this service</small>
          </button>
          <h3>Needs a "back" button.</h3>
    </div>
  )
};

export default ServiceDetailsPage;