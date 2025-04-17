import React, { useState, useEffect } from "react"; // <-- thêm useEffect
import { Form, Input, Button, message, Typography } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const { Text } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🚫 Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", values);
      if (response.data.success) {
        message.success(response.data.message);
        // 🔐 Save token and user
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/"); // 🚀 Redirect to home or dashboard
      } else {
        message.error("Registration failed. Please try again.");
      }
    } catch (error) {
      message.error("An error occurred during registration.");
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
          maxWidth: 500,
          width: "100%",
          backgroundColor: "#fff",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Register</h2>
        <Form layout="vertical" onFinish={handleRegister}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input placeholder="Enter your username" style={{ padding: "10px" }} />
          </Form.Item>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter your full name!" }]}
          >
            <Input placeholder="Enter your full name" style={{ padding: "10px" }} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" style={{ padding: "10px" }} />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: "Please enter your phone number!" }]}
          >
            <Input placeholder="Enter your phone number" style={{ padding: "10px" }} />
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
              Register
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Text>Already have an account? <Link style={{color: "#6c5ce7"}} to="/login">Login now</Link></Text>
        </div>
      </div>
    </div>
  );
};

export default Register;
