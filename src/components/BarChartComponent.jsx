import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { month: "Jan", amount: 30000 },
  { month: "Feb", amount: 40000 },
  { month: "Mar", amount: 35000 },
  { month: "Apr", amount: 50000 },
  { month: "May", amount: 45000 },
  { month: "Jun", amount: 60000 }
];

function BarChartComponent() {
  return (
    <div className="chart-container">
      <h3>Monthly Payment Volume (₹)</h3>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#FF8042" />
      </BarChart>
    </div>
  );
}

export default BarChartComponent;
