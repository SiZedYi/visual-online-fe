import React, { useState } from 'react';

const CarForm = ({ onSubmit, onCancel, isLoading }) => {
  const [carData, setCarData] = useState({
    color: "#3357FF",
    model: "",
    licensePlate: ""
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(carData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Color</label>
        <input 
          type="color" 
          name="color" 
          value={carData.color}
          onChange={handleChange}
          className="w-full h-8"
        />
      </div>
      
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Model</label>
        <input 
          type="text" 
          name="model" 
          value={carData.model}
          onChange={handleChange}
          placeholder="Car model"
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">License Plate</label>
        <input 
          type="text" 
          name="licensePlate" 
          value={carData.licensePlate}
          onChange={handleChange}
          placeholder="ABC123"
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Car'}
        </button>
      </div>
    </form>
  );
};

export default CarForm;