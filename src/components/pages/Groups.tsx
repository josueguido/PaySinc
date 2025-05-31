import { Settings, User, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "@/lib/axios";
import ButtonBack from "../common/ButtonBack";

function Groups() {
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
            await api.post("/groups", data);
            reset(); 
            setTimeout(() => setSuccess(false), 3000);
        } catch (error: any) {
            console.error(
                "Error when saving the group",
                error.response?.data || error.message
            );
        } finally {
            setLoading(false);
        }
    };

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
                        Add Group
                    </h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
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
                            <label htmlFor="description" className="text-gray-700 font-medium block mb-1">
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
                            <span>Saved Group</span>
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default Groups;
