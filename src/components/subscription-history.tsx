"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Receipt } from "lucide-react";

interface SubscriptionHistoryProps {
  invoices?: any[];
}

export default function SubscriptionHistory({
  invoices = [],
}: SubscriptionHistoryProps) {
  const [loading, setLoading] = useState(false);

  // If no invoices are provided, use mock data
  const displayInvoices =
    invoices.length > 0
      ? invoices
      : [
          {
            id: "inv_123456",
            status: "paid",
            amount: 29.0,
            currency: "usd",
            created: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).getTime(), // 30 days ago
            period_start: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 30,
            ).getTime(),
            period_end: new Date(Date.now()).getTime(),
          },
          {
            id: "inv_123455",
            status: "paid",
            amount: 29.0,
            currency: "usd",
            created: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).getTime(), // 60 days ago
            period_start: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 60,
            ).getTime(),
            period_end: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 30,
            ).getTime(),
          },
          {
            id: "inv_123454",
            status: "paid",
            amount: 29.0,
            currency: "usd",
            created: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).getTime(), // 90 days ago
            period_start: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 90,
            ).getTime(),
            period_end: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 60,
            ).getTime(),
          },
        ];

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDownloadInvoice = async (invoiceId: string) => {
    setLoading(true);
    try {
      // In a real app, this would call an API endpoint to get the invoice PDF
      console.log(`Downloading invoice ${invoiceId}`);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Show success message or open PDF
    } catch (error) {
      console.error("Error downloading invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Receipt className="mr-2 h-5 w-5" /> Billing History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {displayInvoices.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No billing history available
          </div>
        ) : (
          <div className="space-y-4">
            {displayInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50"
              >
                <div>
                  <div className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4 text-gray-500" />
                    <span className="font-medium">Premium Plan</span>
                    <Badge className={`ml-2 ${getStatusColor(invoice.status)}`}>
                      {invoice.status.charAt(0).toUpperCase() +
                        invoice.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {formatDate(invoice.period_start)} -{" "}
                    {formatDate(invoice.period_end)}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 text-right">
                    <div className="font-medium">
                      {formatCurrency(invoice.amount, invoice.currency)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(invoice.created)}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadInvoice(invoice.id)}
                    disabled={loading}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
