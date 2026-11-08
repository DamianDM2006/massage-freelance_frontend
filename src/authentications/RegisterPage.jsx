import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../authentications/AuthContext.jsx";
import { usePath } from "../assets/PathContext.jsx";

const RegisterPage = () => {
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const { destination, isExisting } = usePath();
  const navigate = useNavigate();
  const [client, setClient] = useState({});

  const tryRegister = async(formData) => {
    const userName = formData.get("userName");
    const password = formData.get("password");

    try {
      await register({ userName, password });
      navigate("/continue");
    } catch(err) {
      setError(err);
      console.log(err);
    }
  };

  return (
    <div className="login">
      <h2>Register page</h2>
      <form className="credsForm" action={tryRegister}>
        <label className="credsLabl">
          Username:{" "}
          <input
            type="text"
            name="userName"
            maxLength="30"
            size="30"
            required/>
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
            required
          />
        </label>
        <button className="credsBtn">
          Register
        </button>
        {error && <p>{`Ooops!  ${error.message}`}</p>}
      </form>
    </div>
  )
};

export default RegisterPage;