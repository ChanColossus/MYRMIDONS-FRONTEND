import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getToken } from "../../utils/helpers";
import axios from "axios";
import Loader from "../Layout/Loader";

const UserSalesChart = ({ data }) => {
  const [sales, setSales] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userSales = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.get(
        `https://myrmidons-api.onrender.com/api/v1/admin/customer-sales`,
        config
      );
      setSales(data.customerSales);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"];
  useEffect(() => {
    userSales();
    // allUsers()
  }, []);

  return (
    <ResponsiveContainer width="100%" height={250}>
      {loading ? (
        <Loader />
      ) : (
        <BarChart data={sales}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="userDetails.name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <text x="50%" y={20} textAnchor="middle" fontSize="18" fill="#333">
            Total Sales from Users
          </text>

          <Bar dataKey="total" stroke="#000000" strokeWidth={5} >
            {sales.map((item, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index % 20]}  />
            ))}
          </Bar>
        </BarChart>
      )}
    </ResponsiveContainer>
  );
};
export default UserSalesChart;
