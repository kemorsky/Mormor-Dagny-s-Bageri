import { OrderDetails, Order, Product, RegisterUser, User, Store } from "../types/types";

type RequestOptions = {
    method?: string,
    headers?: { [key: string]: string },
    body?: string,
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
    const response = await apiRequest(`${BASE_URL}/beställningar/id`, { // TODO fix id and replace with proper value
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails),
  });
      return response; 
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const addUser = async (user: RegisterUser) => {
  try {
    const response = await apiRequest(`${BASE_URL}/auth/registrera`, {
      method: 'POST',
      body: JSON.stringify(user)
    });
    return response;
  } catch (error) {
    console.error("Error pushing order:", error);
    throw error;
  }
};

export const getUser = async () => { // TODO fix later, no correct endpoint as of right now
  try {
    return await apiRequest(`${BASE_URL}/användare`);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export const editUser = async (user: User) => {
  try {
    const response = await apiRequest(`${BASE_URL}/användare`, {
      method: 'PUT',
      body: JSON.stringify(user)
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error pushing order:", error);
    throw error;
  }
}

export const editUserPassword = async (user: User) => {
  try {
    const response = await apiRequest(`${BASE_URL}/auth/ändra-lösenord/`, {
      method: 'PUT',
      body: JSON.stringify(user)
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error editing password:", error)
    throw error;
  }
}

export const addStore = async (store: Store) => {
  try {
    const response = await apiRequest(`${BASE_URL}/butiker`, {
      method: 'POST',
      body: JSON.stringify(store)
    })
    console.log(response)
    return response;
  } catch (error) {
    console.log("Couldn't add store", error)
  }
};

export const deleteStore = async (ButikId: number) => { // NOT YET USED IN PRODUCTION
  try {
    const response = await apiRequest(`${BASE_URL}/butiker/${ButikId}`, {
      method: 'DELETE',
    });
    return response;
  } catch (error) {
    console.log("Error deleting store", error)
    throw error;
  }
}

export const addProduct = async (newProduct: Product) => {
  try {
    const response = await apiRequest(`${BASE_URL}/produkter`, {
      method: 'POST',
      body: JSON.stringify(newProduct)
    })
    return response;
  } catch (error) {
    console.log("Error adding product", error)
  }
};

export const deleteProduct = async (ProduktId: number) => {
  console.log('Deleting product with id:', ProduktId);
  try {
    const response = await apiRequest(`${BASE_URL}/produkter/${ProduktId}`, {
      method: 'DELETE'
    });
    return response;
  } catch (error) {
    console.log("Could not delete product", error)
  }
}

export const editProduct = async (product: Product) => {
  try {
    const response = await apiRequest(`${BASE_URL}/produkter/${product.ProduktId}`, {
      method: 'PUT',
      body: JSON.stringify({
        ProduktId: product.ProduktId,
        Namn: product.Namn,
        Baspris: product.Baspris,
        isDeleted: product.isDeleted
      })
    });
    return response;
    } catch (error) {
      console.log("couldn't edit product", error)
      throw error;
    }
}

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
