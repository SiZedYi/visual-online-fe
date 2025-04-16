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
        <Input />
      </Form.Item>

      <Form.Item
        name="color"
        label="Color"
        rules={[{ required: true, message: "Please input the color!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="model"
        label="Model"
        rules={[{ required: true, message: "Please input the model!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="ownerInfo.name"
        label="Owner Name"
        rules={[{ required: true, message: "Please input the owner's name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="ownerInfo.contactInfo"
        label="Owner Contact Info"
        rules={[{ required: true, message: "Please input the owner's contact!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="entryTime" label="Entry Time">
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>

      <Form.Item
        name="currentSpot"
        label="Current Spot"
      >
        <Select>
          <Select.Option value="A1">A1</Select.Option>
          <Select.Option value="A2">A2</Select.Option>
          <Select.Option value="A3">A3</Select.Option>
          <Select.Option value="A4">A4</Select.Option>
        </Select>
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
