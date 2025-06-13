import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
    Home,
    BarChart3,
    Wallet,
    Users,
    UserRound,
    Settings,
    LogOut,
} from "lucide-react";
import { useAuth } from "../../store/auth";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/auth";

export function AppSidebar() {
    const { refreshToken, clearAuth } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            if (refreshToken) {
                await logoutUser(refreshToken);
            }
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            clearAuth();
            navigate("/login");
        }
    };

    const items = [
        {
            title: "Home",
            url: "/app/principal",
            icon: Home,
        },
        {
            title: "Dashboard",
            url: "/app/dashboard",
            icon: BarChart3,
        },
        {
            title: "Expenses",
            url: "/app/expenses",
            icon: Wallet,
        },
        {
            title: "Groups",
            url: "/app/groups",
            icon: Users,
        },
        {
            title: "Categories",
            url: "/app/categories",
            icon: Users,
        },
        {
            title: "Friends",
            url: "/app/friends",
            icon: UserRound,
        },
        {
            title: "Settings",
            url: "/app/userProfile",
            icon: Settings,
        },
        {
            title: "Logout",
            url: "#",
            icon: LogOut,
            onClick: handleLogout,
        },
    ];

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>PaySinc App</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild={item.title !== "Logout"}
                                        onClick={item.onClick}
                                    >
                                        {item.title === "Logout" ? (
                                            <span className="flex items-center gap-2 w-full text-left">
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.title}</span>
                                            </span>
                                        ) : (
                                            <Link
                                                to={item.url}
                                                className="flex items-center gap-2"
                                            >
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        )}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
export default AppSidebar;
