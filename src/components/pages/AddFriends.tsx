import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";
import { Toaster, toast } from "sonner";
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
    const promise = () =>
        new Promise((resolve) =>
            setTimeout(() => resolve({ name: "Sonner" }), 2000)
        );

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
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 flex justify-center items-center px-4">
                <section className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Add Friend
                    </h2>

                    <form
                        onSubmit={handleSubmit(onCreate)}
                        className="space-y-4"
                    >
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <input
                                {...register("name", { required: true })}
                                id="name"
                                type="text"
                                placeholder="Enter friend's name"
                                className={`w-full p-3 border rounded-lg text-gray-600 ${
                                    errors.name ? "border-red-500" : ""
                                }`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">
                                    Required field
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                        >
                            <Save size={16} />
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default AddFriend;
