import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "UPI", value: 400 },
  { name: "Cards", value: 300 },
  { name: "Netbanking", value: 200 },
  { name: "Wallets", value: 100 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function PieChartComponent() {
  return (
    <div className="chart-container">
      <h3>Payment Methods Split</h3>
      <PieChart width={300} height={300}>
        <Pie data={data} cx="50%" cy="50%" label outerRadius={100} fill="#8884d8" dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default PieChartComponent;
