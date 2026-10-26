import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PayBookingButton } from "@/components/PayBookingButton";

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const bookings = await db.booking.findMany({
    where: { customerId: session.user.id }
  });

  return (
    <div className="container page-container animate-fade-in">
      <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ color: "var(--primary-color)" }}>My Bookings</h1>
          <p style={{ color: "var(--text-secondary)" }}>Your ride history and upcoming trips.</p>
        </div>
        <Link href="/dashboard" className="btn btn-secondary">
          Book New Cab
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {bookings.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: "center", padding: "3rem" }}>
            <h3 style={{ color: "var(--text-secondary)" }}>You haven't booked any cabs yet.</h3>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="glass-panel" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{ 
                  backgroundColor: booking.status === 'PENDING' ? 'rgba(234, 179, 8, 0.1)' :
                                    booking.status === 'CONFIRMED' ? 'rgba(59, 130, 246, 0.1)' : 
                                    booking.status === 'COMPLETED' ? 'rgba(16, 185, 129, 0.1)' : 
                                    'rgba(239, 68, 68, 0.1)',
                  color: booking.status === 'PENDING' ? '#FBBF24' :
                         booking.status === 'CONFIRMED' ? '#60A5FA' : 
                         booking.status === 'COMPLETED' ? 'var(--secondary-color)' : 
                         'var(--error-color)',
                  padding: "0.25rem 0.75rem", 
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  fontWeight: 600
                }}>
                  {booking.status}
                </span>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                  {new Date(booking.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <h4 style={{ margin: "0 0 0.25rem 0" }}>Route</h4>
                  <p style={{ color: "var(--text-secondary)", margin: 0 }}>
                    {booking.route?.source} → {booking.route?.destination}
                  </p>
                </div>
                <div>
                  <h4 style={{ margin: "0 0 0.25rem 0" }}>Fare Paid</h4>
                  <p style={{ color: "var(--text-secondary)", margin: 0 }}>
                    ₹{booking.finalFare?.toFixed(2)}
                  </p>
                  {booking.route && booking.finalFare < booking.route.fare && (
                    <p style={{ fontSize: "0.75rem", color: "var(--primary-color)", margin: 0 }}>Discount Applied</p>
                  )}
                </div>
                <div>
                  <h4 style={{ margin: "0 0 0.25rem 0" }}>Driver</h4>
                  <p style={{ color: "var(--text-secondary)", margin: 0 }}>
                    {booking.driver ? booking.driver.name : "Waiting for assignment"} 
                    {booking.driver && <span style={{ fontSize: "0.875rem", display: "block" }}>{booking.driver.phone}</span>}
                  </p>
                </div>
                <div>
                  <h4 style={{ margin: "0 0 0.25rem 0" }}>Booking ID</h4>
                  <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "0.875rem", fontFamily: "monospace" }}>
                    {booking.id}
                  </p>
                </div>
              </div>
              
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {booking.status === "CONFIRMED" && (
                  <PayBookingButton bookingId={booking.id} />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
