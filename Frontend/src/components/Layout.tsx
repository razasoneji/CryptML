import React, { useEffect, useState } from 'react';
import { Terminal, Home, Book, Info, LogIn, UserPlus, LogOut } from 'lucide-react';

const BackgroundGrid = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
  </div>
);

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const[isLoggedIn , setisLoggedIn ]= useState(false); // Replace with actual authentication logic
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setisLoggedIn(!!token); // Converts token existence to boolean
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setisLoggedIn(false);
  };
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
              <a href="/predict" className="flex items-center text-gray-400 hover:text-white transition duration-300">
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
              <button className="flex items-center text-gray-400 hover:text-white transition duration-300" onClick={handleLogout}>
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </button>
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
      <main className="pt-20">{children}</main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-md mt-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <a href="/" className="text-purple-400 hover:text-purple-300 transition duration-300">
                Home
              </a>
              <a href="/predict" className="text-gray-400 hover:text-white transition duration-300">
                Prediction
              </a>
              <a href="/docs" className="text-gray-400 hover:text-white transition duration-300">
                Documentation
              </a>
              <a href="/about" className="text-gray-400 hover:text-white transition duration-300">
                About
              </a>
            </div>
            <div className="text-gray-400">
              &copy; {new Date().getFullYear()} CryptML. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;