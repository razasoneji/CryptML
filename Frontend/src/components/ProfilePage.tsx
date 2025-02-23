import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Edit, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackgroundGrid = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
  </div>
);

const ProfileLogo = ({ firstName, lastName }: { firstName: string; lastName: string }) => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  return (
    <div className="relative">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="32" fill="url(#gradient)" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontFamily="Arial, sans-serif"
          fontSize="24"
          fontWeight="bold"
        >
          {initials}
        </text>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
  });

  const [pendingChanges, setPendingChanges] = useState({
    firstName: "",
    lastName: "",
    username: "",
  });

  const handleEdit = () => {
    setPendingChanges({ ...user });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser(pendingChanges);
    setIsEditing(false);
    console.log("Profile updated:", pendingChanges);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPendingChanges((prev) => ({ ...prev, [name]: value }));
  };

  const handleNavigateToHistory = () => {
    navigate("/history");
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <BackgroundGrid />
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" />

      <div className="container mx-auto py-12 px-4">
        <div className="w-full max-w-4xl mx-auto rounded-xl border border-gray-800 bg-black/50 backdrop-blur-md p-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-1 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center">
                    <ProfileLogo firstName={user.firstName} lastName={user.lastName} />
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-400">@{user.username}</p>
            </div>

            <div className="flex-1 space-y-8">
              {isEditing ? (
                <form onSubmit={handleSave}>
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-purple-400 pb-2 border-b border-gray-800">
                      Personal Information
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <LabelInputContainer className="md:col-span-2">
                        <Label className="text-gray-400">Username</Label>
                        <Input
                          name="username"
                          value={pendingChanges.username}
                          onChange={handleChange}
                          className="bg-zinc-800 border-none text-white shadow-input"
                        />
                      </LabelInputContainer>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <LabelInputContainer>
                          <Label className="text-gray-400">First Name</Label>
                          <Input
                            name="firstName"
                            value={pendingChanges.firstName}
                            onChange={handleChange}
                            className="bg-zinc-800 border-none text-white shadow-input"
                          />
                        </LabelInputContainer>
                        <LabelInputContainer>
                          <Label className="text-gray-400">Last Name</Label>
                          <Input
                            name="lastName"
                            value={pendingChanges.lastName}
                            onChange={handleChange}
                            className="bg-zinc-800 border-none text-white shadow-input"
                          />
                        </LabelInputContainer>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex gap-4">
                      <button
                        type="submit"
                        className="flex items-center space-x-2 px-6 py-2.5 rounded-lg bg-purple-600 text-white transition-colors duration-200 hover:bg-purple-700"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Save Changes</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleNavigateToHistory}
                        className="flex items-center space-x-2 px-6 py-2.5 rounded-lg bg-purple-600 text-white transition-colors duration-200 hover:bg-purple-700"
                      >
                        <History className="w-4 h-4" />
                        <span>View History</span>
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-purple-400 pb-2 border-b border-gray-800">
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <LabelInputContainer className="md:col-span-2">
                      <Label className="text-gray-400">Username</Label>
                      <Input
                        value={user.username}
                        disabled
                        className="bg-zinc-800 border-none text-white shadow-input"
                      />
                    </LabelInputContainer>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <LabelInputContainer>
                        <Label className="text-gray-400">First Name</Label>
                        <Input
                          value={user.firstName}
                          disabled
                          className="bg-zinc-800 border-none text-white shadow-input"
                        />
                      </LabelInputContainer>
                      <LabelInputContainer>
                        <Label className="text-gray-400">Last Name</Label>
                        <Input
                          value={user.lastName}
                          disabled
                          className="bg-zinc-800 border-none text-white shadow-input"
                        />
                      </LabelInputContainer>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex gap-4">
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="flex items-center space-x-2 px-6 py-2.5 rounded-lg bg-purple-600 text-white transition-colors duration-200 hover:bg-purple-700"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNavigateToHistory}
                      className="flex items-center space-x-2 px-6 py-2.5 rounded-lg bg-purple-600 text-white transition-colors duration-200 hover:bg-purple-700"
                    >
                      <History className="w-4 h-4" />
                      <span>View History</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
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