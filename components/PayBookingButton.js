"use client";

import { useState } from "react";
import { payBooking } from "@/lib/actions/booking";

export function PayBookingButton({ bookingId }) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    await payBooking(bookingId);
    setLoading(false);
  };

  return (
    <button 
      onClick={handlePay} 
      disabled={loading}
      className="btn btn-primary"
      style={{ 
        padding: "0.5rem 1rem", 
        fontSize: "0.875rem",
        backgroundColor: "var(--secondary-color)",
        boxShadow: "0 4px 14px 0 rgba(16, 185, 129, 0.39)"
      }}
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
}

