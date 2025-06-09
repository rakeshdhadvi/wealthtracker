"use client"

import { create } from "zustand"
import type { DashboardData } from "@/types"

interface AppState {
  dashboardData: DashboardData | null
  setDashboardData: (data: DashboardData) => void

  // UI State
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void

  // Theme
  theme: "light" | "dark"
  setTheme: (theme: "light" | "dark") => void

  // Notifications
  notifications: number
  setNotifications: (count: number) => void
}

export const useStore = create<AppState>((set) => ({
  dashboardData: null,
  setDashboardData: (data) => set({ dashboardData: data }),

  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  theme: "light",
  setTheme: (theme) => set({ theme }),

  notifications: 3,
  setNotifications: (count) => set({ notifications: count }),
}))
