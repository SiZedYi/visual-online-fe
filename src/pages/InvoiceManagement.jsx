import React, { useState, useEffect } from "react";
import InvoiceItem from "../components/invoice/InvoiceItem";
import { Tabs, Select, Spin, message, DatePicker, Tag } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { getPayments } from "../api/parking-lot/api";
import { CaretDownOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;
const getStatusTag = (status) => {
  switch (status) {
    case "pending":
      return <Tag color="orange">Pending</Tag>;
    case "paid":
      return <Tag color="green">Paid</Tag>;
    case "overdue":
      return <Tag color="red">Overdue</Tag>;
    default:
      return <Tag>Unknown</Tag>;
  }
};

const InvoiceManagement = () => {
  const [filter, setFilter] = useState("year");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      // build query params
      const params = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const res = await getPayments(params);
      const data = res.data.map((inv) => ({
        id: inv.id,
        user: inv.user,
        apartment: inv.apartment,
        description: inv.description,
        amount: inv.amount,
        date: inv.date, // YYYY-MM-DD
        status: inv.status,
      }));
      setInvoices(data);
    } catch (err) {
      console.error(err);
      message.error("Failed to load invoices");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInvoices();
  }, [startDate, endDate]);

  const handleMarkAsPaid = (id) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: "paid" } : inv))
    );
    // Optionally: POST to backend to update status
  };

  const handleCancel = (id) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    // Optionally: POST to backend to delete/cancel
  };

  const unpaid = invoices.filter((inv) => inv.status !== "paid");
  const paid = invoices.filter((inv) => inv.status === "paid");

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <Select
          value={filter}
          suffixIcon={null}
          onChange={(value) => {
            setFilter(value);
            const today = dayjs();
            if (value === "day") {
              setStartDate(today.startOf("day").toISOString());
              setEndDate(today.endOf("day").toISOString());
            } else if (value === "month") {
              setStartDate(today.startOf("month").toISOString());
              setEndDate(today.endOf("month").toISOString());
            } else if (value === "year") {
              setStartDate(today.startOf("year").toISOString());
              setEndDate(today.endOf("year").toISOString());
            } else {
              setStartDate(null);
              setEndDate(null);
            }
          }}
          style={{ width: 200, marginRight: 10 }}
        >
          {/* <Option value="day">Today</Option> */}
          <Option value="month">This Month</Option>
          <Option value="year">This Year</Option>
          <Option value="custom">Custom Range</Option>
        </Select>

        {filter === "custom" && (
          <RangePicker
            onChange={(dates) => {
              if (dates) {
                setStartDate(dates[0].startOf("day").toISOString());
                setEndDate(dates[1].endOf("day").toISOString());
              } else {
                setStartDate(null);
                setEndDate(null);
              }
            }}
          />
        )}
      </div>

      {loading ? (
        <Spin />
      ) : (
        <Tabs defaultActiveKey="1" style={{ marginTop: 20 }}>
          <TabPane tab="Unpaid" key="1">
            {unpaid.length === 0 ? (
              <p>All invoices are paid</p>
            ) : (
              unpaid.map((invoice) => (
                <div key={invoice.id}>
                  {getStatusTag(invoice.status)}
                  <InvoiceItem
                    invoice={invoice}
                    showButtons
                    onMarkAsPaid={handleMarkAsPaid}
                    onCancel={handleCancel}
                    dateLabel="Due Date"
                  />
                </div>
              ))              
            )}
          </TabPane>

          <TabPane tab="Paid" key="2">
            {paid.length === 0 ? (
              <p>No paid invoices</p>
            ) : (
              paid.map((invoice) => (
                <div key={invoice.id}>
                  {getStatusTag(invoice.status)}
                  <InvoiceItem invoice={invoice} showButtons={false} dateLabel="Payment Date" />
                </div>
              ))
            )}
          </TabPane>
        </Tabs>
      )}
    </div>
  );
};

export default InvoiceManagement;
