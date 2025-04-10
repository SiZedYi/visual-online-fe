import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import Dashboard from "./pages/Dashboard";
import MapManagement from "./pages/MapManagement";
import VehicleManagement from "./pages/VehicleManagement";
// import Analyst from "./pages/Analyst";
// import Problems from "./pages/Problems";
// import Roles from "./pages/Roles";

const config = {
  token: {
    fontFamily: "Roboto",
    fontSize: "18px",
  },
  components: {
    Menu: {
      itemSelected: "linear-gradient(90deg, #B2B2B2, #6c5ce7)", // Gradient màu khi active
      itemSelectedColor: "#333", // Màu chữ khi active
      itemBorderRadius: 20, // Bo góc 20px cho item active
      itemHoverBg: "#ddd", // Màu nền khi hover
      itemHoverColor: "#333", // Màu chữ khi hover
    },
  },
};


const App = () => {
  return (
    <ConfigProvider
      theme={config}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/map" element={<MapManagement />} />
          <Route path="/vehicle" element={<VehicleManagement />} />
          {/* <Route path="/analyst" element={<Analyst />} /> */}
          {/* <Route path="/problems" element={<Problems />} /> */}
          {/* <Route path="/roles" element={<Roles />} /> */}
        </Routes>
      </Router>

    </ConfigProvider>
  );
};

export default App;
