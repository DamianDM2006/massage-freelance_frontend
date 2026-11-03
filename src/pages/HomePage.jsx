import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../authentications/AuthContext.jsx";
import { usePath } from "../assets/PathContext.jsx";
import { getServices } from "../api/services.js";
import { getClientData } from "../api/clients.js";

const HomePage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const { token } = useAuth();
  const {
    isExisting,
    setIsExisting,
    setDestination,
    location,
    setLocation
  } = usePath();

  const syncServices = async() => {
    try {
      const data = await getServices();
      setServices(data);
    } catch(err) {
      console.log(`ERROR:`,err)
    }
  };
  
  useEffect(() => {syncServices();}, []);
  
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
        <span>
          <Link to={"/home/" + service.id}>
            <h4>{service.title}</h4>
          </Link>
        </span>
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
      console.log(`client:`, clientData);
    } catch(err) {
      console.log(`ERROR:`, err);
    }
  };

  console.log(`isExisting:`, isExisting);

  useEffect(() => {syncClient()}, []);

  const goToWhere = (id) => {
    console.log(`isExisting:`, isExisting);
    console.log(`id passed in:`, id);
    if (isExisting) {
      setDestination("/appointments/" + id);
      navigate("/appointments/" + id);
    };

    if (!isExisting && token) {
      setDestination("/appointments/" + id);
      navigate("/appointments/" + id);
    } else {
      setDestination("/appointments/" + id);
      navigate("/login")
    }
  };

  console.log(`location:`, location);

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
        <h2>Home page: Welcome</h2>
        <p>
          This is the part where we tell you a little bit about ourselves. We hope you are impressed.
        </p>
      </div>
      <ServicesList services={services} />
    </div>
  )
};

export default HomePage;