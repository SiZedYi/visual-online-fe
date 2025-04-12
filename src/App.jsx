// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import Dashboard from "./pages/Dashboard";
import MapManagement from "./pages/MapManagement";
import VehicleManagement from "./pages/VehicleManagement";
import AppLayout from "./components/layout/AppLayout"; // thêm dòng này

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
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="map" element={<MapManagement />} />
            <Route path="vehicle" element={<VehicleManagement />} />
            {/* Thêm các route khác nếu có */}
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
