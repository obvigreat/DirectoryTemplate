import { Metadata } from "next";
import AuthForm from "@/components/auth-form";
import Link from "next/link";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Sign In | Directory",
  description: "Sign in to your Directory account",
};

export default function SignInPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href="/" className="flex justify-center">
            <h1 className="text-3xl font-bold text-blue-600">Directory</h1>
          </Link>
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <AuthForm type="sign-in" />
          </div>
        </div>
      </div>
    </>
  );
}
