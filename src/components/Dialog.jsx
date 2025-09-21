import React from "react";

function Dialog({ title, message, options = [], onSubmit, inputProps }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#1a1a1a",
          color: "#fff",
          padding: "25px",
          borderRadius: "12px",
          minWidth: "300px",
          maxWidth: "90%",
          position: "relative",
          boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
        }}
      >
        {/* Close X */}
        <button
          onClick={() => options.find((o) => o.label === "Cancel")?.onClick?.()}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <h2 style={{ marginTop: 0 }}>{title}</h2>
        <p>{message}</p>

        {inputProps && (
          <input
            type="text"
            {...inputProps}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              marginTop: "10px",
              background: "#222",
              color: "#fff",
            }}
          />
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={opt.onClick || (() => onSubmit && onSubmit())}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                background: "linear-gradient(90deg, #00FFA3, #00C49F)",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dialog;
