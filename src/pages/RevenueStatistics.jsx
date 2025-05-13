import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Card, message } from "antd";
import CountUp from "react-countup";
import RevenueFilterForm from "../components/revenue/RevenueFilterForm";
import RevenueChart from "../components/revenue/RevenueChart";
import VehicleGaugeChart from "../components/revenue/VehicleGaugeChart";
import { getRevenueStats, getSummaryStats } from "../api/parking-lot/api";
import InvoiceStatusSummary from "../components/revenue/InvoiceSummary";

const { Content } = Layout;

const RevenueStatistics = () => {
  const [filterType, setFilterType] = useState("year");
  const [selectedDate, setSelectedDate] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCars, setTotalCars] = useState(0);
  const [totalSpots, setTotalSpots] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [revenueData, setRevenueData] = useState([]);

  const fetchSummary = async () => {
    try {
      const res = await getSummaryStats();
      setTotalCars(res.data.totalCars);
      setTotalSpots(res.data.totalSpots);
      setTotalUsers(res.data.totalUsers);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch summary stats");
    }
  };

  const fetchRevenue = async (type, date) => {
    try {
      const res = await getRevenueStats(type, date);
      setRevenueData(res.data);

      const total = res.data
        .filter((d) => d.status === "paid")
        .reduce((sum, d) => sum + d.value, 0);

      setTotalRevenue(total);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch revenue data");
    }
  };

  const handleFilter = (type, date) => {
    setFilterType(type);
    setSelectedDate(date);
    fetchRevenue(type, date);
  };

  useEffect(() => {
    fetchSummary();
    fetchRevenue(filterType, selectedDate);
  }, []);

  return (
    <Content style={{ background: "#fff", padding: 20, borderRadius: 20 }}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card headStyle={{ fontSize: 18, fontWeight: "bold", padding: 15, backgroundColor: "#E6E6FA" }} title="Total Vehicles / Spots">
            <VehicleGaugeChart currentCars={totalCars} totalSpots={totalSpots} />
          </Card>
        </Col>

        <Col span={12} style={{ height: "100%" }}>
          <Row gutter={[0, 16]} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Col style={{ flex: 1 }}>
              <Card headStyle={{ fontSize: 18, fontWeight: "bold", padding: 15, backgroundColor: "#E6E6FA" }} title="Total Apartment Owners" style={{ height: "100%" }}>
                <h2 style={{ textAlign: "center", fontSize: 32 }}>
                  <CountUp end={totalUsers} duration={2} separator="," /> Users
                </h2>
              </Card>
            </Col>
            <Col style={{ flex: 1 }}>
              <Card headStyle={{ fontSize: 18, fontWeight: "bold", padding: 15, backgroundColor: "#E6E6FA" }} title="Total Invoice By Status" style={{ height: "100%" }}>
                <div style={{ marginTop: 16 }}>
                  <InvoiceStatusSummary data={revenueData} />
                </div>
              </Card>
            </Col>
          </Row>
        </Col>


        <Col span={24}>
          <RevenueFilterForm onFilter={handleFilter} />
        </Col>

        <Col span={24}>
          <Card
            headStyle={{ fontSize: 18, fontWeight: "bold", padding: 15, backgroundColor: "#E6E6FA" }}
            title={`Total Revenue (Paid): ${(totalRevenue * 1000).toLocaleString()} VND`}
          >
            <RevenueChart data={revenueData} />
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default RevenueStatistics;
