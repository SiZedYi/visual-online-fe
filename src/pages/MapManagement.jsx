import React, { useState } from "react";
import { Row, Col, Layout, message, Form, Button, Drawer } from "antd";
import MapForm from "../components/map/MapForm";
import ParkingMapTable from "../components/map/ParkingMapTable";

const { Content } = Layout;

const MapManagement = () => {
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false); // State for Drawer visibility

  const [parkingData, setParkingData] = useState([
    { id: 1, name: "Floor 1", width: 200, height: 300, description: "Zone A", svgPath: "/maps/map1.svg" },
    { id: 2, name: "Floor 2", width: 150, height: 250, description: "Zone B", svgPath: "/maps/map1.svg" },
    { id: 3, name: "Floor 3", width: 150, height: 250, description: "Zone B" },
  ]);

  const handleEdit = (record) => {
    setEditing(record);
    form.setFieldsValue(record);
    setDrawerVisible(true); // Open the Drawer when editing
  };

  const onFinish = (values) => {
    if (editing) {
      setParkingData((prev) =>
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
      setParkingData((prev) => [...prev, newItem]);
      message.success("Created successfully!");
    }
    setEditing(null);
    form.resetFields();
    setDrawerVisible(false); // Close the Drawer after submission
  };

  return (
    <Content style={{ background: "#fff", padding: 20, borderRadius: 20 }}>
          <ParkingMapTable data={parkingData} onEdit={handleEdit} />
          <Button
            type="primary"
            onClick={() => {
              setEditing(null); // Reset editing state
              form.resetFields(); // Clear the form
              setDrawerVisible(true); // Open the Drawer
            }}
          >
            Add New Map
          </Button>

      {/* Drawer for MapForm */}
      <Drawer
        title={editing ? "Edit Map" : "Add New Map"}
        width={400}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        destroyOnClose
      >
        <MapForm onFinish={onFinish} form={form} editing={editing} />
      </Drawer>
    </Content>
  );
};

export default MapManagement;