"use client"

import { useState } from "react"
import { Search, ChevronDown, ChevronUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "Click on 'Sign Up' in the top right corner, enter your email and create a password. You'll receive a confirmation email to verify your account.",
      },
      {
        question: "Is WealthTracker free to use?",
        answer:
          "Yes! We offer a free plan that includes basic portfolio tracking, goal setting, and investment monitoring. Premium plans offer advanced features like AI insights and detailed analytics.",
      },
      {
        question: "How do I connect my broker account?",
        answer:
          "Go to 'Connect Brokers' in your dashboard, select your broker from our supported list, and follow the secure OAuth connection process. We support Zerodha, Groww, HDFC Securities, and more.",
      },
    ],
  },
  {
    category: "Security & Privacy",
    questions: [
      {
        question: "Is my financial data secure?",
        answer:
          "Absolutely. We use bank-grade 256-bit SSL encryption, store data in secure servers, and never store your broker passwords. We're SOC 2 Type II certified and follow strict security protocols.",
      },
      {
        question: "Do you sell my data to third parties?",
        answer:
          "Never. We don't sell, rent, or share your personal financial data with third parties. Your privacy is our top priority. Read our Privacy Policy for complete details.",
      },
      {
        question: "How do you access my investment data?",
        answer:
          "We use read-only API connections with your brokers. This means we can view your portfolio but cannot make trades or transactions on your behalf.",
      },
    ],
  },
  {
    category: "Features & Functionality",
    questions: [
      {
        question: "What types of investments can I track?",
        answer:
          "You can track stocks, mutual funds, ETFs, fixed deposits, PPF, EPF, real estate, gold, cryptocurrency, bonds, and more. We support all major Indian investment types.",
      },
      {
        question: "How accurate is the portfolio valuation?",
        answer:
          "We fetch real-time data from NSE, BSE, and mutual fund companies. Stock prices are updated every 15 minutes during market hours, and mutual fund NAVs are updated daily.",
      },
      {
        question: "Can I set financial goals?",
        answer:
          "Yes! Set goals for house purchase, car buying, education, retirement, emergency fund, and more. Our smart calculator shows how much to save monthly to achieve your goals.",
      },
    ],
  },
  {
    category: "Billing & Subscription",
    questions: [
      {
        question: "How do I upgrade to a premium plan?",
        answer:
          "Go to Settings > Billing or visit our Pricing page. Choose your plan and pay securely via UPI, cards, or net banking. Upgrades are instant.",
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer:
          "Yes, you can cancel anytime from your account settings. You'll continue to have premium access until the end of your billing period.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "We offer a 30-day money-back guarantee for annual plans. Monthly plans can be cancelled anytime without charges for the next month.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredFAQ = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about WealthTracker
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {filteredFAQ.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const itemId = `${categoryIndex}-${faqIndex}`
                  const isExpanded = expandedItems.includes(itemId)

                  return (
                    <Card key={faqIndex} className="overflow-hidden">
                      <CardContent className="p-0">
                        <button
                          onClick={() => toggleExpanded(itemId)}
                          className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex justify-between items-center"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">{faq.question}</h3>
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        {isExpanded && (
                          <div className="px-6 pb-6">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Still have questions?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}
