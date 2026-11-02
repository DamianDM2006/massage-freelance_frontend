import { BASE_URL } from "./index.js";

export const getClientData = async (token) => {    
    const response = await fetch(BASE_URL + "/clients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    });
    const client = await response.json();
    return client;
};