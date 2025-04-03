import React, { useState } from "react";
import { uploadImage } from "../api";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [floor, setFloor] = useState(1);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    const formData = new FormData();
    formData.append("image", file);
    formData.append("floor", floor);

    await uploadImage(formData);
    alert("Uploaded successfully!");
  };

  return (
    <div>
      <h3>Upload Parking Lot Image</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <select value={floor} onChange={(e) => setFloor(e.target.value)}>
        <option value={1}>Floor 1</option>
        <option value={2}>Floor 2</option>
        <option value={3}>Floor 3</option>
      </select>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUpload;
// This component allows users to upload an image of a parking lot and select the floor number.