import { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import api from "@/lib/axios";

interface Expense {
    id: number;
    description: string;
    category: string;
    amount: number;
    date: string;
}

function Principal() {
    const [loading, setLoading] = useState(true);
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        let isMounted = true;

        const fetchExpenses = async () => {
            try {
                const response = await api.get("/expenses");
                if (isMounted) setExpenses(response.data);
            } catch (error) {
                console.error("Error when fetching expenses:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchExpenses();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4">
                My Expenses
            </h1>

            <p className="text-lg font-bold mb-2">Recent Groups</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
                {[...new Set(expenses.map((e) => e.category))].map(
                    (category, index) => (
                        <div
                            key={index}
                            className={`flex items-center space-x-3 border rounded-xl p-4 shadow-sm bg-white ${
                                category === "Food"
                                    ? "bg-green-50 hover:bg-green-100"
                                    : "bg-blue-50 hover:bg-blue-100"
                            }`}
                        >
                            <Building2 size={24} className="text-gray-500" />
                            <span className="font-semibold text-gray-800 capitalize">
                                {category}
                            </span>
                        </div>
                    )
                )}
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-300 shadow-md">
                <table className="w-full text-left border-collapse min-w-[750px]">
                    <thead className="bg-gray-50 text-gray-700 text-sm font-semibold">
                        <tr>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-600 bg-white">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="text-center py-8">
                                    <span className="text-gray-500 animate-pulse">
                                        Loading...
                                    </span>
                                </td>
                            </tr>
                        ) : expenses.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="text-center py-8 text-gray-500"
                                >
                                    No expenses found.
                                </td>
                            </tr>
                        ) : (
                            expenses.map((expense) => (
                                <tr key={expense.id}>
                                    <td className="px-6 py-4">
                                        {expense.description}
                                    </td>
                                    <td className="px-6 py-4 capitalize">
                                        {expense.category}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(
                                            expense.date
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right font-semibold">
                                        ${expense.amount}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Principal;
