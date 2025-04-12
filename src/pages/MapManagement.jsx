import React, { useState } from "react";
import {
  Layout,
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  Row,
  Col,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Sidebar from "../components/layout/Sidebar";
import ParkingMapTable from "../components/map/ParkingMapTable";

const { Content } = Layout;
const { Option } = Select;
const parkingData = [
  {
    id: "1",
    name: "Floor 1",
    description: "Main map",
    width: 1200,
    height: 800,
    svgPath: "/maps/map1.svg",
    spots: [], // sẽ bị ẩn khỏi table
  },
  // ...
];
const MapManagement = () => {
  const [parkingSpots, setParkingSpots] = useState([]);

  const onFinish = (values) => {
    const payload = {
      ...values,
      parkingSpots,
    };
    console.log("Submit:", payload);
  };

  return (
    <Content style={{ background: "#fff", padding: 20, borderRadius: 10 }}>
      <h2>Map Management</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input style={{ padding: "8px 12px" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="width" label="Width" rules={[{ required: true }]}>
              <InputNumber
                min={100}
                style={{ width: "100%", height: 40, padding: "8px 12px" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="height"
              label="Height"
              rules={[{ required: true }]}
            >
              <InputNumber
                min={100}
                style={{ width: "100%", height: 40, padding: "8px 12px" }}
              />
            </Form.Item>
          </Col>
        </Row>
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
        <Form.Item style={{ marginTop: 20 }}>
          <Button type="primary" htmlType="submit">
            Save Map
          </Button>
        </Form.Item>

        {/* Table map */}
        <ParkingMapTable data={parkingData} />

      </Form>
    </Content>
  );
};

export default MapManagement;
