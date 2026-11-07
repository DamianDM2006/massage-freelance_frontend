import { useState } from "react";
import { useParams } from "react-router";
import { usePath } from "../assets/PathContext";

const AppointmentsPage = () => {
  const { id } = useParams();
  const { destination, isExisting } = usePath();
  console.log(`location.pathname:`, location.pathname, `destination;`, destination);
  console.log(`Appointments Page. id:`, id);

  return (
    <div className="Appts">
      <h2>Appointments page: {id}</h2>
      <p>Used for SCHEDULING appointments. Profile page will be used for VIEWING appointments.</p>
    </div>
  )
};

export default AppointmentsPage;