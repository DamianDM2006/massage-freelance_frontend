import { useState, useEffect } from "react";
import { useAuth } from "../../authentications/AuthContext.jsx";
import { getClientAddresses } from "../../api/clients.js";

const ClientAddresses = () =>{
  const { token } = useAuth();
  const [clAddresses, setClAddresses] = useState([]);

  const syncClAddresses = async() => {
    const addressesData = await getClientAddresses(token);
    setClAddresses(addressesData);
  };

  useEffect(() => {syncClAddresses()}, []);


  console.log(`clAddresses:`, clAddresses);

  return (
    <>
      <p>client addresses</p>
    </>
  );

};

export default ClientAddresses;