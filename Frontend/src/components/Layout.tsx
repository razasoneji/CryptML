import React from 'react';
import { Terminal, Home, Book, Info, LogIn, UserPlus, LogOut, User } from 'lucide-react';

const BackgroundGrid = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
  </div>
);

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isLoggedIn = false; // Replace with actual authentication logic

  return (
    <div className="relative min-h-screen bg-black text-white">
      <BackgroundGrid />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-8">
            <a href="/" className="flex items-center text-2xl font-bold text-purple-400">
              CryptML
            </a>
            <div className="hidden md:flex items-center space-x-6">
              <a href="/" className="flex items-center text-gray-400 hover:text-white transition duration-300">
                <Home className="mr-2 h-5 w-5" />
                Home
              </a>
              <a href="/prediction" className="flex items-center text-gray-400 hover:text-white transition duration-300">
                <Terminal className="mr-2 h-5 w-5" />
                Prediction
              </a>
              <a href="/docs" className="flex items-center text-gray-400 hover:text-white transition duration-300">
                <Book className="mr-2 h-5 w-5" />
                Documentation
              </a>
              <a href="/encry" className="flex items-center text-gray-400 hover:text-white transition duration-300">
                <Info className="mr-2 h-5 w-5" />
                Encryption
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <a
                  href="/profile"
                  className="flex items-center text-gray-400 hover:text-white transition duration-300"
                >
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </a>
                <button className="flex items-center text-gray-400 hover:text-white transition duration-300">
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="flex items-center text-gray-400 hover:text-white transition duration-300"
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Login
                </a>
                <a
                  href="/signup"
                  className="flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-white hover:scale-105 transition duration-300"
                >
                  <UserPlus className="mr-2 h-5 w-5" />
                  Signup
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">{children}</main>

      {/* New Industry-Level Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-white text-2xl font-bold mb-4">CryptML</h3>
              <p className="text-gray-400">
                Empowering secure predictions with cutting-edge cryptography.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <h4 className="text-white font-semibold mb-2">Quick Links</h4>
                <ul>
                  <li>
                    <a href="/" className="hover:text-white transition">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/prediction" className="hover:text-white transition">
                      Prediction
                    </a>
                  </li>
                  <li>
                    <a href="/docs" className="hover:text-white transition">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="/encry" className="hover:text-white transition">
                      Encryption
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Legal</h4>
                <ul>
                  <li>
                    <a href="/privacy" className="hover:text-white transition">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="hover:text-white transition">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Connect</h4>
                <ul>
                  <li>
                    <a href="https://twitter.com/cryptml" className="hover:text-white transition">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="https://linkedin.com/company/cryptml" className="hover:text-white transition">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/cryptml" className="hover:text-white transition">
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-4 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} CryptML. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
