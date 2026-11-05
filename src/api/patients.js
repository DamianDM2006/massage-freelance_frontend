import { BASE_URL } from "./index.js";

export const getPatients = async(token) => {
  const response = await fetch(BASE_URL + "/patients", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
  const patients = await response.json();
  return patients;
};

export const getPatient = async(id, token) =>{
  const response = await fetch(BASE_URL + "/patients/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
  const patient = await response.json();
  return patient;
};