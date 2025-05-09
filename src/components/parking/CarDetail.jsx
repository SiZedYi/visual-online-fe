import React from "react";
import {
  CarOutlined,
  UserOutlined,
  PhoneOutlined,
  NumberOutlined,
  TagOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const CarDetail = ({ carDetails }) => {
  const items = [
    {
      icon: <EnvironmentOutlined />,
      label: "Current Spot",
      value: carDetails.currentSpot?.spotId || "Unknown",
    },
    {
      icon: <TagOutlined />,
      label: "License Plate",
      value: carDetails.licensePlate || "Unknown",
    },
    {
      icon: <CarOutlined />,
      label: "Model",
      value: carDetails.model || "Unknown",
    },
    {
      icon: <UserOutlined />,
      label: "Owner",
      value: carDetails.ownerUser?.fullName || carDetails.ownerUser || "Unknown",
    },
    {
      icon: <PhoneOutlined />,
      label: "Contact",
      value: carDetails.ownerInfo?.contactInfo || carDetails?.ownerInfo || "Unknown",
    },
    {
      icon: <NumberOutlined />,
      label: "Apartment",
      value: carDetails.apartment || "Unknown",
    },
  ];

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px", "background":"linear-gradient(to left, #C5C5 0%, #6C5CE7 100%)"}}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              width: "48%",
              backgroundColor: "#f9f9f9",
              padding: "20px 24px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ fontSize: "28px", marginRight: "16px", color: "#6C5CE7" }}>
              {item.icon}
            </div>
            <div>
              <div style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "4px" }}>
                {item.label}
              </div>
              <div style={{ fontSize: "24px" }}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarDetail;
