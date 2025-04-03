import React from "react";
import { Layout } from "antd";
import Sidebar from "../components/layout/Sidebar";
import ParkingLot from "../components/parking/ParkingLot";

const { Content } = Layout;

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh", display: "flex" }}>
      <Sidebar />
      <Layout style={{ padding: 20 }}>
        {/* <Content style={{ background: "#fff", padding: 20, borderRadius: 10 }}>
          <h2>Dashboard</h2>
          <p>Welcome to Parking Manager Dashboard</p>
        </Content> */}
        <ParkingLot />
      </Layout>
    </Layout>
  );
};

export default Dashboard;
