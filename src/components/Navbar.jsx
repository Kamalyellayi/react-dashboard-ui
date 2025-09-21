import React from "react";

function Navbar() {
  return (
    <div style={{
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      borderBottom: "1px solid rgba(255,255,255,0.1)"
    }}>
      <h2 style={{ color: "#fff" }}>Fintech Dashboard</h2>
    </div>
  );
}

export default Navbar;
