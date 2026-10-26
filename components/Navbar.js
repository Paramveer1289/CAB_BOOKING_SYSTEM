"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav style={{ 
      padding: "1.25rem 0", 
      borderBottom: "1px solid var(--surface-border)", 
      backgroundColor: "rgba(2, 6, 23, 0.7)", 
      backdropFilter: "var(--glass-backdrop)", 
      position: "sticky", 
      top: 0, 
      zIndex: 50 
    }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
          <img src="/logo.png" alt="Logo" style={{ width: "40px", height: "40px", borderRadius: "8px" }} />
          <span style={{ fontSize: "1.75rem", fontWeight: 800, color: "white", letterSpacing: "-0.04em" }}>
            Cab<span style={{ color: "var(--primary-color)" }}>X</span>
          </span>
        </Link>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {session ? (
            <>
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                {session.user.role === "ADMIN" ? (
                  <>
                    <Link href="/admin" style={{ color: "var(--text-secondary)", fontWeight: 500, fontSize: "0.9375rem" }}>Dashboard</Link>
                    <Link href="/admin/drivers" style={{ color: "var(--text-secondary)", fontWeight: 500, fontSize: "0.9375rem" }}>Drivers</Link>
                    <Link href="/admin/routes" style={{ color: "var(--text-secondary)", fontWeight: 500, fontSize: "0.9375rem" }}>Routes</Link>
                    <Link href="/admin/bookings" style={{ color: "var(--text-secondary)", fontWeight: 500, fontSize: "0.9375rem" }}>Bookings</Link>
                    <Link href="/admin/customers" style={{ color: "var(--text-secondary)", fontWeight: 500, fontSize: "0.9375rem" }}>Customers</Link>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard" style={{ color: "var(--text-secondary)", fontWeight: 500, fontSize: "0.9375rem" }}>Find Rides</Link>
                    <Link href="/dashboard/history" style={{ color: "var(--text-secondary)", fontWeight: 500, fontSize: "0.9375rem" }}>My Activity</Link>
                  </>
                )}
              </div>
              <div style={{ width: "1px", height: "24px", backgroundColor: "var(--surface-border)" }}></div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: "0.875rem" }}>
                  {session.user.name}
                </div>
                <button onClick={() => signOut({ callbackUrl: '/' })} className="btn btn-secondary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}>
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link href="/login" className="btn btn-secondary" style={{ padding: "0.5rem 1.5rem", fontSize: "0.875rem" }}>Login</Link>
              <Link href="/register" className="btn btn-primary" style={{ padding: "0.5rem 1.5rem", fontSize: "0.875rem" }}>Join Now</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

