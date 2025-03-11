import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

interface Document {
  id: string;
  title: string;
  date: string;
  status: "completed" | "processing" | "failed";
  type: string;
}

interface RecentDocumentsProps {
  documents?: Document[];
}

export default function RecentDocuments({
  documents = [],
}: RecentDocumentsProps) {
  // Sample documents if none provided
  const sampleDocuments: Document[] = [
    {
      id: "1",
      title: "Q3 Financial Report.pdf",
      date: "2023-10-15",
      status: "completed",
      type: "pdf",
    },
    {
      id: "2",
      title: "Market Analysis 2023.xlsx",
      date: "2023-10-14",
      status: "processing",
      type: "excel",
    },
    {
      id: "3",
      title: "Competitor Research.docx",
      date: "2023-10-12",
      status: "failed",
      type: "word",
    },
    {
      id: "4",
      title: "Annual Report 2022.pdf",
      date: "2023-10-10",
      status: "completed",
      type: "pdf",
    },
  ];

  const displayDocuments = documents.length > 0 ? documents : sampleDocuments;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "processing":
        return <Clock className="h-5 w-5 text-info animate-pulse" />;
      case "failed":
        return <AlertCircle className="h-5 w-5 text-danger" />;
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      case "processing":
        return <Badge variant="info">Processing</Badge>;
      case "failed":
        return <Badge variant="danger">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl gold-accent">
            Recent Documents
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Latest uploads and analyses
          </p>
        </div>
        <Link href="/dashboard/listings">
          <Button variant="link" className="text-primary">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {displayDocuments.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 rounded-md bg-[#252525] hover:bg-[#2A2A2A] transition-colors"
            >
              <div className="flex items-center space-x-3">
                {getStatusIcon(doc.status)}
                <div>
                  <p className="font-medium text-foreground">{doc.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(doc.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(doc.status)}
                {doc.status === "completed" && (
                  <Link href={`/dashboard/listings/${doc.id}`}>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
