import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useNavigate } from "react-router";
import { CalendarDays, MapPin, Users } from "lucide-react";

interface Group {
    id: number;
    name: string;
    description: string;
    category?: string;
    members_count?: number;
    created_at?: string;
    last_activity?: string;
    role?: "owner" | "member";
    color?: string; 
}

function Groups() {
    const [loading, setLoading] = useState(true);
    const [groups, setGroups] = useState<Group[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const fetchGroups = async () => {
            try {
                const response = await api.get("/groups");
                if (isMounted) setGroups(response.data);
            } catch (error) {
                console.error("Error when fetching groups:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchGroups();

        return () => {
            isMounted = false;
        };
    }, []);

    const colorPalette = [
        "#f87171", 
        "#fbbf24", 
        "#34d399",
        "#60a5fa", 
        "#a78bfa", 
        "#f472b6", 
        "#facc15", 
        "#38bdf8", 
    ];

    function getColorForCategory(category: string): string {
        let hash = 0;
        for (let i = 0; i < category.length; i++) {
            hash = category.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % colorPalette.length;
        return colorPalette[index];
    }
    return (
        <main className="px-10 pt-10">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">My Groups</h1>
                    <p className="text-muted-foreground pt-4">
                        Manage and participate in your work groups.
                    </p>
                </div>
                <InteractiveHoverButton
                    onClick={() => navigate("/app/addgroup")}
                >
                    + Add Group
                </InteractiveHoverButton>
            </div>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groups.map((group) => (
                        <div
                            key={group.id}
                            className="border rounded-lg shadow-sm p-6 bg-white relative overflow-hidden"
                        >
                            <div
                                className="absolute top-0 left-0 w-full h-1"
                                style={{
                                    backgroundColor: getColorForCategory(
                                        group.category || group.name || ""
                                    ),
                                }}
                            />

                            <h2 className="text-lg font-semibold mb-1">
                                {group.name}
                            </h2>
                            {group.category && (
                                <span className="text-xs inline-block bg-gray-100 text-gray-800 rounded-full px-2 py-0.5 mb-2">
                                    {group.category}
                                </span>
                            )}
                            <p className="text-sm text-gray-600 mb-4">
                                {group.description}
                            </p>

                            <div className="flex flex-col gap-1 text-sm text-gray-500 mb-4">
                                <div className="flex items-center gap-2">
                                    <Users size={16} />{" "}
                                    {group.members_count || 0} members
                                </div>
                                <div className="flex items-center gap-2">
                                    <CalendarDays size={16} /> Created at:{" "}
                                    {group.created_at
                                        ? new Date(
                                              group.created_at
                                          ).toLocaleDateString("es-CR", {
                                              day: "numeric",
                                              month: "short",
                                              year: "numeric",
                                          })
                                        : "—"}
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} /> Latest activity:{" "}
                                    {group.last_activity
                                        ? new Date(
                                              group.last_activity
                                          ).toLocaleDateString("es-CR", {
                                              day: "numeric",
                                              month: "short",
                                              year: "numeric",
                                          })
                                        : "—"}
                                </div>
                            </div>

                            {group.role && (
                                <span
                                    className={`text-xs font-semibold rounded-full px-2 py-0.5 ${
                                        group.role === "owner"
                                            ? "bg-black text-white"
                                            : "bg-gray-200 text-black"
                                    }`}
                                >
                                    {group.role === "owner"
                                        ? "Owner"
                                        : "Member"}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}

export default Groups;
