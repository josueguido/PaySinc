import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, UserPlus, Eye, Pencil, Trash2Icon } from "lucide-react";
import api from "@/lib/axios";

interface Friend {
    id: number;
    name: string;
    user_id: number;
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

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <User size={24} /> My Friends
                    </h1>
                    <p className="text-sm text-gray-500">
                        People you track expenses with.
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        {friends.length} total
                    </p>
                </div>

                <button
                    onClick={() => navigate("/app/addfriend")}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    <UserPlus size={16} /> Add Friend
                </button>
            </div>

            {friends.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <UserPlus size={48} className="mb-4" />
                    <p className="text-lg font-medium">
                        You haven’t added any friends yet.
                    </p>
                    <p className="text-sm mb-2">
                        Start collaborating by adding someone.
                    </p>
                    <button
                        onClick={() => navigate("/app/addfriend")}
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        <UserPlus size={16} /> Add Friend
                    </button>
                </div>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {friends.map((friend) => (
                        <li
                            key={friend.id}
                            className="group flex justify-between items-center p-5 border rounded-xl shadow-sm bg-white hover:shadow-lg  hover:scale-[1.01] transition-transform
"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm group-hover:scale-105 transition-transform">
                                    {friend.name.charAt(0).toUpperCase()}
                                </div>

                                <div>
                                    <p className="text-lg font-medium text-gray-800">
                                        {friend.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Friend ID: {friend.id}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 text-gray-500 group-hover:text-gray-700 transition">
                                <button className="hover:text-blue-600">
                                    <Eye size={18} />
                                </button>
                                <button className="hover:text-yellow-500">
                                    <Pencil size={18} />
                                </button>
                                <button className="hover:text-red-600">
                                    <Trash2Icon size={18} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Friends;
