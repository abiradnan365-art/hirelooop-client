"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import {
    LayoutDashboard,
    Briefcase,
    Bookmark,
    FileText,
    CreditCard,
    Wallet,
    Users,
    Building2,
    Settings,
    type LucideIcon,
} from "lucide-react"

type MenuItem = {
    name: string
    url: string
    icon: LucideIcon
}

// Nav structure per role, from the Figma "HL 2.0/Sidebar" (Role=Seeker/Recruiter/Admin variants)
// and the route map in Project requirements.md.
const menuItemsByRole: Record<"seeker" | "recruiter" | "admin", MenuItem[]> = {
    recruiter: [
        { name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
        { name: "My Company", url: "/dashboard/recruiter/company", icon: Building2 },
        { name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: Briefcase },
        { name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
        { name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
    ],
    seeker: [
        { name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
        { name: "Jobs", url: "/dashboard/seeker/jobs", icon: Briefcase },
        { name: "Saved Jobs", url: "/dashboard/seeker/saved", icon: Bookmark },
        { name: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
        { name: "Billing", url: "/dashboard/seeker/billing", icon: CreditCard },
        { name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
    ],
    admin: [
        { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
        { name: "Users", url: "/dashboard/admin/users", icon: Users },
        { name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
        { name: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
        { name: "Payments", url: "/dashboard/admin/payments", icon: Wallet },
        { name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
    ]
}

export function DashboardSidebar() {

    const { data: session, isPending } = useSession();
    const role: keyof typeof menuItemsByRole = session?.user?.role as keyof typeof menuItemsByRole || 'seeker';

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
                <SidebarMenu>
                    {
                        menuItemsByRole[role]?.map((item) => (
                            <SidebarMenuItem key={item.name}>
                                <SidebarMenuButton render={<a href={item.url} />}>
                                    <item.icon />
                                    <span>{item.name}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))
                    }
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}