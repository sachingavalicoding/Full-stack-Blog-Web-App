
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white py-10">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Quote/Heading Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
            How Can We Help You?
          </h2>
          <p className="text-lg text-gray-400 mb-6">
            We are here to help with anything you need! Whether its a question or
            guidance, reach out and we can make it happen.
          </p>
        </div>

        {/* Navigation Links Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-8 text-center">
          <div>
            <h3 className="font-semibold text-xl mb-4 text-purple-600">Quick Links</h3>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/explore"
                    className="text-gray-400 hover:text-purple-600 transition duration-300"
                  >
                    Explore
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="text-gray-400 hover:text-purple-600 transition duration-300"
                  >
                   Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-purple-600 transition duration-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-4 text-purple-600">Contact Us</h3>
            <div className="space-y-2">
              <p className="text-gray-100 flex items-center justify-center">
                <FaEnvelope className="mr-2 text-purple-600" />
                support@yourwebsite.com
              </p>
              <p className="text-gray-400">+1 (123) 456-7890</p>
            </div>
          </div>

          {/* Social Media Icons Section */}
          <div>
            <h3 className="font-semibold text-xl mb-4 text-purple-600">Follow Us</h3>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <FaFacebookF size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Subscribe Section */}
        <div className="flex flex-col items-center mb-10">
          <h3 className="text-2xl font-semibold text-purple-600 mb-4">Stay Updated!</h3>
          <p className="text-gray-400 mb-6">Sign up for our newsletter and get the latest updates directly to your inbox.</p>
          <div className="flex justify-center items-center space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-md text-black w-60 mb-4 sm:mb-0"
            />
            <button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white px-6 py-3 rounded-md hover:from-purple-700 hover:to-blue-600 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="text-center text-gray-400 mt-8">
          <p>&copy; {new Date().getFullYear()} Your Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
