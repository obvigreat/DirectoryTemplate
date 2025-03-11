export default function AuthFlowSequenceStoryboard() {
  return (
    <div className="p-8 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Authentication Sequence</h2>

      <div className="flex">
        <div className="w-1/4 border-r border-gray-200 pr-4">
          <div className="text-center font-medium mb-4">Client</div>
          <div className="h-12 bg-blue-100 rounded-md flex items-center justify-center mb-20">
            User Interface
          </div>
          <div className="h-12 bg-blue-100 rounded-md flex items-center justify-center mb-20">
            Auth Form
          </div>
          <div className="h-12 bg-blue-100 rounded-md flex items-center justify-center mb-20">
            Client Context
          </div>
          <div className="h-12 bg-blue-100 rounded-md flex items-center justify-center mb-20">
            Protected Routes
          </div>
        </div>

        <div className="w-1/4 border-r border-gray-200 px-4">
          <div className="text-center font-medium mb-4">Middleware</div>
          <div className="h-12 bg-green-100 rounded-md flex items-center justify-center mb-20">
            Next.js Middleware
          </div>
          <div className="h-12 bg-green-100 rounded-md flex items-center justify-center mb-20">
            Auth Check
          </div>
          <div className="h-12 bg-green-100 rounded-md flex items-center justify-center mb-20">
            Session Refresh
          </div>
          <div className="h-12 bg-green-100 rounded-md flex items-center justify-center mb-20">
            Route Protection
          </div>
        </div>

        <div className="w-1/4 border-r border-gray-200 px-4">
          <div className="text-center font-medium mb-4">Server</div>
          <div className="h-12 bg-purple-100 rounded-md flex items-center justify-center mb-20">
            Server Components
          </div>
          <div className="h-12 bg-purple-100 rounded-md flex items-center justify-center mb-20">
            Server Actions
          </div>
          <div className="h-12 bg-purple-100 rounded-md flex items-center justify-center mb-20">
            API Routes
          </div>
          <div className="h-12 bg-purple-100 rounded-md flex items-center justify-center mb-20">
            Data Fetching
          </div>
        </div>

        <div className="w-1/4 pl-4">
          <div className="text-center font-medium mb-4">Supabase</div>
          <div className="h-12 bg-yellow-100 rounded-md flex items-center justify-center mb-20">
            Auth API
          </div>
          <div className="h-12 bg-yellow-100 rounded-md flex items-center justify-center mb-20">
            User Management
          </div>
          <div className="h-12 bg-yellow-100 rounded-md flex items-center justify-center mb-20">
            Session Storage
          </div>
          <div className="h-12 bg-yellow-100 rounded-md flex items-center justify-center mb-20">
            Database
          </div>
        </div>
      </div>

      {/* Arrows */}
      <div className="relative">
        <div className="absolute top-[60px] left-[23%] w-[54%] border-t-2 border-dashed border-gray-400"></div>
        <div className="absolute top-[140px] left-[77%] w-[23%] border-t-2 border-dashed border-gray-400 transform rotate-180"></div>
        <div className="absolute top-[220px] left-[23%] w-[54%] border-t-2 border-dashed border-gray-400"></div>
        <div className="absolute top-[300px] left-[77%] w-[23%] border-t-2 border-dashed border-gray-400 transform rotate-180"></div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Authentication Flow Steps:</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>User submits credentials through the Auth Form</li>
          <li>Client sends authentication request to Supabase Auth API</li>
          <li>Supabase validates credentials and returns session tokens</li>
          <li>
            Client stores session in local storage and updates Auth Context
          </li>
          <li>
            On subsequent requests, Middleware refreshes the session if needed
          </li>
          <li>Protected routes check authentication state before rendering</li>
          <li>
            Server components and actions use server-side Supabase client to
            verify authentication
          </li>
        </ol>
      </div>
    </div>
  );
}
