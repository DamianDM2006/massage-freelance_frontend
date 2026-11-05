import PatientDetails from "./PatientDetails.jsx";

const ClientDetails = (clientData) => {
  const { client } = clientData;
  console.log(`ClientDetails client:`, client);

  const ClientInfo = () => {
    return (
      <>
        <p>
          Signed in as:
          <strong>
            {`  ${client.user_name}`}
          </strong>
        </p>
        <PatientDetails id={client.patient_id}/>
      </>
    )
  };

  return (
    <div className="client">
      <h3>Client Details</h3>
      <ClientInfo />
    </div>
  )
};

export default ClientDetails;