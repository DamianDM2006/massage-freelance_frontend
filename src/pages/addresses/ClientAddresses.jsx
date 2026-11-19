import { useState, useEffect } from "react";
import { useAuth } from "../../authentications/AuthContext.jsx";
import { getClientAddresses } from "../../api/clients.js";

const ClientAddresses = ({ clAddData, selectedAddId }) =>{
  const { token } = useAuth();
  const [clAddresses, setClAddresses] = useState([]);

  const syncClAddresses = async() => {
    const addressesData = await getClientAddresses(token);
    clAddData(addressesData);
    setClAddresses(addressesData);
  };

  useEffect(() => {syncClAddresses()}, []);

  const sendSelectedId = (formData) => {
    const selectedAddressId = formData.get("address");
    selectedAddId(selectedAddressId);
  };

  if (clAddresses.length < 2) {
    return
  } else {
    return (
      <>
        <p>You may be able to choose an <u>available</u> address.</p>
        <form
          action={sendSelectedId}
          id="addressch">
          <label
            htmlFor="select-address"><span>Which Address</span>
          </label>
          <select name="address" id="address-select">
            <option value="">Select an Address</option>
          {
            clAddresses.map((clAddress) => {
              return (
                <option
                  key={clAddress.id}
                  value={clAddress.id}>
                  <h5>{clAddress.street_number_1}</h5>
                </option>
              )})
          }
          </select>
          <button className="credsThin">
            Select this address.
          </button>
        </form>
      </>
    );
  };
};

export default ClientAddresses;