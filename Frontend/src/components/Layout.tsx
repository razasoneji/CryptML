
import React, { useEffect, useState } from 'react';
import { Terminal, Home, Book, Info, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const BackgroundGrid = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
  </div>
);

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-black text-white">
      <BackgroundGrid />

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-8">
            <NavLink to="/" className="flex items-center text-2xl font-bold text-purple-400">
              CryptML
            </NavLink>
            <div className="hidden md:flex items-center space-x-6">
              <NavLink to="/" className={({ isActive }) => `flex items-center transition duration-300 ${isActive ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}>
                <Home className="mr-2 h-5 w-5" />
                Home
              </NavLink>
              <NavLink to="/prediction" className={({ isActive }) => `flex items-center transition duration-300 ${isActive ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}>
                <Terminal className="mr-2 h-5 w-5" />
                Prediction
              </NavLink>
              <NavLink to="/docs" className={({ isActive }) => `flex items-center transition duration-300 ${isActive ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}>
                <Book className="mr-2 h-5 w-5" />
                Documentation
              </NavLink>
              <NavLink to="/encry" className={({ isActive }) => `flex items-center transition duration-300 ${isActive ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}>
                <Info className="mr-2 h-5 w-5" />
                Encryption
              </NavLink>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <NavLink to="/profile" className={({ isActive }) => `flex items-center transition duration-300 ${isActive ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}>
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </NavLink>
                <button className="flex items-center text-gray-400 hover:text-white transition duration-300" onClick={handleLogout}>
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <NavLink to="/login" className={({ isActive }) => `flex items-center transition duration-300 ${isActive ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}>
                  <LogIn className="mr-2 h-5 w-5" />
                  Login
                </NavLink>
                <NavLink to="/signup" className={({ isActive }) => `flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-white hover:scale-105 transition duration-300 ${isActive ? 'opacity-80' : ''}`}>
                  <UserPlus className="mr-2 h-5 w-5" />
                  Signup
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">{children}</main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-md mt-20">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} CryptML. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

