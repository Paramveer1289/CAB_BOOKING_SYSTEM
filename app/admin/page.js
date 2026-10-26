import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const [driversCount, routesCount, bookingsCount] = await Promise.all([
    db.driver.count(),
    db.route.count(),
    db.booking.count(),
  ]);

  return (
    <div className="container page-container animate-fade-in">
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Admin Control Center
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>Overview of system performance and management</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
        <div className="glass-panel" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <div style={{ fontSize: "2.5rem", color: "var(--primary-color)" }}>🚖</div>
          <h2 style={{ fontSize: "2rem", margin: 0 }}>{driversCount}</h2>
          <p style={{ color: "var(--text-secondary)", fontWeight: 500 }}>Total Fleet</p>
          <Link href="/admin/drivers" className="btn btn-secondary" style={{ width: "100%", marginTop: "1rem" }}>Manage Drivers</Link>
        </div>

        <div className="glass-panel" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <div style={{ fontSize: "2.5rem", color: "var(--secondary-color)" }}>📍</div>
          <h2 style={{ fontSize: "2rem", margin: 0 }}>{routesCount}</h2>
          <p style={{ color: "var(--text-secondary)", fontWeight: 500 }}>Mapped Routes</p>
          <Link href="/admin/routes" className="btn btn-secondary" style={{ width: "100%", marginTop: "1rem" }}>Manage Routes</Link>
        </div>

        <div className="glass-panel" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <div style={{ fontSize: "2.5rem", color: "var(--accent-color)" }}>📝</div>
          <h2 style={{ fontSize: "2rem", margin: 0 }}>{bookingsCount}</h2>
          <p style={{ color: "var(--text-secondary)", fontWeight: 500 }}>Active Bookings</p>
          <Link href="/admin/bookings" className="btn btn-secondary" style={{ width: "100%", marginTop: "1rem" }}>View All</Link>
        </div>

        <div className="glass-panel" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <div style={{ fontSize: "2.5rem", color: "#FBBF24" }}>👥</div>
          <h2 style={{ fontSize: "2rem", margin: 0 }}>User Base</h2>
          <p style={{ color: "var(--text-secondary)", fontWeight: 500 }}>Customer Engagement</p>
          <Link href="/admin/customers" className="btn btn-secondary" style={{ width: "100%", marginTop: "1rem" }}>Monitor Activity</Link>
        </div>
      </div>
    </div>
  );
}

