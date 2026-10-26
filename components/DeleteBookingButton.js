"use client";

import { useState } from "react";
import { deleteBooking } from "@/lib/actions/admin";

export function DeleteBookingButton({ id }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this completed booking?")) {
      setLoading(true);
      await deleteBooking(id);
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={loading}
      className="btn btn-secondary"
      style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", borderColor: "var(--error-color)", color: "var(--error-color)" }}
    >
      {loading ? "Deleting..." : "Delete Record"}
    </button>
  );
}

