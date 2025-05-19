// AppLayout.jsx
import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <Layout
        style={{
          padding: 24,
          overflowY: "auto", // scroll chỉ bên nội dung
          backgroundColor: "#e7e9f6",
        }}
      >
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default AppLayout;

// generate this into svg image and delete all text, arrow (width: 1100, height: 700), after that generate all spot corresponding to the map with this tructure:
// 'map1': {
//       width: 1100,
//       height: 700,
//       svgPath: '/maps/map1.svg', // Path to the SVG file
//       // Parking spot data structure
//       spots: [
//         // Left Section - Row 1
//         { id: 'A1', x: 30, y: 10, width: 40, height: 70 },
//         { id: 'A2', x: 80, y: 10, width: 30, height: 70 },
// ]
// }