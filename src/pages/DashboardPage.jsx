import React, { useState, useRef } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function DashboardPage() {
  const [walletBalance, setWalletBalance] = useState(250000);
  const [dialog, setDialog] = useState({ open: false, type: "" });
  const [minimized, setMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);
  const offset = useRef({ x: 0, y: 0 });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ visible: false, message: "" });

  const [addMoneyForm, setAddMoneyForm] = useState({
    accountNumber: "",
    ifsc: "",
    amount: "",
  });
  const [sendPaymentForm, setSendPaymentForm] = useState({
    recipient: "",
    accountNumber: "",
    amount: "",
  });

  const [requestMoneyList, setRequestMoneyList] = useState([
    { id: 1, name: "John Doe", account: "XXXX346", amount: 5000, date: "2025-09-01" },
    { id: 2, name: "Jane Smith", account: "XXXX789", amount: 7500, date: "2025-09-03" },
    { id: 3, name: "Alice Kumar", account: "XXXX123", amount: 2500, date: "2025-08-28" },
    { id: 4, name: "Bob Lee", account: "XXXX456", amount: 6000, date: "2025-08-30" },
    { id: 5, name: "Charlie Tan", account: "XXXX987", amount: 8000, date: "2025-09-05" },
    { id: 6, name: "David Roy", account: "XXXX654", amount: 4000, date: "2025-09-02" },
    { id: 7, name: "Emma Li", account: "XXXX321", amount: 3000, date: "2025-09-04" },
  ]);
  const [requestFilter, setRequestFilter] = useState("date");

  const balanceAmount = `₹${walletBalance.toLocaleString()}`;

  const stats = [
    { title: "Revenue", value: balanceAmount },
    { title: "Successful Payments", value: 340 },
    { title: "Failed Payments", value: 12 },
    { title: "Wallet Balance", value: balanceAmount },
  ];

  const pieData = [
    { name: "UPI", value: 300 },
    { name: "Cards", value: 200 },
    { name: "Netbanking", value: 150 },
    { name: "Wallets", value: 100 },
  ];

  const barData = [
    { month: "Jan", amount: 40000 },
    { month: "Feb", amount: 35000 },
    { month: "Mar", amount: 50000 },
    { month: "Apr", amount: 45000 },
    { month: "May", amount: 60000 },
    { month: "Jun", amount: 55000 },
  ];

  const COLORS = ["#ff4d4d", "#4da6ff", "#ffcc00", "#00e600"];

  const openDialog = (type) => {
    setDialog({ open: true, type });
    setMinimized(false);
    setPosition({ x: window.innerWidth / 2 - 180, y: window.innerHeight / 2 - 200 }); // Center
  };
  const closeDialog = () => setDialog({ open: false, type: "" });
  const toggleMinimize = () => setMinimized(!minimized);

  // Drag handlers
  const onMouseDown = (e) => {
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };
  const onMouseMove = (e) => {
    setPosition({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
  };
  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  // APIs
  const handleAddMoney = () => {
    const amt = parseFloat(addMoneyForm.amount);
    if (!addMoneyForm.accountNumber || !addMoneyForm.ifsc || isNaN(amt)) {
      showAlert("Please fill correct details!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDialog({ open: true, type: "Proceed Payment" });
    }, 2000);
  };

  const handleSendPayment = () => {
    const amt = parseFloat(sendPaymentForm.amount);
    if (!sendPaymentForm.recipient || !sendPaymentForm.accountNumber || isNaN(amt)) {
      showAlert("Please fill correct details!");
      return;
    }
    if (amt > walletBalance) {
      showAlert("Insufficient wallet balance!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setWalletBalance(walletBalance - amt);
      setLoading(false);
      showAlert(`₹${amt} sent to ${sendPaymentForm.recipient}`);
      setSendPaymentForm({ recipient: "", accountNumber: "", amount: "" });
      closeDialog();
    }, 2000);
  };

  const handleProceedPayment = (method) => {
    const amt = parseFloat(addMoneyForm.amount);
    setWalletBalance(walletBalance + amt);
    showAlert(`₹${amt} added to wallet via ${method}`);
    setAddMoneyForm({ accountNumber: "", ifsc: "", amount: "" });
    closeDialog();
  };

  const showAlert = (message) => {
    setAlert({ visible: true, message });
    setTimeout(() => setAlert({ visible: false, message: "" }), 3000);
  };

  // Sort request money list
  const sortedRequests = [...requestMoneyList].sort((a, b) => {
    if (requestFilter === "date") return new Date(b.date) - new Date(a.date);
    if (requestFilter === "month") return new Date(b.date).getMonth() - new Date(a.date).getMonth();
    if (requestFilter === "year") return new Date(b.date).getFullYear() - new Date(a.date).getFullYear();
    return 0;
  });

  return (
    <div style={{ display: "flex", background: "#0d0d0d", minHeight: "100vh", color: "#fff" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Navbar />

        {/* Alert */}
        {alert.visible && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              background: "#222",
              color: "#00e600",
              padding: "15px 25px",
              borderRadius: "10px",
              border: "1px solid #00e600",
              boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
              zIndex: 1000,
            }}
          >
            {alert.message}
          </div>
        )}

        {/* Stats Cards */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "30px" }}>
          {stats.map((s, i) => (
            <div
              key={i}
              className="glass-card"
              style={{
                flex: 1,
                minWidth: "200px",
                padding: "20px",
                borderRadius: "12px",
                background: "#1a1a1a",
                boxShadow: "0 6px 15px rgba(0,0,0,0.7)",
              }}
            >
              <h4>{s.title}</h4>
              <p>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ display: "flex", gap: "15px", marginBottom: "30px", flexWrap: "wrap" }}>
          {["Add Money", "Send Payment", "Request Money"].map((action, i) => (
            <button
              key={i}
              onClick={() => openDialog(action)}
              style={dialogButtonStyle}
            >
              {action}
            </button>
          ))}
        </div>

        {/* Charts */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "30px" }}>
          <div className="glass-card" style={{ flex: 1, minWidth: "250px", height: "300px", background: "#1a1a1a" }}>
            <h3>Payment Method Split</h3>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {pieData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-card" style={{ flex: 1, minWidth: "250px", height: "300px", background: "#1a1a1a" }}>
            <h3>Monthly Payment Volume</h3>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={barData} barCategoryGap="30%">
                <XAxis dataKey="month" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="amount" fill="#00C49F" radius={[5,5,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dialog Box */}
        {dialog.open && (
          <div
            ref={dragRef}
            style={{
              position: "fixed",
              top: position.y,
              left: position.x,
              width: "360px",
              maxHeight: "500px",
              background: "#1a1a1a",
              borderRadius: "12px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.7)",
              color: "#fff",
              overflow: "hidden",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              cursor: "grab",
            }}
          >
            {/* Dialog Header */}
            <div onMouseDown={onMouseDown} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 15px", background: "#222", cursor: "grab" }}>
              <span>{dialog.type}</span>
              <div>
                <button onClick={toggleMinimize} style={dialogHeaderBtnStyle}>
                  {minimized ? "⬆" : "⬇"}
                </button>
                <button onClick={closeDialog} style={dialogHeaderBtnStyle}>✖</button>
              </div>
            </div>

            {!minimized && (
              <div style={{ padding: "15px", display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto" }}>
                {loading && <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>}

                {dialog.type === "Add Money" && !loading && (
                  <>
                    <input style={inputStyle} placeholder="Account Number" value={addMoneyForm.accountNumber} onChange={e => setAddMoneyForm({ ...addMoneyForm, accountNumber: e.target.value })}/>
                    <input style={inputStyle} placeholder="IFSC Code" value={addMoneyForm.ifsc} onChange={e => setAddMoneyForm({ ...addMoneyForm, ifsc: e.target.value })}/>
                    <input style={inputStyle} placeholder="Amount" value={addMoneyForm.amount} onChange={e => setAddMoneyForm({ ...addMoneyForm, amount: e.target.value })}/>
                    <button style={dialogBtnStyle} onClick={handleAddMoney}>Proceed</button>
                  </>
                )}

                {dialog.type === "Proceed Payment" && (
                  <>
                    <h4>Select Payment Method:</h4>
                    {["UPI", "PhonePe", "GPay", "Net Transfer"].map((m, i) => (
                      <button key={i} style={dialogBtnStyle} onClick={() => handleProceedPayment(m)}>{m}</button>
                    ))}
                  </>
                )}

                {dialog.type === "Send Payment" && !loading && (
                  <>
                    <input style={inputStyle} placeholder="Recipient Name" value={sendPaymentForm.recipient} onChange={e => setSendPaymentForm({ ...sendPaymentForm, recipient: e.target.value })}/>
                    <input style={inputStyle} placeholder="Account Number" value={sendPaymentForm.accountNumber} onChange={e => setSendPaymentForm({ ...sendPaymentForm, accountNumber: e.target.value })}/>
                    <input style={inputStyle} placeholder="Amount" value={sendPaymentForm.amount} onChange={e => setSendPaymentForm({ ...sendPaymentForm, amount: e.target.value })}/>
                    <button style={dialogBtnStyle} onClick={handleSendPayment}>Send Payment</button>
                  </>
                )}

                {dialog.type === "Request Money" && (
                  <>
                    <label>Sort By:</label>
                    <select value={requestFilter} onChange={e => setRequestFilter(e.target.value)} style={inputStyle}>
                      <option value="date">Date</option>
                      <option value="month">Month</option>
                      <option value="year">Year</option>
                    </select>
                    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px", color: "#fff" }}>
                      <thead>
                        <tr>
                          <th>ID</th><th>Name</th><th>Account</th><th>Amount</th><th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedRequests.map(r => (
                          <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.name}</td>
                            <td>{r.account}</td>
                            <td>{r.amount}</td>
                            <td>{r.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Shared input/button styles
const inputStyle = {
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #555",
  width: "93%",
  background: "#222",
  color: "#fff",
};

const dialogBtnStyle = {
  padding: "10px",
  borderRadius: "6px",
  background: "linear-gradient(135deg, #00C49F, #0088FE)",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "5px",
  border: "none",
};

const dialogButtonStyle = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(135deg, #00C49F, #0088FE)",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
};

const dialogHeaderBtnStyle = {
  marginRight: "10px",
  color: "#fff",
  background: "transparent",
  border: "none",
};

export default DashboardPage;
