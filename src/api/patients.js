import { BASE_URL } from "./index.js";

export const getPatients = async(token) => {
  const response = await fetch(BASE_URL + "/patients", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
  const contentType = response.headers.get('content-type');

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

export const getPatient = async(id, token) =>{
  const response = await fetch(BASE_URL + "/patients/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
  const contentType = response.headers.get('content-type');

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

export const createPatient = async(formData, token) =>{
  const response = await fetch(BASE_URL + "/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(formData)
  });
  const contentType = response.headers.get('content-type');

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