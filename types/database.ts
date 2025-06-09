export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string
          phone: string | null
          monthly_income: number | null
          risk_tolerance: "conservative" | "moderate" | "aggressive" | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email: string
          phone?: string | null
          monthly_income?: number | null
          risk_tolerance?: "conservative" | "moderate" | "aggressive" | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string
          phone?: string | null
          monthly_income?: number | null
          risk_tolerance?: "conservative" | "moderate" | "aggressive" | null
          created_at?: string
          updated_at?: string
        }
      }
      assets: {
        Row: {
          id: string
          user_id: string
          asset_type: "stocks" | "mutual_funds" | "fixed_deposits" | "gold" | "crypto" | "real_estate" | "ppf" | "bonds"
          symbol: string | null
          name: string
          quantity: number
          average_price: number
          current_price: number
          current_value: number
          institution: string | null
          risk_level: "low" | "medium" | "high"
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          asset_type: "stocks" | "mutual_funds" | "fixed_deposits" | "gold" | "crypto" | "real_estate" | "ppf" | "bonds"
          symbol?: string | null
          name: string
          quantity: number
          average_price: number
          current_price: number
          current_value: number
          institution?: string | null
          risk_level: "low" | "medium" | "high"
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          asset_type?:
            | "stocks"
            | "mutual_funds"
            | "fixed_deposits"
            | "gold"
            | "crypto"
            | "real_estate"
            | "ppf"
            | "bonds"
          symbol?: string | null
          name?: string
          quantity?: number
          average_price?: number
          current_price?: number
          current_value?: number
          institution?: string | null
          risk_level?: "low" | "medium" | "high"
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      liabilities: {
        Row: {
          id: string
          user_id: string
          liability_type: "home_loan" | "personal_loan" | "car_loan" | "credit_card" | "education_loan"
          name: string
          principal_amount: number
          outstanding_amount: number
          interest_rate: number
          emi_amount: number | null
          tenure_months: number | null
          remaining_months: number | null
          start_date: string | null
          next_due_date: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          liability_type: "home_loan" | "personal_loan" | "car_loan" | "credit_card" | "education_loan"
          name: string
          principal_amount: number
          outstanding_amount: number
          interest_rate: number
          emi_amount?: number | null
          tenure_months?: number | null
          remaining_months?: number | null
          start_date?: string | null
          next_due_date?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          liability_type?: "home_loan" | "personal_loan" | "car_loan" | "credit_card" | "education_loan"
          name?: string
          principal_amount?: number
          outstanding_amount?: number
          interest_rate?: number
          emi_amount?: number | null
          tenure_months?: number | null
          remaining_months?: number | null
          start_date?: string | null
          next_due_date?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          asset_id: string | null
          liability_id: string | null
          transaction_type: "buy" | "sell" | "dividend" | "interest" | "payment" | "deposit" | "withdrawal"
          amount: number
          quantity: number | null
          price: number | null
          transaction_date: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          asset_id?: string | null
          liability_id?: string | null
          transaction_type: "buy" | "sell" | "dividend" | "interest" | "payment" | "deposit" | "withdrawal"
          amount: number
          quantity?: number | null
          price?: number | null
          transaction_date: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          asset_id?: string | null
          liability_id?: string | null
          transaction_type?: "buy" | "sell" | "dividend" | "interest" | "payment" | "deposit" | "withdrawal"
          amount?: number
          quantity?: number | null
          price?: number | null
          transaction_date?: string
          description?: string | null
          created_at?: string
        }
      }
      goals: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          target_amount: number
          current_amount: number
          target_date: string
          priority: "low" | "medium" | "high"
          category: "emergency" | "retirement" | "house" | "education" | "vacation" | "other"
          is_achieved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          target_amount: number
          current_amount?: number
          target_date: string
          priority: "low" | "medium" | "high"
          category: "emergency" | "retirement" | "house" | "education" | "vacation" | "other"
          is_achieved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          target_amount?: number
          current_amount?: number
          target_date?: string
          priority?: "low" | "medium" | "high"
          category?: "emergency" | "retirement" | "house" | "education" | "vacation" | "other"
          is_achieved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      insights: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          insight_type: "alert" | "suggestion" | "achievement" | "warning"
          priority: "low" | "medium" | "high"
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          insight_type: "alert" | "suggestion" | "achievement" | "warning"
          priority: "low" | "medium" | "high"
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          insight_type?: "alert" | "suggestion" | "achievement" | "warning"
          priority?: "low" | "medium" | "high"
          is_read?: boolean
          created_at?: string
        }
      }
    }
  }
}
