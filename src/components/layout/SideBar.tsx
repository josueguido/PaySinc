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
} from "lucide-react";

import { Link } from "react-router-dom";

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
        title: "Friends",
        url: "/app/friends",
        icon: UserRound,
    },
    {
        title: "Settings",
        url: "",
        icon: Settings,
    },
];

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>PaySinc App</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            to={item.url}
                                            className="flex items-center gap-2"
                                        >
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </Link>
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
