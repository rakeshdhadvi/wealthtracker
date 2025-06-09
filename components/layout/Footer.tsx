import Link from "next/link"
import { Typography } from "@/components/ui-system/Typography"
import { Facebook, Twitter, Instagram, Linkedin, Shield, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">W</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                WealthTracker
              </span>
            </Link>
            <Typography variant="body" color="muted" className="max-w-xs">
              Your complete financial management platform for Indian investors. Track all your assets and liabilities in
              one place.
            </Typography>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-900">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links section */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Product</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link href="/features" className="text-sm text-gray-600 hover:text-gray-900">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/integrations" className="text-sm text-gray-600 hover:text-gray-900">
                      Integrations
                    </Link>
                  </li>
                  <li>
                    <Link href="/roadmap" className="text-sm text-gray-600 hover:text-gray-900">
                      Roadmap
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Company</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-sm text-gray-600 hover:text-gray-900">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/press" className="text-sm text-gray-600 hover:text-gray-900">
                      Press
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Support</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link href="/help" className="text-sm text-gray-600 hover:text-gray-900">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/community" className="text-sm text-gray-600 hover:text-gray-900">
                      Community
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Legal</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/security" className="text-sm text-gray-600 hover:text-gray-900">
                      Security
                    </Link>
                  </li>
                  <li>
                    <Link href="/compliance" className="text-sm text-gray-600 hover:text-gray-900">
                      Compliance
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <a href="tel:+918888888888" className="text-gray-500 hover:text-gray-900 flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              <span>+91 888-888-8888</span>
            </a>
            <a href="mailto:support@wealthtracker.in" className="text-gray-500 hover:text-gray-900 flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              <span>support@wealthtracker.in</span>
            </a>
          </div>
          <p className="mt-8 text-xs leading-5 text-gray-500 md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} WealthTracker. All rights reserved. Made with ❤️ in India.
          </p>
        </div>

        {/* Security badge */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-2 text-xs text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
            <Shield className="h-4 w-4 text-green-600" />
            <span>Bank-level security with 256-bit encryption</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
