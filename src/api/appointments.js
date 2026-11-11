import { BASE_URL } from "./index.js";

export const getAvailability = async(patId, request, token) => {
  console.log(`BASE_URL:`, BASE_URL);
  console.log(`request:`, patId, request);
  const response = await fetch(BASE_URL + "/appointments/" + patId + "/appointment",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(request)
  });
  console.log(`response:`, response);
  const contentType = response.headers.get('content-type');
  console.log(`contentType:`, contentType);

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
  console.log(`I've made it to scheduleAppt.`);
  console.log(`patId:`, patId);
  console.log(`reqBody:`, reqBody);

  const response = await fetch(BASE_URL + "/appointments/" + patId + "/appointment/set", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(reqBody)
  });
  console.log(`response:`, response);
  const contentType = response.headers.get('content-type');
  console.log(`contentType:`, contentType);

  if (contentType && contentType.includes('application/json')) {
    const jsonResult = await response.json();
    if (!response.ok) throw new Error(`status ${response.status}: ${response.statusText}!! ${jsonResult.message}`);
    console.log(jsonResult);
    return jsonResult;
  } else {
    const textResult = await response.text();
    if (!response.ok) throw new Error(`status ${response.status}: ${response.statusText}!! ${textResult}`);
    console.log(textResult);
    return textResult;
  }
};