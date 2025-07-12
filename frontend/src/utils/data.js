import { BarChart3, LogOut, Wallet, WalletCards } from "lucide-react";

export const Sidebar_Data = [
    {
        id: 1,
        label: "Dashboard",
        icon: BarChart3,
        path: "/dashboard"
    },
    {
        id: 2,
        label: "Income",
        icon: Wallet,
        path: "/income"
    },
    {
        id: 3,
        label: "Expense",
        icon: WalletCards,
        path: "/expense"
    },
    {
        id: 4,
        label: "Logout",
        icon: LogOut,
        path: "logout"
    },
]