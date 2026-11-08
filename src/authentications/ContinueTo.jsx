import { usePath } from "../assets/PathContext";
import { NavLink } from "react-router";

const ContinueTo = () => {
  const { destination, isExisting } = usePath();
  console.log(`continue. destination:`, destination);
  console.log(`continue. isExisting:`, isExisting);

  if (isExisting === false) {
    return (
      <div className="login">
        <h3>Success! You are now logged in.</h3>
          <p>
            <strong>
            In order to continue, we need to learn a little more about you.
            </strong>{`  `}We would now like to direct you to your profile area in order to complete setting up your account.
          </p>
        <NavLink to="/profile" className="cont">
          <button className="credsBtn">Continue to your profile page.</button>
        </NavLink>
        <NavLink to="/home" className="cont">
          <button className="credsSmBtn">Return to Home page.</button>
        </NavLink>
      </div>
    )
  };

  if (isExisting === true) {
    return (
      <div className="login">
        <h3>Success! You are now logged in.</h3>
        <NavLink to={ destination ? destination : "/profile" } className="cont">
          <button className="credsBtn">
            Continue to {destination ? destination : "Profile"}
          </button>
        </NavLink>
        <NavLink to="/home" className="cont">
          <button className="credsSmBtn">Return to Home page.</button>
        </NavLink>
      </div>
  )
  };

};

export default ContinueTo;