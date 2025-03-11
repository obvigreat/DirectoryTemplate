"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { createClient } from "@/lib/supabase/client";
import { 
  CheckCircle, Circle, PlusCircle, ArrowRight, 
  Settings, Image, MessageCircle, Calendar
} from "lucide-react";
import Link from "next/link";

type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  action: string;
  link: string;
  icon: React.ReactNode;
};

type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  created_at: string;
  listings_count: number;
  has_subscription: boolean;
};

export default function DashboardWelcome() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [onboardingSteps, setOnboardingSteps] = useState<OnboardingStep[]>([
    {
      id: "profile",
      title: "Complete your profile",
      description: "Add your details and profile picture",
      completed: false,
      action: "Update Profile",
      link: "/dashboard/settings",
      icon: <Settings className="h-5 w-5 text-blue-500" />
    },
    {
      id: "listing",
      title: "Create your first listing",
      description: "Add your business or service to the directory",
      completed: false,
      action: "Add Listing",
      link: "/dashboard/listings/add",
      icon: <PlusCircle className="h-5 w-5 text-green-500" />
    },
    {
      id: "photos",
      title: "Upload photos",
      description: "Add photos to showcase your business",
      completed: false,
      action: "Upload Photos",
      link: "/dashboard/listings",
      icon: <Image className="h-5 w-5 text-purple-500" />
    },
    {
      id: "subscription",
      title: "Choose a subscription plan",
      description: "Upgrade to unlock premium features",
      completed: false,
      action: "View Plans",
      link: "/dashboard/subscription",
      icon: <CheckCircle className="h-5 w-5 text-orange-500" />
    }
  ]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // In a real app, fetch from your API
        // const { data, error } = await supabase
        //   .from('profiles')
        //   .select('*, listings(count)')
        //   .eq('id', user.id)
        //   .single();
        //
        // if (error) throw error;
        // setProfile(data);

        // Mock data for demonstration
        const mockProfile: UserProfile = {
          id: user.id,
          name: user.user_metadata?.name || "New User",
          email: user.email || "",
          avatar_url: user.user_metadata?.avatar_url,
          created_at: user.created_at || new Date().toISOString(),
          listings_count: 0,
          has_subscription: false
        };

        setProfile(mockProfile);

        // Update onboarding steps based on profile data
        setOnboardingSteps(prev => prev.map(step => {
          if (step.id === "profile" && user.user_metadata?.name) {
            return { ...step, completed: true };
          }
          if (step.id === "listing" && mockProfile.listings_count > 0) {
            return { ...step, completed: true };
          }
          if (step.id === "photos") {
            // In a real app, check if listings have photos
            return { ...step, completed: mockProfile.listings_count > 0 };
          }
          if (step.id === "subscription" && mockProfile.has_subscription) {
            return { ...step, completed: true };
          }
          return step;
        }));
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  const completedSteps = onboardingSteps.filter(step => step.completed).length;
  const progress = (completedSteps / onboardingSteps.length) * 100;

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Check if user is new (joined less than 7 days ago)
  const isNewUser = () => {
    if (!profile?.created_at) return false;
    const joinDate = new Date(profile.created_at);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - joinDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-6">
        <div className="flex