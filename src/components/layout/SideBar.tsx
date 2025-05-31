"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
    IconUsers,
    IconCoin,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { useAuth } from "@/store/auth";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/api/auth";


export function SidebarDemo({ children }: { children?: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const { username } = useAuth();
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

    const links = [
        {
            label: "Dashboard",
            href: "#",
            icon: (
                <IconBrandTabler className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Expenses",
            href: "app/expenses",
            icon: (
                <IconCoin className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Groups",
            href: "app/groups",
            icon: (
                <IconUsers className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Friends",
            href: "app/friends",
            icon: (
                <IconUserBolt className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Settings",
            href: "#",
            icon: (
                <IconSettings className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Logout",
            href: "#",
            icon: (
                <IconArrowLeft className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
            ),
            onClick: handleLogout,
        },
    ];

    return (
        <div className="flex min-h-screen flex-col md:flex-row bg-gray-100 dark:bg-neutral-800">
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-y-auto">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div className="pb-4">
                        <SidebarLink
                            link={{
                                label: username || "Usuario",
                                href: "#",
                                icon: (
                                    <IconUsers className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>

            <div className="flex flex-1 overflow-y-auto">
                <Dashboard>{children}</Dashboard>
            </div>
        </div>
    );
}

export const Logo = () => {
    return (
        <a
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium whitespace-pre text-black dark:text-white"
            >
                PaySinc
            </motion.span>
        </a>
    );
};
export const LogoIcon = () => {
    return (
        <a
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
        </a>
    );
};

const Dashboard = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-10 bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-700 overflow-y-auto">
            {children}
        </div>
    );
};
