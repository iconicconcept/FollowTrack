import { BarChart3, LogOut, Wallet, WalletCards } from "lucide-react";

export const Sidebar_Data = [
    {
        id: '01',
        label: "Dashboard",
        icon: BarChart3,
        path: "/dashboard"
    },
    {
        id: '02',
        label: "Income",
        icon: Wallet,
        path: "/income"
    },
    {
        id: '03',
        label: "Expense",
        icon: WalletCards,
        path: "/expense"
    },
    {
        id: '04',
        label: "Logout",
        icon: LogOut,
        path: "logout"
    },
]