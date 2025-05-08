import React, { useState, useEffect } from "react";
import { Layout, message, Form, Drawer } from "antd";
import CarForm from "../components/car/CarForm";
import CarTable from "../components/car/CarTable";
import { fetchCars } from "../api/parking-lot/api";

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
      // Lấy thông tin user từ localStorage
      const userStr = localStorage.getItem('user');
      let isAdmin = false;

      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          const username = user.username || '';
          const fullName = user.fullName || '';

          if (
            username.toLowerCase().includes('admin') ||
            fullName.toLowerCase().includes('admin')
          ) {
            isAdmin = true;
          }
        } catch (err) {
          console.error('Error parsing user from localStorage:', err);
        }
      }

      // Gọi fetchCars với true / false
      const res = await fetchCars(isAdmin);

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
        console.log(values);
        message.info("Edit feature not implemented yet.");
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
      <h2>Vehicle Management</h2>
      <CarTable data={carData} onEdit={handleEdit} loading={loading} />

      <Drawer
        title="Edit Car"
        width={400}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        placement="bottom"
        size="large"
        destroyOnClose
      >
        <CarForm onFinish={onFinish} form={form} editing={editing} />
      </Drawer>
    </Content>
  );
};

export default CarManagement;
