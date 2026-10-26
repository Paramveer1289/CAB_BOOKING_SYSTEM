import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AssignDriverForm } from "@/components/AssignDriverForm";
import { DeleteBookingButton } from "@/components/DeleteBookingButton";

export default async function AdminBookingsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const bookings = await db.booking.findMany();

  const availableDrivers = await db.driver.findMany({
    where: { availability: true }
  });

  const pendingBookings = bookings.filter(b => b.status === "PENDING");
  const otherBookings = bookings.filter(b => b.status !== "PENDING");

  return (
    <div className="container page-container animate-fade-in">
      <div style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 700, background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Booking Management
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>Assign drivers and monitor trip status</p>
        </div>
        <Link href="/admin" className="btn btn-secondary">Back to Dashboard</Link>
      </div>

      {pendingBookings.length > 0 && (
        <section style={{ marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ display: "inline-block", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#FBBF24" }}></span>
            Needs Assignment ({pendingBookings.length})
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {pendingBookings.map(booking => (
              <div key={booking.id} className="glass-panel" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderLeft: "4px solid #FBBF24" }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{booking.route?.source} → {booking.route?.destination}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                    Customer: <span style={{ color: "var(--text-primary)" }}>{booking.customer?.name}</span> • Fare: <span style={{ color: "var(--secondary-color)", fontWeight: 600 }}>₹{booking.finalFare?.toFixed(2)}</span>
                  </p>
                </div>
                <div>
                  <AssignDriverForm bookingId={booking.id} availableDrivers={availableDrivers} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>All Activities</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {otherBookings.length === 0 && pendingBookings.length === 0 ? (
            <div className="glass-panel" style={{ textAlign: "center", padding: "4rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📅</div>
              <p style={{ color: "var(--text-secondary)" }}>No booking records found in the system.</p>
            </div>
          ) : (
            otherBookings.map(booking => (
              <div key={booking.id} className="glass-panel" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                    <h3 style={{ margin: 0, fontSize: "1.25rem" }}>{booking.route?.source} → {booking.route?.destination}</h3>
                    <span style={{ 
                      padding: "0.25rem 0.75rem", 
                      borderRadius: "999px", 
                      fontSize: "0.75rem", 
                      fontWeight: 700,
                      textTransform: "uppercase",
                      backgroundColor: booking.status === "CONFIRMED" ? "rgba(59, 130, 246, 0.1)" : "rgba(16, 185, 129, 0.1)",
                      color: booking.status === "CONFIRMED" ? "#60A5FA" : "#34D399"
                    }}>
                      {booking.status}
                    </span>
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
                    <strong>Customer:</strong> {booking.customer?.name} • <strong>Fare:</strong> ₹{booking.finalFare?.toFixed(2)}
                  </p>
                  {booking.driver && (
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                      <strong>Driver:</strong> {booking.driver.name} ({booking.driver.license})
                    </p>
                  )}
                </div>
                
                {booking.status === "COMPLETED" && (
                  <DeleteBookingButton id={booking.id} />
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
