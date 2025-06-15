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
  BarChart3,
  Gavel,
  ChartAreaIcon,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AdminDashboardLayoutProps {
  children: React.ReactNode
}

export function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard/admin",
      icon: Home,
      current: pathname === "/dashboard/admin",
    },
    {
      name: "Cases",
      href: "/dashboard/admin/cases",
      icon: FileText,
      current: pathname.includes("/cases"),
    },
    {
      name: "Reports",
      href: "/dashboard/admin/reports",
      icon: BarChart3,
      current: pathname.includes("/reports"),
    },
    {
      name: "Assignments",
      href: "/dashboard/admin/assignments",
      icon: Gavel,
      current: pathname.includes("/assignments"),
    },
    {
      name: "Lawyers",
      href: "/dashboard/admin/lawyers",
      icon: Scale,
      current: pathname.includes("/lawyers"),
    },
    {
      name: "Organizations",
      href: "/dashboard/admin/organizations",
      icon: Building2,
      current: pathname.includes("/organizations"),
    },
    
    {
      name: "Analytics",
      href: "/dashboard/admin/analytics",
      icon: BarChart3,
      current: pathname.includes("/analytics"),
    },
    {
      name: "Diagrams",
      href: "/dashboard/admin/diagrams",
      icon: ChartAreaIcon,
      current: pathname.includes("/settings"),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 fixed w-full top-0 z-50 shadow-lg">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden hover:bg-blue-50 transition-colors duration-300"
              >
                <Menu className="h-5 w-5" />
              </Button>

              <Link href="/" className="flex items-center space-x-2 ml-4 lg:ml-0 group">
                <Shield className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                <span className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                  HumanWatch
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {/* Enhanced Search */}
              <div className="hidden md:block">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm hover:bg-white transition-all duration-300"
                  />
                </div>
              </div>

              {/* Enhanced Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-blue-50 transition-all duration-300 group"
              >
                <Bell className="h-5 w-5 group-hover:text-blue-600 transition-colors duration-300" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  5
                </span>
              </Button>

              {/* Enhanced User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 hover:bg-blue-50 transition-all duration-300 group"
                  >
                    <Avatar className="h-8 w-8 ring-2 ring-transparent group-hover:ring-blue-200 transition-all duration-300">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-gradient-to-r from-slate-500 to-gray-500 text-white">
                        <Shield className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block text-sm font-medium group-hover:text-blue-700 transition-colors duration-300">
                      Admin
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-md border-gray-200/50">
                  <DropdownMenuItem className="hover:bg-blue-50 transition-colors duration-300">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-blue-50 transition-colors duration-300">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 hover:bg-red-50 transition-colors duration-300">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/90 backdrop-blur-md border-r border-gray-200/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-xl ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full pt-16">
          <div className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group transform hover:scale-105 ${
                  item.current
                    ? "bg-gradient-to-r from-slate-500 to-gray-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-slate-50 hover:to-gray-50 hover:text-slate-700"
                } animate-slideInLeft`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 transition-transform duration-300 ${item.current ? "" : "group-hover:scale-110"}`}
                />
                {item.name}
              </Link>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200/50 bg-gradient-to-r from-gray-50 to-slate-50">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-300">
              <Avatar className="h-10 w-10 ring-2 ring-slate-200">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-gradient-to-r from-slate-500 to-gray-500 text-white">
                  <Shield className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin Account</p>
                <p className="text-xs text-gray-500 truncate">admin@humanwatch.org</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 pt-16">
        <main className="p-6">{children}</main>
      </div>

      {/* Enhanced Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
