import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";

function SettingsPage() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    password: "",
    confirmPassword: ""
  });

  const [saving, setSaving] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    // Check for empty fields
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields!");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
    }, 1500);
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Navbar />
        <div style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden"
        }}>
          {/* Success Alert */}
          {alertVisible && (
            <div style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              padding: "15px 25px",
              background: "rgba(0, 200, 150, 0.2)",
              color: "#00C49F",
              border: "1px solid #00C49F",
              borderRadius: "12px",
              backdropFilter: "blur(15px)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              zIndex: 1000,
              transition: "all 0.3s ease"
            }}>
              Profile details saved successfully!
            </div>
          )}

          {/* Settings Form */}
          <div style={{
            width: "100%",
            maxWidth: "450px",
            padding: "30px",
            backdropFilter: "blur(15px)",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(192,192,192,0.3)",
            borderRadius: "20px",
            color: "#fff",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
            overflow: "hidden"
          }}>
            <h2 style={{ marginBottom: "20px" }}>Profile Settings</h2>

            {error && <p style={{ color: "#FF4D4D", fontWeight: "bold", marginBottom: "15px" }}>{error}</p>}

            <label>Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
            />

            <label>Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
            />

            <label>Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Phone"
            />

            <label>Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />

            <label>Re-enter Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter Password"
            />

            <button
  onClick={handleSave}
  disabled={saving}
  style={{
    width: "100%",
    padding: "12px 20px",
    borderRadius: "10px",
    background: saving
      ? "#888"
      : "linear-gradient(145deg, #d1d1d1, #f0f0f0, #c1c1c1)",
    border: "1px solid #aaa",
    color: "#333",
    fontWeight: "600",
    cursor: saving ? "not-allowed" : "pointer",
    fontSize: "16px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={e => !saving && (e.target.style.background = "linear-gradient(145deg, #f0f0f0, #d1d1d1, #c1c1c1)")}
  onMouseLeave={e => !saving && (e.target.style.background = "linear-gradient(145deg, #d1d1d1, #f0f0f0, #c1c1c1)")}
>
  {saving ? "Saving..." : "Save Changes"}
</button>


          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
