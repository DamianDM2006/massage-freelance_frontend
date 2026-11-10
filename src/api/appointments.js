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