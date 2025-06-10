import { useForm } from "react-hook-form";
import axios from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail } from "lucide-react";

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
    const setAuth = useAuth((state) => state.setAuth);
    const rehydrated = useAuth((state) => state.rehydrated);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema), mode: "onBlur" });

    if (!rehydrated)
        return <div className="text-white">Loading session...</div>;

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
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-md p-6">
                <div className="flex justify-center mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                </div>
                <h2 className="text-center text-xl font-semibold text-gray-900">
                    Sign in to PaySinc
                </h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Welcome back! Please sign in to continue
                </p>

                <div className="flex gap-2 mb-4">
                    <button className="w-1/2 border border-gray-300 rounded-lg py-2 flex items-center justify-center text-sm hover:bg-gray-100">
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-4 h-4 mr-2"
                        />
                        Google
                    </button>
                    <button className="w-1/2 border border-gray-300 rounded-lg py-2 flex items-center justify-center text-sm hover:bg-gray-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 mr-2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.39-1.333-1.758-1.333-1.758-1.09-.745.082-.729.082-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.81 1.305 3.495.997.108-.775.42-1.305.763-1.605-2.665-.305-5.467-1.335-5.467-5.932 0-1.31.467-2.38 1.235-3.22-.123-.303-.535-1.523.118-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.624-5.48 5.92.43.37.815 1.096.815 2.21 0 1.596-.015 2.884-.015 3.276 0 .32.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                            />
                        </svg>
                        GitHub
                    </button>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <hr className="flex-1 border-gray-300" />
                    <span className="mx-4 text-sm text-gray-500">or</span>
                    <hr className="flex-1 border-gray-300" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email address
                        </label>
                        <div className="relative">
                            <Mail
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />
                            <input
                                {...register("email")}
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 ${
                                    errors.email
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            {...register("password")}
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 ${
                                errors.password
                                    ? "border-red-500"
                                    : "border-gray-300"
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
                        className="w-full bg-gray-800 hover:bg-black text-white font-semibold py-2 rounded-md transition"
                    >
                        Continue ▸
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <a
                        href="/register"
                        className="text-gray-900 hover:underline font-medium"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
