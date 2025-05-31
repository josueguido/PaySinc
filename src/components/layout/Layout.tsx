import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarDemo } from "../layout/SideBar";
import Header from "../layout/Header";
import Principal from "../layout/Principal";
import Footer from "./Footer";

export default function Layout() {
    return (
        <SidebarProvider>
            <div className="flex flex-col min-h-screen">
                <SidebarDemo>
                    <Header />
                    <Principal />
                </SidebarDemo>
                <Footer />
            </div>
        </SidebarProvider>
    );
}
