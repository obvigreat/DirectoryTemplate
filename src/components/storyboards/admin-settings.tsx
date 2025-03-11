import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminSettings() {
  // Mock settings data for demonstration
  const siteSettings = {
    siteName: "Directory",
    siteDescription: "Find local businesses in your area",
    contactEmail: "admin@example.com",
    supportPhone: "+1 (555) 123-4567",
    logoUrl: "/logo.png",
    primaryColor: "#3b82f6",
    secondaryColor: "#1e40af",
  };

  const featureFlags = {
    enableReviews: true,
    enableBookings: true,
    enableMessages: true,
    enableSubscriptions: true,
    enableUserRegistration: true,
    maintenanceMode: false,
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-gray-50">
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
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      name="siteName"
                      defaultValue={siteSettings.siteName}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      defaultValue={siteSettings.contactEmail}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <textarea
                    id="siteDescription"
                    name="siteDescription"
                    rows={3}
                    className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue={siteSettings.siteDescription}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="supportPhone">Support Phone</Label>
                    <Input
                      id="supportPhone"
                      name="supportPhone"
                      defaultValue={siteSettings.supportPhone}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logoUrl">Logo URL</Label>
                    <Input
                      id="logoUrl"
                      name="logoUrl"
                      defaultValue={siteSettings.logoUrl}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        name="primaryColor"
                        defaultValue={siteSettings.primaryColor}
                      />
                      <input
                        type="color"
                        value={siteSettings.primaryColor}
                        className="h-10 w-10 rounded-md border border-input"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondaryColor"
                        name="secondaryColor"
                        defaultValue={siteSettings.secondaryColor}
                      />
                      <input
                        type="color"
                        value={siteSettings.secondaryColor}
                        className="h-10 w-10 rounded-md border border-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit">Save Settings</Button>
                </div>
              </form>
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
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Reviews System</h4>
                      <p className="text-sm text-muted-foreground">
                        Allow users to leave reviews on listings
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="enableReviews"
                        name="enableReviews"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        defaultChecked={featureFlags.enableReviews}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Booking System</h4>
                      <p className="text-sm text-muted-foreground">
                        Allow users to book appointments with businesses
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="enableBookings"
                        name="enableBookings"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        defaultChecked={featureFlags.enableBookings}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Messaging System</h4>
                      <p className="text-sm text-muted-foreground">
                        Allow users to send messages to businesses
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="enableMessages"
                        name="enableMessages"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        defaultChecked={featureFlags.enableMessages}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Maintenance Mode</h4>
                      <p className="text-sm text-muted-foreground">
                        Put the site in maintenance mode (only admins can
                        access)
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="maintenanceMode"
                        name="maintenanceMode"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        defaultChecked={featureFlags.maintenanceMode}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit">Save Features</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="api" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for third-party services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="googleMapsApiKey">Google Maps API Key</Label>
                  <Input
                    id="googleMapsApiKey"
                    name="googleMapsApiKey"
                    type="password"
                    defaultValue="YOUR_GOOGLE_MAPS_API_KEY"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stripePublishableKey">
                    Stripe Publishable Key
                  </Label>
                  <Input
                    id="stripePublishableKey"
                    name="stripePublishableKey"
                    type="password"
                    defaultValue="YOUR_STRIPE_PUBLISHABLE_KEY"
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit">Save API Keys</Button>
                </div>
              </form>
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
