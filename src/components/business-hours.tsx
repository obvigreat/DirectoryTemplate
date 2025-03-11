import { Clock } from "lucide-react";

interface BusinessHoursProps {
  hours: Array<{
    day: string;
    hours: string;
  }>;
}

export default function BusinessHours({ hours }: BusinessHoursProps) {
  // Get current day
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Business Hours</h2>
        <Clock className="w-5 h-5 text-blue-600" />
      </div>

      <div className="space-y-2">
        {hours.map((item, index) => {
          const isToday = today === item.day;

          return (
            <div
              key={index}
              className={`flex justify-between items-center py-1 ${isToday ? "bg-blue-50 px-2 -mx-2 rounded" : ""}`}
            >
              <span className={`font-medium ${isToday ? "text-blue-700" : ""}`}>
                {item.day} {isToday && "(Today)"}
              </span>
              <span
                className={`${isToday ? "text-blue-700" : "text-gray-600"}`}
              >
                {item.hours}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
