import React, { useState } from "react";
import { Form, DatePicker, Select, Button } from "antd";
const { Option } = Select;

const RevenueFilterForm = ({ onFilter }) => {
  const [form] = Form.useForm();
  const [pickerType, setPickerType] = useState("month"); // state để lưu picker

  const onTypeChange = (value) => {
    setPickerType(value); // cập nhật picker theo lựa chọn
    form.setFieldsValue({ month: null }); // reset giá trị date khi đổi type
  };

  const onFinish = (values) => {
    onFilter(values.type, values.month);
  };

  return (
    <Form layout="inline" onFinish={onFinish} form={form}>
      <Form.Item name="type" initialValue="month">
        <Select style={{ width: 120 }} onChange={onTypeChange} suffixIcon={null}>
          <Option value="month">Month</Option>
          <Option value="year">Year</Option>
        </Select>
      </Form.Item>
      <Form.Item name="month" rules={[{ required: true, message: "Choose a time" }]}>
        <DatePicker style={{ padding: 5 }}  picker={pickerType} />
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
