import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "@/lib/axios";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router";

interface Category {
    name: string;
    description: string;
}

function AddCategory() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const onCreateCategory = async (data: any) => {
        try {
            setLoading(true);
            await api.post("/categories", data);
            toast.success("Category created successfully");
            reset();
            navigate("/app/categories");
            setTimeout(() => setSuccess(false), 3000);
        } catch (error: any) {
            toast.error("Error when saving the category");
            console.error("Error when saving the category");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full">
            <main className="flex-1 flex justify-center items-start px-6 py-8">
                <section className="bg-white shadow rounded-lg p-8 w-full max-w-3xl">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Add Category
                    </h2>
                    <form
                        onSubmit={handleSubmit(onCreateCategory)}
                        className="space-y-4"
                    >
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="name" className="font-medium">
                                Name
                            </label>
                            <input
                                autoComplete="off"
                                {...register("name", { required: true })}
                                type="text"
                                id="name"
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

                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ${
                                loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            {loading && <Save size={20} />}
                            <span>Create Category</span>
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default AddCategory;
