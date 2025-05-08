import React, { useState, useEffect } from "react";
import { Layout, Spin } from "antd";
import Sidebar from "../components/layout/Sidebar";
import ParkingLot from "../components/parking/ParkingLot";
import { getParkingSpots } from "../api/parking-lot/api";

const Dashboard = () => {
  const [parkingLayout, setParkingLayout] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState(null);
  // Automatically set layout to 'map1' on page load
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
    const loadDefaultLayout = async () => {
      try {
        setIsProcessing(true);

        const layout = await getParkingSpots('floor1', user?.isAdmin)

        setParkingLayout(layout.data);

      } catch (error) {
        alert("Failed to load default layout: " + error.message);
      } finally {
        setIsProcessing(false);
      }
    };

    loadDefaultLayout();
  }, []);

  return (
    <>
      {isProcessing ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Spin color="primary" />
        </div>
      ) : parkingLayout ? (
        <ParkingLot
          initialLayout={parkingLayout}
          onLayoutChange={(layout) => console.log("Layout updated:", layout)}
          parkingLotId="floor1"
          user={user}
        />
      ) : (
        <div className="text-center p-8 bg-gray-100 rounded">
          <p>Failed to load the default layout. Please refresh the page.</p>
        </div>
      )}
    </>
  );
};

export default Dashboard;
