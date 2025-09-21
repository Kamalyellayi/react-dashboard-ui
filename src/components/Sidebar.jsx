import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiHome, FiList, FiBarChart2, FiSettings, FiLogOut } from "react-icons/fi";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoverIndex, setHoverIndex] = useState(null);

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "Transactions", icon: <FiList />, path: "/transactions" },
    { name: "Reports", icon: <FiBarChart2 />, path: "/reports" },
    { name: "Settings", icon: <FiSettings />, path: "/settings" },
    { name: "Logout", icon: <FiLogOut />, path: "/" },
  ];

  return (
    <div style={{
      width: "220px",
      background: "linear-gradient(180deg, #1f1f1f, #2a2a2a)",
      display: "flex",
      flexDirection: "column",
      paddingTop: "20px",
      borderRight: "1px solid rgba(255,255,255,0.1)"
    }}>
      {menuItems.map((item, index) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "14px 18px",
              fontSize: "16px",
              color: isActive ? "#ff8800" : "#ccc",
              background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
              borderLeft: isActive ? "4px solid #ff8800" : hoverIndex === index ? "4px solid #c0c0c0" : "4px solid transparent",
              borderRadius: "0 10px 10px 0",
              marginBottom: "6px",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span style={{ fontWeight: 500 }}>{item.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export default Sidebar;
