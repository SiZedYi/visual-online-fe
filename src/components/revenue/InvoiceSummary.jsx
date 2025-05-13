import React from "react";
import { Tag, Table } from "antd";

const statusColors = {
  paid: "green",
  overdue: "red",
  pending: "blue",
};

const InvoiceStatusSummary = ({ data }) => {
  const grouped = data.reduce((acc, item) => {
    const { status, value } = item;

    if (!acc[status]) {
      acc[status] = { count: 0, total: 0 };
    }

    if (value > 0) {
      acc[status].count += 1;
      acc[status].total += value * 1000; // giá trị nhân 1000 để chuyển sang VND
    }

    return acc;
  }, {});

  const tableData = Object.entries(grouped).map(([status, { count, total }]) => ({
    key: status,
    status,
    count,
    total,
  }));

  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={statusColors[status] || "default"} style={{ width: 100, textAlign: "center" }}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Invoices",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Total Amount",
      dataIndex: "total",
      key: "total",
      render: (amount) => `${amount.toLocaleString()} VND`,
    },
  ];

  return <Table columns={columns} dataSource={tableData} pagination={false} size="small" />;
};

export default InvoiceStatusSummary;
