import { useEffect, useState } from "react";
import { Building2, Trash2 } from "lucide-react";
import api from "@/lib/axios";
import { TypingAnimation } from "@/components/magicui/typing-animation";

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

    const onDelete = async (expense: Expense) => {
        try {
            setLoading(true);
            await api.delete(`/expenses/${expense.id}`);
            setExpenses((prev) => prev.filter((e) => e.id !== expense.id));
        } catch (error: any) {
            console.error("Error deleting expense:", error);
        }
        setLoading(false);
    };
    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                <TypingAnimation>My Expenses</TypingAnimation>
            </h1>
            <p className="text-gray-500 mb-6">
                Track your recent activity by category and amount
            </p>

            {/* <div className="text-right mb-4 text-gray-700 text-sm">
                Showing {expenses.length}{" "}
                {expenses.length === 1 ? "entry" : "entries"}
            </div> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
                {[...new Set(expenses.map((e) => e.category))].map(
                    (category, index) => (
                        <div
                            key={index}
                            className={`w-full flex justify-center items-center space-x-3 border rounded-xl p-4 shadow-sm transition-all duration-200 cursor-pointer ${
                                category === "Food"
                                    ? "bg-green-50 hover:bg-green-100"
                                    : category === "Rent"
                                    ? "bg-yellow-50 hover:bg-yellow-100"
                                    : "bg-blue-50 hover:bg-blue-100"
                            }`}
                        >
                            <Building2
                                size={24}
                                className="text-gray-500 group-hover:scale-110 transition-transform"
                            />
                            <span className="font-medium text-gray-700 capitalize">
                                {category}
                            </span>
                        </div>
                    )
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {expenses.map((expense) => (
                    <div
                        key={expense.id}
                        className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                    >
                        <div className="text-sm text-gray-500 font-semibold mb-1">
                            Description
                        </div>
                        <div className="text-lg font-medium text-gray-800 mb-2">
                            {expense.description}
                        </div>

                        <div className="text-sm text-gray-500 font-semibold mb-1">
                            Category
                        </div>
                        <div className="capitalize text-gray-700 mb-2">
                            {expense.category}
                        </div>

                        <div className="text-sm text-gray-500 font-semibold mb-1">
                            Date
                        </div>
                        <div className="text-gray-700 mb-2">
                            {new Date(expense.date).toLocaleDateString()}
                        </div>

                        <div className="text-sm text-gray-500 font-semibold mb-1">
                            Amount
                        </div>
                        <div className="text-green-600 font-bold text-lg mb-4">
                            ${expense.amount}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => onDelete(expense)}
                                className="text-sm text-red-600 hover:underline flex items-center gap-1"
                            >
                                <Trash2 size={16} /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Principal;
