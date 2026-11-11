import { BASE_URL } from "./index.js";

export const getServices = async () => {
  try {
    const response = await fetch(BASE_URL + '/services');
    const services = await response.json();
    return services
  } catch(err) {
    console.log(err)
  }
};

export const getServiceDetails = async (id) => {
  try {
    const response = await fetch(BASE_URL + '/services/' + id);
    const service = await response.json();
    return service
  } catch(err) {
    console.log(err)
  }
};