import React from "react";
import { Form, Input, Button, DatePicker, Select } from "antd";

const CarForm = ({ onFinish, form, editing }) => {
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="licensePlate"
        label="License Plate"
        rules={[{ required: true, message: "Please input the license plate!" }]}
      >
        <Input placeholder="License Plate" style={{ padding: "8px 12px" }}/>
      </Form.Item>

      <Form.Item
        name="color"
        label="Color"
        rules={[{ required: true, message: "Please input the color!" }]}
      >
        <Select
                  placeholder="Select a color"
                  suffixIcon={null}
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
        name="model"
        label="Model"
        rules={[{ required: true, message: "Please input the model!" }]}
      >
        <Input placeholder="Model" style={{ padding: "8px 12px" }}/>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {editing ? "Update" : "Add"} Car
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CarForm;
