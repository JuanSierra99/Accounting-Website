// Utilizes the Fetch API to retrieve JSON data from a specified URL.
// This function automatically attaches the JWT token stored in localStorage (For convinience, not security)
// for authorization purposes.
//
// Parameters:
// - url (String): The URL from which to fetch JSON data.
//
// Returns:
// - A Promise resolving to the parsed JSON object if the request is successful.
// - null if the request fails.
export const getJson = async (url) => {
  // Retrieve JWT token from localStorage for authorization header.
  const token = localStorage.getItem("jwtToken");
  // Perform GET request with necessary headers.
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    console.log("Error: " + response.status + " " + response.statusText);
    return null;
  }
};

// Performs an asynchronous POST request to a specified URL with a given request body.
// This function automatically appends a JWT token stored in localStorage (For convinience) to the request's
// Authorization header for secure access.
//
// Parameters:
// - url (String): The URL to which the POST request is sent.
// - request_body (Object): The body of the request, which will be JSON-stringified before sending.
//
// Returns:
// - A Promise resolving to the parsed JSON response if the request is successful.
// - null if the request fails, logging an error message to the console.
//
// Note: The function assumes a JWT token is stored in localStorage under the key "jwtToken".
export const post = async (url, request_body) => {
  // Retrieve JWT token from localStorage for inclusion in the Authorization header.
  const token = localStorage.getItem("jwtToken");
    // Perform POST request with specified body and headers.
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(request_body),
  });
  if (response.ok) {
    // console.log(response.status + " " + response.statusText);
    const json = await response.json();
    return json;
  } else {
    console.log("Error: " + response.status + " " + response.statusText);
    return null;
  }
};
