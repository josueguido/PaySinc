import { useNavigate } from "react-router";
import { use, useEffect, useState } from "react";
import api from "@/lib/axios";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Toaster, toast } from "sonner";

interface Category {
    id: number;
    name: string;
    description: string;
}

function Categories() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);

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
        <>
            <main className="flex-1 flex justify-center items-start px-6 py-8">
                <section className="bg-white shadow rounded-lg p-8 w-full max-w-3xl">
                    <header className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            My Groups
                        </h2>
                        <button
                            onClick={() => navigate("/app/addcategories")}
                            className="inline-flex items-center gap-2  px-4 py-2 rounded-md "
                        >
                            <InteractiveHoverButton>
                                Add Category
                            </InteractiveHoverButton>
                        </button>
                    </header>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ul className="space-y-4">
                            {categories.map((category) => (
                                <li
                                    key={category.id}
                                    className="p-4 border rounded-lg"
                                >
                                    <h3 className="text-lg font-medium">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {category.description}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </main>
        </>
    );
}

export default Categories;
