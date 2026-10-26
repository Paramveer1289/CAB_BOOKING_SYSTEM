import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RouteForm } from "@/components/RouteForm";

export default async function AdminRoutesPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const routes = await db.route.findMany();

  return (
    <div className="container page-container animate-fade-in">
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ color: "var(--primary-color)" }}>Manage Routes</h1>
        <p style={{ color: "var(--text-secondary)" }}>Define source, destination, fare, and timing.</p>
      </div>

      <RouteForm />

      <div className="glass-panel">
        <h3 style={{ marginBottom: "1rem" }}>Route List</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--surface-border)" }}>
              <th style={{ padding: "1rem 0" }}>Source</th>
              <th style={{ padding: "1rem 0" }}>Destination</th>
              <th style={{ padding: "1rem 0" }}>Fare (₹)</th>
              <th style={{ padding: "1rem 0" }}>Est. Time (mins)</th>
            </tr>
          </thead>
          <tbody>
            {routes.map(route => (
              <tr key={route.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "1rem 0" }}>{route.source}</td>
                <td style={{ padding: "1rem 0" }}>{route.destination}</td>
                <td style={{ padding: "1rem 0", color: "var(--secondary-color)" }}>₹{route.fare.toFixed(2)}</td>
                <td style={{ padding: "1rem 0", color: "var(--text-secondary)" }}>{route.estimatedTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

