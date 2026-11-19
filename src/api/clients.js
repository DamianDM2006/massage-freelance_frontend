import { BASE_URL } from "./index.js";

export const getClientData = async (token) => {    
  const response = await fetch(BASE_URL + "/clients", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
  const contentType = response.headers.get('Content-Type');

  if (contentType && contentType.includes('application/json')) {
    const jsonResult = await response.json();
    if (!response.ok) throw new Error(`status ${response.status}: ${response.statusText}!! ${jsonResult.message}`);
    return jsonResult;
  } else {
    const textResult = await response.text();
    if (!response.ok) throw new Error(`staus ${response.status}: ${response.statusText}!! ${textResult}`);
    return textResult;
  };
};

export const getClientAddresses = async(token) => {
  const response = await fetch(BASE_URL + "/addresses", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    const jsonResult = await response.json();
    if (!response.ok) throw new Error(`${response.status}: ${response.statusText}!! ${jsonResult.message}`);
    return jsonResult;
  } else {
    const textResult = await response.text();
    if (!response.ok) throw new Error(`${response.status}: ${response.statusText}!! ${textResult}`);
    return textResult;
  };
};