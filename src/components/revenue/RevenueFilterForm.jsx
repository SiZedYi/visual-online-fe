import React from "react";
import { Form, DatePicker, Select, Button, Row, Col } from "antd";
const { Option } = Select;

const RevenueFilterForm = ({ onFilter }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onFilter(values.type, values.date);
  };

  return (
    <Form layout="inline" onFinish={onFinish} form={form}>
      <Form.Item name="type" initialValue="day">
        <Select style={{ width: 120 }}>
          <Option value="day">Ngày</Option>
          <Option value="month">Tháng</Option>
          <Option value="year">Năm</Option>
        </Select>
      </Form.Item>
      <Form.Item name="date" rules={[{ required: true, message: "Chọn thời gian" }]}>
        <DatePicker picker="date" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Thống kê
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RevenueFilterForm;
