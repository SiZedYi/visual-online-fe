import React from "react";
import { Table, Button } from "antd";
import dayjs from "dayjs";
const formatFloorName = (floor) => {
  if (!floor) return "";
  return floor.replace(/floor(\d+)/i, (match, number) => `Floor ${number}`);
};

const CarTable = ({ data, onEdit, loading }) => {
  console.log(data);
  
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
    },
    {
      title: "Owner",
      dataIndex: "ownerInfo",
      render: (owner) => owner?.name || "N/A",
    },
    {
      title: "Current Floor",
      dataIndex: "currentSpot",
      render: (currentSpot) => (currentSpot.floor ? formatFloorName(currentSpot.floor) : "Not parked"),
    },
    {
      title: "Current Spot",
      dataIndex: "currentSpot",
      render: (currentSpot) => (currentSpot.spotId ? currentSpot.spotId : "Not parked"),
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
