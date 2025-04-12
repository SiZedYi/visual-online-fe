// AppLayout.jsx
import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // đường dẫn tới Sidebar của bạn

const AppLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout style={{ padding: 24, overflow: "auto" }}>
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
