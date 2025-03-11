import StatusSelect from "@/components/status-select";

export default function StatusSelectDemo() {
  // Common status options for demonstration
  const statusOptions = [
    { value: "", label: "Select status" },
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "inactive", label: "Inactive" },
    { value: "archived", label: "Archived" },
  ];

  // Booking status options
  const bookingStatusOptions = [
    { value: "", label: "Select status" },
    { value: "confirmed", label: "Confirmed" },
    { value: "pending", label: "Pending" },
    { value: "cancelled", label: "Cancelled" },
    { value: "completed", label: "Completed" },
  ];

  // Report status options
  const reportStatusOptions = [
    { value: "", label: "Select status" },
    { value: "pending", label: "Pending" },
    { value: "investigating", label: "Investigating" },
    { value: "resolved", label: "Resolved" },
    { value: "dismissed", label: "Dismissed" },
  ];

  return (
    <div className="p-6 space-y-8 max-w-md mx-auto bg-white rounded-lg shadow">
      <div>
        <h2 className="text-lg font-medium mb-2">General Status Select</h2>
        <StatusSelect
          name="status"
          options={statusOptions}
          defaultValue="active"
        />
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">Booking Status</h2>
        <StatusSelect
          name="bookingStatus"
          options={bookingStatusOptions}
          defaultValue="pending"
        />
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">Report Status</h2>
        <StatusSelect
          name="reportStatus"
          options={reportStatusOptions}
          defaultValue="pending"
          required
        />
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">Custom Styled Status</h2>
        <StatusSelect
          name="customStatus"
          options={statusOptions}
          defaultValue="inactive"
          className="bg-gray-50 border-blue-300 text-blue-800 font-medium"
        />
      </div>
    </div>
  );
}
