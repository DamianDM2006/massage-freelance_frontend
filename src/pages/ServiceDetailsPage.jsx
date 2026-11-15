import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../authentications/AuthContext.jsx";
import { usePath } from "../assets/PathContext.jsx";
import { getServiceDetails } from "../api/services.js";

const ServiceDetailsPage = () => {
  const { clientId, serviceId, patientId } = useParams();
  const [service, setService] = useState({});
  const { token } = useAuth();
  const { destination, setDestination } = usePath();
  const navigate = useNavigate();

  useEffect(() => {
    const syncService = async() => {
      const detail = await getServiceDetails(serviceId);
      setService(detail);
    };
    syncService();
  }, [serviceId]);

  const goToWhere = () => {
    if (!destination) {
        setDestination(`/home/${clientId}/service/${serviceId}/patient/${patientId}/appointments`);
        navigate(`/home/${clientId}/service/${serviceId}/profile`);
    };
    if (!token) {
      navigate("/login");
    };
    if (destination) {
      const patid = destination.split("/")[6];
      const svcid = destination.split("/")[4];
      if (svcid === serviceId && patid === "undefined") {
        //(`NO PATIENT, but service id's match. I can navigate to profile page.`);
        navigate(`/home/${clientId}/service/${service.id}/profile`);
      };
      if (svcid === serviceId && patid !== "undefined") {
        navigate(destination);
      };
      if (svcid === "undefined" && patid !== "undefined") {
        setDestination(`/home/${clientId}/service/${service.id}/patient/${patid}/appointments`)
        navigate(`/home/${clientId}/service/${service.id}/patient/${patid}/appointments`);
      }
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