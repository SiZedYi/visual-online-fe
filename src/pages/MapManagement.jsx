import React from "react";
import { Layout } from "antd";
import Sidebar from "../components/layout/Sidebar";

const { Content } = Layout;

const MapManagement = () => {
  return (
    <Layout style={{ minHeight: "100vh", display: "flex" }}>
      <Sidebar />
      <Layout style={{ padding: 20 }}>
        <Content style={{ background: "#fff", padding: 20, borderRadius: 10 }}>
          <h2>Map Management</h2>
          <p>Manage your parking slots here.</p>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MapManagement;
