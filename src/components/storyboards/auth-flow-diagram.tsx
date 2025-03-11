export default function AuthFlowDiagramStoryboard() {
  return (
    <div className="p-8 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Authentication Flow</h2>

      <div className="flex flex-col items-center">
        <div className="w-full max-w-3xl">
          {/* Start Node */}
          <div className="flex justify-center mb-8">
            <div className="bg-blue-100 text-blue-800 px-6 py-3 rounded-lg font-medium">
              User Visits Website
            </div>
          </div>

          {/* Flow Line */}
          <div className="flex justify-center mb-4">
            <div className="h-8 w-0.5 bg-gray-300"></div>
          </div>

          {/* Decision Node */}
          <div className="flex justify-center mb-8">
            <div className="bg-yellow-100 text-yellow-800 px-6 py-3 rounded-lg font-medium">
              User Action?
            </div>
          </div>

          {/* Branches */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Sign Up Branch */}
            <div className="flex flex-col items-center">
              <div className="mb-4 text-gray-500">Sign Up</div>
              <div className="h-8 w-0.5 bg-gray-300 mb-4"></div>
              <div className="bg-green-100 text-green-800 px-6 py-3 rounded-lg font-medium mb-4">
                Registration Form
              </div>
              <div className="h-8 w-0.5 bg-gray-300 mb-4"></div>
              <div className="bg-green-100 text-green-800 px-6 py-3 rounded-lg font-medium mb-4">
                Email Verification
              </div>
              <div className="h-8 w-0.5 bg-gray-300 mb-4"></div>
              <div className="bg-green-100 text-green-800 px-6 py-3 rounded-lg font-medium">
                Create User Profile
              </div>
            </div>

            {/* Sign In Branch */}
            <div className="flex flex-col items-center">
              <div className="mb-4 text-gray-500">Sign In</div>
              <div className="h-8 w-0.5 bg-gray-300 mb-4"></div>
              <div className="bg-purple-100 text-purple-800 px-6 py-3 rounded-lg font-medium mb-4">
                Login Form
              </div>
              <div className="h-8 w-0.5 bg-gray-300 mb-4"></div>
              <div className="bg-purple-100 text-purple-800 px-6 py-3 rounded-lg font-medium">
                Authenticate with Supabase
              </div>
            </div>
          </div>

          {/* Converging Paths */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-0.5 bg-gray-300"></div>
            <div className="w-32 h-0.5 bg-gray-300"></div>
          </div>

          {/* Final Node */}
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">
              User Dashboard
            </div>
          </div>

          {/* Logout Path */}
          <div className="flex justify-center mb-4">
            <div className="h-8 w-0.5 bg-gray-300"></div>
          </div>

          <div className="flex justify-center">
            <div className="bg-red-100 text-red-800 px-6 py-3 rounded-lg font-medium">
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
