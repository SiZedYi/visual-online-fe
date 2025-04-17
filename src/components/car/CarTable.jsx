import React from "react";
import { Table, Button } from "antd";
import dayjs from "dayjs";
import CarItem from "./CarItem";

const CarTable = ({ data, onEdit }) => {
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
      render: (owner) => owner.name,
    },
    {
      title: "Current Spot",
      dataIndex: "currentSpot",
      render: (text) => (text ? text : "Not parked"),
    },
    {
      title: "Entry Time",
      dataIndex: "entryTime",
      render: (entryTime) => (entryTime ? dayjs(entryTime).format("HH:mm DD/MM/YYYY") : "Not entered"),
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

  return <Table columns={columns} dataSource={data} rowKey="id" />;
};

export default CarTable;
