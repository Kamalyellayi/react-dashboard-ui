import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { FaSearch } from "react-icons/fa";
import Dialog from "../components/Dialog.jsx"; // Reusable dialog

function TransactionsPage() {
  const allTransactions = [
    { id: 1, method: "UPI", amount: 5000, status: "Success", date: "2025-01-12" },
    { id: 2, method: "Card", amount: 15000, status: "Success", date: "2025-01-15" },
    { id: 3, method: "Netbanking", amount: 7000, status: "Failed", date: "2025-01-20" },
    { id: 4, method: "Wallet", amount: 12000, status: "Success", date: "2025-01-22" },
    { id: 5, method: "UPI", amount: 8000, status: "Success", date: "2025-02-01" },
    { id: 6, method: "Card", amount: 20000, status: "Failed", date: "2025-02-05" },
    { id: 7, method: "Wallet", amount: 4000, status: "Success", date: "2025-02-10" },
  ];

  const [search, setSearch] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState(allTransactions);
  const [dialogVisible, setDialogVisible] = useState(false);

  const monthlyData = [
    { month: "Jan", amount: 50000 },
    { month: "Feb", amount: 45000 },
    { month: "Mar", amount: 60000 },
    { month: "Apr", amount: 55000 },
    { month: "May", amount: 70000 },
    { month: "Jun", amount: 65000 },
  ];

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    setFilteredTransactions(
      allTransactions.filter(
        (tx) =>
          tx.method.toLowerCase().includes(query) ||
          tx.status.toLowerCase().includes(query) ||
          tx.date.includes(query) ||
          tx.amount.toString().includes(query)
      )
    );
  };

  const handleDownload = (format) => {
    const csv = [
      ["ID", "Method", "Amount", "Status", "Date"],
      ...filteredTransactions.map(tx => [tx.id, tx.method, tx.amount, tx.status, tx.date])
    ].map(e => e.join(",")).join("\n");

    if (format === "Excel") {
      const blob = new Blob([csv], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "transactions.csv";
      link.click();
    } else {
      alert(`${format} download not implemented. Demo alert only.`);
    }

    setDialogVisible(false);
  };

  return (
    <div style={{ display: "flex", background: "#0d0d0d", minHeight: "100vh", color: "#fff" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Navbar />

        {/* Dialog for Download */}
        {dialogVisible && (
          <Dialog
            title="Download Transactions"
            message="Choose file format to download:"
            options={[
              { label: "Excel", onClick: () => handleDownload("Excel") },
              { label: "PDF", onClick: () => handleDownload("PDF") },
              { label: "Word", onClick: () => handleDownload("Word") },
            ]}
            onClose={() => setDialogVisible(false)}
          />
        )}

        {/* Summary Cards */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "20px" }}>
          <div style={cardStyle}>
            <h4>Total Transactions</h4>
            <p>{allTransactions.length}</p>
          </div>
          <div style={cardStyle}>
            <h4>Successful</h4>
            <p>{allTransactions.filter(tx => tx.status === "Success").length}</p>
          </div>
          <div style={cardStyle}>
            <h4>Failed</h4>
            <p>{allTransactions.filter(tx => tx.status === "Failed").length}</p>
          </div>
          <div style={cardStyle}>
            <h4>Total Amount</h4>
            <p>₹{allTransactions.reduce((sum, tx) => sum + tx.amount, 0)}</p>
          </div>
        </div>

        {/* Search & Download */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", alignItems: "center" }}>
          <div style={{ position: "relative", marginRight: "10px", width: "20%" }}>
            <FaSearch style={{ position: "absolute", top: "50%", left: "10px", transform: "translateY(-50%)", color: "#888" }} />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={handleSearch}
              style={{ ...inputStyle, paddingLeft: "35px", width: "100%" }}
            />
          </div>
          <button
            style={stylishGreenBtn}
            onMouseEnter={e => Object.assign(e.target.style, stylishGreenBtnHover)}
            onMouseLeave={e => Object.assign(e.target.style, stylishGreenBtn)}
            onClick={() => setDialogVisible(true)}
          >
            Download
          </button>
        </div>

        {/* Transaction Table */}
        <div style={{ ...cardStyle, padding: "20px", marginBottom: "30px" }}>
          <h3>Recent Transactions</h3>
          <table style={{ width: "100%", marginTop: "15px", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ color: "#ccc" }}>
                <th>ID</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(tx => (
                <tr key={tx.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <td>{tx.id}</td>
                  <td>{tx.method}</td>
                  <td>₹{tx.amount}</td>
                  <td style={{ color: tx.status === "Success" ? "#00C49F" : "#FF4D4D" }}>{tx.status}</td>
                  <td>{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Monthly Transactions Graph */}
        <div style={{ ...cardStyle, padding: "20px", height: "300px" }}>
          <h3>Monthly Transactions</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={monthlyData} barCategoryGap="30%">
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip 
                contentStyle={{ backgroundColor: "#222", borderRadius: "6px", border: "none", color: "#fff" }}
                labelStyle={{ color: "#ccc" }}
                itemStyle={{ color: "#fff" }}
              />
              <Bar dataKey="amount" fill="#00C49F" radius={[5,5,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Shared styles
const cardStyle = {
  flex: 1,
  minWidth: "200px",
  padding: "20px",
  borderRadius: "12px",
  background: "#1a1a1a",
  boxShadow: "0 6px 15px rgba(0,0,0,0.7)",
};

const inputStyle = {
  padding: "8px",
  borderRadius: "8px",
  border: "none",
  background: "#222",
  color: "#fff",
};

// Stylish green button
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

export default TransactionsPage;
