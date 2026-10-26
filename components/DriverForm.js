"use client";

import { useState } from "react";
import { addDriver } from "@/lib/actions/admin";

export function DriverForm() {
  const [name, setName] = useState("");
  const [license, setLicense] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await addDriver({ name, license, phone });
    if (res.success) {
      setName("");
      setLicense("");
      setPhone("");
    } else {
      setError(res.error || "Failed to add driver");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel" style={{ marginBottom: "2rem" }}>
      <h3 style={{ color: "var(--primary-color)" }}>Add New Driver</h3>
      {error && <div style={{ color: "var(--error-color)", marginBottom: "1rem" }}>{error}</div>}
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label className="input-label">Name</label>
          <input required className="input-field" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label className="input-label">License Number</label>
          <input required className="input-field" value={license} onChange={e => setLicense(e.target.value)} />
        </div>
        <div>
          <label className="input-label">Phone</label>
          <input required className="input-field" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
      </div>
      <button type="submit" className="btn btn-primary" disabled={isLoading} style={{ marginTop: "1rem" }}>
        {isLoading ? "Adding..." : "Add Driver"}
      </button>
    </form>
  );
}

