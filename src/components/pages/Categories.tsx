import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { toast } from "sonner";
import { Calendar, Trash2, User } from "lucide-react";

interface Category {
    id: number;
    name: string;
    description: string;
    created_at?: string;
    user_id?: number;
}

function Categories() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [editModeId, setEditModeId] = useState<number | null>(null);
    const [editedName, setEditedName] = useState<string>("");

    useEffect(() => {
        let isMounted = true;
        const fetchCategories = async () => {
            try {
                const response = await api.get("/categories");
                if (isMounted) setCategories(response.data);
            } catch (error) {
                console.error("Error when fetching categories:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchCategories();
        return () => {
            isMounted = false;
        };
    }, []);

    const onDelete = async (category: Category) => {
        try {
            setLoading(true);
            await api.delete(`/categories/${category.id}`);
            setCategories((prev) => prev.filter((c) => c.id !== category.id));
            toast.success("Category deleted successfully");
            setTimeout(() => {
                navigate("/app/categories");
            }, 1500);
        } catch (error: any) {
            toast.error("Error deleting category");
            console.error("Error deleting category:", error);
        }
        setLoading(false);
    };

    return (
        <main className="px-10 pt-10">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Categories</h1>
                    <p className="text-muted-foreground">
                        Manage and organize your content categories
                    </p>
                </div>
                <InteractiveHoverButton
                    onClick={() => navigate("/app/addcategories")}
                >
                    + Add Category
                </InteractiveHoverButton>
            </header>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="border rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200 bg-white flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                {editModeId !== category.id ? (
                                    <h2 className="text-lg font-semibold">
                                        {category.name}
                                    </h2>
                                ) : (
                                    <input
                                        value={editedName}
                                        onChange={(e) =>
                                            setEditedName(e.target.value)
                                        }
                                        className="text-lg font-medium border px-2 py-1 rounded w-full"
                                    />
                                )}
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                                    ID: {category.id}
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 mb-4">
                                {category.description}
                            </p>

                            <div className="flex items-center text-xs text-gray-500 space-x-4 mb-4">
                                <div className="flex items-center gap-1">
                                    <User size={14} />
                                    <span>User: {category.user_id || "—"}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    <span>
                                        Created at:{" "}
                                        {category.created_at
                                            ? new Date(
                                                  category.created_at
                                              ).toLocaleString("en-US", {
                                                  dateStyle: "medium",
                                                  timeStyle: "short",
                                              })
                                            : "—"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            {editModeId === category.id ? (
                                <>
                                    <button
                                        onClick={async () => {
                                            try {
                                                await api.put(
                                                    `/categories/${category.id}`,
                                                    {
                                                        ...category,
                                                        name: editedName,
                                                    }
                                                );
                                                setCategories((prev) =>
                                                    prev.map((c) =>
                                                        c.id === category.id
                                                            ? {
                                                                  ...c,
                                                                  name: editedName,
                                                              }
                                                            : c
                                                    )
                                                );
                                                toast.success(
                                                    "Category updated"
                                                );
                                                setEditModeId(null);
                                            } catch (e) {
                                                toast.error("Error updating");
                                            }
                                        }}
                                        className="px-3 py-1 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditedName(category.name);
                                            setEditModeId(null);
                                        }}
                                        className="mt-auto flex items-center gap-2 text-sm px-3 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            setEditModeId(category.id);
                                            setEditedName(category.name);
                                        }}
                                        className="px-3 py-1 text-sm bg-sky-600 text-white rounded hover:bg-sky-700"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(category)}
                                        className="mt-auto flex items-center gap-2 text-sm px-3 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </section>
        </main>
    );
}

export default Categories;
