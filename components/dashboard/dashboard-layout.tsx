"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Shield,
  Home,
  FileText,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  Scale,
  Building2,
  User,
  Plus,
  BarChart3,
  Gavel,
  UserPlus,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
  userType: "organization" | "user" | "lawyer" | "admin"
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const getUserIcon = () => {
    // ... (same as before)
    switch (userType) {
      case "organization":
        return Building2
      case "lawyer":
        return Scale
      case "admin":
        return Shield
      default:
        return User
    }
  }

  const getUserTitle = () => {
    // ... (same as before)
    switch (userType) {
      case "organization":
        return "Organization"
      case "lawyer":
        return "Lawyer"
      case "admin":
        return "Admin"
      default:
        return "User"
    }
  }

  const getNavigation = () => {
    const baseHref = `/dashboard/${userType}`
    const navItems = []

    // Common "Dashboard" link for all roles, pointing to their main overview page
    navItems.push({
      name: "Dashboard",
      href: baseHref,
      icon: Home,
      current: pathname === baseHref,
    })

    if (userType === "organization") {
      navItems.push(
        { name: "Add Case", href: `${baseHref}/add-case`, icon: Plus, current: pathname === `${baseHref}/add-case` },
        {
          name: "Add Victim",
          href: `${baseHref}/add-victim`,
          icon: UserPlus,
          current: pathname === `${baseHref}/add-victim`,
        },
        { name: "Cases", href: `${baseHref}/cases`, icon: FileText, current: pathname.startsWith(`${baseHref}/cases`) },
        {
          name: "Reports",
          href: `${baseHref}/reports`,
          icon: BarChart3,
          current: pathname.startsWith(`${baseHref}/reports`),
        },
        {
          name: "Victims",
          href: `${baseHref}/victims`,
          icon: Users,
          current: pathname.startsWith(`${baseHref}/victims`),
        },
      )
    } else if (userType === "user") {
      navItems.push(
        {
          name: "Add Report",
          href: `${baseHref}/add-report`,
          icon: Plus,
          current: pathname === `${baseHref}/add-report`,
        },
        {
          name: "Add Victim",
          href: `${baseHref}/add-victim`,
          icon: UserPlus,
          current: pathname === `${baseHref}/add-victim`,
        },
        {
          name: "My Reports",
          href: `${baseHref}/reports`,
          icon: BarChart3,
          current: pathname.startsWith(`${baseHref}/reports`),
        }, // Main page shows "My Reports", this link goes to the same.
        {
          name: "All Cases",
          href: `${baseHref}/cases`,
          icon: FileText,
          current: pathname.startsWith(`${baseHref}/cases`),
        },
        {
          name: "Victims",
          href: `${baseHref}/victims`,
          icon: Users,
          current: pathname.startsWith(`${baseHref}/victims`),
        },
        {
          name: "Resources",
          href: `${baseHref}/resources`,
          icon: BookOpen,
          current: pathname === `${baseHref}/resources`,
        },
      )
    } else if (userType === "lawyer") {
      navItems.push(
        {
          name: "Assigned Cases",
          href: `${baseHref}/cases`,
          icon: FileText,
          current: pathname.startsWith(`${baseHref}/cases`),
        },
        {
          name: "Assigned Reports",
          href: `${baseHref}/reports`,
          icon: BarChart3,
          current: pathname.startsWith(`${baseHref}/reports`),
        },
        // Add other lawyer-specific links like "Victims" if needed
        // { name: "Victims", href: `${baseHref}/victims`, icon: Users, current: pathname.startsWith(`${baseHref}/victims`) }
      )
    } else if (userType === "admin") {
      navItems.push(
        { name: "Cases", href: `${baseHref}/cases`, icon: FileText, current: pathname.startsWith(`${baseHref}/cases`) },
        {
          name: "Reports",
          href: `${baseHref}/reports`,
          icon: BarChart3,
          current: pathname.startsWith(`${baseHref}/reports`),
        },
        {
          name: "Victims",
          href: `${baseHref}/victims`,
          icon: Users,
          current: pathname.startsWith(`${baseHref}/victims`),
        },
        {
          name: "Lawyers",
          href: `${baseHref}/lawyers`,
          icon: Scale,
          current: pathname.startsWith(`${baseHref}/lawyers`),
        },
        {
          name: "Organizations",
          href: `${baseHref}/organizations`,
          icon: Building2,
          current: pathname.startsWith(`${baseHref}/organizations`),
        },
        { name: "Users", href: `${baseHref}/users`, icon: Users, current: pathname.startsWith(`${baseHref}/users`) },
        {
          name: "Assignments",
          href: `${baseHref}/assignments`,
          icon: Gavel,
          current: pathname.startsWith(`${baseHref}/assignments`),
        },
      )
    }

    // Common "Settings" link for all roles
    navItems.push({
      name: "Settings",
      href: `${baseHref}/settings`,
      icon: Settings,
      current: pathname.startsWith(`${baseHref}/settings`),
    })

    return navItems
  }

  const navigation = getNavigation()
  const UserIcon = getUserIcon()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-slate-100">
      <nav className="bg-white/90 backdrop-blur-lg border-b border-gray-200/70 fixed w-full top-0 z-50 shadow-md">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-600 hover:bg-slate-200/60 transition-colors duration-300"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Link href="/" className="flex items-center space-x-2 ml-4 lg:ml-0 group">
                <Shield className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                <span className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                  Human Rights
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="hidden md:block">
                <div className="relative group">
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 text-sm border border-gray-300/80 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50/50 backdrop-blur-sm hover:bg-white transition-all duration-300 w-56"
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-600 hover:bg-slate-200/60 transition-all duration-300 group"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5 group-hover:text-blue-600 transition-colors duration-300" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  3
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 hover:bg-slate-200/60 transition-all duration-300 group p-1.5 rounded-lg"
                  >
                    <Avatar className="h-8 w-8 ring-1 ring-slate-300/70 group-hover:ring-blue-400 transition-all duration-300">
                      <AvatarImage
                        src={`/placeholder.svg?height=32&width=32&query=${userType}+avatar`}
                        alt={`${getUserTitle()} avatar`}
                      />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                        <UserIcon className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors duration-300">
                      {getUserTitle()}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-white/95 backdrop-blur-md border-gray-200/50 shadow-xl rounded-lg mt-1"
                >
                  <DropdownMenuItem className="hover:bg-slate-100 transition-colors duration-200 text-sm py-2 px-3">
                    <User className="mr-2.5 h-4 w-4 text-gray-500" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-100 transition-colors duration-200 text-sm py-2 px-3">
                    <Settings className="mr-2.5 h-4 w-4 text-gray-500" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200/70" />
                  <DropdownMenuItem className="text-red-600 hover:bg-red-50/70 hover:!text-red-700 transition-colors duration-200 text-sm py-2 px-3">
                    <LogOut className="mr-2.5 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/95 backdrop-blur-lg border-r border-gray-200/60 transform transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-lg ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full pt-16">
          {" "}
          {/* Adjust pt to match navbar height */}
          <div className="flex-1 px-3 py-5 space-y-1.5">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => sidebarOpen && setSidebarOpen(false)}
                className={`flex items-center px-3.5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group transform hover:translate-x-1 ${
                  item.current
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg"
                    : "text-gray-600 hover:bg-slate-200/70 hover:text-gray-800"
                } animate-slideInLeft`}
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 transition-transform duration-200 ${item.current ? "text-white" : "text-gray-500 group-hover:text-gray-700 group-hover:scale-110"}`}
                />
                {item.name}
              </Link>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200/60 bg-slate-50/70">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/70 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-sm">
              <Avatar className="h-10 w-10 ring-1 ring-blue-300/80">
                <AvatarImage
                  src={`/placeholder.svg?height=40&width=40&query=${userType}+profile`}
                  alt={`${getUserTitle()} avatar`}
                />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <UserIcon className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{getUserTitle()} Account</p>
                <p className="text-xs text-gray-500 truncate">user@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:pl-64 pt-16">
        {" "}
        {/* Adjust pt to match navbar height */}
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
