import React from 'react';
import { Form, Input, Button, Space, Select } from 'antd';

const CarForm = ({ onSubmit, onCancel, isLoading }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values); // Submit the form data
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        color: "#3357FF",
        model: "",
        licensePlate: ""
      }}
    >
      <Form.Item
        label="Color"
        name="color"
        rules={[{ required: true, message: 'Please select a color!' }]}
      >
        <Select
          placeholder="Select a color"
          options={[
            { value: '#FF5733', label: 'Red' },
            { value: '#33FF57', label: 'Green' },
            { value: '#3357FF', label: 'Blue' },
            { value: '#FFD700', label: 'Yellow' },
            { value: '#000000', label: 'Black' },
            { value: '#FFFFFF', label: 'White' }
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Model"
        name="model"
        rules={[{ required: true, message: 'Please enter the car model!' }]}
      >
        <Input placeholder="Car model" />
      </Form.Item>

      <Form.Item
        label="License Plate"
        name="licensePlate"
        rules={[{ required: true, message: 'Please enter the license plate!' }]}
      >
        <Input placeholder="ABC123" />
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