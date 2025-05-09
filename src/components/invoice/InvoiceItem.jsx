import React from "react";

const InvoiceItem = ({ invoice, showButtons, onMarkAsPaid, onCancel, dateLabel }) => {
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
      <h4>{invoice.user} - {invoice.apartment}</h4>
      <p>{invoice.description}</p>
      <p>Total: {invoice.amount.toLocaleString()},000 VND</p>
      <p style={{ fontStyle: "italic", fontSize: 12 }}>
      {dateLabel}: {invoice.date}
      </p>

      {showButtons && (
        <div style={{ marginTop: 10 }}>
          <button
            onClick={() => onMarkAsPaid(invoice.id)}
            style={{
              backgroundColor: "#4caf50",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: 6,
              marginRight: 10,
            }}
          >
            Mark as Paid
          </button>
          {/* <button
            onClick={() => onCancel(invoice.id)}
            style={{
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: 6,
            }}
          >
            Cancel
          </button> */}
        </div>
      )}
    </div>
  );
};

export default InvoiceItem;
