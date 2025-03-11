import { createClient } from "../../../supabase/server";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CategoryList from "@/components/category-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Categories | Directory",
  description: "Explore all categories of local businesses in our directory",
};

export default async function CategoriesPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Browse Categories</h1>

          <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
            <p className="text-lg text-gray-700 mb-6">
              Explore our comprehensive list of business categories to find
              exactly what you're looking for. From restaurants and hotels to
              professional services and entertainment venues, our directory has
              it all.
            </p>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-lg font-medium text-blue-800 mb-2">
                Looking for something specific?
              </h2>
              <p className="text-blue-700">
                Use our{" "}
                <a href="/map-search" className="underline font-medium">
                  Map Search
                </a>{" "}
                feature to find businesses near you, or head to the{" "}
                <a href="/listings" className="underline font-medium">
                  Listings
                </a>{" "}
                page for advanced filtering options.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <CategoryList />
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="mb-6">
              If you're a business owner, you can add your listing to our
              directory and reach more customers.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/sign-up"
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Sign Up
              </a>
              <a
                href="/dashboard/listings/add"
                className="bg-blue-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-900 transition-colors"
              >
                Add Your Business
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
