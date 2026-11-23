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

  const HomeLink = () => {
    if (token) {
      return (
        <button type="submit" className="navbttn"
          onClick={() => navigate(`/home/${clientId}`)}>
          Home
        </button>
      )
    } else {
      return (
          <button type="submit" className="navbttn"
            onClick={() => execute()}>
            HOME
          </button>
      )
    }
  };

  const execute = () => {
    logout();
    setDestination(null);
    navigate("/home");
    window.location.reload();
  };

  const toLogin = () => {
    navigate("/login");
    window.location.reload();
  };
  
  const LogLink = () => {
    if(token !== null) {
      return (
          <button type="submit" className="navbttn"
            onClick={() => execute()}>
            Logout
          </button>
    )
    } else {
      return (
          <button type="submit" className="navbttn"
            onClick={() => toLogin()}>
            Login
          </button>
      )
    };
  };

  const ProfileLink = () => {
    if (token) {
        return (
        <NavLink to={`/home/${clientId}/service/${serviceId}/profile`}>
          <span>Profile</span>
        </NavLink>
      )
    } 
  };

  return (
    <nav className="menu">
      <HomeLink />
      <LogLink />
      <ProfileLink />
    </nav>
  )
};

export default NavBar;