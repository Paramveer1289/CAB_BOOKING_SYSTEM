import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="page-container animate-fade-in" style={{ padding: "0 2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <section style={{ maxWidth: "800px", textAlign: "center", marginTop: "4rem", marginBottom: "6rem" }}>
        <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)", fontWeight: 800, marginBottom: "1.5rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          Your Next Journey <br />
          Starts with <span style={{ background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CabX</span>
        </h1>
        <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)", marginBottom: "3rem", maxWidth: "600px", margin: "0 auto 3rem" }}>
          Seamless booking, premium drivers, and automatic loyalty rewards. Experience the future of urban mobility today.
        </p>

        <div style={{ display: "flex", gap: "1.25rem", justifyContent: "center" }}>
          {session ? (
            session.user.role === "ADMIN" ? (
              <Link href="/admin" className="btn btn-primary">
                Admin Dashboard
              </Link>
            ) : (
              <Link href="/dashboard" className="btn btn-primary">
                Book a Ride Now
              </Link>
            )
          ) : (
            <>
              <Link href="/register" className="btn btn-primary">
                Get Started
              </Link>
              <Link href="/login" className="btn btn-secondary">
                Sign In
              </Link>
            </>
          )}
        </div>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", width: "100%", maxWidth: "1100px" }}>
        <div className="glass-panel">
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚡</div>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Swift Booking</h3>
          <p style={{ color: "var(--text-secondary)" }}>One-click booking system designed for speed and reliability.</p>
        </div>
        <div className="glass-panel">
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>💎</div>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Loyalty System</h3>
          <p style={{ color: "var(--text-secondary)" }}>Earn automatic discounts complete more rides with our system.</p>
        </div>
        <div className="glass-panel">
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🛡️</div>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Secure Rides</h3>
          <p style={{ color: "var(--text-secondary)" }}>Vetted drivers and real-time tracking for your peace of mind.</p>
        </div>
      </div>
    </div>
  );
}

