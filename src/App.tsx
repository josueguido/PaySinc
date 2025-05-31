import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Expense from "./components/pages/Expense";
import Groups from "./components/pages/Groups";
import NotFound from "./components/layout/NotFound";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Friends from "./components/pages/Friends";
import Dashboard from "./components/pages/DashBoard";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/app" element={<Layout />} />
            <Route path="/app/expenses" element={<Expense />} />
            <Route path="/app/groups" element={<Groups />} />
            <Route path="/app/friends" element={<Friends />} />
            <Route path="/app/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;
