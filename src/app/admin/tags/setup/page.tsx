import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Database, Shield, Zap } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Setup Tags | Admin Dashboard",
  description: "Set up the tags system for your directory platform",
};

export default async function SetupTagsPage() {
  const supabase = await createClient();

  // Check if user is admin
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?callbackUrl=/admin/tags/setup");
  }

  // Get user role
  const { data: userData } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (userData?.role !== "admin") {
    redirect("/dashboard");
  }

  // Check if tags table exists
  const { error: checkError } = await supabase
    .from("tags")
    .select("id")
    .limit(1);

  const tableExists = !checkError || checkError.code !== "PGRST116";

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tags System Setup</h1>
          <p className="text-muted-foreground">
            Set up the tags system for your directory platform
          </p>
        </div>
        <Link href="/admin/tags">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tags
          </Button>
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Tags System Status</CardTitle>
            </CardHeader>
            <CardContent>
              {tableExists ? (
                <div className="bg-green-50 text-green-700 p-4 rounded-md flex items-start">
                  <Zap className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Tags system is ready!</p>
                    <p className="text-sm mt-1">
                      The tags database tables have been successfully set up and
                      are ready to use.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 text-amber-800 p-4 rounded-md flex items-start">
                  <Shield className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Tags system needs setup</p>
                    <p className="text-sm mt-1">
                      The tags database tables need to be created. Please
                      contact your administrator to run the migration.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <p className="text-sm text-gray-600">
                  The tags system uses Supabase migrations to create the
                  necessary database tables and security policies. These
                  migrations should be run by an administrator with database
                  access.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About Tags System</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-3 bg-blue-100 p-2 rounded-full">
                    <Database className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Database Tables</h3>
                    <p className="text-sm text-gray-600">
                      Creates the tags table and listing_tags junction table for
                      many-to-many relationships.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 bg-purple-100 p-2 rounded-full">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Security Policies</h3>
                    <p className="text-sm text-gray-600">
                      Sets up Row Level Security policies to protect your data
                      while allowing appropriate access.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 bg-green-100 p-2 rounded-full">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Realtime Updates</h3>
                    <p className="text-sm text-gray-600">
                      Enables realtime functionality so your application can
                      receive live updates when tags change.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Create your first tag</li>
                <li>Associate tags with listings</li>
                <li>Implement tag filtering in your search</li>
                <li>Add tag management to your admin dashboard</li>
              </ol>
              <div className="mt-4">
                <Link href="/admin/tags/add">
                  <Button className="w-full" disabled={!tableExists}>
                    {tableExists ? "Create Your First Tag" : "Setup Required"}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
