export default function AuthFlowStoryboard() {
  return (
    <div className="p-8 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Authentication Flow</h2>

      <div className="flex flex-col gap-8">
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Sign In</h3>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Sign In</h2>
                <p className="text-gray-600">
                  Welcome back! Please sign in to continue.
                </p>
              </div>

              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Password</label>
                    <a href="#" className="text-sm text-blue-600">
                      Forgot password?
                    </a>
                  </div>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Sign In
                </button>

                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a href="#" className="text-blue-600 font-medium">
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Sign Up</h3>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Create an Account</h2>
                <p className="text-gray-600">Join our community today!</p>
              </div>

              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </button>

                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <a href="#" className="text-blue-600 font-medium">
                    Sign in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Password Reset</h3>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Reset Your Password</h2>
                <p className="text-gray-600">
                  Enter your email to receive a password reset link.
                </p>
              </div>

              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="your@email.com"
                  />
                </div>

                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Send Reset Link
                </button>

                <p className="text-center text-sm text-gray-600">
                  <a href="#" className="text-blue-600 font-medium">
                    Back to Sign In
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Email Verification</h3>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="max-w-md mx-auto text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>

              <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
              <p className="text-gray-600 mb-6">
                We've sent a verification link to your email address. Please
                check your inbox and click the link to verify your account.
              </p>

              <div className="p-4 bg-blue-50 rounded-md text-blue-700 mb-6">
                <p>
                  If you don't see the email, check your spam folder or click
                  below to resend.
                </p>
              </div>

              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Resend Verification Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
