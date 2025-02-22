"use client"
import type React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { BackgroundBeams } from "@/components/ui/background-beams"



export default function SignupFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted")
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative">
      {/* Add BackgroundBeams here */}
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" />

      {/* Form container */}
      <div className="w-full max-w-sm sm:max-w-md mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black relative z-10">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Welcome to CryptML</h2>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4 relative overflow-visible">
            <Label htmlFor="email">Username</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              className="bg-white dark:bg-neutral-900 text-black dark:text-white border border-neutral-200 dark:border-neutral-700 rounded-md transition-colors focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4 relative overflow-visible">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              className="bg-white dark:bg-neutral-900 text-black dark:text-white border border-neutral-200 dark:border-neutral-700 rounded-md transition-colors focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Login &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex flex-col space-y-1 w-full", className)}>{children}</div>;
};