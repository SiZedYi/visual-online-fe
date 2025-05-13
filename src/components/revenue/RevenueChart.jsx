import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Map status to colors
const STATUS_COLORS = {
  paid: "#52c41a",     // xanh lá
  pending: "#1890ff",  // xanh dương
  overdue: "#ff4d4f",  // đỏ
};

// Hàm format tiền tệ
const formatCurrency = (value) => {
  return `${(value * 1000).toLocaleString("vi-VN")} VND`;
};

const RevenueChart = ({ data }) => {
  const labels = [...new Set(data.map((item) => item.label))];

  const series = {};
  data.forEach(({ label, status, value }) => {
    if (!series[status]) {
      series[status] = {};
    }
    series[status][label] = value;
  });

  const chartData = labels.map((label) => {
    const entry = { label };
    Object.keys(series).forEach((status) => {
      entry[status] = series[status][label] || 0;
    });
    return entry;
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="label" />
        <YAxis
          width={100}
        />
        <Tooltip
          formatter={(value, name) => [formatCurrency(value), name]}
        />
        <Legend />
        {Object.keys(series).map((status) => (
          <Line
            key={status}
            type="monotone"
            dataKey={status}
            stroke={STATUS_COLORS[status] || "#8884d8"}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
