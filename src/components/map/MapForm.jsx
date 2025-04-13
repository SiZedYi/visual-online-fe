import React from "react";
import { Form, Input, InputNumber, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const MapForm = ({ onFinish, form, editing }) => {
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      initialValues={editing}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input style={{ padding: "8px 12px" }} />
      </Form.Item>

      <Form.Item name="width" label="Width" rules={[{ required: true }]}>
        <InputNumber
          min={100}
          style={{ width: "100%", height: 40, padding: "8px 12px" }}
        />
      </Form.Item>

      <Form.Item name="height" label="Height" rules={[{ required: true }]}>
        <InputNumber
          min={100}
          style={{ width: "100%", height: 40, padding: "8px 12px" }}
        />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea style={{ padding: "8px 12px" }} rows={4} />
      </Form.Item>

      <Form.Item name="svgPath" label="Upload Map Image">
        <Upload beforeUpload={() => false} maxCount={1}>
          <Button icon={<UploadOutlined />} style={{ padding: "8px 12px" }}>
            Click to Upload
          </Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Map
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MapForm;
