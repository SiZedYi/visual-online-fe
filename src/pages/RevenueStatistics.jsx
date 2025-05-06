import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Button, message, Card } from "antd";
import RevenueFilterForm from "../components/revenue/RevenueFilterForm";
import RevenueChart from "../components/revenue/RevenueChart";

const { Content } = Layout;

const RevenueStatistics = () => {
  const [filterType, setFilterType] = useState("day");
  const [selectedDate, setSelectedDate] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const fetchRevenue = (type, date) => {
   //này chỉ fake - em chưa gọi api
    const data = [
      { label: "2025-04-01", value: 100 },
      { label: "2025-04-02", value: 150 },
      { label: "2025-04-03", value: 120 },
    ];
    const total = data.reduce((sum, d) => sum + d.value, 0);
    setRevenueData(data);
    setTotalRevenue(total);
    message.success("Data has been updated");
  };

  const handleFilter = (type, date) => {
    setFilterType(type);
    setSelectedDate(date);
    fetchRevenue(type, date);
  };

  return (
    <Content style={{ background: "#fff", padding: 20, borderRadius: 20 }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <RevenueFilterForm onFilter={handleFilter} />
        </Col>
        <Col span={24}>
          <Card title={`Total: ${totalRevenue.toLocaleString()} VND`}>
            <RevenueChart data={revenueData} />
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default RevenueStatistics;
