import DisplayClient from "./DisplayClient.jsx";

const ClientDetails = (clientData) => {
  const { client } = clientData;

  const ClientInfo = () => {
    return (
      <>
        <p>
          Signed in under user name:
          <strong>
            {`  ${client.user_name}`}
          </strong>
        </p>
        {client.patient_id &&<DisplayClient id={client.patient_id}/>}
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