import React, { useState } from 'react';
import { Form, Input, Button, Space, Select, message } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import axios from 'axios';

const CarForm = ({ onSubmit, onCancel, isLoading, users }) => {
  const [form] = Form.useForm();
  const [isExistingCar, setIsExistingCar] = useState(false);

  const handleFinish = (values) => {
    onSubmit(values);
  };

  const checkLicensePlate = async () => {
    let licensePlate = form.getFieldValue('licensePlate');
    if (!licensePlate) return;
  
    licensePlate = licensePlate.trim().toLowerCase();
  
    try {
      const response = await axios.get(`http://localhost:5000/api/cars/check/${licensePlate}`);
      if (response.data.success && response.data.data) {
        const car = response.data.data;
        message.info('Car found. Fields have been auto-filled.');
  
        form.setFieldsValue({
          color: car.color,
          model: car.model,
          userId: car.ownerUser,
        });
  
        setIsExistingCar(true);
      } else {
        message.info('No car found with this license plate.');
        setIsExistingCar(false);
      }
    } catch (error) {
      console.error(error);
      message.error('Error checking license plate.');
      setIsExistingCar(false);
    }
  };
  

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        color: "#3357FF",
        model: "",
        licensePlate: "",
        userId: ""
      }}
    >
      <Form.Item
        label="License Plate"
        name="licensePlate"
        rules={[{ required: true, message: 'Please enter the license plate!' }]}
      >
        <Input
          placeholder="ABC123"
          style={{ padding: "8px 12px" }}
          onBlur={checkLicensePlate}
        />
      </Form.Item>
      <Form.Item
        label="User"
        name="userId"
        rules={[{ required: true, message: 'Please select a user!' }]}
      >
        <Select
          placeholder="Select a user"
          options={users}
          suffixIcon={<CaretDownOutlined />}
          disabled={isExistingCar}
        />
      </Form.Item>

      <Form.Item
        label="Color"
        name="color"
        rules={[{ required: true, message: 'Please select a color!' }]}
      >
        <Select
          placeholder="Select a color"
          suffixIcon={<CaretDownOutlined />}
          options={[
            { value: '#FF5733', label: 'Red' },
            { value: '#33FF57', label: 'Green' },
            { value: '#3357FF', label: 'Blue' },
            { value: '#FFD700', label: 'Yellow' },
            { value: '#000000', label: 'Black' },
            { value: '#FFFFFF', label: 'White' }
          ]}
          disabled={isExistingCar}
        />
      </Form.Item>

      <Form.Item
        label="Model"
        name="model"
        rules={[{ required: true, message: 'Please enter the car model!' }]}
      >
        <Input placeholder="Car model" style={{ padding: "8px 12px" }} disabled={isExistingCar} />
      </Form.Item>

      <Form.Item>
        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Save Car
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CarForm;
