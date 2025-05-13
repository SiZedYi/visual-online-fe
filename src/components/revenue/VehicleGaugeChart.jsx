import React from "react";
import { Gauge } from "@ant-design/charts";

const VehicleGaugeChart = ({ currentCars, totalSpots }) => {
  const config = {
    width: 400,
    height: 300,
    autoFit: true,
    data: {
      target: currentCars,
      total: totalSpots,
      name: "Car Usage",
    },
    legend: false,
    range: {
      color: "#E0E0E0", 
      width: 16,
    },
    indicator: {
      pointer: {
        style: {
          stroke: "#6C5CE7", 
          lineWidth: 3,
        },
      },
      pin: {
        style: {
          stroke: "#6C5CE7", 
          fill: "#6C5CE7",   
        },
      },
    },
    gaugeStyle: {
      fill: "#6C5CE7", 
    },
    statistic: {
      title: {
        formatter: () => "Car Usage",
        style: {
          fontSize: "16px",
          color: "#4B535E",
        },
      },
      content: {
        formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        style: {
          fontSize: "24px",
          color: "#4B535E",
        },
      },
    },
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Gauge {...config} />
      <div style={{ marginTop: 16, fontSize: 14 }}>
        <span style={{ marginRight: 16 }}>
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              backgroundColor: "#48c074",
              borderRadius: "50%",
              marginRight: 6,
            }}
          />
          In spots cars
        </span>
        <span>
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              backgroundColor: "#E0E0E0",
              borderRadius: "50%",
              marginRight: 6,
            }}
          />
          Spots available
        </span>
      </div>
    </div>
  );
};

export default VehicleGaugeChart;
