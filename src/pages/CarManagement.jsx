import React, { useState, useEffect } from "react";
import { Layout, message, Form, Button, Drawer } from "antd";
import CarForm from "../components/car/CarForm";
import CarTable from "../components/car/CarTable";
import { fetchCars, createCar } from "../api/parking-lot/api"; // <-- import API

const { Content } = Layout;

const CarManagement = () => {
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCars = async () => {
    setLoading(true);
    try {
      const res = await fetchCars();
      if (res.success) {
        setCarData(res.data);
      } else {
        message.error("Failed to load cars.");
      }
    } catch (error) {
      message.error("Error fetching cars.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  const handleEdit = (record) => {
    setEditing(record);
    form.setFieldsValue(record);
    setDrawerVisible(true);
  };

  const onFinish = async (values) => {
    try {
      if (editing) {
        // TODO: handle update later
        message.info("Edit feature not implemented yet.");
      } else {
        const res = await createCar(values);
        if (res.success) {
          message.success("Car added successfully!");
          loadCars();
        } else {
          message.error("Failed to add car.");
        }
      }
    } catch (error) {
      message.error("An error occurred.");
    } finally {
      form.resetFields();
      setEditing(null);
      setDrawerVisible(false);
    }
  };

  return (
    <Content style={{ background: "#fff", padding: 20, borderRadius: 20 }}>
      <CarTable data={carData} onEdit={handleEdit} loading={loading} />
      <Button
        type="primary"
        onClick={() => {
          setEditing(null);
          form.resetFields();
          setDrawerVisible(true);
        }}
        style={{ marginTop: 16 }}
      >
        Add New Car
      </Button>

      <Drawer
        title={editing ? "Edit Car" : "Add New Car"}
        width={400}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        destroyOnClose
      >
        <CarForm onFinish={onFinish} form={form} editing={editing} />
      </Drawer>
    </Content>
  );
};

export default CarManagement;
