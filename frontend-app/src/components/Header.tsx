"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, logout, UserSession } from "@/lib/auth";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    setUser(getSession());
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
    router.refresh();
  };

  return (
    <header
      style={{
        borderBottom: "1px solid var(--border-color)",
        background: "rgba(3, 7, 18, 0.4)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              color: "#030712",
              fontSize: "1.1rem",
              boxShadow: "0 0 10px var(--primary-glow)",
            }}
          >
            A
          </div>
          <span
            style={{
              fontWeight: 800,
              fontSize: "1.3rem",
              letterSpacing: "0.05em",
            }}
            className="gradient-text"
          >
            APEX BANK
          </span>
        </div>

        {/* Navigation */}
        {user && (
          <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <span
              style={{
                fontSize: "0.85rem",
                background:
                  user.role === "admin"
                    ? "rgba(194, 156, 83, 0.15)"
                    : "rgba(59, 130, 246, 0.15)",
                border: `1px solid ${
                  user.role === "admin" ? "rgba(194, 156, 83, 0.3)" : "rgba(59, 130, 246, 0.3)"
                }`,
                color: user.role === "admin" ? "var(--primary)" : "var(--accent-blue)",
                padding: "4px 10px",
                borderRadius: "100px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {user.role} Dashboard
            </span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderLeft: "1px solid var(--border-color)",
                paddingLeft: "20px",
              }}
            >
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "#ffffff" }}>
                  {user.name}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--foreground-muted)" }}>
                  {user.email}
                </div>
              </div>

              {/* User Avatar */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background:
                    user.role === "admin"
                      ? "linear-gradient(135deg, rgba(194, 156, 83, 0.2), rgba(194, 156, 83, 0.05))"
                      : "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.05))",
                  border: `1px solid ${
                    user.role === "admin" ? "var(--primary)" : "var(--accent-blue)"
                  }`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: user.role === "admin" ? "var(--primary)" : "var(--accent-blue)",
                  fontSize: "0.95rem",
                }}
              >
                {user.name.charAt(0)}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="btn-secondary"
                style={{
                  padding: "6px 12px",
                  fontSize: "0.8rem",
                  borderColor: "var(--accent-red)",
                  color: "var(--accent-red)",
                  background: "transparent",
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
              >
                Sign Out
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
