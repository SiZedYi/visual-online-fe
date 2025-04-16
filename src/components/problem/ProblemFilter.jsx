import React from "react";

const ProblemFilter = ({ selected, onChange }) => {
  const filters = ["day", "month", "year"];

  return (
    <div style={{ marginBottom: 20 }}>
      {filters.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          style={{
            marginRight: 10,
            padding: "6px 12px",
            borderRadius: 20,
            border: "1px solid #ccc",
            backgroundColor: selected === item ? "#1890ff" : "#fff",
            color: selected === item ? "#fff" : "#000",
            fontWeight: selected === item ? "bold" : "normal",
          }}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default ProblemFilter;
