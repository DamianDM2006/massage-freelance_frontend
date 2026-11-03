import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../authentications/AuthContext.jsx";
import { usePath } from "../assets/PathContext.jsx";
// import { Errors } from "../assets/Errors.jsx";

const RegisterPage = () => {
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const { destination } = usePath();
  const navigate = useNavigate();

  const tryRegister = async(formData) => {
    const userName = formData.get("userName");
    const password = formData.get("password");

    try {
      await register({ userName, password });
    } catch(err) {
      setError(err);
      console.log(err);
    }
  };

  console.log(`home error:`, error);

  return (
    <div className="login">
      <h2>Register page</h2>
      <form className="credsForm" action={tryRegister}>
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
          Register
        </button>
      </form>
      <p>{error ? `Ooops!! ${error.message}` : ""}</p>
      {/* <Errors error={error}/> */}
    </div>
  )
};

export default RegisterPage;