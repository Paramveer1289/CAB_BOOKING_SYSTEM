"use client";

import { useState } from "react";
import { assignDriver } from "@/lib/actions/admin";

export function AssignDriverForm({ bookingId, availableDrivers }) {
  const [selectedDriver, setSelectedDriver] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAssign = async () => {
    if (!selectedDriver) return;
    setLoading(true);
    setError(null);
    
    const result = await assignDriver(bookingId, selectedDriver);
    if (!result.success) {
      setError(result.error);
    }
    setLoading(false);
  };

  if (availableDrivers.length === 0) {
    return <span style={{ color: "var(--error-color)", fontSize: "0.875rem" }}>No drivers available</span>;
  }

  return (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", width: "100%", maxWidth: "400px", position: "relative" }}>
      <div style={{ flex: 1 }}>
        <select 
          value={selectedDriver} 
          onChange={(e) => setSelectedDriver(e.target.value)}
          className="input-field"
          style={{ marginBottom: 0, padding: "0.75rem 1rem", fontSize: "0.875rem", height: "auto" }}
        >
          <option value="" disabled>Select an Available Driver</option>
          {availableDrivers.map(d => (
            <option key={d.id} value={d.id}>{d.name} ({d.license})</option>
          ))}
        </select>
      </div>
      <button 
        onClick={handleAssign} 
        disabled={!selectedDriver || loading}
        className="btn btn-primary"
        style={{ padding: "0.75rem 1.5rem", fontSize: "0.875rem", whiteSpace: "nowrap" }}
      >
        {loading ? "Assigning..." : "Assign Driver"}
      </button>
      {error && <div style={{ color: "var(--error-color)", fontSize: "0.75rem", position: "absolute", bottom: "-1.25rem" }}>{error}</div>}
    </div>
  );
}
