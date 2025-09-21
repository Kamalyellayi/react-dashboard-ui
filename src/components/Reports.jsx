import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Dialog from "../components/Dialog.jsx";

function ReportsPage() {
  const yearlyData = [
    {
      year: "2023",
      amount: 400000,
      income: 600000,
      monthly: [30000, 35000, 40000, 32000, 45000, 42000, 38000, 41000, 44000, 46000, 47000, 48000],
    },
    {
      year: "2024",
      amount: 500000,
      income: 700000,
      monthly: [40000, 38000, 42000, 45000, 46000, 47000, 48000, 50000, 51000, 52000, 53000, 54000],
    },
    {
      year: "2025",
      amount: 550000,
      income: 750000,
      monthly: [45000, 47000, 49000, 50000, 51000, 52000, 53000, 54000, 55000, 56000, 57000, 58000],
    },
  ];

  const categoryDataMap = {
    "2023": [
      { name: "UPI", value: 120000 },
      { name: "Card", value: 150000 },
      { name: "Netbanking", value: 80000 },
      { name: "Wallet", value: 50000 },
    ],
    "2024": [
      { name: "UPI", value: 150000 },
      { name: "Card", value: 180000 },
      { name: "Netbanking", value: 100000 },
      { name: "Wallet", value: 70000 },
    ],
    "2025": [
      { name: "UPI", value: 180000 },
      { name: "Card", value: 200000 },
      { name: "Netbanking", value: 90000 },
      { name: "Wallet", value: 80000 },
    ],
  };

  const COLORS = ["#FF8042", "#00C49F", "#0088FE", "#FFBB28"];

  const [filterYear, setFilterYear] = useState("2025");
  const [filteredYearData, setFilteredYearData] = useState(yearlyData.find((y) => y.year === filterYear));
  const [monthlySpends, setMonthlySpends] = useState(filteredYearData.monthly);
  const [categoryData, setCategoryData] = useState(categoryDataMap[filterYear]);

  const [showDialog, setShowDialog] = useState(false);
  const [budget, setBudget] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const newData = yearlyData.find((y) => y.year === filterYear);
    setFilteredYearData(newData);
    setMonthlySpends(newData.monthly);
    setCategoryData(categoryDataMap[filterYear]);
  }, [filterYear]);

  const savings = filteredYearData.income - filteredYearData.amount;
  const savingsPercent = Math.round((savings / filteredYearData.income) * 100);

  // Advisor button
  const handleAdvisor = () => {
    setAlertMessage("📊 Advice: Spend 50% on essentials, 30% on wants, 20% on savings.");
    setShowAlert(true);
  };

  // Handle budget save from dialog
  const handleBudgetSubmit = (amount) => {
    if (amount && parseInt(amount) > 0) {
      setBudget(amount);
      setShowDialog(false);
      setAlertMessage(`✅ Budget of ₹${amount} saved. You can now maintain expenses.`);
      setShowAlert(true);
    }
  };

  // Download CSV
  const handleDownloadCSV = () => {
    const rows = [
      ["Year", "Total Spend", "Income", "Savings"],
      ...yearlyData.map((y) => [y.year, y.amount, y.income, y.income - y.amount]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + rows.map((r) => r.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "financial_report.csv";
    link.click();
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Navbar />

        {/* Summary Cards */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "20px" }}>
          <div className="glass-card">
            <h4>Total Yearly Spend</h4>
            <p>₹{filteredYearData.amount}</p>
          </div>
          <div className="glass-card">
            <h4>Monthly Average</h4>
            <p>₹{Math.round(filteredYearData.amount / 12)}</p>
          </div>
          <div className="glass-card">
            <h4>Highest Month Spend</h4>
            <p>₹{Math.max(...monthlySpends)}</p>
          </div>
          <div className="glass-card">
            <h4>Category Distribution</h4>
            <p>See pie chart below</p>
          </div>
        </div>

        {/* Filter + Download */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            alignItems: "center",
          }}
        >
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              background: "rgba(30,30,30,0.8)",
              color: "#fff",
            }}
          >
            {yearlyData.map((y) => (
              <option key={y.year} value={y.year}>
                {y.year}
              </option>
            ))}
          </select>
          <button
            onClick={handleDownloadCSV}
            style={{
              background: "linear-gradient(135deg, #00C49F, #0088FE)",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ⬇ Download CSV
          </button>
        </div>

        {/* Charts */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          <div className="glass-card" style={{ height: "280px" }}>
            <h3>Monthly Spends</h3>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart
                data={monthlySpends.map((amt, idx) => ({ month: `M${idx + 1}`, amount: amt }))}
              >
                <XAxis dataKey="month" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip contentStyle={{ background: "#1e1e1e", border: "none", color: "#fff" }} />
                <Bar dataKey="amount" fill="#FF8042" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card" style={{ height: "280px" }}>
            <h3>Spends by Category</h3>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#1e1e1e", border: "none", color: "#fff" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card" style={{ height: "280px" }}>
            <h3>Yearly Spends</h3>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={yearlyData}>
                <XAxis dataKey="year" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip contentStyle={{ background: "#1e1e1e", border: "none", color: "#fff" }} />
                <Bar dataKey="amount" fill="#00C49F" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Savings + Advisor */}
        <div className="glass-card" style={{ padding: "15px", marginTop: "25px" }}>
          <h3>Savings ({filterYear})</h3>
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: "6px",
              height: "12px",
            }}
          >
            <div
              style={{
                width: `${savingsPercent}%`,
                height: "100%",
                background: savingsPercent > 40 ? "#00C49F" : "#FF4D4D",
              }}
            />
          </div>
          <p style={{ marginTop: "6px", fontSize: "14px", color: "#ccc" }}>
            Savings: <span style={{ color: "#fff" }}>₹{savings}</span> ({savingsPercent}% of income)
          </p>
          <div style={{ marginTop: "15px", display: "flex", gap: "15px" }}>
            <button
              onClick={() => setShowDialog(true)}
              style={{
                background: "rgba(0,136,254,0.2)",
                color: "#00C49F",
                border: "1px solid #00C49F",
                borderRadius: "8px",
                padding: "8px 16px",
              }}
            >
              💰 Give Amount
            </button>
            <button
              onClick={handleAdvisor}
              disabled={!budget}
              style={{
                background: budget ? "rgba(0,196,159,0.2)" : "rgba(100,100,100,0.3)",
                color: budget ? "#00C49F" : "#777",
                border: budget ? "1px solid #00C49F" : "1px solid #555",
                borderRadius: "8px",
                padding: "8px 16px",
              }}
            >
              📊 Maintain My Expenses
            </button>
          </div>
        </div>

        {/* Budget Dialog */}
        {showDialog && (
          <Dialog
            title="Enter Monthly Budget"
            message="Enter your budget amount for monthly spending."
            inputProps={{
              value: budget,
              onChange: (e) => setBudget(e.target.value),
              placeholder: "Enter amount...",
            }}
            options={[
              { label: "Save", onClick: () => handleBudgetSubmit(budget) },
              { label: "Cancel", onClick: () => setShowDialog(false) },
            ]}
          />
        )}

        {/* Alert */}
        {showAlert && (
          <div
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              background: "rgba(30,30,30,0.9)",
              color: "#fff",
              padding: "15px 20px",
              borderRadius: "10px",
              border: "1px solid #00C49F",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.4)",
            }}
          >
            <p style={{ margin: 0 }}>{alertMessage}</p>
            <button
              onClick={() => setShowAlert(false)}
              style={{
                marginTop: "10px",
                background: "#00C49F",
                border: "none",
                borderRadius: "6px",
                padding: "6px 12px",
                color: "#fff",
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportsPage;
