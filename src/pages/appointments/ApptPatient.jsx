import { NavLink,useParams } from "react-router";

export const ApptsList = (appointments) => {
  const { appts, ptid } = appointments;
  const { clientId, serviceId } = useParams();

  const ListItem = ({ appt }) => {
    const splitDate = appt.date.split("T")[0];
    const sliceStart = appt.start_time.slice(0, 5);
    
    return (
      <nav>
        <NavLink to={`/home/${appt.client_id}/service/${appt.service_id}/patient/${appt.patient_id}/appointments/${appt.appt_id}`}>
          <p>{`${splitDate} Beginning ${sliceStart}`}</p>
        </NavLink>
      </nav>
    )
  };

  if (typeof appts !== "object") {
    return (
      <NavLink to={`/home/${clientId}/service/${serviceId}/patient/${ptid.id}/appointments/0`}>
        <p>{appts}</p>
      </NavLink>
    )
  } else {
    return (
      <section>
        <h4>Upcoming Appointments</h4>
        <ol>
          {appts.map((appt) => (<ListItem key={appt.appt_id} appt={appt} />))}
        </ol>
      </section>
    )
  }
};

