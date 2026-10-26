import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminCustomersPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  // Get users who are customers, along with their booking counts
  const customers = await db.user.findMany({
    where: { role: "CUSTOMER" }
  });

  return (
    <div className="container page-container animate-fade-in">
      <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ color: "var(--primary-color)" }}>Customer Activity</h1>
          <p style={{ color: "var(--text-secondary)" }}>Monitor customer registrations and ride counts.</p>
        </div>
        <Link href="/admin" className="btn btn-secondary">Back to Dashboard</Link>
      </div>

      <div className="glass-panel" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "600px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--surface-border)" }}>
              <th style={{ padding: "1rem 0" }}>Name</th>
              <th style={{ padding: "1rem 0" }}>Email</th>
              <th style={{ padding: "1rem 0" }}>Joined Date</th>
              <th style={{ padding: "1rem 0", textAlign: "center" }}>Total Bookings</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "1rem 0" }}>{customer.name}</td>
                <td style={{ padding: "1rem 0", color: "var(--text-secondary)" }}>{customer.email}</td>
                <td style={{ padding: "1rem 0", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                  {new Date(customer.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: "1rem 0", textAlign: "center" }}>
                  <span style={{ 
                    backgroundColor: "rgba(79, 70, 229, 0.1)", 
                    color: "var(--primary-color)",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "999px",
                    fontWeight: 600
                  }}>
                    {customer._count.bookings}
                  </span>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: "2rem 0", textAlign: "center", color: "var(--text-secondary)" }}>
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

