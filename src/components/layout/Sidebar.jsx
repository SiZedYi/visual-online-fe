import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  CarOutlined,
  BarChartOutlined,
  WarningOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";
import { useLocation, NavLink } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={350}
      style={{ height: "100vh", background: "#f8f9fd", position: "relative" }}
      trigger={null} // We'll use a custom trigger
    >
      {/* Toggle Button - Top Right Corner */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1,
          cursor: "pointer",
          fontSize: 18,
          color: "#790097"
        }}
        onClick={toggleCollapsed}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>

      {/* Title */}
      <div
        style={{
          padding: collapsed ? "20px 20px 0 20px" : 20,
          fontWeight: "bold",
          fontSize: collapsed ? 20 : 36,
          color: "#790097",
          transition: "all 0.3s"
        }}
      >
        {!collapsed ? (
          <>
            VISUAL ONLINE <br />
            <span style={{ fontSize: 20, color: "#333" }}>
              PARKING MANAGER
            </span>
          </>
        ) : (
          ""
        )}
      </div>

      {/* Menu */}
      <Menu
        mode="vertical"
        selectedKeys={[location.pathname]}
        style={{ borderRadius: "10px", marginTop: 20 }}
        items={[
          {
            key: "/",
            icon: <DashboardOutlined />,
            label: <NavLink to="/">Dashboard</NavLink>,
          },
          {
            key: "/map",
            icon: <CarOutlined />,
            label: <NavLink to="/map">Map Management</NavLink>,
          },
          {
            key: "/vehicle",
            icon: <CarOutlined />,
            label: <NavLink to="/vehicle">Vehicle Management</NavLink>,
          },
          {
            key: "/analyst",
            icon: <BarChartOutlined />,
            label: <NavLink to="/analyst">Analyst</NavLink>,
          },
          {
            key: "/problem",
            icon: <WarningOutlined />,
            label: <NavLink to="/problem">Problems</NavLink>,
          },
          {
            key: "/roles",
            icon: <UserOutlined />,
            label: <NavLink to="/roles">Roles and Permission</NavLink>,
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
