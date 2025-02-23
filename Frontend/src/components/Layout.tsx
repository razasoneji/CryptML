import React, { useState, ReactNode } from 'react';
import { Github, Twitter, Menu, X } from 'lucide-react';

const Layout = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate authentication state

  const navLinkClasses =
    'relative text-gray-300 hover:text-white transition-colors group';

  const underlineSpan = (
    <span className="absolute left-0 bottom-0 block h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
  );

  const authButtonClasses =
    'px-4 py-2 rounded-md font-semibold text-white transition-all duration-300 hover:shadow-lg';

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-800 bg-gray-900 backdrop-blur-xl shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <a
              href="/"
              className="text-2xl font-extrabold text-white tracking-wide"
            >
              CryptML
            </a>

            {/* Desktop Navigation */}
            <div className="hidden space-x-6 md:flex items-center">
              <a href="/" className={navLinkClasses}>
                Home
                {underlineSpan}
              </a>
              <a href="/predict" className={navLinkClasses}>
                Predictor
                {underlineSpan}
              </a>
              <a href="/docs" className={navLinkClasses}>
                Documentation
                {underlineSpan}
              </a>
              <a href="/about" className={navLinkClasses}>
                About
                {underlineSpan}
              </a>

              {/* Auth Buttons */}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className={`${authButtonClasses} bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600`}
                >
                  Logout
                </button>
              ) : (
                <div className="flex space-x-4">
                  <button
                    onClick={handleLogin}
                    className={`${authButtonClasses} bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600`}
                  >
                    Login
                  </button>
                  <button
                    onClick={handleLogin}
                    className={`${authButtonClasses} bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600`}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="border-t border-gray-800 bg-gray-900 py-4 md:hidden">
              <div className="flex flex-col space-y-4 text-center">
                <a href="/" className={navLinkClasses}>
                  Home
                  {underlineSpan}
                </a>
                <a href="/predict" className={navLinkClasses}>
                  Predictor
                  {underlineSpan}
                </a>
                <a href="/docs" className={navLinkClasses}>
                  Documentation
                  {underlineSpan}
                </a>
                <a href="/about" className={navLinkClasses}>
                  About
                  {underlineSpan}
                </a>

                {/* Auth Buttons for Mobile */}
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className={`${authButtonClasses} bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600`}
                  >
                    Logout
                  </button>
                ) : (
                  <div className="flex flex-col space-y-4">
                    <button
                      onClick={handleLogin}
                      className={`${authButtonClasses} bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600`}
                    >
                      Login
                    </button>
                    <button
                      onClick={handleLogin}
                      className={`${authButtonClasses} bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600`}
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900 backdrop-blur-xl shadow-md">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">
                CryptML
              </h3>
              <p className="text-sm text-gray-400">
                Advanced cryptographic algorithm identification using machine
                learning.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/predict" className="hover:text-white transition-colors">
                    Try Predictor
                  </a>
                </li>
                <li>
                  <a href="/docs" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-white transition-colors">
                    About Project
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">
                Resources
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/api" className="hover:text-white transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">
                Connect
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} CryptML. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;