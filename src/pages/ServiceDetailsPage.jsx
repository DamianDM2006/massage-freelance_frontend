import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../authentications/AuthContext.jsx";
import { usePath } from "../assets/PathContext.jsx";
import { getServiceDetails } from "../api/services.js";

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const [service, setService] = useState({});
  const { token } = useAuth();
  const { destination, setDestination, isExisting } = usePath();
  const navigate = useNavigate();

  useEffect(() => {
    const syncService = async() => {
      const detail = await getServiceDetails(id);
      setService(detail);
    };
    syncService();
  }, [id]);

  const goToWhere = () => {
    setDestination("/appointments/" + id);
    if (isExisting) {
      navigate("/appointments/" + id);
    };

    if (!isExisting && token) {
      navigate("/continue");
    };

    if (!destination && !token) {
      navigate("/login");
    }
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
    </div>
  )
};

export default ServiceDetailsPage;