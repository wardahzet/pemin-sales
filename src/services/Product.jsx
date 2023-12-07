const API_BASE_URL = "http://localhost:8000/api/pemin";

export const getProductData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/product`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

export const getProductDetail = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/product/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};
