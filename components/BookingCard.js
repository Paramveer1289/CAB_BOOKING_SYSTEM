"use client";

import { useState } from "react";
import { createBooking } from "@/lib/actions/booking";
import { useRouter } from "next/navigation";

export function BookingCard({ route, discountPercentage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const discountedFare = route.fare - (route.fare * discountPercentage);

  const handleBook = async () => {
    setIsLoading(true);
    setError("");
    const res = await createBooking(route.id);
    if (res.success) {
      router.push("/dashboard/history");
    } else {
      setError(res.error || "Failed to book cab");
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ padding: "0.5rem 1rem", backgroundColor: "rgba(139, 92, 246, 0.1)", color: "var(--primary-color)", borderRadius: "8px", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Express Route
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
          <span>⏱️</span> {route.estimatedTime} mins
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          {route.source} <span style={{ color: "var(--text-secondary)", fontSize: "1rem", margin: "0 0.5rem" }}>→</span> {route.destination}
        </h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Direct non-stop service</p>
      </div>
      
      <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Estimated Fare</p>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            {discountPercentage > 0 ? (
              <>
                <span style={{ color: "var(--secondary-color)" }}>
                  ₹{discountedFare.toFixed(2)}
                </span>
                <span style={{ textDecoration: "line-through", color: "var(--text-secondary)", fontSize: "1rem", fontWeight: 400 }}>
                  ₹{route.fare.toFixed(2)}
                </span>
              </>
            ) : (
              <span>₹{route.fare.toFixed(2)}</span>
            )}
          </div>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" }}>
          <button 
            onClick={handleBook} 
            disabled={isLoading}
            className="btn btn-primary"
            style={{ padding: "0.75rem 2rem" }}
          >
            {isLoading ? "Processing..." : "Book Now"}
          </button>
        </div>
      </div>
      
      {error && (
        <div style={{ color: "var(--error-color)", fontSize: "0.875rem", textAlign: "center", marginTop: "0.5rem" }}>
          {error}
        </div>
      )}
    </div>
  );
}
