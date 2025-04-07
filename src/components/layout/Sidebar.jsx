import React from "react";
import { Layout, Menu } from "antd";
import { DashboardOutlined, CarOutlined, BarChartOutlined, WarningOutlined, UserOutlined } from "@ant-design/icons";
import { useLocation, NavLink } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại
  
  return (
    <Sider width={350} style={{ height: "100vh", background: "#f8f9fd" }}>
      <div style={{ padding: 20, fontWeight: "bold", fontSize: 36, color: "#790097" }}>
        VISUAL ONLINE <br /> <span style={{ fontSize: 25, color: "#333" }}>PARKING MANAGER</span>
      </div>

      <Menu
        mode="vertical"
        selectedKeys={[location.pathname]} // Đặt key dựa vào đường dẫn hiện tại
        style={{ borderRadius: "10px" }}
        items={[
          {
            key: "/",
            icon: <DashboardOutlined />,
            label: <NavLink style={{padding:"20px"}} to="/" className="menu-link">Dashboard</NavLink>,
            style: { height: "60px", lineHeight: "60px", borderRadius: "10px" },
          },
          {
            key: "/map",
            icon: <CarOutlined />,
            label: <NavLink style={{padding:"20px"}} to="/map" className="menu-link">Map Management</NavLink>,
            style: { height: "60px", lineHeight: "60px", borderRadius: "10px" },
          },
          {
            key: "/vehicle",
            icon: <CarOutlined />,
            label: <NavLink style={{padding:"20px"}} to="/vehicle" className="menu-link">Vehicle Management</NavLink>,
            style: { height: "60px", lineHeight: "60px", borderRadius: "10px" },
          },
          {
            key: "/analyst",
            icon: <BarChartOutlined />,
            label: <NavLink style={{padding:"20px"}} to="/analyst" className="menu-link">Analyst</NavLink>,
            style: { height: "60px", lineHeight: "60px", borderRadius: "10px" },
          },
          {
            key: "/problem",
            icon: <WarningOutlined />,
            label: <NavLink style={{padding:"20px"}} to="/problem" className="menu-link">Problems</NavLink>,
            style: { height: "60px", lineHeight: "60px", borderRadius: "10px" },
          },
          {
            key: "/roles",
            icon: <UserOutlined />,
            label: <NavLink style={{padding:"20px"}} to="/roles" className="menu-link">Roles and Permission</NavLink>,
            style: { height: "60px", lineHeight: "60px", borderRadius: "10px" },
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
