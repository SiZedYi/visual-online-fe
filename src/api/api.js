import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  return axios.post(`${API_URL}/upload`, formData);
};

export const fetchParkingLot = (floor) => axios.get(`${API_URL}/parking-lot?floor=${floor}`);
export const updateParkingLot = (id, slots) => axios.put(`${API_URL}/parking-lot/${id}`, { slots });
