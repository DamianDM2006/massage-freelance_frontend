import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "./AuthContext.jsx";
import { usePath } from "../assets/PathContext.jsx";
import { getClientData } from "../api/clients.js";

const LoginPage = () => {
  const { destination, isExisting, setIsExisting } = usePath();
  const { login, logout, token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const tryLogin = async(formData) => {
    const userName = formData.get("userName");
    const password = formData.get("password");
    
    try {
      await login({ userName, password });
        if(!destination) {navigate("/home")}
        else {navigate("/continue")};
    } catch(err) {
      setError(err);
      console.log(err)
    };
  };

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
        {error && <p>{`Ooops!  ${error.message}`}</p>}
      </form>
      <nav>
        <p>If you do not have an account, Please select the link to create one.</p>
        <Link to={"/register"}>
          <h4>Register</h4>
        </Link>
      </nav>
    </div>
  )
};

export default LoginPage;