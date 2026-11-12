import { NavLink, useParams } from "react-router";

import SetApptPatient from "../appointments/SetApptPatient.jsx";
import DisplayPatientAppt from "../appointments/DisplayPatientAppt.jsx";

const PatientsList = (ptData) => {
  const { patients } = ptData;
  const { clientId, serviceId } = useParams();

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
              <SetApptPatient id={pt.id}/>
              {pt.id && <DisplayPatientAppt id={pt.id}/>}
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