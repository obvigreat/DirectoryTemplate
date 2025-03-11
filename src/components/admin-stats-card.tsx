import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface AdminStatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  trend?: number;
  trendLabel?: string;
  footer?: string;
}

export default function AdminStatsCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-blue-600",
  iconBgColor = "bg-blue-100",
  trend,
  trendLabel,
  footer,
}: AdminStatsCardProps) {
  const isTrendPositive = trend !== undefined && trend >= 0;
  const trendColorClass = isTrendPositive ? "text-green-600" : "text-red-600";

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {trend !== undefined && (
              <div className="flex items-center mt-1">
                <span
                  className={`text-xs ${trendColorClass} flex items-center`}
                >
                  {isTrendPositive ? "↑" : "↓"} {Math.abs(trend)}%
                  {trendLabel && ` ${trendLabel}`}
                </span>
              </div>
            )}
          </div>
          <div className={`p-2 rounded-full ${iconBgColor}`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
        </div>
        {footer && (
          <div className="mt-4">
            <p className="text-xs text-gray-500">{footer}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
