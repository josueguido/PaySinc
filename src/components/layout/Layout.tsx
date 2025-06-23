import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./SideBar";
import { SidebarTrigger } from "../ui/sidebar";
import Footer from "./Footer";


export default function AppLayout() {
    return (
        <SidebarProvider>
            <div className="flex w-full min-h-screen">
                <AppSidebar />
                <div className="flex-1 flex flex-col">
                    <SidebarTrigger />
                    <main className="flex-1 p-4">
                        <Outlet/>
                    </main>
                    <Footer />
                </div>
            </div>
        </SidebarProvider>
    );
}
