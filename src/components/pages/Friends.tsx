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
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    + Add Friend
                </button>
            </div>

            {friends.length === 0 ? (
                <div className="text-center text-gray-400 mt-20">
                    <UserPlus size={48} className="mx-auto mb-2" />
                    <p className="text-lg">No friends yet</p>
                    <p className="text-sm">Start by adding someone</p>
                </div>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {friends.map((friend) => (
                        <li
                            key={friend.id}
                            className="group flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
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

                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                <button className="text-blue-600 hover:text-blue-800">
                                    <Eye size={18} />
                                </button>
                                <button className="text-gray-500 hover:text-gray-700">
                                    <Pencil size={18} />
                                </button>
                                <button className="text-red-500 hover:text-red-700">
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
