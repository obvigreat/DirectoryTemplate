import DashboardSidebar from "@/components/dashboard-sidebar";

export default function DashboardLayoutStoryboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full border-b border-gray-200 bg-white py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600 mr-8">
              Directory
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <button className="p-2 rounded-full hover:bg-gray-100">
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
                className="lucide lucide-user-circle"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="10" r="3" />
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-64 md:min-h-[calc(100vh-64px)] md:sticky md:top-16">
          <DashboardSidebar />
        </div>
        <main className="flex-1 p-4 md:p-8">
          <div className="space-y-6">
            <header>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, User</p>
            </header>

            <div className="p-8 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-center">
              <h2 className="text-xl font-medium mb-2">
                Dashboard Content Area
              </h2>
              <p className="text-gray-500">
                This is where the dashboard content will be displayed
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
