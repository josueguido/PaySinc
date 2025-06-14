import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Trash2, User } from "lucide-react";
import api from "@/lib/axios";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { toast } from "sonner";

interface Friend {
    id: number;
    name: string;
    email: string;
    balance: number; 
    created_at: string;
    expenses_count: number;
    groups_count: number;
    is_online: boolean;
}

function Friends() {
    const [friends, setFriends] = useState<Friend[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const res = await api.get("/friends");
                setFriends(res.data);
            } catch (err) {
                console.error("Error fetching friends:", err);
            }
        };
        fetchFriends();
    }, []);

    const onDelete = async (friend: Friend) => {
        try {
            await api.delete(`/friends/${friend.id}`);
            setFriends((prev) => prev.filter((f) => f.id !== friend.id));
            toast.success("Friend deleted successfully");
        } catch (error: any) {
            toast.error("Error deleting");
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto pt-20">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        <User size={24} /> My Friends
                    </h1>
                    <p className="text-sm text-gray-500">
                        Personas con las que compartes gastos
                    </p>
                </div>
                <InteractiveHoverButton
                    onClick={() => navigate("/app/addfriend")}
                >
                    + Add Friend
                </InteractiveHoverButton>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {friends.map((friend) => {
                    const owesYou = friend.balance > 0;
                    const amount = Math.abs(friend.balance).toFixed(2);
                    return (
                        <div
                            key={friend.id}
                            className="bg-white rounded-xl border shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-lg">
                                    {friend.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {friend.name}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Friend ID: {friend.id}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {friend.email}
                                    </p>
                                </div>
                            </div>

                            <div
                                className={`text-center rounded-md font-semibold py-2 px-3 mb-4 ${
                                    owesYou
                                        ? "bg-green-100 text-green-700"
                                        : friend.balance === 0
                                        ? "bg-gray-100 text-gray-600"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {friend.balance === 0
                                    ? "Están a mano"
                                    : owesYou
                                    ? `Te debe ${amount} €`
                                    : `Le debes ${amount} €`}
                            </div>

                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <div className="flex items-center gap-1">
                                    💸 {friend.expenses_count} Expenses
                                </div>
                                <div className="flex items-center gap-1">
                                    👥 {friend.groups_count} Groups
                                </div>
                            </div>

                            <div className="flex items-center text-sm text-gray-500 gap-2 mb-2">
                                <Calendar size={14} />
                                Amigos desde:{" "}
                                {new Date(friend.created_at).toLocaleDateString(
                                    "es-ES",
                                    {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span
                                    className={`h-2 w-2 rounded-full ${
                                        friend.is_online
                                            ? "bg-green-500"
                                            : "bg-gray-400"
                                    }`}
                                />
                                {friend.is_online ? "En línea" : "Desconectado"}
                            </div>

                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => onDelete(friend)}
                                    className="text-sm text-red-600 hover:underline flex items-center gap-1"
                                >
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Friends;
