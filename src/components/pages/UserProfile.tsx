import api from "@/lib/axios";
import { User, Mail, Lock, Phone, Calendar, Smile, IdCard } from "lucide-react";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { toast } from "sonner";

interface UserProfileProps {
    username: string;
    id_number: string;
    email: string;
    password: string;
    phone: string;
    birthdate: string;
    gender: string;
}

function UserProfile() {
    const { register, handleSubmit, reset } = useForm();
    const [user, setUser] = useState<UserProfileProps[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/users");
                const userData = res.data;
                if (userData.birthdate) {
                    userData.birthdate = userData.birthdate.split("T")[0];
                }
                setUser(res.data);
                reset(res.data);
            } catch (err) {
                console.error("Error fetching friends or groups:", err);
            }
        };
        fetchData();
    }, [reset]);

    const onUpdateProfile = async (data: any) => {
        try {
            setLoading(true);

            if (data.birthdate) {
                data.birthdate = new Date(data.birthdate)
                    .toISOString()
                    .split("T")[0];
            }

            await api.put("/users", data);
            console.log("Profile updated successfully:", data);
            toast.success("Profile updated successfully");
            reset(data);
        } catch (error: any) {
            toast.error("Error updating profile");
            console.error("Error updating profile:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center  px-4 py-8">
            <form
                onSubmit={handleSubmit(onUpdateProfile)}
                className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden"
            >
                <div className="bg-black text-white px-6 py-8 text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-white text-black flex items-center justify-center text-2xl mb-4">
                        <User />
                    </div>
                    <h2 className="text-2xl font-bold">Account Information</h2>
                    <p className="text-sm text-gray-300 mt-1">My Account</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-8 bg-white">
                    <div>
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                            <User size={16} /> Username
                        </label>
                        <input
                            {...register("username")}
                            type="text"
                            placeholder="yourusername"
                            className="w-full border px-3 py-2 rounded-lg text-gray-700 border-gray-300"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                            <IdCard size={16} /> ID Number
                        </label>
                        <input
                            {...register("id_number")}
                            type="text"
                            placeholder="000-0000-0000"
                            className="w-full border px-3 py-2 rounded-lg text-gray-700 border-gray-300"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                            <Mail size={16} /> Email
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="you@example.com"
                            className="w-full border px-3 py-2 rounded-lg text-gray-700 border-gray-300"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                            <Phone size={16} /> Phone
                        </label>
                        <input
                            {...register("phone")}
                            type="tel"
                            placeholder="+1 234 567 8900"
                            className="w-full border px-3 py-2 rounded-lg text-gray-700 border-gray-300"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                            <Calendar size={16} /> Birthdate
                        </label>
                        <input
                            {...register("birthdate")}
                            type="date"
                            className="w-full border px-3 py-2 rounded-lg text-gray-700 border-gray-300"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                            <Smile size={16} /> Gender
                        </label>
                        <select
                            {...register("gender")}
                            defaultValue=""
                            className="w-full border px-3 py-2 rounded-lg text-gray-700 border-gray-300"
                        >
                            <option value="" disabled>
                                Select your gender
                            </option>
                            <option value="male">♂️ Male</option>
                            <option value="female">♀️ Female</option>
                            <option value="other">⚧️ Other</option>
                            <option value="prefer_not_to_say">
                                — Prefer not to say
                            </option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-between gap-4 px-6 py-6 border-t bg-white">
                    <button
                        type="button"
                        className="w-full sm:w-1/2 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-full sm:w-1/2 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition flex items-center justify-center gap-2"
                    >
                        <User size={16} />
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserProfile;
