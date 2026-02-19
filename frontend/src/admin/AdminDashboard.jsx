import { useState, useEffect } from "react";
import api from "../api/axios";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaRupeeSign
} from "react-icons/fa";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

const DashboardCharts = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  const [loading, setLoading] = useState(true);

  // 🔥 Static Electronics Data
  const monthlyRevenue = [
    { name: "Jan", revenue: 12000 },
    { name: "Feb", revenue: 18000 },
    { name: "Mar", revenue: 15000 },
    { name: "Apr", revenue: 22000 },
    { name: "May", revenue: 26000 },
    { name: "Jun", revenue: 30000 }
  ];

  const monthlyOrders = [
    { name: "Jan", orders: 40 },
    { name: "Feb", orders: 65 },
    { name: "Mar", orders: 55 },
    { name: "Apr", orders: 80 },
    { name: "May", orders: 95 },
    { name: "Jun", orders: 120 }
  ];

  const weeklyOrders = [
    { name: "Mon", orders: 10 },
    { name: "Tue", orders: 25 },
    { name: "Wed", orders: 18 },
    { name: "Thu", orders: 30 },
    { name: "Fri", orders: 40 },
    { name: "Sat", orders: 55 },
    { name: "Sun", orders: 35 }
  ];

  const categoryData = [
    { name: "Mobile", value: 150 },
    { name: "Laptop", value: 120 },
    { name: "Tablet", value: 80 },
    { name: "Headphones", value: 60 },
    { name: "Others", value: 40 }
  ];

  const COLORS = [
    "#6366F1",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#A855F7",
    "#14B8A6",
    "#FF66C3"
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/admin/dashboard");
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Users" value={stats.totalUsers} icon={<FaUsers />} color="text-blue-500" />
        <StatCard title="Products" value={stats.totalProducts} icon={<FaBoxOpen />} color="text-green-500" />
        <StatCard title="Orders" value={stats.totalOrders} icon={<FaShoppingCart />} color="text-purple-500" />
        <StatCard title="Revenue" value={`₹${stats.totalRevenue}`} icon={<FaRupeeSign />} color="text-orange-500" />
      </div>

      <h1 className="text-3xl font-bold mb-6">
        Electronics Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Line Chart */}
        <ChartCard title="Monthly Revenue (Line)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Area Chart */}
        <ChartCard title="Revenue Growth (Area)">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Bar Chart */}
        <ChartCard title="Monthly Orders (Bar)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyOrders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Pie Chart */}
        <ChartCard title="Category Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>

      {/* Weekly Orders */}
      <div className="mt-6">
        <ChartCard title="Weekly Orders Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyOrders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#ef4444" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

    </div>
  );
};

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between hover:shadow-lg transition">
    <div>
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    <div className={`text-3xl ${color}`}>
      {icon}
    </div>
  </div>
);

export default DashboardCharts;
