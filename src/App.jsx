// App.jsx
import React from "react";
import "antd/dist/reset.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import Dashboard from "./pages/Dashboard";
import MapManagement from "./pages/MapManagement";
import AppLayout from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RevenueStatistics from "./pages/RevenueStatistics";
import InvoiceManagement from "./pages/InvoiceManagement";
import CarManagement from "./pages/CarManagement";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";
import UserGroupManagement from "./pages/UserGroupManagement";
import UserManagement from "./pages/UserManagement";
const config = {
  token: {
    fontFamily: "Roboto",
    fontSize: "18px",
    colorPrimary: "#6C5CE7",
  },
};

const App = () => {
  return (
    <ConfigProvider theme={config}>
      <Router>
        <Routes>
          {/* Public route - redirect to "/" if already logged in */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Private routes - redirect to "/login" if not logged in */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="map" element={<MapManagement />} />
            <Route path="revenue" element={<RevenueStatistics />} />
            <Route path="billing" element={<InvoiceManagement />} />
            <Route path="car" element={<CarManagement />} />
            <Route path="user-group" element={<UserGroupManagement/>} />
            <Route path="users" element={<UserManagement/>} />

            {/* Add more protected routes as needed */}
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
