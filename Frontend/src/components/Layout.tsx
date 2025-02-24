import React, { useEffect, useState } from 'react';
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
  const [isLoggedIn, setisLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setisLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setisLoggedIn(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-black text-white">
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
              <a href="/about" className="flex items-center text-gray-400 hover:text-white transition duration-300">
                <Info className="mr-2 h-5 w-5" />
                Encryption
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <a href="/profile" className="flex items-center text-gray-400 hover:text-white transition duration-300">
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </a>
                <button className="flex items-center text-gray-400 hover:text-white transition duration-300" onClick={handleLogout}>
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <a href="/login" className="flex items-center text-gray-400 hover:text-white transition duration-300">
                  <LogIn className="mr-2 h-5 w-5" />
                  Login
                </a>
                <a href="/signup" className="flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-white hover:scale-105 transition duration-300">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Signup
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">{children}</main>

      {/* Enhanced Footer */}
      <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-md mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-purple-400">CryptML</h3>
              <p className="text-gray-400">Empowering crypto predictions with machine learning technology.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white transition duration-300">Home</a></li>
                <li><a href="/prediction" className="text-gray-400 hover:text-white transition duration-300">Prediction</a></li>
                <li><a href="/docs" className="text-gray-400 hover:text-white transition duration-300">Documentation</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-white transition duration-300">About</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/blog" className="text-gray-400 hover:text-white transition duration-300">Blog</a></li>
                <li><a href="/tutorials" className="text-gray-400 hover:text-white transition duration-300">Tutorials</a></li>
                <li><a href="/api" className="text-gray-400 hover:text-white transition duration-300">API</a></li>
                <li><a href="/support" className="text-gray-400 hover:text-white transition duration-300">Support</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a></li>
                <li><a href="/cookies" className="text-gray-400 hover:text-white transition duration-300">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-center items-center">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} CryptML. All rights reserved.
              </p>
              <br />
              
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;