import { useParams } from "react-router";
// import { usePath } from "../assets/PathContext";

const AppointmentsPage = () => {
  const { id } = useParams();
  // const { location, setLocation, destination } = usePath();
  // const newLocation = destination;
  // console.log(`newLocation:`, newLocation);
  // setLocation(newLocation);
  console.log(`location:`, location);
  console.log(`Appointments Page. id:`, id);

  return (
    <div className="Appts">
      <h2>Appointments page: {id}</h2>
      <p>Used for SCHEDULING appointments. Profile page will be used for VIEWING appointments.</p>
    </div>
  )
};

export default AppointmentsPage;