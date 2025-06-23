import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";

interface Friend {
    id: number;
    name: string;
}

interface Group {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    description: string;
    created_at?: string;
    user_id?: number;
}

function Expense() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [friends, setFriends] = useState<Friend[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [friendsRes, groupsRes, categoriesRes] =
                    await Promise.all([
                        api.get("/friends"),
                        api.get("/groups"),
                        api.get("/categories"),
                    ]);
                setFriends(friendsRes.data);
                setGroups(groupsRes.data);
                setCategories(categoriesRes.data);
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
        } catch (error) {
            toast.error("Error saving expense");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-start pt-24 px-4 sm:px-6">
            <main className="bg-white w-full max-w-2xl rounded-xl shadow p-6 sm:p-10">
                <div className="text-center mb-8">
                    <div className="mx-auto mb-4 w-14 h-14 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full text-2xl">
                        🧾
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Add Expense
                    </h2>
                    <p className="text-gray-500 text-sm pt-2">
                        Register new expenses and share them with your friends
                        or groups
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onCreateExpense)}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                    <div className="col-span-1">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            📝 Description
                        </label>
                        <input
                            {...register("description", { required: true })}
                            placeholder="¿What you spent?"
                            className={`w-full border px-3 py-2 rounded-md text-gray-700 ${
                                errors.description
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            💵 Total ($)
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
                    </div>

                    <div className="col-span-1">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            📁 Category
                        </label>
                        <select
                            {...register("category", { required: true })}
                            className={`w-full border px-3 py-2 rounded-md text-gray-700 ${
                                errors.category
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-1">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            📅 Date
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
                    </div>

                    <div className="sm:col-span-2">
                        <label className="text-sm font-medium text-gray-700">
                            Note (opcional)
                        </label>
                        <textarea
                            {...register("note")}
                            placeholder="Add additional details about this expense..."
                            className="w-full border px-3 py-2 rounded-md text-gray-700 h-24 border-gray-300"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <details className="border-t pt-4 text-sm">
                            <summary className="cursor-pointer text-gray-600 font-medium mb-2">
                                👥 Advanced options
                            </summary>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Groups
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
                                        Payment made by
                                    </label>
                                    <select
                                        {...register("paid_by_friend_id", {
                                            valueAsNumber: true,
                                        })}
                                        className="w-full border px-3 py-2 rounded-md text-gray-700 border-gray-300"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            Who paid?
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

                    <div className="sm:col-span-2 flex flex-col sm:flex-row justify-between gap-4 mt-6">
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="w-full sm:w-1/2 border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-1/2 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition flex items-center justify-center gap-2"
                        >
                            <Save size={16} />
                            {loading ? "Saving..." : "Saved expense"}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Expense;
