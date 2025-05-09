import React, { useEffect } from "react";
import { Form, Input, Button, Select } from "antd";

const colorOptions = [
  { value: '#FF5733', label: 'Red' },
  { value: '#33FF57', label: 'Green' },
  { value: '#3357FF', label: 'Blue' },
  { value: '#FFD700', label: 'Yellow' },
  { value: '#000000', label: 'Black' },
  { value: '#FFFFFF', label: 'White' }
];

const formatFloorName = (floor) => {
  if (!floor) return "";
  return floor.replace(/floor(\d+)/i, (match, number) => `Floor ${number}`);
};

const CarForm = ({ onFinish, form, editing }) => {
  useEffect(() => {
    if (editing) {
      form.setFieldsValue({
        licensePlate: editing.licensePlate,
        carModel: editing.model,
        carColor: editing.color,
        ownerName: editing.ownerInfo?.name,
        contactInfo: editing.ownerInfo?.contactInfo,
        apartment: editing.ownerInfo?.apartment,
      });
    }
  }, [editing, form]);

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
       
          <div style={{ padding: '8px 12px', border: "#6C5CE7 1px solid", backgroundColor: "#feecff",borderRadius: '6px' }}>
            {editing?.currentSpot?.floor ? editing.currentSpot.floor.replace(/floor(\d+)/i, 'Floor $1') : 'Not parked'}
          </div>

          <div style={{ padding: '8px 12px', border: "#6C5CE7 1px solid",backgroundColor: "#feecff", borderRadius: '6px' }}>
            {editing?.currentSpot?.spotId || 'Not parked'}
          </div>
      </div>


      <Form.Item
        name="licensePlate"
        label="License Plate"
        rules={[{ required: true, message: "Please input the license plate!" }]}
      >
        <Input placeholder="License Plate" style={{ padding: '8px 12px' }} />
      </Form.Item>

      <Form.Item
        name="carModel"
        label="Model"
        rules={[{ required: true, message: "Please input the model!" }]}
      >
        <Input placeholder="Model" style={{ padding: '8px 12px' }} />
      </Form.Item>

      <Form.Item
        name="carColor"
        label="Color"
        rules={[{ required: true, message: "Please select the color!" }]}
      >
        <Select placeholder="Select a color" options={colorOptions} />
      </Form.Item>

      <Form.Item
        name="ownerName"
        label="Owner Name"
        rules={[{ required: true, message: "Please input the owner name!" }]}
      >
        <Input placeholder="Owner Name" style={{ padding: '8px 12px' }} />
      </Form.Item>

      <Form.Item
        name="contactInfo"
        label="Contact Info"
      >
        <Input placeholder="Contact Info" style={{ padding: '8px 12px' }} />
      </Form.Item>

      <Form.Item
        name="apartment"
        label="Apartment"
      >
        <Input placeholder="Apartment" style={{ padding: '8px 12px' }} />
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
