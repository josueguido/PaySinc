import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

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
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}
