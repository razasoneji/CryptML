"use client";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const BackgroundGrid = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
  </div>
);

export default function SignupFormDemo() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateInput = (value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d_]+$/;
    return regex.test(value);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput(formData.username) || !validateInput(formData.password)) {
      setError(
        "Username and password must contain at least one uppercase letter, one lowercase letter, one number, and only underscores (_) as special characters."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:8080/api/auth/signup", {
        username: formData.username,
        password: formData.password,
        firstName: formData.firstname,
        lastName: formData.lastname,
      });
      console.log("Signup me hai")
      console.log(response);
      if (response.status === 200) {
        toast.success("User Registered Successfully!");
        setSuccessMessage("User Registered Successfully");
        navigate("/login")
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data?.message || "Signup failed. Please try again.");
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <BackgroundGrid />

      <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl border border-gray-800 bg-black/50 backdrop-blur-md p-8 relative z-10">
          <h2 className="mb-6 text-2xl font-bold text-purple-400">Welcome to CryptML</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <LabelInputContainer>
                <Label htmlFor="firstname" className="text-gray-400">First name</Label>
                <Input id="firstname" placeholder="Tyler" type="text" value={formData.firstname} onChange={handleChange} className="bg-zinc-800 border-none text-white shadow-input" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname" className="text-gray-400">Last name</Label>
                <Input id="lastname" placeholder="Durden" type="text" value={formData.lastname} onChange={handleChange} className="bg-zinc-800 border-none text-white shadow-input" />
              </LabelInputContainer>
            </div>

            <LabelInputContainer>
              <Label htmlFor="username" className="text-gray-400">Username</Label>
              <Input id="username" placeholder="YourUsername123" type="text" value={formData.username} onChange={handleChange} className="bg-zinc-800 border-none text-white shadow-input" />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="password" className="text-gray-400">Password</Label>
              <Input id="password" placeholder="••••••••" type="password" value={formData.password} onChange={handleChange} className="bg-zinc-800 border-none text-white shadow-input" />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="confirmPassword" className="text-gray-400">Confirm Password</Label>
              <Input id="confirmPassword" placeholder="••••••••" type="password" value={formData.confirmPassword} onChange={handleChange} className="bg-zinc-800 border-none text-white shadow-input" />
            </LabelInputContainer>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

            <button className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-[2px] transition-all duration-300 ease-out hover:scale-105" type="submit">
              <div className="rounded-lg bg-black px-8 py-2.5 transition-all duration-300 group-hover:bg-opacity-90">
                <span className="relative flex items-center justify-center text-white">Sign up →</span>
              </div>
            </button>
            <p className="text-gray-400 text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400">
              Sign in here
            </Link>
          </p>
          </form>
        </div>
      </div>
    </div>
  );
}

import { ReactNode, useState } from "react";

const LabelInputContainer = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
  return <div className={cn("flex flex-col space-y-1.5 w-full", className)}>{children}</div>;
};

