import React, { useState } from "react";
import { Row, Col, Layout, message, Form, Button, Drawer } from "antd";
import CarForm from "../components/car/CarForm";
import CarTable from "../components/car/CarTable";

const { Content } = Layout;

const CarManagement = () => {
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false); // State for Drawer visibility

  const [carData, setCarData] = useState([
    {
      id: 1,
      licensePlate: "54ZA2213",
      color: "#3357FF",
      model: "Toyota",
      ownerInfo: {
        name: "Nguyễn Văn B",
        contactInfo: "0907654321",
      },
      entryTime: "2025-04-10T16:49:07.781Z",
      exitTime: null,
      currentSpot: "A3",
    },
    {
      id: 2,
      licensePlate: "29X-12345",
      color: "#FF5733",
      model: "Honda",
      ownerInfo: {
        name: "Trần Thị C",
        contactInfo: "0912345678",
      },
      entryTime: "2025-04-09T08:30:00.000Z",
      exitTime: null,
      currentSpot: "B5",
    },
    {
      id: 3,
      licensePlate: "37A-98765",
      color: "#FFC300",
      model: "Hyundai",
      ownerInfo: {
        name: "Lê Văn D",
        contactInfo: "0923456789",
      },
      entryTime: "2025-04-08T10:15:42.200Z",
      exitTime: null,
      currentSpot: "C7",
    },
    {
      id: 4,
      licensePlate: "88B-45678",
      color: "#33FF57",
      model: "Ford",
      ownerInfo: {
        name: "Nguyễn Thị E",
        contactInfo: "0934567890",
      },
      entryTime: "2025-04-07T14:22:19.450Z",
      exitTime: null,
      currentSpot: "D2",
    },
    {
      id: 5,
      licensePlate: "22C-56432",
      color: "#DAF7A6",
      model: "Mazda",
      ownerInfo: {
        name: "Phạm Thị F",
        contactInfo: "0945678901",
      },
      entryTime: "2025-04-06T09:00:00.000Z",
      exitTime: null,
      currentSpot: "E6",
    },
    {
      id: 6,
      licensePlate: "56K-23214",
      color: "#FF5733",
      model: "Kia",
      ownerInfo: {
        name: "Vũ Văn G",
        contactInfo: "0956789012",
      },
      entryTime: "2025-04-05T12:40:33.500Z",
      exitTime: null,
      currentSpot: "F4",
    },
    {
      id: 7,
      licensePlate: "29D-45312",
      color: "#C70039",
      model: "Nissan",
      ownerInfo: {
        name: "Lý Thị H",
        contactInfo: "0967890123",
      },
      entryTime: "2025-04-04T11:25:21.600Z",
      exitTime: null,
      currentSpot: "G8",
    },
    {
      id: 8,
      licensePlate: "44Z-83214",
      color: "#900C3F",
      model: "BMW",
      ownerInfo: {
        name: "Ngô Văn I",
        contactInfo: "0978901234",
      },
      entryTime: "2025-04-03T15:10:55.300Z",
      exitTime: null,
      currentSpot: "H1",
    },
    {
      id: 9,
      licensePlate: "72M-95146",
      color: "#581845",
      model: "Mercedes",
      ownerInfo: {
        name: "Trịnh Thị J",
        contactInfo: "0989012345",
      },
      entryTime: "2025-04-02T13:00:00.000Z",
      exitTime: null,
      currentSpot: "I3",
    },
    {
      id: 10,
      licensePlate: "63B-67432",
      color: "#FF1493",
      model: "Audi",
      ownerInfo: {
        name: "Hoàng Thị K",
        contactInfo: "0990123456",
      },
      entryTime: "2025-04-01T17:35:50.000Z",
      exitTime: null,
      currentSpot: "J2",
    }
  ]
  );

  const handleEdit = (record) => {
    setEditing(record);
    form.setFieldsValue(record);
    setDrawerVisible(true); // Open the Drawer when editing
  };

  const onFinish = (values) => {
    if (editing) {
      setCarData((prev) =>
        prev.map((item) =>
          item.id === editing.id ? { ...item, ...values } : item
        )
      );
      message.success("Updated successfully!");
    } else {
      const newItem = {
        ...values,
        id: Date.now(),
      };
      setCarData((prev) => [...prev, newItem]);
      message.success("Created successfully!");
    }
    setEditing(null);
    form.resetFields();
    setDrawerVisible(false); // Close the Drawer after submission
  };

  return (
    <Content style={{ background: "#fff", padding: 20, borderRadius: 20 }}>
      <CarTable data={carData} onEdit={handleEdit} />
      <Button
        type="primary"
        onClick={() => {
          setEditing(null); // Reset editing state
          form.resetFields(); // Clear the form
          setDrawerVisible(true); // Open the Drawer
        }}
      >
        Add New Car
      </Button>

      {/* Drawer for CarForm */}
      <Drawer
        title={editing ? "Edit Car" : "Add New Car"}
        width={400}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        destroyOnClose
      >
        <CarForm onFinish={onFinish} form={form} editing={editing} />
      </Drawer>
    </Content>
  );
};

export default CarManagement;
