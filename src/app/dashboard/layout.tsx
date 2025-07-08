"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Bell,
  LogOut,
  Settings,
  User,
  Package,
  Map,
  BarChart,
  Warehouse,
  Truck,
  Briefcase,
  DollarSign
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarProvider,
  SidebarFooter,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"

type UserRole = "customer" | "driver" | "retailer"

const navItems: Record<UserRole, { href: string; label: string; icon: React.ElementType }[]> = {
  customer: [
    { href: "/dashboard", label: "Dashboard", icon: BarChart },
    { href: "/dashboard/customer/orders", label: "Orders", icon: Package },
    { href: "/dashboard/customer/map", label: "Live Map", icon: Map },
    { href: "/dashboard/customer/analytics", label: "Analytics", icon: BarChart },
  ],
  driver: [
    { href: "/dashboard", label: "Job Feed", icon: Briefcase },
    { href: "/dashboard/driver/route", label: "Today's Route", icon: Map },
    { href: "/dashboard/driver/earnings", label: "Earnings", icon: DollarSign },
  ],
  retailer: [
    { href: "/dashboard", label: "Dashboard", icon: BarChart },
    { href: "/dashboard/retailer/shipments", label: "Shipments", icon: Truck },
    { href: "/dashboard/retailer/inventory", label: "Inventory", icon: Warehouse },
  ],
};

const userDetails: Record<UserRole, { name: string; email: string }> = {
    customer: { name: 'Customer User', email: 'customer@example.com' },
    driver: { name: 'Driver Partner', email: 'driver@example.com' },
    retailer: { name: 'Retailer Admin', email: 'retailer@example.com' },
}

function UserNav({ userRole }: { userRole: UserRole }) {
    const router = useRouter();
    const user = userDetails[userRole];

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        router.push('/login');
    };

    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
                <AvatarImage src={`https://placehold.co/100x100.png?text=${user.name.charAt(0)}`} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [userRole, setUserRole] = React.useState<UserRole | null>(null)

  React.useEffect(() => {
    const storedRole = localStorage.getItem("userRole") as UserRole
    if (storedRole && ["customer", "driver", "retailer"].includes(storedRole)) {
      setUserRole(storedRole)
    } else {
      router.push("/login")
    }
  }, [router])

  if (!userRole) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  const currentNavItems = navItems[userRole]

  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
                <Logo/>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                {currentNavItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                        asChild
                        isActive={pathname.endsWith(item.href)}
                    >
                        <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <ThemeToggle/>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <SidebarTrigger className="md:hidden"/>
                <div className="flex-1">
                    {/* Header content like search can go here */}
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                    <UserNav userRole={userRole}/>
                </div>
            </header>
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  )
}
