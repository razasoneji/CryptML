import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Lock, Terminal, Database, Layout } from 'lucide-react';
// import { BackgroundBeams } from './ui/background-beams';

const BackgroundGrid = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
  </div>
);

import { ReactNode } from 'react';

interface SpotlightButtonProps {
  children: ReactNode;
  href: string;
  primary?: boolean;
}

const SpotlightButton = ({ children, href, primary = false }: SpotlightButtonProps) => (
  <a
    href={href}
    className={`group relative inline-flex items-center justify-center overflow-hidden rounded-lg p-[2px] transition-all duration-300 ease-out hover:scale-105 ${
      primary ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''
    }`}
  >
    <div className={`rounded-lg px-8 py-4 transition-all duration-300 ${
      primary 
        ? 'bg-black group-hover:bg-opacity-90' 
        : 'border border-gray-700 hover:bg-gray-800'
    }`}>
      <span className="relative flex items-center text-white">
        {children}
      </span>
    </div>
  </a>
);

interface WindowProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
}

const Window = ({ title, icon: Icon, children, className = "" }: WindowProps) => (
  <div className={`rounded-xl border border-gray-800 bg-black/50 backdrop-blur-md ${className}`}>
    <div className="flex items-center border-b border-gray-800 p-4">
      <Icon className="mr-2 h-5 w-5 text-purple-400" />
      <h2 className="text-lg font-semibold text-white">{title}</h2>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const LandingPage = () => {
  return (

    <div className="relative min-h-screen bg-black text-white">
     
      <BackgroundGrid />
      {/* <BackgroundBeams className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" /> */}
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-4 text-7xl font-extrabold text-purple-400">
          CryptML
        </h1>
        <h2 className="mb-6 text-5xl font-bold tracking-tight">
          AI-Powered Crypto Algorithm <br /> Identification System
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-400">
          Harness the power of machine learning to automatically identify and analyze cryptographic algorithms.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <SpotlightButton href="/prediction" primary>
            Try It Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </SpotlightButton>
          <SpotlightButton href="/docs">
            Documentation
          </SpotlightButton>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-8 md:grid-cols-2">
          <Window title="Algorithm Detection" icon={Terminal} className="md:row-span-2">
            <div className="space-y-4">
              <div className="rounded-lg bg-gray-900 p-4">
                <pre className="text-sm text-green-400">
                  {'>'}Analyzing cryptographic pattern...
                  <br />
                  {'>'} Pattern matched: AES-256
                  <br />
                  {'>'} Confidence score: 98.5%
                </pre>
              </div>
              <p className="text-gray-400">
                Our ML model analyzes cryptographic patterns in real-time, providing instant identification with confidence scores.
              </p>
              <SpotlightButton href="/prediction" primary>
                Start Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </SpotlightButton>
            </div>
          </Window>

          <Window title="Dataset Overview" icon={Database}>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-gray-900 p-4">
                <div>
                  <p className="text-sm text-gray-400">Supported Algorithms</p>
                  <p className="text-2xl font-bold text-white">15+</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Accuracy Rate</p>
                  <p className="text-2xl font-bold text-white">65.87%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Training Data</p>
                  <p className="text-2xl font-bold text-white">1 Lakh+</p>
                </div>
              </div>
            </div>
          </Window>

          <Window title="Security Features" icon={ShieldCheck}>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center">
                <Lock className="mr-2 h-4 w-4 text-purple-400" />
                Real-time vulnerability detection
              </li>
              <li className="flex items-center">
                <Zap className="mr-2 h-4 w-4 text-purple-400" />
                Pattern-based analysis
              </li>
              <li className="flex items-center">
                <ShieldCheck className="mr-2 h-4 w-4 text-purple-400" />
                Comprehensive security reports
              </li>
            </ul>
          </Window>
        </div>
      </section>
      
    </div>
  
   
  );
};

export default LandingPage;
