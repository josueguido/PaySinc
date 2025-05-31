import { Settings, User, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ButtonBack from "../common/ButtonBack";
import api from "@/lib/axios";

function Expense() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            await api.post("/expenses", data);
            reset(); 
            setTimeout(() => setSuccess(false), 3000);
        } catch (error: any) {
            console.error(
                "Error when saving the expense",
                error.response?.data || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    {
        success && (
            <p className="text-green-600 font-medium mb-4">
                ¡Gasto guardado con éxito!
            </p>
        );
    }

    return (
        <div className="bg-white shadow min-h-screen flex flex-col">
            <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold">PaySinc</span>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                        <Settings size={20} />
                    </button>
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                        <User size={20} />
                    </button>
                </div>
            </header>

            <div className="px-6 py-4">
                <ButtonBack />
            </div>

            <main className="flex-1 flex justify-center items-center">
                <section className="rounded-lg p-8 max-w-2xl w-full">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Add Expense
                    </h2>

                    <form
                        id="expense-form"
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div>
                            <label
                                htmlFor="description"
                                className="text-gray-700 font-medium block mb-1"
                            >
                                Description
                            </label>
                            <input
                                autoComplete="off"
                                {...register("description", {
                                    required: true,
                                })}
                                id="description"
                                type="text"
                                placeholder="Enter a description"
                                className="w-full p-3 border rounded-lg text-gray-600"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">
                                    Required field
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="amount"
                                className="text-gray-700 font-medium block mb-1"
                            >
                                Total ($)
                            </label>
                            <input
                                autoComplete="off"
                                {...register("amount", {
                                    required: true,
                                    valueAsNumber: true,
                                })}
                                id="amount"
                                type="number"
                                step="0.01"
                                placeholder="$0.00"
                                className="w-full p-3 border rounded-lg text-gray-600"
                            />
                            {errors.amount && (
                                <p className="text-red-500 text-sm mt-1">
                                    Required field
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="category"
                                className="text-gray-700 font-medium block mb-1"
                            >
                                Category
                            </label>
                            <select
                                {...register("category", {
                                    required: true,
                                })}
                                className="w-full p-3 border rounded-lg text-gray-600"
                            >
                                <option value="">Choose a category</option>
                                <option value="Food">Food</option>
                                <option value="Transport">Transport</option>
                                <option value="Rent">Rent</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.category && (
                                <p className="text-red-500 text-sm mt-1">
                                    Required field
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="date"
                                className="text-gray-700 font-medium block mb-1"
                            >
                                Date
                            </label>
                            <input
                                autoComplete="off"
                                {...register("date", { required: true })}
                                id="date"
                                type="date"
                                className="w-full p-3 border rounded-lg text-gray-600"
                            />
                            {errors.date && (
                                <p className="text-red-500 text-sm mt-1">
                                    Required field
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="note"
                                className="text-gray-700 font-medium block mb-1"
                            >
                                Note (optional)
                            </label>
                            <textarea
                                autoComplete="off"
                                {...register("note")}
                                id="note"
                                placeholder="Add a note"
                                className="w-full p-3 border rounded-lg text-gray-600 h-24"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="group"
                                className="text-gray-700 font-medium block mb-1"
                            >
                                Group ID
                            </label>
                            <input
                                autoComplete="off"
                                value={1}
                                {...register("group_id", {
                                    valueAsNumber: true,
                                })}
                                id="group"
                                type="text"
                                placeholder="Enter a description"
                                className="w-full p-3 border rounded-lg text-gray-600"
                            />
                            <label
                                htmlFor="paid_by_friend"
                                className="text-gray-700 font-medium block mb-1"
                            >
                                Paid by Friend ID
                            </label>
                            <input
                                autoComplete="off"
                                value={1}
                                {...register("paid_by_friend_id", {
                                    valueAsNumber: true,
                                })}
                                id="paid_by_friend"
                                type="text"
                                placeholder="Enter a description"
                                className="w-full p-3 border rounded-lg text-gray-600"
                            />
                        </div>

                        <button
                            type="submit"
                            form="expense-form"
                            disabled={loading}
                            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center"
                        >
                            <Save size={16} className="mr-2" />
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default Expense;
