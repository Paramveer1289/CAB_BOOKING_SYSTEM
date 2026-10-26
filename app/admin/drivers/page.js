import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DriverForm } from "@/components/DriverForm";
import Link from "next/link";

export default async function AdminDriversPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const drivers = await db.driver.findMany();

  return (
    <div className="container page-container animate-fade-in">
      <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ color: "var(--primary-color)" }}>Manage Drivers</h1>
          <p style={{ color: "var(--text-secondary)" }}>Add and view driver details.</p>
        </div>
        <Link href="/admin" className="btn btn-secondary">Back to Dashboard</Link>
      </div>

      <DriverForm />

      <div className="glass-panel">
        <h3 style={{ marginBottom: "1rem" }}>Driver List</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--surface-border)" }}>
              <th style={{ padding: "1rem 0" }}>Name</th>
              <th style={{ padding: "1rem 0" }}>License</th>
              <th style={{ padding: "1rem 0" }}>Phone</th>
              <th style={{ padding: "1rem 0" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map(driver => (
              <tr key={driver.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "1rem 0" }}>{driver.name}</td>
                <td style={{ padding: "1rem 0", color: "var(--text-secondary)" }}>{driver.license}</td>
                <td style={{ padding: "1rem 0", color: "var(--text-secondary)" }}>{driver.phone}</td>
                <td style={{ padding: "1rem 0" }}>
                  <span style={{ 
                    color: driver.availability ? "var(--secondary-color)" : "var(--error-color)",
                    backgroundColor: driver.availability ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.875rem"
                  }}>
                    {driver.availability ? "Available" : "On Trip"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
