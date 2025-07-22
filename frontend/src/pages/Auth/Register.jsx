import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfilePhoto from "../../components/comps/ProfilePhoto";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { UserContext } from "@/context/userContext";
import uploadImage from "@/utils/uploadImage";

const Register = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("authToken", token);
        updateUser(user);
        toast.success("SignIn successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error signing In", error);
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response?.status === 404) {
          toast.error("Account not found. Please check your email or sign up.");
        } else if (axiosError.response?.status === 401) {
          toast.error("Invalid Email or Password.");
        } else {
          toast.error("Failed to sign in. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    if (!fullName.trim() || !email.includes("@") || !password.trim()) {
      toast.error("All details need to be filled");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      //upload image if present
      if (profilePicture) {
        const imageUploaded = await uploadImage(profilePicture);
        profileImageUrl = imageUploaded.imageUrl || "";
      }

      const response = await axiosInstance.post("/auth/register", {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("authToken", token);
        updateUser(user);
        toast.success("Account created successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error creating account", error);
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response?.status === 409) {
          toast.error("This email is already registered.");
        } else {
          toast.error("Failed to create account. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center md:justify-between lg:justify-between items-center 
      max-w-[1300px] gap-20 mx-auto h-max md:h-[100vh] lg:h-[100vh] py-10 lg:py-75 min-h-screen ">
      {/* form box */}
      {/* <div className="min-h-screen bg-background flex items-center justify-center px-4 py-2"> */}
      <div className="w-full max-w-md md:pl-10 lg:pl-15">
        <div className="animate-fade-in">
          <CardContent className="px-8 py-5 flex flex-col items-center md:items-start lg:items-start">
            {/* Header */}
            <div className="text-center mb-8 text-black flex flex-col items-center md:items-start lg:items-start">
              {/* <div className="w-16 h-14 bg-gradient-primary rounded-2xl mx-auto mb-2 animate-float flex items-center justify-center">
                  <h1 className="text-3xl tracking-tighter font-mono text-green-700">FollowTrack</h1>
                </div> */}
              <h1 className="text-[16px] font-semibold text-foreground">
                {isSignUp ? "Create Account" : "Welcome Back!"}
              </h1>
              <p className="mt-1 text-black text-sm">
                {isSignUp
                  ? "Sign up to get started"
                  : "Sign in to your account"}
              </p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex bg-muted rounded-lg mb-8 w-full md:w-75 lg:w-75 border">
              <Button
                type="button"
                variant={!isSignUp ? "default" : "ghost"}
                size="sm"
                onClick={() => setIsSignUp(false)}
                className={`flex-1 ${
                  !isSignUp
                    ? "bg-black text-white shadow-sm"
                    : "text-foreground hover:text-foreground"
                }`}
              >
                Sign In
              </Button>
              <Button
                type="button"
                variant={isSignUp ? "default" : "ghost"}
                size="sm"
                onClick={() => setIsSignUp(true)}
                className={`flex-1 ${
                  isSignUp
                    ? "bg-black text-white shadow-sm"
                    : "text-foreground hover:text-foreground"
                }`}
              >
                Sign Up
              </Button>
            </div>

            {/* Forms */}
            <div className="transition-all duration-300 w-full">
              {!isSignUp ? (
                // Sign In Form
                <form onSubmit={handleSignInSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-input focus:ring-primary text-[14px]"
                    />
                  </div>

                  <div className="space-y-2 relative">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-input focus:ring-primary text-[14px]"
                    />
                    {showPassword ? (
                      <LuEye
                        className="absolute right-3 top-8 cursor-pointer"
                        onClick={togglePassword}
                      />
                    ) : (
                      <LuEyeOff
                        className="absolute right-3 top-8 cursor-pointer"
                        onClick={togglePassword}
                      />
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-900 hover:bg-green-600 hover:opacity-93 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              ) : (
                // Sign Up Form
                <form onSubmit={handleSignUpSubmit} className="space-y-6">
                  <div className="w-full flex justify-center md:justify-start items-center">
                    <ProfilePhoto
                      image={profilePicture}
                      setImage={setProfilePicture}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="border-input focus:ring-primary text-[14px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-input focus:ring-primary text-[14px]"
                    />
                  </div>

                  <div className="space-y-2 relative">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="minimum of 6 digits"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-input focus:ring-primary text-[14px] "
                    />
                    {showPassword ? (
                      <LuEye
                        className="absolute right-3 top-8 cursor-pointer"
                        onClick={togglePassword}
                      />
                    ) : (
                      <LuEyeOff
                        className="absolute right-3 top-8 cursor-pointer"
                        onClick={togglePassword}
                      />
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-900 hover:bg-green-600 hover:opacity-93 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              )}
            </div>
          </CardContent>
        </div>
      </div>
      {/* </div> */}

      {/* detail bos*/}
      <div className="bg-green-600 h-80 md:h-140 lg:h-140 w-full lg:w-130 rounded-2xl lg:rounded-l-2xl relative p-10">
        <div className="size-24 md:size-27 lg:size-30 bg-yellow-500 absolute -top-2 -left-1.5 rounded-2xl"></div>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-4xl tracking-tighter font-mono text-white">FollowTrack</h1>
          <p className='text-sm text-white mt-5 text-center max-w-48 md:max-w-fit lg:max-w-100'>Track your spendings over time and gain insight of your transactions</p>
        </div>
        <div className="size-18 md:size-23 lg:size-26 bg-green-300 absolute bottom-20 -right-1.5 rounded-2xl z-20"></div>
        <div className="size-24 md:size-27 lg:size-30 bg-emerald-950 absolute -bottom-2 -right-1.5 rounded-2xl z-30"></div>
      </div>
    </div>
  );
};

export default Register;
