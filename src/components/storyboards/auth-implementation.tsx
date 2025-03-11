export default function AuthImplementationStoryboard() {
  return (
    <div className="p-8 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Authentication Implementation</h2>

      <div className="grid grid-cols-1 gap-8">
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Key Implementation Files
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-600 mb-2">
                Client-Side Files
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
                  <div>
                    <span className="font-medium">
                      src/lib/supabase/client.ts
                    </span>
                    <p className="text-xs text-gray-600">
                      Browser Supabase client for client-side auth operations
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
                  <div>
                    <span className="font-medium">
                      src/components/auth-state-provider.tsx
                    </span>
                    <p className="text-xs text-gray-600">
                      React context provider for auth state management
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
                  <div>
                    <span className="font-medium">
                      src/components/auth-form.tsx
                    </span>
                    <p className="text-xs text-gray-600">
                      Sign in, sign up, and password reset forms
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
                  <div>
                    <span className="font-medium">
                      src/components/protected-route.tsx
                    </span>
                    <p className="text-xs text-gray-600">
                      Client-side route protection component
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-green-600 mb-2">
                Server-Side Files
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2"></div>
                  <div>
                    <span className="font-medium">
                      src/lib/supabase/server.ts
                    </span>
                    <p className="text-xs text-gray-600">
                      Server Supabase client for server-side auth operations
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2"></div>
                  <div>
                    <span className="font-medium">src/middleware.ts</span>
                    <p className="text-xs text-gray-600">
                      Next.js middleware for route protection and session
                      refresh
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2"></div>
                  <div>
                    <span className="font-medium">src/app/actions/auth.ts</span>
                    <p className="text-xs text-gray-600">
                      Server actions for auth operations
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2"></div>
                  <div>
                    <span className="font-medium">
                      src/app/(auth)/auth/callback/route.ts
                    </span>
                    <p className="text-xs text-gray-600">
                      Auth callback route for email verification and OAuth
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Implementation Steps</h3>

          <ol className="list-decimal pl-5 space-y-4">
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">Set Up Supabase Project</span>
              <p className="text-sm text-gray-600 mt-1">
                Create a Supabase project and configure authentication settings
                (email, OAuth providers, etc.)
              </p>
            </li>
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">Install Dependencies</span>
              <p className="text-sm text-gray-600 mt-1">
                Install required packages:{" "}
                <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                  @supabase/ssr
                </code>
                ,{" "}
                <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                  @supabase/supabase-js
                </code>
                ,{" "}
                <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                  @supabase/auth-helpers-nextjs
                </code>
              </p>
            </li>
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">Create Supabase Clients</span>
              <p className="text-sm text-gray-600 mt-1">
                Implement server-side and client-side Supabase clients with
                proper cookie handling
              </p>
            </li>
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">Set Up Middleware</span>
              <p className="text-sm text-gray-600 mt-1">
                Create Next.js middleware for route protection and session
                refresh
              </p>
            </li>
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">Implement Auth Context</span>
              <p className="text-sm text-gray-600 mt-1">
                Create a React context provider for auth state management
              </p>
            </li>
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">Create Auth UI Components</span>
              <p className="text-sm text-gray-600 mt-1">
                Build sign in, sign up, and password reset forms
              </p>
            </li>
            <li className="pb-4 border-b border-gray-100">
              <span className="font-medium">Implement Protected Routes</span>
              <p className="text-sm text-gray-600 mt-1">
                Create components and middleware for protecting routes that
                require authentication
              </p>
            </li>
            <li>
              <span className="font-medium">Set Up Auth Callback Route</span>
              <p className="text-sm text-gray-600 mt-1">
                Implement the auth callback route for handling email
                verification and OAuth redirects
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
