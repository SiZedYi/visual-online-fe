import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Typography, Row, Col, Image } from "antd";
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
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
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
        padding: 20,
      }}
    >
      <Row
        style={{
          width: "100%",
          maxWidth: 900,
          backgroundColor: "#fff",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        {/* Left - Form */}
        <Col xs={24} md={12}>
          <div
            style={{
              height: "100%",
              padding: 40,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: 30 }}>Register</h2>
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
              <Text>
                Already have an account?{" "}
                <Link style={{ color: "#6c5ce7" }} to="/login">
                  Login now
                </Link>
              </Text>
            </div>
          </div>
        </Col>

        {/* Right - Image */}
        <Col xs={0} md={12}>
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
        </Col>
      </Row>
    </div>
  );
};

export default Register;
