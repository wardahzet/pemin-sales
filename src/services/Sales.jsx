const API_BASE_URL = "http://localhost:8000/api/pemin";

export const fetchProductOptions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/product`);
    const result = await response.json();
    if (result.status === "success" && Array.isArray(result.data)) {
      return result.data;
    } else {
      console.error("Invalid product options format. Expected an array, received:", result);
      return [];
    }
  } catch (error) {
    console.error("Error fetching product options:", error);
    return [];
  }
};

export const fetchDistributorOptions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/distributor`);
    const result = await response.json();
    if (result.status === "success" && Array.isArray(result.data)) {
      return result.data;
    } else {
      console.error("Invalid distributor options format. Expected an array, received:", result);
      return [];
    }
  } catch (error) {
    console.error("Error fetching distributor options:", error);
    return [];
  }
};

export const saveSalesData = async (postDataArray) => {
  try {
    for (const postData of postDataArray) {
      const response = await fetch(`${API_BASE_URL}/sale`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const result = await response.json();
      if (result.status !== "success") {
        console.error("Failed to save data for a row:", result.error);
        return false;
      }
      console.log("Data saved successfully for a row:", postData);
    }
    return true;
  } catch (error) {
    console.error("Error saving data:", error.message);
    return false;
  }
};
