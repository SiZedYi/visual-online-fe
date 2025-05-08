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
  IssuesCloseOutlined,
  BorderOuterOutlined,
} from "@ant-design/icons";
import { useLocation, NavLink } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {
      fullName: "Guest",
      role: "guest",
      permissions: [],
    }
  );
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Check if user is admin (by role or permission)
  const isAdmin = user.isAdmin;

  // Define all menu items
  const menuItems = [
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
    isAdmin && {
      key: "/map",
      icon: <BorderOuterOutlined style={{ marginRight: 10 }} />,
      label: (
        <NavLink style={{ padding: "20px" }} to="/map" replace>
          Map Management
        </NavLink>
      ),
      style: { height: "70px", lineHeight: "70px", borderRadius: "10px" },
    },
    {
      key: "/car",
      icon: <CarOutlined style={{ marginRight: 10 }} />,
      label: (
        <NavLink style={{ padding: "20px" }} to="/car" replace>
          Vehicle Management
        </NavLink>
      ),
      style: { height: "70px", lineHeight: "70px", borderRadius: "10px" },
    },
    isAdmin && {
      key: "/revenue",
      icon: <BarChartOutlined style={{ marginRight: 10 }} />,
      label: (
        <NavLink style={{ padding: "20px" }} to="/revenue" replace>
          Analyst
        </NavLink>
      ),
      style: { height: "70px", lineHeight: "70px", borderRadius: "10px" },
    },
    isAdmin && {
      key: "/billing",
      icon: <WarningOutlined style={{ marginRight: 10 }} />,
      label: (
        <NavLink style={{ padding: "20px" }} to="/billing" replace>
          Invoice Management
        </NavLink>
      ),
      style: { height: "70px", lineHeight: "70px", borderRadius: "10px" },
    },
    isAdmin && {
      key: "/roles",
      icon: <IssuesCloseOutlined style={{ marginRight: 10 }} />,
      label: (
        <NavLink style={{ padding: "20px" }} to="/user-group" replace>
          Roles and Permission
        </NavLink>
      ),
      style: { height: "70px", lineHeight: "70px", borderRadius: "10px" },
    },
    isAdmin && {
      key: "/users",
      icon: <UserOutlined style={{ marginRight: 10 }} />,
      label: (
        <NavLink style={{ padding: "20px" }} to="/users" replace>
          User Management
        </NavLink>
      ),
      style: { height: "70px", lineHeight: "70px", borderRadius: "10px" },
    },
  ].filter(Boolean); // Filter out false items

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
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
      }}
      trigger={null}
    >
      {/* Toggle Button */}
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
        items={menuItems}
      />

      {/* User Info */}
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
          <div
            style={{ display: "flex", alignItems: "center", gap: 12, flex: 2 }}
          >
            <Avatar
              size={40}
              src="https://api.dicebear.com/7.x/personas/svg?seed=User"
            />
            <div>
              <div style={{ fontWeight: 600 }}>{user.fullName}</div>
              <div style={{ fontSize: 12, color: "#888" }}>
                {user.role || "User"}
              </div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Button
              color="danger"
              variant="solid"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
            >
              Log out
            </Button>
          </div>
        </div>
      )}
    </Sider>
  );
};

export default Sidebar;

