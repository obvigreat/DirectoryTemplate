"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Loader2,
  Upload,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Shield,
  Bell,
  CreditCard,
} from "lucide-react";

interface AccountSettingsFormProps {
  user: any;
  profile: any;
}

export default function AccountSettingsForm({
  user,
  profile,
}: AccountSettingsFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: user?.email || "",
    phone: profile?.phone || "",
    bio: profile?.bio || "",
    location: profile?.location || "",
    website: profile?.website || "",
    avatar_url: profile?.avatar_url || "",
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;

      setLoading(true);
      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `avatars/${user.id}-${Math.random()}.${fileExt}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

      // Update form data with new avatar URL
      setFormData((prev) => ({ ...prev, avatar_url: data.publicUrl }));

      setMessage({ type: "success", text: "Avatar uploaded successfully" });
    } catch (error: any) {
      console.error("Error uploading avatar:", error);
      setMessage({
        type: "error",
        text: error.message || "Error uploading avatar",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Update user profile in database
      const { error } = await supabase
        .from("users")
        .update({
          name: formData.name,
          phone: formData.phone,
          bio: formData.bio,
          location: formData.location,
          website: formData.website,
          avatar_url: formData.avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      setMessage({ type: "success", text: "Profile updated successfully" });
      router.refresh();
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setMessage({
        type: "error",
        text: error.message || "Error updating profile",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security & Privacy</TabsTrigger>
      </TabsList>

      {message && (
        <div
          className={`p-4 my-4 rounded-md ${message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
        >
          {message.text}
        </div>
      )}

      <TabsContent value="profile" className="space-y-6 py-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 space-y-4">
            <div className="flex flex-col items-center">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage src={formData.avatar_url} />
                <AvatarFallback className="text-2xl">
                  {formData.name
                    ? formData.name.charAt(0).toUpperCase()
                    : user.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="relative">
                <Input
                  type="file"
                  id="avatar"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  disabled={loading}
                />
                <Label
                  htmlFor="avatar"
                  className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" /> Upload Photo
                    </>
                  )}
                </Label>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center">
                  <User className="w-4 h-4 mr-2" /> Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" /> Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500">Email cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" /> Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" /> Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" /> Website
                </Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="flex items-center">
                <User className="w-4 h-4 mr-2" /> Bio
              </Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                rows={4}
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </div>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-6 py-4">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Email Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Messages</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications when you get new messages
                  </p>
                </div>
                <Switch
                  checked={formData.emailNotifications}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("emailNotifications", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Bookings & Reservations</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for booking updates
                  </p>
                </div>
                <Switch
                  checked={formData.emailNotifications}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("emailNotifications", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Marketing Emails</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about new features and promotions
                  </p>
                </div>
                <Switch
                  checked={formData.marketingEmails}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("marketingEmails", checked)
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Push Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">All Push Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable all push notifications
                  </p>
                </div>
                <Switch
                  checked={formData.pushNotifications}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("pushNotifications", checked)
                  }
                />
              </div>
            </div>
          </div>

          <Button>
            <Bell className="mr-2 h-4 w-4" /> Save Notification Preferences
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="security" className="space-y-6 py-4">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div></div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
            <Button>
              <Shield className="mr-2 h-4 w-4" /> Update Password
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account by enabling
              two-factor authentication.
            </p>
            <Button variant="outline">
              <Shield className="mr-2 h-4 w-4" /> Enable Two-Factor
              Authentication
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Privacy Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Profile Visibility</h4>
                  <p className="text-sm text-muted-foreground">
                    Make your profile visible to other users
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Show Location</h4>
                  <p className="text-sm text-muted-foreground">
                    Display your location on your public profile
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Account Actions</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline">
                <CreditCard className="mr-2 h-4 w-4" /> Manage Payment Methods
              </Button>
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
