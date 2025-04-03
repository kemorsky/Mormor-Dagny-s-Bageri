import { OrderDetails, Order } from "../types/types";

type RequestOptions = {
    method?: string;
    headers?: { [key: string]: string };
    body?: string;
  }

const BASE_URL = "http://localhost:5139/api";

export const apiRequest = async (url: string, options: RequestOptions = {}) => {
  // console.log(`Making request to ${url} with options:`, options);

    try {
      const token = localStorage.getItem("token");
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

export const fetchProducts = async () => {
  try {
    return await apiRequest(`${BASE_URL}/produkter`);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const pushOrder = async (orderDetails: OrderDetails) => {
  try {
    const response = await apiRequest(`${BASE_URL}/beställningsdetaljer`, {
      method: 'POST',
      body: JSON.stringify(orderDetails),
  });
      return await response.json();   
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// export const createOrder = async () => {
//   try {
//     return await apiRequest(`${BASE_URL}/beställningar`);
//   } catch (error) {
//     console.error("Error pushing order:", error);
//     throw error;
//   }
// }

// export const fetchOrder = async () => {
//   try {
//     return await apiRequest(`${BASE_URL}/beställningar`);
//   } catch (error) {
//     console.error("Error pushing order:", error);
//     throw error;
//   }
// };
