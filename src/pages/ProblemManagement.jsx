import React, { useState } from "react";
import ProblemFilter from "../components/problem/ProblemFilter";
import ProblemItem from "../components/problem/ProblemItem";
import dayjs from "dayjs";
import { Tabs } from "antd"; // nhớ đã cài Ant Design

const { TabPane } = Tabs;

const ProblemManagement = () => {
  const [filter, setFilter] = useState("day");
  const [problems, setProblems] = useState([
    {
      id: 1,
      user: "Nguyễn Văn A",
      apartment: "CT1-A101",
      description: "Không thể đặt chỗ qua app",
      date: "2025-04-16",
      status: "pending",
    },
    {
      id: 2,
      user: "Trần Thị B",
      apartment: "Block B-B204",
      description: "Chỗ đỗ xe bị chiếm",
      date: "2025-04-15",
      status: "resolved",
    },
    {
      id: 3,
      user: "Lê Văn C",
      apartment: "CT2-A303",
      description: "Ứng dụng bị lỗi khi vào bản đồ",
      date: "2025-04-01",
      status: "pending",
    },
    {
      id: 4,
      user: "Phạm Thị D",
      apartment: "Block D-D102",
      description: "Xe khác đỗ chắn lối đi",
      date: "2025-04-12",
      status: "resolved",
    },
    {
      id: 5,
      user: "Đặng Văn E",
      apartment: "Block A-A205",
      description: "Chỗ đỗ bị nước ngập",
      date: "2025-04-11",
      status: "pending",
    },
    {
      id: 6,
      user: "Hoàng Thị F",
      apartment: "Block B-B110",
      description: "Người lạ đỗ xe trái phép",
      date: "2025-04-10",
      status: "resolved",
    },
    {
      id: 7,
      user: "Vũ Văn G",
      apartment: "Block C-C201",
      description: "Không có biển báo hướng dẫn",
      date: "2025-04-09",
      status: "pending",
    },
    {
      id: 8,
      user: "Ngô Thị H",
      apartment: "Block D-D305",
      description: "Thiếu ánh sáng khu vực đỗ xe",
      date: "2025-04-08",
      status: "resolved",
    },
    {
      id: 9,
      user: "Trịnh Văn I",
      apartment: "Block A-A303",
      description: "Va chạm khi đỗ xe",
      date: "2025-04-07",
      status: "pending",
    },
    {
      id: 10,
      user: "Lý Thị K",
      apartment: "Block B-B101",
      description: "Bụi bẩn nhiều ở bãi xe",
      date: "2025-04-06",
      status: "resolved",
    }
  ]);

  const handleResolve = (id) => {
    setProblems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "resolved" } : p))
    );
  };

  const handleCancel = (id) => {
    setProblems((prev) => prev.filter((p) => p.id !== id));
  };

  const filterProblems = (list) => {
    const today = dayjs();
    return list.filter((item) => {
      const itemDate = dayjs(item.date);
      if (filter === "day") return itemDate.isSame(today, "day");
      if (filter === "month") return itemDate.isSame(today, "month");
      if (filter === "year") return itemDate.isSame(today, "year");
      return true;
    });
  };

  const filteredProblems = filterProblems(problems);
  const pending = filteredProblems.filter((p) => p.status === "pending");
  const resolved = filteredProblems.filter((p) => p.status === "resolved");

  return (
    <div style={{ padding: 20 }}>
      <ProblemFilter selected={filter} onChange={setFilter} />

      <Tabs defaultActiveKey="1" style={{ marginTop: 20 }}>
        <TabPane tab="Chưa giải quyết" key="1">
          {pending.length === 0 ? (
            <p>Không có phản ánh.</p>
          ) : (
            pending.map((problem) => (
              <ProblemItem
                key={problem.id}
                problem={problem}
                showButtons
                onResolve={handleResolve}
                onCancel={handleCancel}
              />
            ))
          )}
        </TabPane>

        <TabPane tab="Đã giải quyết" key="2">
          {resolved.length === 0 ? (
            <p>Không có phản ánh.</p>
          ) : (
            resolved.map((problem) => (
              <ProblemItem
                key={problem.id}
                problem={problem}
                showButtons={false}
              />
            ))
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProblemManagement;
