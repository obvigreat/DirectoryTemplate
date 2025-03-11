import DashboardWelcome from "@/components/dashboard/dashboard-welcome";
import RecentDocuments from "@/components/dashboard/recent-documents";
import DataVisualization from "@/components/dashboard/data-visualization";

export default function AcquiAtlasDashboard() {
  // Sample stats for demonstration
  const stats = {
    totalDocuments: 12,
    completed: 8,
    processing: 3,
    thisMonth: 5,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-background min-h-screen">
      <DashboardWelcome stats={stats} />

      <DataVisualization />

      <RecentDocuments />
    </div>
  );
}
