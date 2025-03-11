import { createClient } from "../../../../supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SettingsForm from "@/components/settings-form";

export const metadata = {
  title: "Admin Settings | Directory",
  description: "Configure system settings for your directory platform",
};

export default async function AdminSettingsPage() {
  const supabase = await createClient();

  // Fetch settings from the database
  const { data: settingsData } = await supabase.from("settings").select("*");

  // Transform settings into a more usable format
  const settings =
    settingsData?.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {}) || {};

  const siteSettings = settings.site_settings || {
    siteName: "Directory",
    siteDescription: "Find local businesses in your area",
    contactEmail: "admin@example.com",
    supportPhone: "+1 (555) 123-4567",
    logoUrl: "/logo.png",
    faviconUrl: "/favicon.ico",
    primaryColor: "#3b82f6",
    secondaryColor: "#1e40af",
  };

  const featureFlags = settings.feature_flags || {
    enableReviews: true,
    enableBookings: true,
    enableMessages: true,
    enableSubscriptions: true,
    enableUserRegistration: true,
    maintenanceMode: false,
  };

  const apiSettings = settings.api_keys || {
    googleMapsApiKey: "",
    stripePublishableKey: "",
    stripeSecretKey: "",
    openaiApiKey: "",
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-2">Admin Settings</h1>
        <p className="text-muted-foreground">
          Configure system settings for your directory platform
        </p>
      </header>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>Configure general site settings</CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsForm
                settingKey="site_settings"
                initialValues={siteSettings}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feature Flags */}
        <TabsContent value="features" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Flags</CardTitle>
              <CardDescription>
                Enable or disable platform features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsForm
                settingKey="feature_flags"
                initialValues={featureFlags}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys */}
        <TabsContent value="api" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for third-party services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsForm settingKey="api_keys" initialValues={apiSettings} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure advanced system settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Database Management</h3>
                  <div className="flex gap-2">
                    <Button variant="outline">Backup Database</Button>
                    <Button variant="outline">Restore Database</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Cache Management</h3>
                  <div className="flex gap-2">
                    <Button variant="outline">Clear Cache</Button>
                    <Button variant="outline">Rebuild Cache</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Logs</h3>
                  <div className="flex gap-2">
                    <Button variant="outline">View Error Logs</Button>
                    <Button variant="outline">View Access Logs</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Danger Zone</h3>
                  <div className="border border-red-200 rounded-md p-4 bg-red-50">
                    <h4 className="text-red-600 font-medium mb-2">
                      Reset System
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      This will reset all system settings to their default
                      values. This action cannot be undone.
                    </p>
                    <Button variant="destructive">Reset System</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
