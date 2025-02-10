import { Mail, Facebook, Instagram } from 'lucide-react';



const Footer = () => {
  return (
    <footer className="bg-gray-400 text-black p-8">{/* Footer Colour here!! */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">KTM Supermarket</h2>
          <p className="italic">"A world of flavours, just a click away."</p>
          
          <div className="space-y-2">
            <p>Want to talk with us?</p>
            <p>Please call us on 1300 528 698</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-semibold">Customer Care Hours</p>
            <p>Mon - Sun: 8AM - 8 PM</p>
          </div>
          
          <div className="flex space-x-4 mt-4">
            <Mail className="w-6 h-6" />
            <Facebook className="w-6 h-6" />
            <Instagram className="w-6 h-6" />
            <span className="w-6 h-6 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 015.43 5C3.55 5.82 2 7.64 2 9.82c0 3.32 2.67 7.25 8 11.8 5.33-4.55 8-8.48 8-11.8 0-2.18-1.55-4-3.43-4.82z" />
              </svg>
            </span>
          </div>
        </div>

        {/* More Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">More Information</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Refer Friends, Get $10</a></li>
            <li><a href="#" className="hover:underline">Rewards</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
          </ul>
        </div>

        {/* Get Help */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Get Help</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Customer Service</a></li>
            <li><a href="#" className="hover:underline">FAQs</a></li>
            <li><a href="#" className="hover:underline">Delivery Information</a></li>
            <li><a href="#" className="hover:underline">Refund & Return Policy</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-teal-800">
        <p className="text-sm">Copyright Â© 2025 KTM Supermarket.</p>
      </div>
    </footer>
  );
};

export default Footer;