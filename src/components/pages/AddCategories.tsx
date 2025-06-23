import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";

function AddCategory() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onCreateCategory = async (data: any) => {
        try {
            setLoading(true);
            await toast.promise(api.post("/categories", data), {
                loading: "Creating category...",
                success: "Category created successfully",
                error: "Error creating category",
            });
            reset();
            navigate("/app/categories");
        } catch (error: any) {
            console.error(
                "Error creating category:",
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
                    <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-2xl mb-3 shadow-md">
                        🏷️
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Add Category
                    </h2>
                    <p className="text-gray-500 text-sm mt-1 text-center">
                        Create a new category to organize your expenses
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onCreateCategory)}
                    className="space-y-5"
                >
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                            # Name
                        </label>
                        <input
                            {...register("name", { required: true })}
                            type="text"
                            placeholder="E.g., Food, Travel, Entertainment..."
                            className={`w-full p-3 border rounded-lg text-gray-700 ${
                                errors.name
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                            📄 Description
                        </label>
                        <textarea
                            {...register("description", { required: true })}
                            placeholder="Describe the purpose of this category..."
                            className={`w-full p-3 border rounded-lg text-gray-700 h-24 ${
                                errors.description
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-black text-white font-medium flex justify-center items-center gap-2 hover:bg-gray-800 transition"
                    >
                        <Save size={16} />
                        {loading ? "Saving..." : "Create Category"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddCategory;
