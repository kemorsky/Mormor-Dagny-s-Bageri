import { OrderDetails, Order, Product, User, Store, RegisterUser } from "../types/types";

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

export const fetchOrders = async () => {
  try {
    return await apiRequest(`${BASE_URL}/beställningar`);
  } catch (error) {
    console.error("Error pushing order:", error);
    throw error;
  }
};

export const fetchDashboardStatistics = async () => {
  try {
    return await apiRequest(`${BASE_URL}/beställningar/dashboard-statistics`);
  } catch (error) {
    console.error("Error fetching statistics:", error);
  }
}

export const fetchSpecificOrder = async (BeställningId: number) => {
  try {
    return await apiRequest(`${BASE_URL}/beställningar/order/${BeställningId}`)
  } catch (error) {
    console.error("Error fetching this order:", error)
    throw error;
  }
};

export const editOrderDetails = async (orderDetails: OrderDetails[]) => {
  try {
    const responses = await Promise.all(orderDetails.map((detail) => {
      return apiRequest(`${BASE_URL}/beställningsdetaljer/${detail.BeställningsdetaljId}`, {
        method: 'PUT',
        body: JSON.stringify(detail),
      });
    }));
    return responses;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

export const editOrderDeliveryDate = async (BeställningId: number, updateDTO: { PreliminärtLeveransdatum: string }) => {
  try {
    const response = await apiRequest(`${BASE_URL}/beställningar/${BeställningId}` , {
      method: "PUT",
      body: JSON.stringify( updateDTO )
    })
    console.log(response)
    return response;
  } catch (error) {
    console.error("Error fetching this order:", error)
    throw error;
  }
}

export const deleteOrder = async (BeställningId: number) => {
  try {
    const response = await apiRequest(`${BASE_URL}/beställningar/${BeställningId}` , {
      method: "DELETE"
    })
    console.log(response)
    return response;
  } catch (error) {
    console.error("Error fetching this order:", error)
    throw error;
  }
};

export const deleteOrderDetails = async (orderDetails: OrderDetails[]) => {
  try {
    const responses = await Promise.all(orderDetails.map((detail) => {
      return apiRequest(`${BASE_URL}/beställningsdetaljer/${detail.BeställningsdetaljId}`, {
        method: 'DELETE',
      });
    }));
    return responses;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

export const addOrderDetail = async (BeställningId: number, detalj: OrderDetails) => {
  try {
    const response = await apiRequest(`${BASE_URL}/beställningsdetaljer/${BeställningId}` , {
      method: "POST",
      body: JSON.stringify(detalj)
    })
    console.log(detalj)
    console.log(response)
    return response;
  } catch (error) {
    console.error("Error adding detail to order", error)
  }
}

export const pushOrder = async (order: Order) => {
  try {
    const response = await apiRequest(`${BASE_URL}/beställningar`, {
      method: 'POST',
      body: JSON.stringify(order),
  });
      return response; 
  } catch (error) {
    console.error("Error creating order:", error);                                         
    throw error;
  }
};

export const fetchOrderDetails = async (orderId: number) => {
  try {
    const response = await apiRequest(`${BASE_URL}/beställningsdetaljer/beställning/${orderId}`)
    return response;
  } catch (error) {
    console.error("Error fetching order:", error);
     throw error;
  }
};

export const fetchUpcomingDeliveries = async () => {
  try {
    return await apiRequest(`${BASE_URL}/beställningar/upcoming-deliveries`);
  } catch (error) {
    console.error("Error fetching upcoming deliveries:", error);
  }
};

export const fetchUsers = async () => {
  try {
    return await apiRequest(`${BASE_URL}/auth/users`);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Email: email })
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error sending forgot-password email:", error);
    throw error;
  }
};


export const resetPassword = async (user: User) => { // TO BE IMPLEMENTED AT A LATER DATE
  try {
    await apiRequest(`${BASE_URL}/auth/reset-password`, {
      method: 'POST',
      body: JSON.stringify(user.LösenordHash)
    })
  } catch (error) {
    console.error("Error resetting password:", error);
  }
}

export const addUser = async (user: RegisterUser) => {
  try {
    const response = await apiRequest(`${BASE_URL}/auth/registrera`, {
      method: 'POST',
      body: JSON.stringify(user)
    });
    console.log(response)
    return response;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const editUser = async (Låst: boolean, Användarnamn: string) => {
  try {
    const response = await apiRequest(`${BASE_URL}/auth/lås-användare/${Användarnamn}`, {
      method: 'PUT',
      body: JSON.stringify(Låst)
    });
    return response;
  } catch (error) {
    console.error("Error editing user:", error);
    throw error;
  }
}

export const editUserPassword = async (user: User) => {
  try {
    const response = await apiRequest(`${BASE_URL}/auth/ändra-lösenord/${user.Användarnamn}`, {
      method: 'PUT',
      body: JSON.stringify(user.LösenordHash)
    });
    return response;
  } catch (error) {
    console.error("Error editing user password:", error);
    throw error;
  }
}

export const deleteUser = async (Användarnamn: string) => {
  try {
    const response = await apiRequest(`${BASE_URL}/auth/ta-bort-användare/${Användarnamn}`, {
      method: 'DELETE',
    })
    console.log(response)
    return response;
  } catch (error) {
    console.log(error)
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

export const editStore = async (store: Store) => {
  try {
    const response = await apiRequest(`${BASE_URL}/butiker/${store.ButikId}`, {
      method: 'PUT',
      body: JSON.stringify({
        ButikId: store.ButikId,
        ButikNummer: store.ButikNummer,
        ButikNamn: store.ButikNamn,
        Besöksadress: store.Besöksadress,
        BrödansvarigNamn: store.BrödansvarigNamn,
        BrödansvarigTelefon: store.BrödansvarigTelefon,
        ButikschefNamn: store.ButikschefNamn,
        ButikschefTelefon: store.ButikschefTelefon,
        Fakturaadress: store.Fakturaadress,
        Låst: store.Låst,
        Telefonnummer: store.Telefonnummer,
      })
    })
    console.log(response)
    return response;
  } catch (error) {
    console.log("Couldn't edit store", error)
  }
};

export const lockStore = async (Låst: boolean, ButikId: number) => {
  try {
    const response = await apiRequest(`${BASE_URL}/butiker/${ButikId}/lås`, {
      method: 'PUT',
      body: JSON.stringify(Låst)
    });
    console.log("Locked store :", ButikId, response);
    return response;
  } catch (error) {
    console.error("Error locking store:", error);
    throw error;
  }
}

export const deleteStore = async (ButikId: number) => { 
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
    console.log(response)
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
