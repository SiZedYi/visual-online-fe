import React from "react";
import { Line } from "@ant-design/charts";

const RevenueChart = ({ data }) => {
  const config = {
    data,
    xField: "label",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond",
    },
    smooth: true,
    height: 300,
  };

  return <Line {...config} />;
};

export default RevenueChart;
