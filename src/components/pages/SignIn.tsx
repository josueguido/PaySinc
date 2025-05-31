import { useForm } from "react-hook-form";
import axios from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .min(5, "Email must be at least 5 characters")
        .max(255, "Email must be at most 255 characters"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(128, "Password must be at most 128 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).*$/,
            "Password must include uppercase, lowercase, number, and special character"
        ),
});

export default function SignIn() {
    const { setAuth } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            const response = await axios.post("/auth/login", data);
            setAuth(
                response.data.accessToken,
                response.data.refreshToken,
                response.data.username
            );
            navigate("/app");
        } catch (err) {
            console.error("Error logging in:", err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                    Welcome Back
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-700 mb-1"
                        >
                            Email
                        </label>
                        <input
                            {...register("email")}
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors.email ? "border-red-500" : ""
                            }`}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            {...register("password")}
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors.email ? "border-red-500" : ""
                            }`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg"
                    >
                        Continue →
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="text-blue-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
