import { FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa';
import { contactInfo } from '@/app/data/contact';

export default function Footer() {
  return (
    <footer className="bg-hbf-charcoal text-hbf-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Contact Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">CONTACT</h3>
          <div className="space-y-2 text-hbf-white/80">
            <p>
              <span className="font-semibold">Label:</span> {contactInfo.label}
            </p>
            <p>
              <span className="font-semibold">Contact:</span> {contactInfo.contact}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{' '}
              <a
                href={`mailto:${contactInfo.email}`}
                className="hover:text-hbf-yellow transition-colors"
              >
                {contactInfo.email}
              </a>
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{' '}
              <a
                href={`tel:${contactInfo.phone}`}
                className="hover:text-hbf-yellow transition-colors"
              >
                {contactInfo.phone.replace(/^\+82-/, '0')}
              </a>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-hbf-white/20 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-hbf-white/60">
            © 2025 Huckleberryfinn. All rights reserved.
          </p>

          {/* SNS Icons */}
          <div className="flex gap-6">
            <a
              href={contactInfo.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-hbf-yellow transition-colors"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href={contactInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-hbf-yellow transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href={contactInfo.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-hbf-yellow transition-colors"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
