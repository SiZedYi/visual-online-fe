import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const getAuthHeader = () => {
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
export const getParkingSpots = async (parkingLotId) => {
  try {
    const response = await axios.get(
      `${API_URL}/parking/lots/${parkingLotId}/spots`
    );
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

export const fetchCars = async () => {
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

// get Car Detail
export const getCarDetail = async (carId) => {
  const res = await axios.get(`${API_URL}/cars/${carId}`,
    {
      headers: getAuthHeader(),
    });
  return res.data;
};

// Thêm hàm saveSpotData vào file api.js hiện có

/**
 * Lưu thông tin ô đỗ xe xuống database
 * @param {Object} params - Các thông số của ô đỗ xe
 * @param {string} params.spotId - ID của ô đỗ xe
 * @param {number} params.x - Tọa độ x của ô đỗ
 * @param {number} params.y - Tọa độ y của ô đỗ
 * @param {number} params.width - Chiều rộng của ô đỗ (chỉ cần cho ô mới)
 * @param {number} params.height - Chiều cao của ô đỗ (chỉ cần cho ô mới)
 * @param {string} params.parkingLotId - ID của bãi đỗ xe
 * @param {boolean} params.delete - Nếu true, sẽ xóa ô đỗ
 * @returns {Promise<Object>} Dữ liệu trả về từ server
 */
export const saveSpotData = async ({
  spotId,
  x,
  y,
  width,
  height,
  parkingLotId,
  delete: isDelete,
}) => {
  try {
    let endpoint = `/api/parking-lots/${parkingLotId}/spots/${spotId}`;
    let method = 'PUT';
    let data = { x, y };
    
    // Nếu có chiều rộng và chiều cao, thêm vào data
    if (width !== undefined && height !== undefined) {
      data.width = width;
      data.height = height;
    }
    
    // Nếu là lệnh xóa, thay đổi method thành DELETE
    if (isDelete) {
      method = 'DELETE';
      data = null;
    }
    
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving spot data:', error);
    throw error;
  }
};