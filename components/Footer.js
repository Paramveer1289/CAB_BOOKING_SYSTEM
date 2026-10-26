import Link from "next/link";

export function Footer() {
  return (
    <footer style={{ 
      padding: "4rem 0 2rem 0", 
      borderTop: "1px solid var(--surface-border)", 
      backgroundColor: "rgba(2, 6, 23, 0.8)", 
      backdropFilter: "var(--glass-backdrop)",
      marginTop: "auto"
    }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", marginBottom: "3rem" }}>
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", marginBottom: "1.5rem" }}>
              <img src="/logo.png" alt="Logo" style={{ width: "32px", height: "32px", borderRadius: "6px" }} />
              <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "white", letterSpacing: "-0.04em" }}>
                Cab<span style={{ color: "var(--primary-color)" }}>X</span>
              </span>
            </Link>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, fontSize: "0.9375rem" }}>
              Experience the future of urban mobility. Premium rides, professional drivers, and automated rewards.
            </p>
          </div>

          <div>
            <h4 style={{ color: "white", marginBottom: "1.5rem", fontSize: "1.1rem" }}>Company</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li><Link href="#" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9375rem" }}>About Us</Link></li>
              <li><Link href="#" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9375rem" }}>Our Fleet</Link></li>
              <li><Link href="#" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9375rem" }}>Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: "white", marginBottom: "1.5rem", fontSize: "1.1rem" }}>Support</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li><Link href="#" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9375rem" }}>Help Center</Link></li>
              <li><Link href="#" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9375rem" }}>Safety</Link></li>
              <li><Link href="#" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9375rem" }}>Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: "white", marginBottom: "1.5rem", fontSize: "1.1rem" }}>Connect With Us</h4>
            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="#" className="flex-center" style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.05)", color: "white", textDecoration: "none", fontSize: "1.25rem", transition: "var(--transition)" }}>
                𝕏
              </a>
              <a href="#" className="flex-center" style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.05)", color: "white", textDecoration: "none", fontSize: "1.25rem", transition: "var(--transition)" }}>
                f
              </a>
              <a href="#" className="flex-center" style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.05)", color: "white", textDecoration: "none", fontSize: "1.25rem", transition: "var(--transition)" }}>
                📸
              </a>
              <a href="#" className="flex-center" style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.05)", color: "white", textDecoration: "none", fontSize: "1.25rem", transition: "var(--transition)" }}>
                in
              </a>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: "2rem", borderTop: "1px solid var(--surface-border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            © {new Date().getFullYear()} CabX Technologies Inc. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "2rem" }}>
            <Link href="#" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.875rem" }}>Privacy Policy</Link>
            <Link href="#" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.875rem" }}>Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

