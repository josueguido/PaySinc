import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "@/lib/axios";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router";

function AddGroups() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const onCreateGroup = async (data: any) => {
        try {
            setLoading(true);
            await api.post("/groups", data);
            toast.success("Group created successfully");
            reset();
            navigate("/app/groups");
            setTimeout(() => setSuccess(false), 3000);
        } catch (error: any) {
            toast.error("Error when saving the group");
            console.error("Error when saving the group");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-start pt-24 px-4 sm:px-6">
            <main className="bg-white w-full max-w-2xl rounded-xl shadow p-6 sm:p-10">
                <div className="text-center mb-8">
                    <div className="mx-auto mb-4 w-14 h-14 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full text-2xl">
                        👥
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Add Group
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Create a new group to share expenses with friends and
                        family
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onCreateGroup)}
                    className="space-y-6"
                >
                    <div>
                        <label
                            htmlFor="name"
                            className="text-sm font-medium text-gray-700 block mb-1"
                        >
                            Group name
                        </label>
                        <input
                            autoComplete="off"
                            {...register("name", { required: true })}
                            type="text"
                            id="name"
                            placeholder="e.g. Beach Trip, Christmas Dinner..."
                            className="w-full border px-3 py-2 rounded-md text-gray-700 border-gray-300"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                Required field
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="text-sm font-medium text-gray-700 block mb-1"
                        >
                            Description
                        </label>
                        <textarea
                            autoComplete="off"
                            {...register("description", { required: true })}
                            id="description"
                            placeholder="Describe the purpose of this group..."
                            className="w-full border px-3 py-2 rounded-md text-gray-700 border-gray-300 h-24"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                Required field
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex items-center justify-center gap-2 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition ${
                                loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            <Save size={16} />
                            {loading ? "Saving..." : "Save Group"}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default AddGroups;
