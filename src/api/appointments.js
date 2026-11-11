import { BASE_URL } from "./index.js";

export const getAvailability = async(patId, request, token) => {
  const response = await fetch(BASE_URL + "/appointments/" + patId + "/appointment",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(request)
  });
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    const jsonResult = await response.json();
    if (!response.ok) throw new Error(`status ${response.status}: ${response.statusText}!! ${jsonResult.message}`);
    return jsonResult;
  } else {
    const textResult = await response.text();
    if (!response.ok) throw new Error(`status ${response.status}: ${response.statusText}!! ${textResult}`);
    return textResult;
  }
};

export const scheduleAppt = async(patId, reqBody, token) => {
  const response = await fetch(BASE_URL + "/appointments/" + patId + "/appointment/set", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(reqBody)
  });
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    const jsonResult = await response.json();
    if (!response.ok) throw new Error(`status ${response.status}: ${response.statusText}!! ${jsonResult.message}`);
    return jsonResult;
  } else {
    const textResult = await response.text();
    if (!response.ok) throw new Error(`status ${response.status}: ${response.statusText}!! ${textResult}`);
    return textResult;
  }
};

export const getPatientAppts = async(patId, token) => {
  const response = await fetch(BASE_URL + "/appointments/" + patId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
  const contentType = response.headers.get('content-type')
  // console.log(`response:`, response);

  if (contentType && contentType.includes('application/json')) {
    const jsonResult = await  response.json();
    if (!response.ok) throw new Error(`status ${response.status}: ${response.statusText}!! ${jsonResult.message}`);
    return jsonResult;
  } else {
    const textResult = await response.text();
    if (!response.ok) throw new Error(`status ${response.status}: ${response.statusText}!! ${textResult}`);
    return textResult;
  }
};