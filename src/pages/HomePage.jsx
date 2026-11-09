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
  const { token } = useAuth();
  const { clientId, serviceId, patientId } = useParams();
  const {
    isExisting,
    setIsExisting,
    setDestination,
    destination,
  } = usePath();

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
            {services.map((service) => (<ServiceLI key={service.id} service={service} />))}
          </ul>
        </>
      )
  };

  const ServiceLI = ({ service }) => {
    return (
      <li>
        <nav>
          <NavLink to={clientId ? "/home/" + clientId + "/service/" + service.id : "/service/" + service.id}>
            <h4>{service.title}</h4>
          </NavLink>
        </nav>
          <button onClick={() => goToWhere(service.id)}>
            <strong>Schedule Appointment</strong>
            <small>for this service</small>
          </button>
      </li>
    )
  };

  const syncClient = async() => {
    try {
      const clientData = await getClientData(token);
      if (clientData.patient_id !== null) setIsExisting(true);
      setClient(clientData);
      navigate("/home/" + clientData.id);
    } catch(err) {
      console.log(`ERROR:`, err);
    }
  };

  useEffect(() => {syncClient()}, []);

  const goToWhere = (whichSvc) => {
    // setDestination("/home/" + (clientId ? clientId : ":") + "/service/" + whichSvc + "/patient/" + (patientId ? patientId : ":") + "/appointments");
    if (!token) {
      navigate("/login");
    }
    
    if (isExisting) {
      navigate("/home/" + clientId + "/service/" + whichSvc + "/profile");
    };
    
    if (!isExisting && token) {
      navigate("/continue");
    };
  };

  // console.log(`client:`, client);
  // console.log(`isExisting:`, isExisting);
  // console.log(`destination:`, destination);
  // console.log(`current location:`, location.pathname);
  
  /**
   * <ServicesList >
   *  will include title: and description (as <ListDetails />  ????)
   *  will eventually include
   *    cost:
   *    duration:
   *  <MakeAppt /> will take the user to the LoginPage or the AppointmentsPage
   */

  return (
    <div className="home">
      <div className="welcome">
        <h2>Welcome{client.id ? `.  Your are signed in as: ${client.user_name}.` : ` to our Home Page.`}</h2>
        <p>
          This is the part where we tell you a little bit about ourselves. We hope you are impressed.
        </p>
      </div>
      <ServicesList services={services} />
    </div>
  )
};

export default HomePage;