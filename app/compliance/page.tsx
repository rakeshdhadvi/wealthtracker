"use client"

import { Shield, CheckCircle, Lock, FileText, Award, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const certifications = [
  {
    name: "SOC 2 Type II",
    issuer: "AICPA",
    status: "Certified",
    description: "Security, availability, and confidentiality controls",
    validUntil: "2024-12-31",
  },
  {
    name: "ISO 27001",
    issuer: "ISO",
    status: "Certified",
    description: "Information security management system",
    validUntil: "2025-06-30",
  },
  {
    name: "PCI DSS Level 1",
    issuer: "PCI Security Standards Council",
    status: "Compliant",
    description: "Payment card industry data security standard",
    validUntil: "2024-09-15",
  },
  {
    name: "GDPR Compliance",
    issuer: "European Union",
    status: "Compliant",
    description: "General Data Protection Regulation compliance",
    validUntil: "Ongoing",
  },
]

const regulations = [
  {
    name: "RBI Guidelines",
    authority: "Reserve Bank of India",
    description: "Compliance with RBI guidelines for financial data aggregation and account aggregator framework",
    status: "Compliant",
  },
  {
    name: "SEBI Regulations",
    authority: "Securities and Exchange Board of India",
    description: "Adherence to SEBI regulations for investment advisory and portfolio management services",
    status: "Compliant",
  },
  {
    name: "IT Act 2000",
    authority: "Government of India",
    description: "Compliance with Information Technology Act for data protection and cyber security",
    status: "Compliant",
  },
  {
    name: "PMLA Guidelines",
    authority: "Financial Intelligence Unit",
    description: "Prevention of Money Laundering Act compliance for financial transactions",
    status: "Compliant",
  },
]

const securityMeasures = [
  {
    title: "Data Encryption",
    description: "All data encrypted in transit and at rest using AES-256 encryption",
    icon: Lock,
  },
  {
    title: "Multi-Factor Authentication",
    description: "Mandatory 2FA for all user accounts and admin access",
    icon: Shield,
  },
  {
    title: "Regular Security Audits",
    description: "Quarterly penetration testing and security assessments",
    icon: FileText,
  },
  {
    title: "Access Controls",
    description: "Role-based access control with principle of least privilege",
    icon: Users,
  },
]

const auditReports = [
  {
    title: "Annual Security Assessment 2024",
    date: "2024-01-15",
    type: "Security Audit",
    status: "Passed",
  },
  {
    title: "SOC 2 Type II Report",
    date: "2023-12-01",
    type: "Compliance Audit",
    status: "Certified",
  },
  {
    title: "Penetration Testing Report",
    date: "2023-11-20",
    type: "Security Testing",
    status: "No Critical Issues",
  },
  {
    title: "Data Privacy Assessment",
    date: "2023-10-10",
    type: "Privacy Audit",
    status: "Compliant",
  },
]

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Compliance & Security
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We maintain the highest standards of security and regulatory compliance to protect your financial data
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Certifications */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Award className="h-6 w-6 mr-2" />
              Certifications & Standards
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{cert.name}</CardTitle>
                      <Badge variant="secondary" className="bg-green-50 text-green-700 border-0">
                        {cert.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Issued by {cert.issuer}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">{cert.description}</p>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Valid until {new Date(cert.validUntil).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Regulatory Compliance */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <FileText className="h-6 w-6 mr-2" />
              Regulatory Compliance
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {regulations.map((regulation, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{regulation.name}</CardTitle>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-0">
                        {regulation.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{regulation.authority}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{regulation.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Security Measures */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              Security Measures
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {securityMeasures.map((measure, index) => {
                const Icon = measure.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{measure.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300">{measure.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Audit Reports */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Audit Reports</h2>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Report
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {auditReports.map((report, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{report.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              {new Date(report.date).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline">{report.type}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              <span className="text-sm text-green-700 dark:text-green-400">{report.status}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Questions About Our Compliance?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Our compliance team is available to answer any questions about our security practices and
                  certifications.
                </p>
                <div className="space-y-2 mb-6">
                  <p className="text-sm">
                    <strong>Email:</strong> compliance@wealthtracker.in
                  </p>
                  <p className="text-sm">
                    <strong>Phone:</strong> +91 98765 43210
                  </p>
                </div>
                <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                  Contact Compliance Team
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
