import { useState, useEffect } from "react";
import { Link, useNavigate, useParams, NavLink } from "react-router";
import { useAuth } from "../authentications/AuthContext.jsx";
import { usePath } from "../assets/PathContext.jsx";
import { getServices } from "../api/services.js";
import { getClientData } from "../api/clients.js";


const HomePage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [client, setClient] = useState({});
  const [service, setService] = useState({});
  const { clientId, patientId } = useParams();
  const { token } = useAuth();
  const { setIsExisting, destination, setDestination } = usePath();

  const syncServices = async() => {
    try {
      const data = await getServices();
      setServices(data);
    } catch(err) {
      console.log(`ERROR:`,err)
    }
  };
  
  useEffect(() => {syncServices()}, []);
  
  if (!services) {return (
    <div className="home">
      <h3>Waiting for the server to respond. LOADING. . .</h3>
    </div>
  )}; 

  const ServicesList = ({ services }) => {
      return (
        <>
          <span >
            <h3 className="margNoTB"> Current Available Services</h3>
            <p className="margNoTB"><small>Select the title to learn more</small></p>
          </span>
          <ul className="servList">
            {services.map((service) => (<ServiceLI key={service.id} svc={service} />))}
          </ul>
        </>
      )
  };

  const ServiceLI = ({ svc }) => {
    return (
      <li>
        <nav>
          <NavLink to={clientId ? "/home/" + clientId + "/service/" + svc.id : "/service/" + svc.id}>
            <h4>{svc.title}</h4>
          </NavLink>
        </nav>
          <button onClick={() => goToWhere(svc)}>
            <strong>Schedule Appointment</strong>
            <small>for this service</small>
          </button>
      </li>
    )
  };

  const syncClient = async() => {
    if (!token) {
      return
    } else {
      try {
        const clientData = await getClientData(token);
        if (clientData.patient_id !== null) setIsExisting(true);
        setClient(clientData);
        navigate("/home/" + clientData.id);
      } catch(err) {
        console.log(`ERROR:`, err);
      }
    };
  };

  useEffect(() => {syncClient()}, []);

  const goToWhere = (svc) => {
    setService(svc);
    if (service && service.id && !destination) {
      setDestination(`/home/${clientId}/service/${service.id}/patient/${patientId}/appointments`);
      navigate(`/home/${clientId}/service/${service.id}/profile`);
    };
    if (!token && destination) {
          navigate("/login");
    };
    if (service && service.id && destination) {
      console.log(`service & destination`);
      const patid = destination.split("/")[6];
      const svcid = destination.split("/")[4];
      if (Number(svcid) === service.id && patid === "undefined") {
        //(`EDGE CASE: NO PATIENT, but service id's match. I can navigate to profile page.`);
        navigate(`/home/${clientId}/service/${service.id}/profile`);
      };
      if (Number(svcid) !== service.id && patid === "undefined") {
        //("EDGE CASE: changing service type.")
        setDestination(`/home/${clientId}/service/${service.id}/patient/${patientId}/appointments`);
        navigate(`/home/${clientId}/service/${service.id}/profile`);
      };
      if (Number(svcid) === service.id && patid !== "undefined") {
        navigate(destination);
      };
      if (svcid === "undefined" && patid !== "undefined") {
        setDestination(`/home/${clientId}/service/${service.id}/patient/${patid}/appointments`)
        navigate(`/home/${clientId}/service/${service.id}/patient/${patid}/appointments`);
      };
    };
  };

  useEffect(() => {goToWhere()}, [service, destination]);

  /**
   * <ServicesList >
   *  will eventually include
   *    cost:
   *    duration:
   */

  return (
    <div className="home">
      <div className="welcome">
        <h2>Welcome{client.id ? `.  You are signed in under: ${client.user_name}.` : ` to our Home Page.`}</h2>
        <p>
          This is the part where we tell you a little bit about ourselves. We hope you are impressed.
        </p>
      </div>
      <ServicesList services={services} />
    </div>
  )
};

export default HomePage;