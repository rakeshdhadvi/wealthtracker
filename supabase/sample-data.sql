-- This file contains sample data to help you test the application
-- Run this AFTER creating a user account through the signup process

-- Sample assets (replace 'your-user-id' with your actual user ID from auth.users)
-- You can get your user ID by running: SELECT id FROM auth.users WHERE email = 'your-email@example.com';

-- Example for user with email 'test@example.com'
-- First, get the user ID:
-- SELECT id FROM auth.users WHERE email = 'test@example.com';

-- Then replace 'USER_ID_HERE' with the actual UUID in the following inserts:

/*
INSERT INTO assets (user_id, asset_type, symbol, name, quantity, average_price, current_price, current_value, institution, risk_level) VALUES
('USER_ID_HERE', 'stocks', 'RELIANCE', 'Reliance Industries Ltd', 50, 2400.00, 2456.75, 122837.50, 'Zerodha', 'medium'),
('USER_ID_HERE', 'stocks', 'TCS', 'Tata Consultancy Services', 25, 3500.00, 3567.80, 89195.00, 'Zerodha', 'low'),
('USER_ID_HERE', 'mutual_funds', 'HDFC_TOP100', 'HDFC Top 100 Fund', 1000, 450.00, 465.30, 465300.00, 'Groww', 'medium'),
('USER_ID_HERE', 'fixed_deposits', 'SBI_FD', 'SBI Fixed Deposit', 1, 300000.00, 315000.00, 315000.00, 'State Bank of India', 'low'),
('USER_ID_HERE', 'gold', 'GOLD_ETF', 'Gold ETF', 100, 4500.00, 4650.00, 465000.00, 'Zerodha', 'medium');

INSERT INTO liabilities (user_id, liability_type, name, principal_amount, outstanding_amount, interest_rate, emi_amount, tenure_months, remaining_months, start_date, next_due_date) VALUES
('USER_ID_HERE', 'home_loan', 'Home Loan - SBI', 5000000.00, 3500000.00, 8.50, 45000.00, 240, 180, '2020-01-01', '2024-02-10'),
('USER_ID_HERE', 'credit_card', 'HDFC Credit Card', 0.00, 25000.00, 36.00, 5000.00, NULL, NULL, NULL, '2024-02-05'),
('USER_ID_HERE', 'car_loan', 'Car Loan - ICICI', 800000.00, 350000.00, 9.25, 18000.00, 60, 24, '2022-01-01', '2024-02-15');

INSERT INTO goals (user_id, name, description, target_amount, current_amount, target_date, priority, category) VALUES
('USER_ID_HERE', 'Emergency Fund', '6 months of expenses', 300000.00, 250000.00, '2024-12-31', 'high', 'emergency'),
('USER_ID_HERE', 'House Down Payment', 'Down payment for new house', 2000000.00, 750000.00, '2026-06-30', 'high', 'house'),
('USER_ID_HERE', 'Retirement Fund', 'Retirement corpus', 10000000.00, 1200000.00, '2045-12-31', 'medium', 'retirement'),
('USER_ID_HERE', 'Vacation Fund', 'Europe trip', 500000.00, 150000.00, '2024-12-31', 'low', 'vacation');

INSERT INTO transactions (user_id, transaction_type, amount, transaction_date, description) VALUES
('USER_ID_HERE', 'buy', 25000.00, '2024-01-15', 'Bought RELIANCE shares'),
('USER_ID_HERE', 'dividend', 1200.00, '2024-01-14', 'Dividend from TCS'),
('USER_ID_HERE', 'payment', 45000.00, '2024-01-10', 'Home loan EMI'),
('USER_ID_HERE', 'buy', 10000.00, '2024-01-05', 'SIP - HDFC Top 100'),
('USER_ID_HERE', 'sell', 15000.00, '2024-01-03', 'Sold some gold units');

INSERT INTO insights (user_id, title, message, insight_type, priority) VALUES
('USER_ID_HERE', 'Portfolio Rebalancing Needed', 'Your equity allocation is 63% which is higher than recommended for your risk profile.', 'suggestion', 'medium'),
('USER_ID_HERE', 'Emergency Fund Goal Achieved!', 'Congratulations! You have successfully built your 6-month emergency fund.', 'achievement', 'high'),
('USER_ID_HERE', 'SIP Due Tomorrow', 'Your monthly SIP of ₹10,000 for HDFC Top 100 is due tomorrow.', 'alert', 'low'),
('USER_ID_HERE', 'High Credit Card Usage', 'Your credit card utilization is above 80%. Consider paying it down to improve your credit score.', 'warning', 'high');
*/
