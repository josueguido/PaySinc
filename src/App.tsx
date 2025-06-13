import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster, toast } from "sonner";

import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import NotFound from "./components/layout/NotFound";
import Layout from "./components/layout/Layout";
import Principal from "@/components/layout/Principal";

const Expenses = lazy(() => import("./components/pages/Expense"));
const Groups = lazy(() => import("./components/pages/Groups"));
const Friends = lazy(() => import("./components/pages/Friends"));
const Dashboard = lazy(() => import("./components/pages/DashBoard"));
const AddFriend = lazy(() => import("./components/pages/AddFriends"));
const UserProfile = lazy(() => import("./components/pages/UserProfile"));
const AddGroup = lazy(() => import("./components/pages/AddGroup"));
const Categories = lazy(() => import("./components/pages/Categories"));
const AddCategories = lazy(() => import("./components/pages/AddCategories"));

export default function App() {
    return (
        <Suspense fallback={<div className="p-4">Cargando...</div>}>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />

                <Route path="/app" element={<Layout />}>
                    <Route
                        index
                        element={<Navigate to="principal" replace />}
                    />
                    <Route path="principal" element={<Principal />} />
                    <Route path="expenses" element={<Expenses />} />
                    <Route path="groups" element={<Groups />} />
                    <Route path="friends" element={<Friends />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="addfriend" element={<AddFriend />} />
                    <Route path="addgroup" element={<AddGroup />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="addcategories" element={<AddCategories />} />
                    <Route path="userProfile" element={<UserProfile />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster richColors />
        </Suspense>
    );
}
