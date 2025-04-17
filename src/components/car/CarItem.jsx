import React from "react";

const CarItem = ({ car }) => {
  return (
    <div style={{ padding: "10px 0" }}>
      <h4>{car.licensePlate}</h4>
      <p>Model: {car.model}</p>
      <p>Color: {car.color}</p>
      <p>Owner: {car.ownerInfo.name}</p>
      <p>Contact: {car.ownerInfo.contactInfo}</p>
      <p>Entry Time: {car.entryTime ? car.entryTime : "Not entered"}</p>
      <p>Current Spot: {car.currentSpot || "Not parked"}</p>
    </div>
  );
};

export default CarItem;
