import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Toaster, toast } from "sonner";

interface Friend {
    id: number;
    name: string;
    user_id: number;
}

interface Group {
    id: number;
    name: string;
    user_id: number;
}

function Expense() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [friends, setFriends] = useState<Friend[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [friendsRes, groupsRes] = await Promise.all([
                    api.get("/friends"),
                    api.get("/groups"),
                ]);
                setFriends(friendsRes.data);
                setGroups(groupsRes.data);
            } catch (err) {
                console.error("Error fetching friends or groups:", err);
            }
        };
        fetchData();
    }, []);

    const onCreateExpense = async (data: any) => {
        try {
            setLoading(true);
            await api.post("/expenses", data);
            reset();
            toast.success("Expense created successfully");
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error: any) {
            toast.error("Error when saving the expense");
            console.error("Error when saving the expense");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-items-center pt-20 px-10 w-11/12">
            <main className="flex justify-center px-4 sm:px-6 py-10">
                <section className="bg-white w-full max-w-3xl rounded-xl shadow p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Add Expense
                    </h2>

                    <form
                        onSubmit={handleSubmit(onCreateExpense)}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <input
                                {...register("description", { required: true })}
                                type="text"
                                placeholder="Enter a description"
                                className={`w-full border px-3 py-2 rounded-md text-gray-700 ${
                                    errors.description
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">
                                    Required field
                                </p>
                            )}
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Total ($)
                            </label>
                            <input
                                {...register("amount", {
                                    required: true,
                                    valueAsNumber: true,
                                })}
                                type="number"
                                step="0.01"
                                placeholder="$0.00"
                                className={`w-full border px-3 py-2 rounded-md text-gray-700 ${
                                    errors.amount
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {errors.amount && (
                                <p className="text-red-500 text-sm mt-1">
                                    Required field
                                </p>
                            )}
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                {...register("category", { required: true })}
                                className={`w-full border px-3 py-2 rounded-md text-gray-700 ${
                                    errors.category
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
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

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date
                            </label>
                            <input
                                {...register("date", { required: true })}
                                type="date"
                                className={`w-full border px-3 py-2 rounded-md text-gray-700 ${
                                    errors.date
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {errors.date && (
                                <p className="text-red-500 text-sm mt-1">
                                    Required field
                                </p>
                            )}
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Note (optional)
                            </label>
                            <textarea
                                {...register("note")}
                                placeholder="Add a note"
                                className="w-full border px-3 py-2 rounded-md text-gray-700 h-24 border-gray-300"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <details>
                                <summary className="text-blue-600 cursor-pointer text-sm mb-2">
                                    Advanced Options
                                </summary>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">
                                            Group
                                        </label>
                                        <select
                                            {...register("group_id", {
                                                valueAsNumber: true,
                                            })}
                                            className="w-full border px-3 py-2 rounded-md text-gray-700 border-gray-300"
                                            defaultValue=""
                                        >
                                            <option value="" disabled>
                                                Select a group
                                            </option>
                                            {groups.map((group) => (
                                                <option
                                                    key={group.id}
                                                    value={group.id}
                                                >
                                                    {group.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700">
                                            Paid by Friend
                                        </label>
                                        <select
                                            {...register("paid_by_friend_id", {
                                                valueAsNumber: true,
                                            })}
                                            className="w-full border px-3 py-2 rounded-md text-gray-700 border-gray-300"
                                            defaultValue=""
                                        >
                                            <option value="" disabled>
                                                Select a friend
                                            </option>
                                            {friends.map((friend) => (
                                                <option
                                                    key={friend.id}
                                                    value={friend.id}
                                                >
                                                    {friend.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </details>
                        </div>

                        <div className="sm:col-span-2 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2"
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
