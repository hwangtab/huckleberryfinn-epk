import { FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-hbf-charcoal text-hbf-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Contact Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">CONTACT</h3>
          <div className="space-y-2 text-hbf-white/80">
            <p>
              <span className="font-semibold">Label:</span> 샤 레이블 (Sha Label)
            </p>
            <p>
              <span className="font-semibold">Contact:</span> 성장규
            </p>
            <p>
              <span className="font-semibold">Email:</span>{' '}
              <a
                href="mailto:shalabel@naver.com"
                className="hover:text-hbf-yellow transition-colors"
              >
                shalabel@naver.com
              </a>
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{' '}
              <a
                href="tel:+82-10-5229-8099"
                className="hover:text-hbf-yellow transition-colors"
              >
                010-5229-8099
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
              href="https://www.youtube.com/user/shalabel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-hbf-yellow transition-colors"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.instagram.com/band__huckleberryfinn/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-hbf-yellow transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/HuckleberryFinn.Band/"
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
