import { usePath } from "../assets/PathContext";
import { NavLink, useParams } from "react-router";

const ContinueTo = () => {
  const { destination, isExisting } = usePath();
  const { clientId, serviceId } = useParams;
  console.log(`parameters:`, clientId, serviceId);
  console.log(`destination:`, destination);
  console.log(`isExisting:`, isExisting);
  console.log(`current location:`, location.pathname);

  if (isExisting === false) {
    return (
      <div className="login">
        <h3>Success! You are now logged in.</h3>
          <p>
            <strong>
            In order to continue, we need to learn a little more about you.
            </strong>{`  `}We would now like to direct you to your profile area in order to complete setting up your account.
          </p>
        <nav>
          <NavLink to={"/home/" + clientId + "/service/" + serviceId + "/profile"} className="cont">
            <button className="credsBtn">Continue to your profile page.</button>
          </NavLink>
          <NavLink to={"/home/" + clientId} className="cont">
            <button className="credsSmBtn">Return to Home page.</button>
          </NavLink>
        </nav>
      </div>
    )
  };

  if (isExisting === true) {
    return (
      <nav className="login">
        <h3>Success! You are now logged in.</h3>
        <NavLink
          className="cont"
          to="/home/${clientId}/service/${serviceId}/profile">
          <button className="credsBtn">
            Continue to {destination ? destination : "Profile"}
          </button>
        </NavLink>
        <NavLink to="/home" className="cont">
          <button className="credsSmBtn">Return to Home page.</button>
        </NavLink>
      </nav>
  )
  };

};

// export default ContinueTo;