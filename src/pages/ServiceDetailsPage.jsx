import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../authentications/AuthContext.jsx";
import { usePath } from "../assets/PathContext.jsx";
import { getServiceDetails } from "../api/services.js";

const ServiceDetailsPage = () => {
  const { serviceId, clientId, patientId } = useParams();
  const [service, setService] = useState({});
  const { token } = useAuth();
  const { setDestination } = usePath();
  const navigate = useNavigate();

  useEffect(() => {
    const syncService = async() => {
      const detail = await getServiceDetails(serviceId);
      setService(detail);
    };
    syncService();
  }, [serviceId]);

  const goToWhere = () => {
    setDestination(`/home/${clientId}/service/${serviceId}/patient/${patientId}/appointments`);
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/home/${clientId}/service/${serviceId}/profile`);
    };
  };

  return (
    <div className="serveDetails">
      <h2>{service.title}</h2>
      <p><strong>{service.description}</strong></p>
          <button
            className="credsBtn"
            onClick={() => {goToWhere()}}>
              <strong>Schedule an Appointment</strong> <small>for this service</small>
          </button>
          <button
            className="credsSmBtn"
            onClick={() => navigate(-1)}>
            "back"
          </button>
    </div>
  )
};

export default ServiceDetailsPage;