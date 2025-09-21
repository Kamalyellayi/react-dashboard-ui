import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: "#000",
        position: "relative",
        fontFamily: "monospace",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        paddingLeft: "10%",
      }}
    >
      {/* Top Green Glow */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(0,255,128,0.5), transparent 70%)",
          filter: "blur(120px)",
        }}
      ></div>

      {/* Bottom Purple Glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          background: "radial-gradient(circle, rgba(80,0,255,0.7), transparent 70%)",
          filter: "blur(150px)",
        }}
      ></div>

      {/* Full Blurred Grid Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.15) 2px, transparent 2px)",
          backgroundSize: "40px 40px",
          filter: "blur(25px)",
        }}
      ></div>

      {/* Circular Window with Grid and Smooth Fade */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "7%",
          width: "283px",
          height: "255px",
          borderRadius: "50%",
          overflow: "hidden",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Grid inside the circle */}
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.2) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.2) 2px, transparent 2px)",
            backgroundSize: "40px 40px",
            position: "relative",
          }}
        >
          {/* Inner radial fade for smooth edges */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0) 40%, rgba(0,0,0,0.85) 100%)",
              pointerEvents: "none",
            }}
          ></div>
        </div>
      </div>

      {/* Left Content */}
      <div style={{ zIndex: 2, display: "flex", flexDirection: "column", gap: "30px" }}>
        {/* Assignment Button */}
        <button
          style={{
            background: "#ff8800",
            color: "#000",
            fontWeight: "bold",
            padding: "10px 25px",
            border: "2px solid #111",
            borderRadius: "4px",
            cursor: "pointer",
            boxShadow: "0 0 12px rgba(255,136,0,0.7)",
            alignSelf: "flex-start",
          }}
          onClick={() => navigate("/dashboard")}
        >
          ASSIGNMENT
        </button>

        {/* UI Developer Text */}
        <h1
          style={{
            fontSize: "5rem",
            fontWeight: "bold",
            color: "#fff",
            marginBottom: "15px",
            lineHeight: "1.1",
          }}
        >
          UI DEVELOPER <br /> ASSIGNMENT
        </h1>

        {/* Company Text */}
        <h3
          style={{
            fontSize: "1.2rem",
            fontWeight: "normal",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          COMPANY <br />
          Juspay Technologies Private Limited
        </h3>
      </div>
    </div>
  );
}

export default LandingPage;
