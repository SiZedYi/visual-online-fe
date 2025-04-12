import React, { useState, useEffect } from "react";
import { Layout, Spin } from "antd";
import Sidebar from "../components/layout/Sidebar";
import ParkingLot from "../components/parking/ParkingLot";
import { processImageToLayout } from "../services/imageProcessing";

const Dashboard = () => {
  const [parkingLayout, setParkingLayout] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Automatically set layout to 'map1' on page load
  useEffect(() => {
    const loadDefaultLayout = async () => {
      try {
        setIsProcessing(true);

        // Create a mock file to pass to processImageToLayout
        const mockFile = new File([""], "map1.jpg", {
          type: "image/jpeg",
        });

        const layout = await processImageToLayout(mockFile);
        setParkingLayout(layout);
        console.log("Default layout loaded:", layout);
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
