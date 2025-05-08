import React from "react";

const InvoiceItem = ({ problem, showButtons, onResolve, onCancel }) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h4>{problem.user} - {problem.apartment}</h4>
      <p>{problem.description}</p>
      <p style={{ fontStyle: "italic", fontSize: 12 }}>Ngày gửi: {problem.date}</p>

      {showButtons && (
        <div style={{ marginTop: 10 }}>
          <button
            onClick={() => onResolve(problem.id)}
            style={{
              backgroundColor: "#4caf50",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: 6,
              marginRight: 10,
            }}
          >
            Approved
          </button>
          <button
            onClick={() => onCancel(problem.id)}
            style={{
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: 6,
            }}
          >
            Hủy
          </button>
        </div>
      )}
    </div>
  );
};

export default InvoiceItem;
