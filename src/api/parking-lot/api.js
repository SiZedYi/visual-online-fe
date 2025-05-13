import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const saveCarData = async (carData) => {
  try {
    // If carData is null, we're removing a car
    if (carData.carData === null) {
      const response = await axios.post(
        `${API_URL}/parking/lots/${carData.parkingLotId}/spots/${carData.spotId}/remove`,
        carData,
        {
          headers: getAuthHeader(),
        }
      );
      return response.data.data;
    } else {
      // Otherwise, we're parking a car
      const response = await axios.post(
        `${API_URL}/parking/lots/${carData.parkingLotId}/spots/${carData.spotId}/park`,
        carData,
        {
          headers: getAuthHeader(),
        }
      );
      return response.data.data.car;
    }
  } catch (error) {
    console.error("Error saving car data:", error);
    throw error;
  }
};

// Get parking lot data
export const getParkingLot = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/parking/lots/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching parking lot:", error);
    throw error;
  }
};

// Get spots for a parking lot
export const getParkingSpots = async (parkingLotId, isAdmin) => {
  try {
    const response = await axios.get(
      `${API_URL}/parking/lots/${parkingLotId}/spots?isAdmin=${isAdmin}`
      , {
        headers: getAuthHeader(),
      });
    return response.data;
  } catch (error) {
    console.error("Error fetching parking spots:", error);
    throw error;
  }
};

// Get all parking lots
export const getAllParkingLots = async () => {
  try {
    const response = await axios.get(`${API_URL}/parking/parking/lots`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching all parking lots:", error);
    throw error;
  }
};

// Create a new parking lot
export const createParkingLot = async (parkingLotData) => {
  try {
    const response = await axios.post(
      `${API_URL}/parking/parking/lots`,
      parkingLotData
    );
    return response.data.data;
  } catch (error) {
    console.error("Error creating parking lot:", error);
    throw error;
  }
};

// Create a new parking spot
export const createParkingSpot = async (parkingLotId, spotData) => {
  try {
    const response = await axios.post(
      `${API_URL}/parking/parking/lots/${parkingLotId}/spots`,
      spotData
    );
    return response.data.data;
  } catch (error) {
    console.error("Error creating parking spot:", error);
    throw error;
  }
};

export const fetchCars = async (options) => {
  if (options) {
    const response = await axios.get(`${API_URL}/cars/all`,
      {
        headers: getAuthHeader(),
      });
    return response.data
  }
  const response = await axios.get(`${API_URL}/cars`,
    {
      headers: getAuthHeader(),
    });
  return response.data; // giả sử API trả về { success: true, data: [...] }
};

// POST new car
export const createCar = async (carData) => {
  const res = await axios.post(`${API_URL}/cars`, carData,
    {
      headers: getAuthHeader(),
    });
  return res.data;
};

// Update car
export const updateCar = async (id, carData) => {
  const res = await axios.put(`${API_URL}/cars/${id}`, carData,
    {
      headers: getAuthHeader(),
    });
  return res.data;
};


// get Car Detail
export const getCarDetail = async (carId) => {
  const res = await axios.get(`${API_URL}/cars/${carId}`,
    {
      headers: getAuthHeader(),
    });
  return res.data;
};

export const fetchUserGroups = async () => {
  const response = await axios.get(`${API_URL}/user-groups`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/auth/users`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Create a new parking spot
export const saveNewSpot = async (spotData) => {
  try {
    const response = await axios.post(`${API_URL}/parking/lots/${spotData.parkingLotId}/spots`, spotData);
    return response.data;
  } catch (error) {
    console.error('Error creating new spot:', error);
    throw error;
  }
};

// Delete an existing parking spot
export const deleteSpot = async (parkingLotId, spotId) => {
  try {
    const response = await axios.delete(`${API_URL}/parking/lots/${parkingLotId}/spots/${spotId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting spot:', error);
    throw error;
  }
};

export const getPayments = async (params) => {
  const res = await axios.get(`${API_URL}/payments?startDate=${params.startDate}&endDate=${params.endDate}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const getRevenueStats = async (type, date) => {
  const res = await axios.get(`${API_URL}/payments/revenue?type=${type}&date=${date}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const getSummaryStats = async () => {
  const res = await axios.get(`${API_URL}/payments/summary`, {
    headers: getAuthHeader(),
  });
  return res.data;
};