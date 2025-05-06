import React, { useState } from "react";
import ProblemFilter from "../components/problem/ProblemFilter";
import ProblemItem from "../components/problem/ProblemItem";
import dayjs from "dayjs";
import { Tabs } from "antd"; // nhớ đã cài Ant Design

const { TabPane } = Tabs;

const ProblemManagement = () => {
  const [filter, setFilter] = useState("year");
  const [problems, setProblems] = useState([
    {
      id: 1,
      user: "Nguyễn Văn A",
      apartment: "CT1-A101",
      description: "Can't register car through app",
      date: "2025-04-16",
      status: "pending",
    },
    {
      id: 2,
      user: "Trần Thị B",
      apartment: "Block B-B204",
      description: "Blocking spot",
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
      {/* <ProblemFilter selected={filter} onChange={setFilter} /> */}

      <Tabs defaultActiveKey="1" style={{ marginTop: 20 }}>
        <TabPane tab="Problem" key="1">
          {pending.length === 0 ? (
            <p>Parking Lot working good</p>
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

        <TabPane tab="Approved" key="2">
          {resolved.length === 0 ? (
            <p>Parking Lot working good</p>
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
