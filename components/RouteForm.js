"use client";

import { useState } from "react";
import { addRoute } from "@/lib/actions/admin";

export function RouteForm() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [fare, setFare] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await addRoute({ 
      source, 
      destination, 
      fare: parseFloat(fare), 
      estimatedTime: parseInt(estimatedTime, 10) 
    });

    if (res.success) {
      setSource("");
      setDestination("");
      setFare("");
      setEstimatedTime("");
    } else {
      setError(res.error || "Failed to add route");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel" style={{ marginBottom: "2rem" }}>
      <h3 style={{ color: "var(--primary-color)" }}>Add New Route</h3>
      {error && <div style={{ color: "var(--error-color)", marginBottom: "1rem" }}>{error}</div>}
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label className="input-label">Source</label>
          <input required className="input-field" value={source} onChange={e => setSource(e.target.value)} />
        </div>
        <div>
          <label className="input-label">Destination</label>
          <input required className="input-field" value={destination} onChange={e => setDestination(e.target.value)} />
        </div>
        <div>
          <label className="input-label">Fare (₹)</label>
          <input required type="number" step="0.01" className="input-field" value={fare} onChange={e => setFare(e.target.value)} />
        </div>
        <div>
          <label className="input-label">Estimated Time (mins)</label>
          <input required type="number" className="input-field" value={estimatedTime} onChange={e => setEstimatedTime(e.target.value)} />
        </div>
      </div>
      <button type="submit" className="btn btn-primary" disabled={isLoading} style={{ marginTop: "1rem" }}>
        {isLoading ? "Adding..." : "Add Route"}
      </button>
    </form>
  );
}
