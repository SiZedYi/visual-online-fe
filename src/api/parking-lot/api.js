import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const saveCarData = async (carData) => {
  try {
    // If carData is null, we're removing a car
    if (carData.carData === null) {
      const response = await axios.post(`${API_URL}/lots/${carData.parkingLotId}/spots/${carData.spotId}/remove`);
      return response.data.data;
    } else {
      // Otherwise, we're parking a car
      const response = await axios.post(`${API_URL}/lots/${carData.parkingLotId}/spots/${carData.spotId}/park`, carData);
      return response.data.data.car;
    }
  } catch (error) {
    console.error('Error saving car data:', error);
    throw error;
  }
};


// Get parking lot data
export const getParkingLot = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/parking/lots/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching parking lot:', error);
    throw error;
  }
};

// Get spots for a parking lot
export const getParkingSpots = async (parkingLotId) => {
  try {
    const response = await axios.get(`${API_URL}/lots/${parkingLotId}/spots`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching parking spots:', error);
    throw error;
  }
};

// Get all parking lots
export const getAllParkingLots = async () => {
  try {
    const response = await axios.get(`${API_URL}/parking/lots`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching all parking lots:', error);
    throw error;
  }
};

// Create a new parking lot
export const createParkingLot = async (parkingLotData) => {
  try {
    const response = await axios.post(`${API_URL}/parking/lots`, parkingLotData);
    return response.data.data;
  } catch (error) {
    console.error('Error creating parking lot:', error);
    throw error;
  }
};

// Create a new parking spot
export const createParkingSpot = async (parkingLotId, spotData) => {
  try {
    const response = await axios.post(`${API_URL}/parking/lots/${parkingLotId}/spots`, spotData);
    return response.data.data;
  } catch (error) {
    console.error('Error creating parking spot:', error);
    throw error;
  }
};