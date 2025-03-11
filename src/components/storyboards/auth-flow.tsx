import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function AuthFlowStoryboard() {
  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="#"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="#"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>
          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
          <div className="text-center mt-4">
            <Link
              href="#"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
