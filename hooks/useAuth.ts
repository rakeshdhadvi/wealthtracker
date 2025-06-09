"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email)

      setUser(session?.user ?? null)

      if (session?.user) {
        // If user just signed up, create profile if it doesn't exist
        if (event === "SIGNED_UP" || event === "SIGNED_IN") {
          await ensureProfile(session.user)
        }
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const ensureProfile = async (user: User) => {
    try {
      // Check if profile exists
      const { data: existingProfile, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (fetchError && fetchError.code === "PGRST116") {
        // Profile doesn't exist, create it
        console.log("Creating profile for user:", user.email)

        const { error: insertError } = await supabase.from("profiles").insert([
          {
            id: user.id,
            email: user.email!,
            full_name: user.user_metadata?.full_name || user.user_metadata?.fullName || null,
          },
        ])

        if (insertError) {
          console.error("Error creating profile:", insertError)
        } else {
          console.log("Profile created successfully")
        }
      } else if (existingProfile) {
        console.log("Profile already exists")
      }
    } catch (error) {
      console.error("Error ensuring profile:", error)
    }
  }

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching profile:", error)
      } else if (data) {
        setProfile(data)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Sign in error:", error)
      }

      return { data, error }
    } catch (error) {
      console.error("Sign in exception:", error)
      return { data: null, error }
    }
  }

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      console.log("Attempting to sign up:", email, userData)

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData?.fullName || userData?.full_name,
            ...userData,
          },
        },
      })

      console.log("Signup response:", { data, error })

      if (error) {
        console.error("Sign up error:", error)
      } else if (data.user) {
        console.log("User created successfully:", data.user.email)

        // Ensure profile is created
        await ensureProfile(data.user)
      }

      return { data, error }
    } catch (error) {
      console.error("Sign up exception:", error)
      return { data: null, error }
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)

      // Clear local state first
      setUser(null)
      setProfile(null)

      // Sign out from Supabase
      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error("Sign out error:", error)
        // Even if there's an error, we've cleared local state
      } else {
        console.log("Successfully signed out")
      }

      // Force redirect to home page
      window.location.href = "/"

      return { error }
    } catch (error) {
      console.error("Sign out exception:", error)
      // Clear state even on exception
      setUser(null)
      setProfile(null)
      window.location.href = "/"
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error("No user logged in") }

    try {
      const { data, error } = await supabase.from("profiles").update(updates).eq("id", user.id).select().single()

      if (!error && data) {
        setProfile(data)
      }

      return { data, error }
    } catch (error) {
      console.error("Update profile error:", error)
      return { data: null, error }
    }
  }

  return {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  }
}
