import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardNavbar from "@/components/dashboard-navbar";

export default function DashboardAuthStoryboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Profile Overview</h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-600"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="10" r="3"></circle>
                      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">John Doe</h3>
                    <p className="text-sm text-muted-foreground">
                      john@example.com
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Member since Jan 1, 2023
                    </p>
                  </div>
                  <button className="ml-auto border border-gray-300 px-3 py-1.5 rounded-md text-sm">
                    Edit Profile
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-start pb-3 border-b border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Viewed{" "}
                        <span className="font-semibold">
                          Downtown Coffee Shop
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
