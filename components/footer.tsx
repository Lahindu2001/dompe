import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                Dompee.lk
              </span>
            </div>
            <p className="text-sm text-background/70 mb-4">
              Your complete guide to all shops and businesses in Dompe town. Find, explore, and connect with local businesses.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href="/" className="hover:text-background transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/shops" className="hover:text-background transition-colors">All Shops</Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-background transition-colors">Categories</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-background transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href="/shops?category=grocery" className="hover:text-background transition-colors">Grocery Shops</Link>
              </li>
              <li>
                <Link href="/shops?category=restaurant" className="hover:text-background transition-colors">Restaurants</Link>
              </li>
              <li>
                <Link href="/shops?category=electronics" className="hover:text-background transition-colors">Electronics</Link>
              </li>
              <li>
                <Link href="/shops?category=pharmacy" className="hover:text-background transition-colors">Pharmacies</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Dompe, Gampaha District, Western Province, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+94 702 882 883</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info.dompee@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            &copy; {new Date().getFullYear()} Dompee.lk. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/60">
            <Link href="/privacy" className="hover:text-background transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-background transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
