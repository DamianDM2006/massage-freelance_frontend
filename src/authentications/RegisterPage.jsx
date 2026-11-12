import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../authentications/AuthContext.jsx";
import { usePath } from "../assets/PathContext.jsx";

const RegisterPage = () => {
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { destination } = usePath();
  const { clientId } = useParams();

  const tryRegister = async(formData) => {
    const userName = formData.get("userName");
    const password = formData.get("password");

    try {
      await register({ userName, password });
        if(!destination) {
          navigate(`/home/${clientId}`);
        } else {
          const svc = destination.split("/")[4];
          navigate(`/home/${clientId}/service/${svc}/profile`)
        };
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