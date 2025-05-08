import React, { useState, useEffect } from "react";
import { Layout,} from "antd";
import UserCreate from "../components/user/UserCreate";

const { Content } = Layout;

const UserManagement = () => {
  return (
    <Content style={{ background: "#fff", padding: 20, borderRadius: 20 }}>
      <UserCreate/>
    </Content>
  );
};

export default UserManagement;
