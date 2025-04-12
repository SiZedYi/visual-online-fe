import React, { useState } from "react";
import { Layout, Menu, Avatar, Button, Row, Col } from "antd";
import "./index.css"; // Assuming you have a CSS file for styles
import {
  DashboardOutlined,
  CarOutlined,
  BarChartOutlined,
  WarningOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
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
      style={{
        height: "100vh",
        background: "#f8f9fd",
        position: "relative",
        borderRadius: "20px",
        overflow: "auto",
      }}
      trigger={null} // We'll use a custom trigger
    >
      {/* Toggle Button - Top Right Corner */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 1,
          cursor: "pointer",
          fontSize: 18,
          color: "#790097",
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
          transition: "all 0.3s",
        }}
      >
        {!collapsed ? (
          <>
            VISUAL ONLINE <br />
            <span style={{ fontSize: 20, color: "#333" }}>PARKING MANAGER</span>
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
            icon: <DashboardOutlined style={{ marginRight: 10 }} />,
            label: (
              <NavLink style={{ padding: "20px" }} to="/" replace>
                Dashboard
              </NavLink>
            ),
            style: { height: "70px", lineHeight: "70px", borderRadius: "10px" },
          },
          {
            key: "/map",
            icon: <CarOutlined style={{ marginRight: 10 }} />,
            label: (
              <NavLink style={{ padding: "20px" }} to="/map" replace>
                Map Management
              </NavLink>
            ),
            style: { height: "70px", lineHeight: "70px", borderRadius: "10px" },
          },
          {
            key: "/vehicle",
            icon: <CarOutlined style={{ marginRight: 10 }} />,
            label: (
              <NavLink style={{ padding: "20px" }} to="/vehicle" replace>
                Vehicle Management
              </NavLink>
            ),
            style: { height: "70px", lineHeight: "70px", borderRadius: "10px" },
          },
          {
            key: "/analyst",
            icon: <BarChartOutlined style={{ marginRight: 10 }} />,
            label: (
              <NavLink style={{ padding: "20px" }} to="/analyst" replace>
                Analyst
              </NavLink>
            ),
            style: { height: "70px", lineHeight: "70px", borderRadius: "10px" },
          },
          {
            key: "/problem",
            icon: <WarningOutlined style={{ marginRight: 10 }} />,
            label: (
              <NavLink style={{ padding: "20px" }} to="/problem" replace>
                Problems
              </NavLink>
            ),
            style: { height: "70px", lineHeight: "70px", borderRadius: "10px" },
          },
          {
            key: "/roles",
            icon: <UserOutlined style={{ marginRight: 10 }} />,
            label: (
              <NavLink style={{ padding: "20px" }} to="/roles" replace>
                Roles and Permission
              </NavLink>
            ),
            style: { height: "70px", lineHeight: "70px", borderRadius: "10px" },
          },
        ]}
      />
      {/* User Info - Bottom Fixed */}
      {!collapsed && (
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #f0f0f0",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            position: "absolute",
            bottom: "10px",
          }}
        >
          {/* User Info Section (2/3) */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 12, flex: 2 }}
          >
            <Avatar
              size={40}
              src="https://api.dicebear.com/7.x/personas/svg?seed=User"
            />
            <div>
              <div style={{ fontWeight: 600 }}>sizedyi</div>
              <div style={{ fontSize: 12, color: "#888" }}>User</div>
            </div>
          </div>

          {/* Logout Button (1/3) */}
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Button color="danger" variant="solid">
            Log out
          </Button>
          </div>
        </div>
      )}
    </Sider>
  );
};

export default React.memo(Sidebar);;
