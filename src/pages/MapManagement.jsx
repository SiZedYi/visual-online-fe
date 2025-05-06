import React, { useEffect, useState } from "react";
import { Layout, message, Form, Button, Drawer } from "antd";
import axios from "axios";
import MapForm from "../components/map/MapForm";
import ParkingMapTable from "../components/map/ParkingMapTable";

const { Content } = Layout;

const MapManagement = () => {
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [parkingData, setParkingData] = useState([]);

  // Load data from backend
  const fetchParkingMaps = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/parking/lots?noSpot=true");
      if (res.data.success) {
        setParkingData(res.data.data);
      } else {
        message.error("Failed to fetch maps.");
      }
    } catch (err) {
      message.error("Failed to load map data.");
    }
  };

  useEffect(() => {
    fetchParkingMaps();
  }, []);

  const handleEdit = (record) => {
    setEditing(record);
    form.setFieldsValue(record);
    setDrawerVisible(true);
  };

  const onToggleActive = async (id, isActive) => {
    try {
      const res = await axios.post("http://localhost:5000/api/parking/lots/set-active", {
        id,
        isActive,
      });
      
      if (res.data.success) {
        message.success("Status updated successfully.");
        fetchParkingMaps();
      } else {
        message.error("Could not update status.");
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Error updating status.");
    }
  };
  
  const onDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/map/delete`, {
        data: { id },
      });
  
      if (res.data.success) {
        message.success("Map deleted successfully!");
        fetchParkingMaps();
      } else {
        message.error("Failed to delete map.");
      }
    } catch (error) {
      message.error("Error while deleting map.");
    }
  };
  
  const onFinish = async (values) => {
    const payload = { ...values };
  
    try {
      if (editing) {
        payload._id = editing._id;
        await axios.post("http://localhost:5000/api/parking/update", payload)
        message.success("Map updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/parking/create", payload)
        message.success("Map added successfully!");
      }
      fetchParkingMaps();
    } catch (error) {
      message.error("Error submitting form.");
    }
  
    setEditing(null);
    form.resetFields();
    setDrawerVisible(false);
  };

  return (
    <Content style={{ background: "#fff", padding: 20, borderRadius: 20 }}>
      <ParkingMapTable
        data={parkingData}
        onEdit={handleEdit}
        onToggleActive={onToggleActive}
        onDelete={onDelete}
      />
      <Button
        type="primary"
        onClick={() => {
          setEditing(null);
          form.resetFields();
          setDrawerVisible(true);
        }}
      >
        Add New Map
      </Button>

      <Drawer
        title={editing ? "Edit Map" : "Add New Map"}
        width={400}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        placement="bottom"
        size="large"
        destroyOnClose
      >
        {/* Assuming MapForm is defined elsewhere */}
        <MapForm onFinish={onFinish} form={form} editing={editing} />
      </Drawer>
    </Content>
  );
};

export default MapManagement;
