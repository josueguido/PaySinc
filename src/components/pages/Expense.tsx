import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
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
            setSuccess(true);
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

    return (
        <div className="flex flex-col justify-items-center pt-20 px-10 w-11/12">
            <main className="flex-1 flex justify-center items-start bg-gray-50 px-4 py-8">
                <section className="bg-white p-8 rounded-lg shadow-md w-full mx-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                        Add Expense
                    </h2>

                    {success && (
                        <div className="bg-green-100 text-green-700 border border-green-300 rounded-md p-2 text-sm mb-4 text-center">
                            ✅ Gasto guardado con éxito
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <div className="col-span-1">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <input
                                {...register("description", { required: true })}
                                id="description"
                                type="text"
                                placeholder="Enter a description"
                                className={`w-full p-2 border rounded-md text-gray-600 ${
                                    errors.description ? "border-red-500" : ""
                                }`}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm">
                                    Required field
                                </p>
                            )}
                        </div>

                        <div className="col-span-1">
                            <label
                                htmlFor="amount"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Total ($)
                            </label>
                            <input
                                {...register("amount", {
                                    required: true,
                                    valueAsNumber: true,
                                })}
                                id="amount"
                                type="number"
                                step="0.01"
                                placeholder="$0.00"
                                className={`w-full p-2 border rounded-md text-gray-600 ${
                                    errors.amount ? "border-red-500" : ""
                                }`}
                            />
                            {errors.amount && (
                                <p className="text-red-500 text-sm">
                                    Required field
                                </p>
                            )}
                        </div>

                        <div className="col-span-1">
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Category
                            </label>
                            <select
                                {...register("category", { required: true })}
                                className={`w-full p-2 border rounded-md text-gray-600 ${
                                    errors.category ? "border-red-500" : ""
                                }`}
                            >
                                <option value="">Choose a category</option>
                                <option value="Food">Food</option>
                                <option value="Transport">Transport</option>
                                <option value="Rent">Rent</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.category && (
                                <p className="text-red-500 text-sm">
                                    Required field
                                </p>
                            )}
                        </div>

                        <div className="col-span-1">
                            <label
                                htmlFor="date"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Date
                            </label>
                            <input
                                {...register("date", { required: true })}
                                id="date"
                                type="date"
                                className={`w-full p-2 border rounded-md text-gray-600 ${
                                    errors.date ? "border-red-500" : ""
                                }`}
                            />
                            {errors.date && (
                                <p className="text-red-500 text-sm">
                                    Required field
                                </p>
                            )}
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <label
                                htmlFor="note"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Note (optional)
                            </label>
                            <textarea
                                {...register("note")}
                                id="note"
                                placeholder="Add a note"
                                className="w-full p-2 border rounded-md text-gray-600 h-20"
                            />
                        </div>

                        <div className="col-span-full">
                            <details className="mt-2">
                                <summary className="cursor-pointer text-blue-600 mb-2 text-sm">
                                    Advanced Options
                                </summary>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                    <div>
                                        <label
                                            htmlFor="group"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Group ID
                                        </label>
                                        <input
                                            value={1}
                                            {...register("group_id", {
                                                valueAsNumber: true,
                                            })}
                                            id="group"
                                            type="text"
                                            className="w-full p-2 border rounded-md text-gray-600"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="paid_by_friend"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Paid by Friend ID
                                        </label>
                                        <input
                                            value={1}
                                            {...register("paid_by_friend_id", {
                                                valueAsNumber: true,
                                            })}
                                            id="paid_by_friend"
                                            type="text"
                                            className="w-full p-2 border rounded-md text-gray-600"
                                        />
                                    </div>
                                </div>
                            </details>
                        </div>

                        <div className="col-span-full justify-end flex">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-50 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2"
                            >
                                <Save size={16} />
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default Expense;
