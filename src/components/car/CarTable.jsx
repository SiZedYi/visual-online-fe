import React from "react";
import { Table, Button } from "antd";
import dayjs from "dayjs";

const formatFloorName = (floor) => {
  if (!floor) return "";
  return floor.replace(/floor(\d+)/i, (match, number) => `Floor ${number}`);
};

const colorOptions = [
  { value: '#FF5733', label: 'Red' },
  { value: '#33FF57', label: 'Green' },
  { value: '#3357FF', label: 'Blue' },
  { value: '#FFD700', label: 'Yellow' },
  { value: '#000000', label: 'Black' },
  { value: '#FFFFFF', label: 'White' }
];

const CarTable = ({ data, onEdit, loading }) => {
  const columns = [
    {
      title: "License Plate",
      dataIndex: "licensePlate",
    },
    {
      title: "Model",
      dataIndex: "model",
    },
    {
      title: "Color",
      dataIndex: "color",
      render: (color) => {
        const matched = colorOptions.find(option => option.value.toLowerCase() === color?.toLowerCase());
        return matched ? matched.label : color || "Unknown";
      },
    },
    {
      title: "Owner",
      dataIndex: "ownerInfo",
      render: (owner) => owner?.name || "N/A",
    },
    {
      title: "Contact Info",
      dataIndex: "ownerInfo",
      render: (owner) => owner?.contactInfo || "N/A",
    },
    {
      title: "Current Floor",
      dataIndex: "currentSpot",
      render: (currentSpot) => (currentSpot?.floor ? formatFloorName(currentSpot.floor) : "Not parked"),
    },
    {
      title: "Current Spot",
      dataIndex: "currentSpot",
      render: (currentSpot) => (currentSpot?.spotId ? currentSpot.spotId : "Not parked"),
    },
    {
      title: "Register Day",
      dataIndex: "updatedAt",
      render: (updatedAt) =>
        updatedAt ? dayjs(updatedAt).format("DD/MM/YYYY") : "Not entered",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Button type="link" onClick={() => onEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />;
};

export default CarTable;
