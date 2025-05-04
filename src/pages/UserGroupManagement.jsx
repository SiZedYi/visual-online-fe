import React, { useState, useEffect } from "react";
import { Layout,} from "antd";
import UserGroupCreate from "../components/user/UserGroupCreate";

const { Content } = Layout;

const UserGroupManagement = () => {
  return (
    <Content style={{ background: "#fff", padding: 20, borderRadius: 20 }}>
      <UserGroupCreate/>
    </Content>
  );
};

export default UserGroupManagement;
