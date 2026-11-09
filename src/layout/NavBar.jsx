/**
 * two types of navigation bar displays to be used by layout
 * 1. standard screen: entire menu displayed all the time
 * 2. mobile screen w/ drop down type menu
 */
import { NavLink, useNavigate, useParams } from "react-router";
import { useAuth } from "../authentications/AuthContext.jsx";
import { usePath } from "../assets/PathContext.jsx";

const NavBar = () => {
  const { logout, token } = useAuth();
  const { setDestination } = usePath();
  const { clientId, serviceId,} = useParams();
  const navigate = useNavigate();

  const excecute = () => {
    logout();
    setDestination(null);
    navigate("/home");
  };
  
  const LogLink = () => {
    if(token !== null) {
      return (
        <form action={excecute}>
          <button type="submit">Logout</button>
        </form>
    )
    } else {
      return ( <NavLink to="/login">Login</NavLink>)
    };
  };

  const ProfileLink = () => {
    // setDestination(`/home/${clientId ? clientId : ":"}/service/${serviceId ? serviceId : ":"}/profile`);
    return (
      <NavLink to={`/home/${clientId}/service/${serviceId}/profile`}>
      {/* // <Link to="profile"> */}
        Profile
      </NavLink>
    )
  };

  return (
    <nav className="menu">
      <NavLink to="/home">Home</NavLink>
      <LogLink />
      <ProfileLink />
    </nav>
  )
};

export default NavBar;