export default function AuthFlowOverviewStoryboard() {
  return (
    <div className="p-8 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Authentication Flow Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Sign Up Flow</h3>
          <ol className="list-decimal pl-5 space-y-4">
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">User Registration</span>
              <p className="text-sm text-gray-600 mt-1">
                User enters email, password, and profile information in the
                sign-up form.
              </p>
            </li>
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">Supabase Auth API</span>
              <p className="text-sm text-gray-600 mt-1">
                Client sends registration data to Supabase Auth API using{" "}
                <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                  supabase.auth.signUp()
                </code>
                .
              </p>
            </li>
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">Email Verification</span>
              <p className="text-sm text-gray-600 mt-1">
                Supabase sends a verification email to the user's email address.
              </p>
            </li>
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">Email Confirmation</span>
              <p className="text-sm text-gray-600 mt-1">
                User clicks the verification link in the email, which redirects
                to the auth callback route.
              </p>
            </li>
            <li>
              <span className="font-medium">Account Creation</span>
              <p className="text-sm text-gray-600 mt-1">
                User account is created in Supabase Auth and a corresponding
                record is created in the users table.
              </p>
            </li>
          </ol>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Sign In Flow</h3>
          <ol className="list-decimal pl-5 space-y-4">
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">User Login</span>
              <p className="text-sm text-gray-600 mt-1">
                User enters email and password in the sign-in form.
              </p>
            </li>
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">Authentication Request</span>
              <p className="text-sm text-gray-600 mt-1">
                Client sends credentials to Supabase Auth API using{" "}
                <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                  supabase.auth.signInWithPassword()
                </code>
                .
              </p>
            </li>
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">Token Generation</span>
              <p className="text-sm text-gray-600 mt-1">
                Supabase validates credentials and returns access and refresh
                tokens.
              </p>
            </li>
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">Session Storage</span>
              <p className="text-sm text-gray-600 mt-1">
                Tokens are stored in cookies and local storage for persistent
                authentication.
              </p>
            </li>
            <li>
              <span className="font-medium">Redirect to Dashboard</span>
              <p className="text-sm text-gray-600 mt-1">
                User is redirected to the dashboard or the original requested
                page.
              </p>
            </li>
          </ol>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Session Management</h3>
          <ul className="space-y-4">
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">Session Refresh</span>
              <p className="text-sm text-gray-600 mt-1">
                Middleware automatically refreshes the session if the access
                token is expired using the refresh token.
              </p>
            </li>
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">Auth State Synchronization</span>
              <p className="text-sm text-gray-600 mt-1">
                The{" "}
                <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                  AuthStateProvider
                </code>{" "}
                listens for auth state changes and updates the React context.
              </p>
            </li>
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">Server-Side Validation</span>
              <p className="text-sm text-gray-600 mt-1">
                Server components and API routes validate the session using the
                server-side Supabase client.
              </p>
            </li>
            <li>
              <span className="font-medium">Route Protection</span>
              <p className="text-sm text-gray-600 mt-1">
                Middleware and the{" "}
                <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                  ProtectedRoute
                </code>{" "}
                component prevent access to protected routes for unauthenticated
                users.
              </p>
            </li>
          </ul>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Sign Out Flow</h3>
          <ol className="list-decimal pl-5 space-y-4">
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">User Initiates Logout</span>
              <p className="text-sm text-gray-600 mt-1">
                User clicks the sign-out button in the UI.
              </p>
            </li>
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">Client-Side Logout</span>
              <p className="text-sm text-gray-600 mt-1">
                Client calls{" "}
                <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                  supabase.auth.signOut()
                </code>{" "}
                to invalidate the session.
              </p>
            </li>
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">Server-Side Logout</span>
              <p className="text-sm text-gray-600 mt-1">
                Server action is triggered to also sign out on the server side.
              </p>
            </li>
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">Session Cleanup</span>
              <p className="text-sm text-gray-600 mt-1">
                Tokens are removed from cookies and local storage.
              </p>
            </li>
            <li>
              <span className="font-medium">Redirect to Sign In</span>
              <p className="text-sm text-gray-600 mt-1">
                User is redirected to the sign-in page.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
