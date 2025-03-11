import { Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SubscriptionBenefitsProps {
  showBusinessTier?: boolean;
}

export default function SubscriptionBenefits({
  showBusinessTier = false,
}: SubscriptionBenefitsProps) {
  const features = [
    {
      name: "Number of listings",
      free: "3",
      premium: "Unlimited",
      business: "Unlimited",
    },
    {
      name: "Featured listings",
      free: false,
      premium: "2 per month",
      business: "5 per month",
    },
    {
      name: "Priority in search results",
      free: false,
      premium: true,
      business: true,
    },
    {
      name: "Analytics dashboard",
      free: "Basic",
      premium: "Advanced",
      business: "Advanced",
    },
    {
      name: "Customer support",
      free: "Email only",
      premium: "Priority email",
      business: "Dedicated manager",
    },
    { name: "API access", free: false, premium: false, business: true },
    { name: "Custom branding", free: false, premium: false, business: true },
    { name: "Team members", free: "1", premium: "3", business: "10" },
    { name: "Message inbox", free: true, premium: true, business: true },
    { name: "Booking management", free: true, premium: true, business: true },
    { name: "Review management", free: true, premium: true, business: true },
    {
      name: "Custom integrations",
      free: false,
      premium: false,
      business: true,
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-4 border-b">Features</th>
            <th className="text-center p-4 border-b w-1/4">
              <div className="font-bold text-lg">Free</div>
              <div className="text-sm text-muted-foreground">$0/month</div>
            </th>
            <th className="text-center p-4 border-b w-1/4 bg-blue-50">
              <div className="font-bold text-lg text-blue-700">Premium</div>
              <div className="text-sm text-blue-600">$29/month</div>
            </th>
            {showBusinessTier && (
              <th className="text-center p-4 border-b w-1/4 bg-purple-50">
                <div className="font-bold text-lg text-purple-700">
                  Business
                </div>
                <div className="text-sm text-purple-600">$99/month</div>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="p-4 border-b">{feature.name}</td>
              <td className="text-center p-4 border-b">
                {typeof feature.free === "boolean" ? (
                  feature.free ? (
                    <Check className="mx-auto h-5 w-5 text-green-500" />
                  ) : (
                    <X className="mx-auto h-5 w-5 text-gray-300" />
                  )
                ) : (
                  <span>{feature.free}</span>
                )}
              </td>
              <td className="text-center p-4 border-b bg-blue-50">
                {typeof feature.premium === "boolean" ? (
                  feature.premium ? (
                    <Check className="mx-auto h-5 w-5 text-green-500" />
                  ) : (
                    <X className="mx-auto h-5 w-5 text-gray-300" />
                  )
                ) : (
                  <span>{feature.premium}</span>
                )}
              </td>
              {showBusinessTier && (
                <td className="text-center p-4 border-b bg-purple-50">
                  {typeof feature.business === "boolean" ? (
                    feature.business ? (
                      <Check className="mx-auto h-5 w-5 text-green-500" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-gray-300" />
                    )
                  ) : (
                    <span>{feature.business}</span>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
