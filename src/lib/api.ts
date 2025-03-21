type RequestOptions = {
    method?: string;
    headers?: { [key: string]: string };
    body?: string;
  }

const BASE_URL = "http://localhost:5139/api"; // Base API URL

// General API request function (to avoid code repetition)
export const apiRequest = async (url: string, options: RequestOptions = {}) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        ...options,
      });
  
      if (!response) {
        throw new Error("No response received");
      }
  
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

export const fetchStores = async () => {
    try {
      return await apiRequest(`${BASE_URL}/butiker`);
    } catch (error) {
      console.error("Error fetching stores:", error);
      throw error;
    }
  };