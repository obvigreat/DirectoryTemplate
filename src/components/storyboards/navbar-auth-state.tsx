import Navbar from "@/components/navbar";

export default function NavbarAuthStateStoryboard() {
  return (
    <div className="flex flex-col gap-8">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Logged Out State</h2>
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <Navbar />
        </div>
      </div>

      <div className="border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">
          Logged In State (Simulated)
        </h2>
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="w-full border-b border-gray-200 sticky top-0 z-50 bg-white">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <div className="flex items-center">
                <a href="#" className="text-2xl font-bold text-blue-600 mr-8">
                  Directory
                </a>
                <div className="hidden md:flex space-x-6">
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 font-medium py-4"
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    className="text-blue-600 border-b-2 border-blue-600 font-medium py-4"
                  >
                    Listings
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 font-medium py-4"
                  >
                    Categories
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 font-medium py-4"
                  >
                    Pricing
                  </a>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <button className="hidden md:flex text-gray-600 hover:text-blue-600 p-2 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
                <button className="hidden md:flex text-gray-600 hover:text-blue-600 p-2 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </button>
                <a href="#" className="hidden md:block">
                  <button className="text-gray-600 hover:text-blue-600 p-2 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                </a>
                <a href="#" className="hidden md:block">
                  <button className="inline-flex items-center gap-1 border border-gray-300 px-3 py-1.5 rounded-md text-sm">
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
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add Listing
                  </button>
                </a>
                <a href="#" className="hidden md:block">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </button>
                </a>
                <div className="relative">
                  <button className="rounded-full p-1">
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
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="10" r="3"></circle>
                      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
