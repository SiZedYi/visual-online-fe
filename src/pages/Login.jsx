import React, { useState } from "react";
import { Form, Input, Button, message, Typography, Row, Col, Image } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const { Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", values);
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        message.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      message.error("Wrong username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
<div
  style={{
    height: "100vh",
    backgroundColor: "#e7e9f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <div
    style={{
      width: 900,
      height: 500,
      display: "flex",
      borderRadius: 20,
      overflow: "hidden",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
    }}
  >
    {/* Form */}
    <div
      style={{
        flex: 1,
        padding: 40,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Login</h2>
      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input placeholder="Enter your username" style={{ padding: "10px" }} />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Enter your password" style={{ padding: "10px" }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <Text>
          Don't have an account?{" "}
          <Link style={{ color: "#6c5ce7" }} to="/register">
            Sign up now
          </Link>
        </Text>
      </div>
    </div>

    {/* Image */}
    <div style={{ flex: 1, height: "100%" }}>
      <img
        src="https://images.cars.com/cldstatic/wp-content/uploads/202406-data-insights-insurance-reduced.gif"
        alt="Login"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  </div>
</div>
  );
};

export default Login;
