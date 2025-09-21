// Dialog.jsx
import React from "react";

const Dialog = ({ title, message, options = [], onClose }) => {
  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={dialogStyle} onClick={(e) => e.stopPropagation()}>
        {title && <h3 style={{ marginBottom: "10px" }}>{title}</h3>}
        <p style={{ marginBottom: "20px" }}>{message}</p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          {options.map((opt) => (
            <button
              key={opt.label}
              style={stylishGreenBtn}
              onMouseEnter={(e) => Object.assign(e.target.style, stylishGreenBtnHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, stylishGreenBtn)}
              onClick={opt.onClick}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dialog;

// Styles
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const dialogStyle = {
  background: "#1a1a1a",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.7)",
  minWidth: "300px",
  maxWidth: "90%",
};

const stylishGreenBtn = {
  padding: "10px 20px",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  color: "#000",
  background: "linear-gradient(90deg, #00FFA3, #00C49F)",
  boxShadow: "0 4px 12px rgba(0,196,159,0.5)",
  transition: "all 0.3s ease",
};

const stylishGreenBtnHover = {
  boxShadow: "0 6px 20px rgba(0,196,159,0.7)",
  transform: "translateY(-2px)",
};
