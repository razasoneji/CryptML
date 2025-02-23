"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { BackgroundBeams } from "@/components/ui/background-beams";

const BackgroundGrid = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
  </div>
);

export default function SignupFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <BackgroundGrid />
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" />

      <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl border border-gray-800 bg-black/50 backdrop-blur-md p-8 relative z-10">
          <h2 className="mb-6 text-2xl font-bold text-purple-400">Welcome to CryptML</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <LabelInputContainer>
                <Label htmlFor="firstname" className="text-gray-400">First name</Label>
                <Input
                  id="firstname"
                  placeholder="Tyler"
                  type="text"
                  className="bg-zinc-800 border-none text-white shadow-input"
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname" className="text-gray-400">Last name</Label>
                <Input
                  id="lastname"
                  placeholder="Durden"
                  type="text"
                  className="bg-zinc-800 border-none text-white shadow-input"
                />
              </LabelInputContainer>
            </div>

            <LabelInputContainer>
              <Label htmlFor="email" className="text-gray-400">Username</Label>
              <Input
                id="email"
                placeholder="projectmayhem@fc.com"
                type="email"
                className="bg-zinc-800 border-none text-white shadow-input"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="password" className="text-gray-400">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                className="bg-zinc-800 border-none text-white shadow-input"
              />
            </LabelInputContainer>

            <button
              className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-[2px] transition-all duration-300 ease-out hover:scale-105"
              type="submit"
            >
              <div className="rounded-lg bg-black px-8 py-2.5 transition-all duration-300 group-hover:bg-opacity-90">
                <span className="relative flex items-center justify-center text-white">
                  Sign up →
                </span>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex flex-col space-y-1.5 w-full", className)}>{children}</div>;
};
