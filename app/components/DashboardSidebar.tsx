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
import { Plus } from "lucide-react"

const menuItemsByRole = {
    recruiter: [

    ],
    seeker: [

    ],
    admin: [

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
                        // menuItemsByRole[role]?.map((item) => (
                        //     <SidebarMenuItem key={item.name}>
                        //         <SidebarMenuButton render={<a href={item.url} />}>
                        //             <item.icon />
                        //             <span>{item.name}</span>
                        //         </SidebarMenuButton>
                        //     </SidebarMenuItem>
                        // ))
                    }
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}