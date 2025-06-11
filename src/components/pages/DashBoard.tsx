import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bcd4"];

function Dashboard() {
    const [byCategory, setByCategory] = useState([]);
    const [byMonth, setByMonth] = useState([]);
    const [, setLoading] = useState(false);
    const [, setSuccess] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const [catRes, monthRes] = await Promise.all([
                    api.get("/expenses/stats/categories"),
                    api.get("/expenses/stats/monthly"),
                ]);

                const categoryData = catRes.data.map((item: any) => ({
                    ...item,
                    total: parseFloat(item.total),
                }));

                const monthData = monthRes.data.map((item: any) => ({
                    ...item,
                    total: parseFloat(item.total),
                }));

                setByCategory(categoryData);
                setByMonth(monthData);

                setTimeout(() => setSuccess(false), 3000);
            } catch (err) {
                console.error("Error loading dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="w-full flex justify-center px-4 py-6">
            <div className="w-full max-w-6xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Expense Dashboard
                </h1>

                <div className="flex justify-items-centertext-right text-sm text-gray-500 mb-4">
                    Total categories: {byCategory.length}, Total months:{" "}
                    {byMonth.length}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                        <h2 className="text-lg font-semibold mb-4 dark:text-white">
                            By Category
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={byCategory}
                                    dataKey="total"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                >
                                    {byCategory.map((_, index) => (
                                        <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                        <h2 className="text-lg font-semibold mb-4 dark:text-white">
                            By Month
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={byMonth}>
                                <XAxis dataKey="month" stroke="#8884d8" />
                                <YAxis stroke="#8884d8" />
                                <Tooltip />
                                <Bar
                                    dataKey="total"
                                    fill="#8884d8"
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
