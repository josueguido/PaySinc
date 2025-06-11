import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";
import { Save } from "lucide-react";

function AddFriend() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            await api.post("/friends", data);
            reset();
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                navigate("/app/friends");
            }, 1500);
        } catch (error: any) {
            console.error("Error creating friend", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" min-h-screen flex flex-col">

            <main className="flex-1 flex justify-center items-center px-4">
                <section className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Friend</h2>

                    {success && (
                        <div className="bg-green-100 text-green-700 border border-green-300 rounded-md p-3 text-sm mb-4">
                            ✅ Amigo creado con éxito
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                {...register("name", { required: true })}
                                id="name"
                                type="text"
                                placeholder="Enter friend's name"
                                className={`w-full p-3 border rounded-lg text-gray-600 ${errors.name ? "border-red-500" : ""}`}
                            />
                            {errors.name && <p className="text-red-500 text-sm">Required field</p>}
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
