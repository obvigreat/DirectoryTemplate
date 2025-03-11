import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function DataVisualization() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Analysis Activity</CardTitle>
            <Info className="h-4 w-4 text-info hover:text-info/80 cursor-pointer" />
          </div>
          <p className="text-sm text-muted-foreground">
            Document processing over time
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center bg-[#1E1E1E] rounded-md">
            {/* This would be replaced with an actual chart component */}
            <div className="text-center">
              <p className="text-muted-foreground">Line chart visualization</p>
              <p className="text-xs text-muted-foreground mt-1">
                (Chart library would be implemented here)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Document Types</CardTitle>
            <Info className="h-4 w-4 text-info hover:text-info/80 cursor-pointer" />
          </div>
          <p className="text-sm text-muted-foreground">
            Distribution by category
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center bg-[#1E1E1E] rounded-md">
            {/* This would be replaced with an actual chart component */}
            <div className="text-center">
              <p className="text-muted-foreground">Donut chart visualization</p>
              <p className="text-xs text-muted-foreground mt-1">
                (Chart library would be implemented here)
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-info mr-2"></div>
              <span className="text-xs text-muted-foreground">
                Balance Sheets
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple mr-2"></div>
              <span className="text-xs text-muted-foreground">Cash Flow</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-success mr-2"></div>
              <span className="text-xs text-muted-foreground">
                Income Statements
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
              <span className="text-xs text-muted-foreground">Other</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
