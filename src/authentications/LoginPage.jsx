import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "./AuthContext.jsx";
import { usePath } from "../assets/PathContext.jsx";

const LoginPage = () => {
  const { destination } = usePath();
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const tryLogin = async(formData) => {
    const userName = formData.get("userName");
    const password = formData.get("password");

    try {
      await login({ userName, password });
    } catch(err) {
      setError(err);
      console.log(err)
    };
  };  

  const MovingOn = () => {
    console.log(`error in MovingOn:`, error);
    if (error !== null) return (<p>{`Ooops!  ${error.message}`}</p>);
    console.log(`no error. Destination:`, destination);
    if (!destination) navigate("/home");
    navigate(destination)
    };

  console.log(`destination:`, destination);

  return (
    <div className="login">
      <h2>Login to Full Moon Massage.</h2>
      <form className="credsForm" action={tryLogin}>
        <label className="credsLabl">
          Username:{" "}
          <input type="text" name="userName" maxLength="30" size="30"/>
        </label>
        <label className="credsLabl">
          Password:{"  "}
          <input
            type="text"
            name="password"
            maxLength="30"
            size="30"
            minLength="6"
            placeholder="6 character minimum"
          />
        </label>
        <button className="credsBtn">
          Login
        </button>
      </form>
      <nav>
        <p>If you do not have an account, Please select the link to create one.</p>
        <Link to={"/register"}>
          <h4>Register</h4>
        </Link>
      </nav>
      <MovingOn/>
    </div>
  )
};

export default LoginPage;