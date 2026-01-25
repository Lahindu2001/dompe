import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Dompee.lk",
  description: "Privacy policy for Dompee.lk - Dompe Business Directory",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          <Card className="p-8 space-y-8 shadow-md bg-white">
            <section>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-slate-600 leading-relaxed">
                Welcome to Dompee.lk ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Personal Information</h3>
                  <p>When you register an account, we may collect:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Name (first and last name)</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Home address</li>
                    <li>Password (encrypted)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Business Information</h3>
                  <p>For business owners who list their shops:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Business name and registration details</li>
                    <li>Business address and contact information</li>
                    <li>Business category and services offered</li>
                    <li>Business images and promotional content</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Usage Information</h3>
                  <p>We automatically collect certain information when you visit our website:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>IP address and browser type</li>
                    <li>Pages visited and time spent</li>
                    <li>Search queries and interactions</li>
                    <li>Device information</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-slate-600 leading-relaxed mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2 text-slate-600">
                <li>Provide, operate, and maintain our business directory services</li>
                <li>Process your registration and manage your account</li>
                <li>Display business listings and facilitate connections between users and businesses</li>
                <li>Send you updates, notifications, and promotional communications</li>
                <li>Respond to your comments, questions, and provide customer support</li>
                <li>Improve and optimize our website and services</li>
                <li>Prevent fraudulent activities and ensure platform security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Sharing Your Information</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>We may share your information in the following situations:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>Business Listings:</strong> Information you provide for business listings (name, address, contact details) will be publicly displayed on our platform</li>
                  <li><strong>Reviews:</strong> Your name and reviews will be publicly visible when you post feedback about businesses</li>
                  <li><strong>Service Providers:</strong> We may share information with third-party service providers who help us operate our platform (hosting, analytics, customer support)</li>
                  <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety</li>
                </ul>
                <p className="font-semibold text-slate-800 mt-4">We do NOT sell your personal information to third parties.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-slate-600 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>
              <p className="text-slate-600 leading-relaxed mb-3">You have the right to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2 text-slate-600">
                <li>Access and review your personal information</li>
                <li>Update or correct your information through your profile settings</li>
                <li>Request deletion of your account and personal data</li>
                <li>Opt-out of promotional communications</li>
                <li>Restrict or object to certain processing of your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
              <p className="text-slate-600 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              <p className="text-slate-600 leading-relaxed">
                Our service is not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us, and we will take steps to delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
              <p className="text-slate-600 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-slate-50 p-4 rounded-lg space-y-2 text-slate-700">
                <p><strong>Email:</strong> info.dompee@gmail.com</p>
                <p><strong>Phone:</strong> +94 702 882 883</p>
                <p><strong>Address:</strong> Dompe, Gampaha District, Western Province, Sri Lanka</p>
              </div>
            </section>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
