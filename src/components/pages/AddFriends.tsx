import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";

function AddFriend() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onCreate = async (data: any) => {
        try {
            setLoading(true);
            await toast.promise(api.post("/friends", data), {
                loading: "Adding friend...",
                success: "Friend added successfully",
                error: "Error adding friend",
            });

            reset();
            navigate("/app/friends");
        } catch (error: any) {
            console.error(
                "Error creating friend",
                error.response?.data || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 text-white flex items-center justify-center text-3xl mb-3 shadow-md">
                        👤
                    </div>
                    <h2 className="text-2xl font-bold text-black-700">
                        Add Friend
                    </h2>
                    <p className="text-gray-500 text-sm mt-1 text-center">
                        Add a new friend to share expenses
                    </p>
                </div>

                <form onSubmit={handleSubmit(onCreate)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            👤 Name
                        </label>
                        <input
                            {...register("name", { required: true })}
                            type="text"
                            placeholder="Enter the full name..."
                            className={`w-full p-3 border rounded-lg ${
                                errors.name
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ✉️ Email
                        </label>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            placeholder="email@example.com"
                            className={`w-full p-3 border rounded-lg ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ⚧️ Gender
                        </label>
                        <select
                            {...register("gender", { required: true })}
                            defaultValue=""
                            className={`w-full p-3 border rounded-lg ${
                                errors.gender
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        >
                            <option value="" disabled>
                                Select the genre
                            </option>
                            <option value="male">♂️ Male</option>
                            <option value="female">♀️ Female</option>
                            <option value="other">⚧️ Other</option>
                            <option value="prefer_not_to_say">
                                — Prefer not to say
                            </option>
                        </select>
                    </div>

                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-1/2 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition flex items-center justify-center gap-2"
                        >
                            <Save size={16} />
                            {loading ? "Saving..." : "Add Friend"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddFriend;
