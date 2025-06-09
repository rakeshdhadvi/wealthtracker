"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/hooks/useAuth"
import { useStore } from "@/stores/useStore"
import { MoonIcon, SunIcon, Menu, X, User, LogOut, Settings, Bell, ChevronDown, Sparkles } from "lucide-react"
import { NeonButton } from "@/components/ui/neon-button"
import { PremiumCard } from "@/components/ui/premium-card"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, profile, signOut } = useAuth()
  const { notifications } = useStore()

  const notificationsCount = 3

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.header
      className={`sticky top-0 z-50 ${
        theme === "dark"
          ? "glass border-b border-slate-700/50"
          : "bg-background/80 backdrop-blur-md border-b border-border/50"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        {/* Logo */}
        <motion.div className="flex lg:flex-1" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2 group">
            <motion.div
              className={`w-8 h-8 rounded-lg flex items-center justify-center relative overflow-hidden ${
                theme === "dark"
                  ? "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600"
              }`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-white font-bold relative z-10">W</span>
              {theme === "dark" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
            <span
              className={`text-xl font-bold ${theme === "dark" ? "gradient-text-dark text-glow" : "gradient-text"}`}
            >
              WealthTracker
            </span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sparkles className={`w-4 h-4 ${theme === "dark" ? "text-yellow-400" : "text-yellow-500"}`} />
            </motion.div>
          </Link>
        </motion.div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <motion.button
            type="button"
            className={`inline-flex items-center justify-center rounded-md p-2 ${
              theme === "dark" ? "text-slate-100 hover:bg-slate-800/50" : "text-foreground hover:bg-accent"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">Open main menu</span>
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {[
            { href: "/dashboard", label: "Dashboard" },
            { href: "/investments", label: "Investments" },
            { href: "/liabilities", label: "Liabilities" },
            { href: "/brokers", label: "Connect Brokers" },
            { href: "/insights", label: "Insights" },
            { href: "/pricing", label: "Pricing" },
          ].map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={`text-sm font-semibold leading-6 transition-all duration-300 relative group ${
                  theme === "dark" ? "text-slate-100 hover:text-blue-400" : "text-foreground hover:text-primary"
                }`}
              >
                {item.label}
                <motion.div
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-blue-400 to-purple-400"
                      : "bg-gradient-to-r from-blue-600 to-purple-600"
                  }`}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Desktop right section */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 items-center">
          {/* Theme toggle */}
          {mounted && (
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`rounded-full p-2 transition-all duration-300 relative overflow-hidden group ${
                theme === "dark"
                  ? "bg-slate-800/50 text-yellow-400 hover:bg-slate-700/50 glow-blue"
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SunIcon className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MoonIcon className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
              {theme === "dark" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          )}

          {/* Notifications */}
          <motion.button
            className={`rounded-full p-2 transition-all duration-300 relative ${
              theme === "dark"
                ? "bg-slate-800/50 text-blue-400 hover:bg-slate-700/50 glow-blue"
                : "bg-primary/10 text-primary hover:bg-primary/20"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bell className="h-5 w-5" />
            {notificationsCount > 0 && (
              <motion.span
                className={`absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ${
                  theme === "dark" ? "bg-gradient-to-r from-red-500 to-pink-500 glow-red" : "bg-red-500"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {notificationsCount}
              </motion.span>
            )}
          </motion.button>

          {user ? (
            <div className="relative">
              <motion.button
                className={`flex items-center space-x-2 rounded-full py-1.5 px-3 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-slate-800/50 text-slate-100 hover:bg-slate-700/50 glow-blue"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white relative overflow-hidden ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600"
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {profile?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                  {theme === "dark" && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
                <span className="font-medium text-sm hidden md:block">{profile?.full_name || "Account"}</span>
                <motion.div animate={{ rotate: profileMenuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </motion.button>

              {/* Profile dropdown */}
              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PremiumCard
                      className={`absolute right-0 mt-2 w-48 py-1 z-10 ${
                        theme === "dark" ? "" : "bg-white shadow-lg border border-border/50"
                      }`}
                    >
                      {[
                        { href: "/profile", icon: User, label: "Profile" },
                        { href: "/settings", icon: Settings, label: "Settings" },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center px-4 py-2 text-sm transition-colors ${
                            theme === "dark"
                              ? "text-slate-100 hover:bg-slate-800/50"
                              : "text-foreground hover:bg-accent"
                          }`}
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <item.icon className="h-4 w-4 mr-2" />
                          {item.label}
                        </Link>
                      ))}
                      <motion.button
                        className={`flex items-center px-4 py-2 text-sm w-full text-left transition-colors ${
                          theme === "dark" ? "text-slate-100 hover:bg-slate-800/50" : "text-foreground hover:bg-accent"
                        }`}
                        onClick={async () => {
                          try {
                            setProfileMenuOpen(false)
                            await signOut()
                          } catch (error) {
                            console.error("Error signing out:", error)
                          }
                        }}
                        whileHover={{ x: 5 }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </motion.button>
                    </PremiumCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-x-4">
              <Link
                href="/login"
                className={`text-sm font-semibold leading-6 transition-colors ${
                  theme === "dark" ? "text-slate-100 hover:text-blue-400" : "text-foreground hover:text-primary"
                }`}
              >
                Log in
              </Link>
              <Link href="/signup">
                <NeonButton variant="primary" size="sm">
                  Sign up
                </NeonButton>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={`lg:hidden border-t ${
              theme === "dark" ? "glass border-slate-700/50" : "bg-background/80 backdrop-blur-md border-border/50"
            }`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-1 px-4 py-4">
              {[
                { href: "/dashboard", label: "Dashboard" },
                { href: "/investments", label: "Investments" },
                { href: "/liabilities", label: "Liabilities" },
                { href: "/brokers", label: "Connect Brokers" },
                { href: "/insights", label: "Insights" },
                { href: "/pricing", label: "Pricing" },
              ].map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`block py-2 text-base font-medium rounded-md px-3 transition-colors ${
                      theme === "dark" ? "text-slate-100 hover:bg-slate-800/50" : "text-foreground hover:bg-accent"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
