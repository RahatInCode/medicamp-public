import { Facebook, Twitter, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content py-10 px-6 md:px-20 mt-10 rounded-t-3xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">MediCamp</h2>
          <p className="text-sm opacity-70">
            Your trusted medical camp partner. We organize, manage, and connect
            volunteers with life-saving missions across the country.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-primary transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-primary transition">
                About
              </a>
            </li>
            <li>
              <a href="/organizer" className="hover:text-primary transition">
                Organizer Panel
              </a>
            </li>
            <li>
              <a href="/participant" className="hover:text-primary transition">
                Participant Panel
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <div className="text-sm opacity-80 space-y-2">
            <p className="flex items-center gap-2">
              <Mail size={16} /> support@medicamp.com
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} /> +880 1234 567 890
            </p>
            <div className="flex gap-4 mt-3">
              <a href="#">
                <Facebook
                  size={20}
                  className="hover:text-primary transition-colors"
                />
              </a>
              <a href="#">
                <Twitter
                  size={20}
                  className="hover:text-primary transition-colors"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-base-300 mt-10 pt-6 text-sm opacity-70 text-center">
        © {new Date().getFullYear()} MediCamp. All rights reserved.
      </div>
    </footer>
  );
}
