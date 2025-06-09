import { supabase } from "@/lib/supabase"

export async function addSampleData() {
  try {
    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      throw new Error("No authenticated user found")
    }

    console.log("Adding sample data for user:", user.email)

    // Add sample assets
    const { error: assetsError } = await supabase.from("assets").insert([
      {
        user_id: user.id,
        asset_type: "stocks",
        symbol: "RELIANCE",
        name: "Reliance Industries Ltd",
        quantity: 50,
        average_price: 2400.0,
        current_price: 2456.75,
        current_value: 122837.5,
        institution: "Zerodha",
        risk_level: "medium",
      },
      {
        user_id: user.id,
        asset_type: "stocks",
        symbol: "TCS",
        name: "Tata Consultancy Services",
        quantity: 25,
        average_price: 3500.0,
        current_price: 3567.8,
        current_value: 89195.0,
        institution: "Zerodha",
        risk_level: "low",
      },
      {
        user_id: user.id,
        asset_type: "mutual_funds",
        symbol: "HDFC_TOP100",
        name: "HDFC Top 100 Fund",
        quantity: 1000,
        average_price: 450.0,
        current_price: 465.3,
        current_value: 465300.0,
        institution: "Groww",
        risk_level: "medium",
      },
      {
        user_id: user.id,
        asset_type: "fixed_deposits",
        symbol: "SBI_FD",
        name: "SBI Fixed Deposit",
        quantity: 1,
        average_price: 300000.0,
        current_price: 315000.0,
        current_value: 315000.0,
        institution: "State Bank of India",
        risk_level: "low",
      },
      {
        user_id: user.id,
        asset_type: "gold",
        symbol: "GOLD_ETF",
        name: "Gold ETF",
        quantity: 100,
        average_price: 4500.0,
        current_price: 4650.0,
        current_value: 465000.0,
        institution: "Zerodha",
        risk_level: "medium",
      },
    ])

    if (assetsError) throw assetsError

    // Add sample liabilities
    const { error: liabilitiesError } = await supabase.from("liabilities").insert([
      {
        user_id: user.id,
        liability_type: "home_loan",
        name: "Home Loan - SBI",
        principal_amount: 5000000.0,
        outstanding_amount: 3500000.0,
        interest_rate: 8.5,
        emi_amount: 45000.0,
        tenure_months: 240,
        remaining_months: 180,
        start_date: "2020-01-01",
        next_due_date: "2024-02-10",
      },
      {
        user_id: user.id,
        liability_type: "credit_card",
        name: "HDFC Credit Card",
        principal_amount: 0.0,
        outstanding_amount: 25000.0,
        interest_rate: 36.0,
        emi_amount: 5000.0,
        next_due_date: "2024-02-05",
      },
      {
        user_id: user.id,
        liability_type: "car_loan",
        name: "Car Loan - ICICI",
        principal_amount: 800000.0,
        outstanding_amount: 350000.0,
        interest_rate: 9.25,
        emi_amount: 18000.0,
        tenure_months: 60,
        remaining_months: 24,
        start_date: "2022-01-01",
        next_due_date: "2024-02-15",
      },
    ])

    if (liabilitiesError) throw liabilitiesError

    // Add sample goals
    const { error: goalsError } = await supabase.from("goals").insert([
      {
        user_id: user.id,
        name: "Emergency Fund",
        description: "6 months of expenses",
        target_amount: 300000.0,
        current_amount: 250000.0,
        target_date: "2024-12-31",
        priority: "high",
        category: "emergency",
      },
      {
        user_id: user.id,
        name: "House Down Payment",
        description: "Down payment for new house",
        target_amount: 2000000.0,
        current_amount: 750000.0,
        target_date: "2026-06-30",
        priority: "high",
        category: "house",
      },
      {
        user_id: user.id,
        name: "Retirement Fund",
        description: "Retirement corpus",
        target_amount: 10000000.0,
        current_amount: 1200000.0,
        target_date: "2045-12-31",
        priority: "medium",
        category: "retirement",
      },
      {
        user_id: user.id,
        name: "Vacation Fund",
        description: "Europe trip",
        target_amount: 500000.0,
        current_amount: 150000.0,
        target_date: "2024-12-31",
        priority: "low",
        category: "vacation",
      },
    ])

    if (goalsError) throw goalsError

    // Add sample transactions
    const { error: transactionsError } = await supabase.from("transactions").insert([
      {
        user_id: user.id,
        transaction_type: "buy",
        amount: 25000.0,
        transaction_date: "2024-01-15",
        description: "Bought RELIANCE shares",
      },
      {
        user_id: user.id,
        transaction_type: "dividend",
        amount: 1200.0,
        transaction_date: "2024-01-14",
        description: "Dividend from TCS",
      },
      {
        user_id: user.id,
        transaction_type: "payment",
        amount: 45000.0,
        transaction_date: "2024-01-10",
        description: "Home loan EMI",
      },
      {
        user_id: user.id,
        transaction_type: "buy",
        amount: 10000.0,
        transaction_date: "2024-01-05",
        description: "SIP - HDFC Top 100",
      },
      {
        user_id: user.id,
        transaction_type: "sell",
        amount: 15000.0,
        transaction_date: "2024-01-03",
        description: "Sold some gold units",
      },
    ])

    if (transactionsError) throw transactionsError

    // Add sample insights
    const { error: insightsError } = await supabase.from("insights").insert([
      {
        user_id: user.id,
        title: "Portfolio Rebalancing Needed",
        message: "Your equity allocation is 63% which is higher than recommended for your risk profile.",
        insight_type: "suggestion",
        priority: "medium",
      },
      {
        user_id: user.id,
        title: "Emergency Fund Goal Achieved!",
        message: "Congratulations! You have successfully built your 6-month emergency fund.",
        insight_type: "achievement",
        priority: "high",
      },
      {
        user_id: user.id,
        title: "SIP Due Tomorrow",
        message: "Your monthly SIP of ₹10,000 for HDFC Top 100 is due tomorrow.",
        insight_type: "alert",
        priority: "low",
      },
      {
        user_id: user.id,
        title: "High Credit Card Usage",
        message: "Your credit card utilization is above 80%. Consider paying it down to improve your credit score.",
        insight_type: "warning",
        priority: "high",
      },
    ])

    if (insightsError) throw insightsError

    console.log("✅ Sample data added successfully!")
    return { success: true }
  } catch (error) {
    console.error("❌ Error adding sample data:", error)
    return { success: false, error }
  }
}
