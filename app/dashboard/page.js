import { db } from "@/lib/db";
import { BookingCard } from "@/components/BookingCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { calculateDiscountedFare } from "@/lib/actions/booking";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }

  const routes = await db.route.findMany();

  const { discountPercentage } = await calculateDiscountedFare(session.user.id, 0);

  const activeBookingCount = await db.booking.count({
    where: {
      customerId: session.user.id,
      status: "PENDING" // Simple match for now
    }
  });

  return (
    <div className="container page-container animate-fade-in">
      <div style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 700, background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Book Your Ride
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>Premium travel, just a few clicks away.</p>
        </div>
        <div className="glass-panel" style={{ padding: "0.75rem 1.5rem", borderRadius: "12px", border: "1px dashed var(--secondary-color)" }}>
          <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Your Current Discount:</span>
          <span style={{ marginLeft: "0.5rem", fontWeight: 700, color: "var(--secondary-color)" }}>{(discountPercentage * 100).toFixed(0)}%</span>
        </div>
      </div>

      {activeBookingCount > 0 && (
        <div className="glass-panel" style={{ marginBottom: "2.5rem", border: "1px solid var(--primary-color)", background: "rgba(139, 92, 246, 0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
          <div style={{ flex: 1, minWidth: "300px" }}>
            <h3 style={{ margin: 0, color: "var(--primary-color)", fontSize: "1.25rem" }}>Active Ride in Progress</h3>
            <p style={{ color: "var(--text-secondary)", margin: "0.5rem 0 0 0" }}>You currently have an active booking. For safety and reliability, we only allow one active booking at a time. Please complete your current ride to book again.</p>
          </div>
          <Link href="/dashboard/history" className="btn btn-primary">Track & Pay Ride</Link>
        </div>
      )}

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
        gap: "1.5rem",
        opacity: activeBookingCount > 0 ? 0.4 : 1,
        pointerEvents: activeBookingCount > 0 ? "none" : "auto",
        filter: activeBookingCount > 0 ? "grayscale(0.5)" : "none"
      }}>
        {routes.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: "center", padding: "4rem", gridColumn: "1 / -1" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>🗺️</div>
            <h3 style={{ color: "var(--text-secondary)", fontSize: "1.25rem" }}>No routes available in your area yet.</h3>
          </div>
        ) : (
          routes.map((route) => (
            <BookingCard 
              key={route.id} 
              route={route} 
              discountPercentage={discountPercentage} 
            />
          ))
        )}
      </div>
    </div>
  );
}
