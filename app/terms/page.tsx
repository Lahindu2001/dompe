import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Dompee.lk",
  description: "Terms of service for Dompee.lk - Dompe Business Directory",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-3">Terms of Service</h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          <Card className="p-8 space-y-8 shadow-md bg-white">
            <section>
              <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                By accessing and using Dompee.lk ("the Website," "our service"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Description of Service</h2>
              <p className="text-slate-600 leading-relaxed">
                Dompee.lk is a business directory platform that connects users with local shops and businesses in Dompe, Sri Lanka. Our service provides:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2 text-slate-600 mt-3">
                <li>Business listings with detailed information</li>
                <li>Search and filtering capabilities</li>
                <li>User reviews and ratings</li>
                <li>Direct contact options with businesses</li>
                <li>Business registration and profile management</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">User Accounts</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Registration</h3>
                  <p>To access certain features, you must register for an account. You agree to:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and update your information to keep it accurate</li>
                    <li>Maintain the security of your password</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Account Termination</h3>
                  <p>We reserve the right to suspend or terminate your account at any time if you violate these Terms of Service or engage in fraudulent or illegal activities.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Business Listings</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Listing Requirements</h3>
                  <p>When creating a business listing, you must:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Provide accurate and truthful information about your business</li>
                    <li>Have proper authorization to represent the business</li>
                    <li>Own or have rights to any images, logos, or content you upload</li>
                    <li>Not include misleading, false, or deceptive information</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Content Ownership</h3>
                  <p>You retain ownership of the content you submit. However, by posting content on Dompee.lk, you grant us a non-exclusive, worldwide, royalty-free license to use, display, reproduce, and distribute your content on our platform.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">User Conduct</h2>
              <p className="text-slate-600 leading-relaxed mb-3">You agree NOT to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2 text-slate-600">
                <li>Post false, misleading, or fraudulent reviews or ratings</li>
                <li>Use the service for any illegal or unauthorized purpose</li>
                <li>Harass, abuse, or harm other users or businesses</li>
                <li>Attempt to gain unauthorized access to any part of the service</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Collect or harvest user information without permission</li>
                <li>Post spam, advertisements, or promotional content without authorization</li>
                <li>Upload viruses, malware, or other malicious code</li>
                <li>Violate any intellectual property rights</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Reviews and Ratings</h2>
              <div className="space-y-3 text-slate-600 leading-relaxed">
                <p>Users may post reviews and ratings about businesses. By posting a review:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>You confirm that your review is based on your genuine experience</li>
                  <li>You agree not to post fake, biased, or paid reviews</li>
                  <li>You will not use offensive, defamatory, or inappropriate language</li>
                  <li>You understand that reviews may be moderated or removed if they violate these terms</li>
                </ul>
                <p className="font-semibold text-slate-800 mt-4">
                  We reserve the right to remove reviews that violate our guidelines or are deemed inappropriate.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
              <p className="text-slate-600 leading-relaxed">
                All content on Dompee.lk, including text, graphics, logos, images, and software, is the property of Dompee.lk or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Disclaimer of Warranties</h2>
              <div className="space-y-3 text-slate-600 leading-relaxed">
                <p>Dompee.lk is provided "as is" and "as available" without warranties of any kind. We do not guarantee that:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>The service will be uninterrupted, timely, secure, or error-free</li>
                  <li>The information provided by businesses is accurate or reliable</li>
                  <li>Any defects in the service will be corrected</li>
                  <li>The service is free of viruses or other harmful components</li>
                </ul>
                <p className="font-semibold text-slate-800 mt-4">
                  We are not responsible for the quality, accuracy, or legality of business listings, user content, or actual transactions between users and businesses.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-slate-600 leading-relaxed">
                To the maximum extent permitted by law, Dompee.lk and its owners, employees, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service. This includes but is not limited to damages for loss of profits, data, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
              <p className="text-slate-600 leading-relaxed">
                You agree to indemnify, defend, and hold harmless Dompee.lk and its affiliates from any claims, damages, obligations, losses, liabilities, costs, or expenses arising from: (a) your use of the service; (b) your violation of these Terms; (c) your violation of any third-party rights; or (d) any content you post on the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Third-Party Links</h2>
              <p className="text-slate-600 leading-relaxed">
                Our service may contain links to third-party websites (such as Google Maps, WhatsApp, YouTube). We are not responsible for the content, privacy policies, or practices of these third-party sites. We encourage you to review their terms and policies before engaging with them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                We reserve the right to modify or replace these Terms of Service at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the service after any changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
              <p className="text-slate-600 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of Sri Lanka, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the service shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-slate-50 p-4 rounded-lg space-y-2 text-slate-700">
                <p><strong>Email:</strong> info.dompee@gmail.com</p>
                <p><strong>Phone:</strong> +94 702 882 883</p>
                <p><strong>Address:</strong> Dompe, Gampaha District, Western Province, Sri Lanka</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                By using Dompee.lk, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
              </p>
            </section>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
