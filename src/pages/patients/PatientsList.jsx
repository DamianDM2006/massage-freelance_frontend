import { useState } from "react";
import { NavLink } from "react-router";
import { useAuth } from "../../authentications/AuthContext.jsx";

const PatientsList = (ptData) => {
  const { patients } = ptData;

  const PatientsLi = () => {
    return patients.map((pt) => {
      return (
        <li key={pt.id}>
          <span>Goes by:<strong>{`  ${pt.nickname}`}</strong></span>
            {/* <form action={setPatient(pt)}> */}
              <NavLink to={"/patient/" + pt.id}>
                <p><strong>{`${pt.last_name}, ${pt.first_name}  `}</strong>
                  Born:<strong>{`  ${pt.birthdate.split("T")[0]}`}</strong>
                </p>
              </NavLink>
            {/* </form> */}
        </li>
      )
    });
  };

  return (
    <>
      <ul>
        <PatientsLi/>
      </ul>
    </>
  )
};

export default PatientsList;