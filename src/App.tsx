import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/SideBar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Footer from "./components/layout/Footer";
import NotFound from "./components/layout/NotFound";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Principal from "@/components/layout/Principal";

const Layout = lazy(() => import("./components/layout/Layout"));
const Expenses = lazy(() => import("./components/pages/Expense"));
const Groups = lazy(() => import("./components/pages/Groups"));
const Friends = lazy(() => import("./components/pages/Friends"));
const Dashboard = lazy(() => import("./components/pages/DashBoard"));
const AddFriend = lazy(() => import("./components/pages/AddFriends"));

const App = () => {
    return (
        <SidebarProvider>
            <div className="flex flex-1">
                <AppSidebar />
                <div className="flex-1 w-full flex flex-col">
                    <SidebarTrigger />
                    <Suspense
                        fallback={
                            <div className="text-white p-2">
                                Cargando página...
                            </div>
                        }
                    >
                        <Routes>
                            <Route
                                path="/"
                                element={<Navigate to="/login" replace />}
                            />
                            <Route path="/login" element={<SignIn />} />
                            <Route path="/register" element={<SignUp />} />

                            <Route path="/app" element={<Layout />}>
                                <Route
                                    path="principal"
                                    element={<Principal />}
                                />
                                <Route path="expenses" element={<Expenses />} />
                                <Route path="groups" element={<Groups />} />
                                <Route path="friends" element={<Friends />} />
                                <Route
                                    path="dashboard"
                                    element={<Dashboard />}
                                />
                                <Route
                                    path="addfriend"
                                    element={<AddFriend />}
                                />
                            </Route>

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                    <Footer />
                </div>
            </div>
        </SidebarProvider>
    );
};

export default App;
