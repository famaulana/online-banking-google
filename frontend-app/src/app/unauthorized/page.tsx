"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, logout, UserSession } from "@/lib/auth";

export default function UnauthorizedPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    setUser(getSession());
  }, []);

  const handleReturn = () => {
    if (user) {
      router.push(user.role === "admin" ? "/admin/dashboard" : "/customer/dashboard");
    } else {
      router.push("/login");
    }
    router.refresh();
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
    router.refresh();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: "500px", width: "100%", textAlign: "center" }}>
        {/* Shield Icon */}
        <div style={{ marginBottom: "28px", display: "inline-block" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(239, 68, 68, 0.1)",
              border: "2px solid var(--accent-red)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px var(--accent-red-glow)",
              margin: "0 auto",
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent-red)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
        </div>

        <h1 style={{ fontSize: "2rem", marginBottom: "12px", color: "var(--accent-red)" }}>
          ACCESS RESTRICTED
        </h1>
        <p style={{ fontSize: "1rem", marginBottom: "32px" }}>
          You do not possess the required clearance level to access this secure zone.
        </p>

        <div
          className="glass-panel"
          style={{
            padding: "24px",
            marginBottom: "32px",
            textAlign: "left",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            background: "rgba(239, 68, 68, 0.02)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
              borderBottom: "1px solid var(--border-color)",
              paddingBottom: "12px",
            }}
          >
            <span style={{ color: "var(--foreground-muted)", fontSize: "0.9rem" }}>
              Identified User:
            </span>
            <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>{user?.name || "Anonymous"}</span>
          </div>
          <div style={{ display: "flex", justifySelf: "space-between", justifyContent: "space-between" }}>
            <span style={{ color: "var(--foreground-muted)", fontSize: "0.9rem" }}>
              Active Security Role:
            </span>
            <span
              style={{
                background:
                  user?.role === "admin"
                    ? "rgba(194, 156, 83, 0.2)"
                    : "rgba(59, 130, 246, 0.2)",
                color: user?.role === "admin" ? "var(--primary)" : "var(--accent-blue)",
                padding: "2px 8px",
                borderRadius: "4px",
                fontSize: "0.8rem",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              {user?.role || "none"}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <button onClick={handleReturn} className="btn-primary" style={{ flex: 1 }}>
            Return to Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="btn-secondary"
            style={{
              flex: 1,
              borderColor: "rgba(255, 255, 255, 0.1)",
              background: "transparent",
            }}
          >
            Switch Account
          </button>
        </div>
      </div>
    </div>
  );
}
