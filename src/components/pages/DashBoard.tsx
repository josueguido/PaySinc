import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    RadialBar,
    RadialBarChart,
    CartesianGrid,
} from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "../ui/card";

function Dashboard() {
    const [byCategory, setByCategory] = useState([]);
    const [byMonth, setByMonth] = useState([]);
    const [byFriend, setByFriend] = useState([]);
    const [, setLoading] = useState(false);
    const [, setSuccess] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const [catRes, monthRes, friendRes] = await Promise.all([
                    api.get("/expenses/stats/categories"),
                    api.get("/expenses/stats/monthly"),
                    api.get("/expenses/stats/friend"),
                ]);

                const categoryData = catRes.data.map((item: any) => ({
                    ...item,
                    total: parseFloat(item.total),
                }));

                const monthData = monthRes.data.map((item: any) => ({
                    ...item,
                    total: parseFloat(item.total),
                }));

                const friendData = friendRes.data.map((item: any) => ({
                    ...item,
                    total: parseFloat(item.total),
                }));

                setByCategory(categoryData);
                setByMonth(monthData);
                setByFriend(friendData);

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                        <Card className="flex flex-col">
                            <CardHeader className="items-center pb-0">
                                <CardTitle>By Category</CardTitle>
                                <CardDescription>
                                    Total expenses grouped by category
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex-1 pb-0">
                                <ResponsiveContainer width="100%" height={280}>
                                    <RadialBarChart
                                        innerRadius="30%"
                                        outerRadius="90%"
                                        data={byCategory}
                                        startAngle={180}
                                        endAngle={-180}
                                        barSize={12}
                                    >
                                        <RadialBar
                                            background
                                            dataKey="total"
                                            cornerRadius={6}
                                            label={{
                                                fill: "#fff",
                                                position: "insideStart",
                                                fontSize: 12,
                                            }}
                                        />
                                        <Tooltip
                                            content={({ payload }) => {
                                                if (!payload || !payload.length)
                                                    return null;
                                                const { category, total } =
                                                    payload[0].payload;
                                                return (
                                                    <div className="bg-white dark:bg-neutral-800 text-sm text-black dark:text-white p-2 rounded shadow">
                                                        <div className="font-semibold">
                                                            {category}
                                                        </div>
                                                        <div>
                                                            Total: $
                                                            {parseFloat(total)}
                                                        </div>
                                                    </div>
                                                );
                                            }}
                                        />

                                        <Legend
                                            verticalAlign="bottom"
                                            height={36}
                                            iconSize={10}
                                        />
                                    </RadialBarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                        <Card className="flex flex-col">
                            <CardHeader className="items-center pb-4">
                                <CardTitle>By Month</CardTitle>
                                <CardDescription>
                                    Expenses over time
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={byMonth}>
                                        <CartesianGrid
                                            vertical={false}
                                            strokeDasharray="3 3"
                                        />
                                        <XAxis
                                            dataKey="month"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                            tickFormatter={(value) =>
                                                value.slice(0, 7)
                                            }
                                        />
                                        <YAxis
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <Tooltip
                                            cursor={{
                                                fill: "rgba(0,0,0,0.05)",
                                            }}
                                            formatter={(value) => [
                                                `$${value}`,
                                                "Total",
                                            ]}
                                        />
                                        <Bar
                                            dataKey="total"
                                            fill="var(--theme-primary)"
                                            radius={[4, 4, 0, 0]}
                                            barSize={40}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                        <Card className="flex flex-col">
                            <CardHeader className="items-center pb-4">
                                <CardTitle>Expenses by Friend</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={byFriend}>
                                        <CartesianGrid
                                            vertical={false}
                                            strokeDasharray="3 3"
                                        />
                                        <XAxis
                                            dataKey="name"
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <Tooltip
                                            formatter={(value) => [
                                                `₡${value}`,
                                                "Total",
                                            ]}
                                            cursor={{
                                                fill: "rgba(0,0,0,0.05)",
                                            }}
                                        />
                                        <Bar
                                            dataKey="total"
                                            fill="hsl(var(--primary))"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
