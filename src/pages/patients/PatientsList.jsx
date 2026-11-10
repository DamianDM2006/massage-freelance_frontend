import { useState } from "react";
import { NavLink, useParams } from "react-router";
import { useAuth } from "../../authentications/AuthContext.jsx";

import SetApptPatient from "../appointments/SetApptPatient.jsx";

const PatientsList = (ptData) => {
  const { patients } = ptData;
  const { clientId, serviceId } = useParams();
  const [patient, setPatient] = useState({});

  const PatientsLi = () => {
    return patients.map((pt) => {
      return (
        <li key={pt.id}>
          <span>Goes by:<strong>{`  ${pt.nickname}`}</strong></span>
            <nav>
              <NavLink to={`/home/${clientId}/service/${serviceId}/patient/${pt.id}`}>
                <p><strong>{`${pt.last_name}, ${pt.first_name}  `}</strong>
                  Born:<strong>{`  ${pt.birthdate.split("T")[0]}`}</strong>
                </p>
              </NavLink>
{/** This button will be imported as it's own element: Patient Details & PatientList will use it.
 * className will be defined on each page because the size of the button varies by page.
 * let's call it <SetApptPatient />
 */}              
              <SetApptPatient id={pt.id}/>
            </nav>
        </li>
      )
    });
  };

  return (
    <>
      <ul>
        <PatientsLi />
      </ul>
    </>
  )
};

export default PatientsList;