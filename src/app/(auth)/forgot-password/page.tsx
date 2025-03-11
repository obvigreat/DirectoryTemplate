import { Metadata } from "next";
import AuthForm from "@/components/auth-form";
import Link from "next/link";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Forgot Password | Directory",
  description: "Reset your Directory account password",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href="/" className="flex justify-center">
            <h1 className="text-3xl font-bold text-blue-600">Directory</h1>
          </Link>
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <AuthForm type="forgot-password" />

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or go back to
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/sign-in"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
