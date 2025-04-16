// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import Dashboard from "./pages/Dashboard";
import MapManagement from "./pages/MapManagement";
import VehicleManagement from "./pages/VehicleManagement";
import AppLayout from "./components/layout/AppLayout";
import Login from "./pages/Login";
import RevenueStatistics from "./pages/RevenueStatistics";
import ProblemManagement from "./pages/ProblemManagement";
import CarManagement from "./pages/CarManagement";
import PrivateRoute from "./components/auth/PrivateRoute";
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
          <Route path="/login" element={<Login />} />
          <Route path="/"  element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            } >
            <Route index element={<Dashboard />} />
            <Route path="map" element={<MapManagement />} />
            <Route path="vehicle" element={<VehicleManagement />} />
            <Route path="revenue" element={<RevenueStatistics/>}/> 
            <Route path="problem" element={<ProblemManagement/>}/> 
            <Route path="car" element={<CarManagement/>}/> 
            {/* Thêm các route khác nếu có */}
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
