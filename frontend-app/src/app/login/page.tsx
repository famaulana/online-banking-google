"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, MOCK_USERS } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"admin" | "customer">("customer");
  const [username, setUsername] = useState(MOCK_USERS.customer.username);
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRoleSelect = (selectedRole: "admin" | "customer") => {
    setRole(selectedRole);
    setUsername(
      selectedRole === "admin"
        ? MOCK_USERS.admin.username
        : MOCK_USERS.customer.username
    );
    setPassword("••••••••");
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate authenticating against a secure endpoint
    setTimeout(() => {
      try {
        if (role === "admin") {
          // Mock login validation
          if (username === MOCK_USERS.admin.username) {
            login(MOCK_USERS.admin);
            router.push("/admin/dashboard");
            router.refresh();
          } else {
            setError("Invalid administrator credentials");
          }
        } else {
          if (username === MOCK_USERS.customer.username) {
            login(MOCK_USERS.customer);
            router.push("/customer/dashboard");
            router.refresh();
          } else {
            setError("Invalid customer credentials");
          }
        }
      } catch (err) {
        setError("An unexpected authentication error occurred.");
      } finally {
        setLoading(false);
      }
    }, 1200); // realistic network delay
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
      {/* Visual background lights */}
      <div
        className="animate-pulse-slow"
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(194,156,83,0.15) 0%, rgba(0,0,0,0) 70%)",
          top: "10%",
          left: "15%",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
      <div
        className="animate-pulse-slow"
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(0,0,0,0) 70%)",
          bottom: "10%",
          right: "15%",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      <div style={{ maxWidth: "450px", width: "100%", zIndex: 10 }}>
        {/* Logo and Welcome */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "900",
              color: "#030712",
              fontSize: "1.5rem",
              boxShadow: "0 0 20px rgba(194, 156, 83, 0.4)",
              marginBottom: "16px",
            }}
          >
            A
          </div>
          <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>
            Welcome to <span className="gradient-text">Apex Bank</span>
          </h1>
          <p style={{ fontSize: "0.95rem" }}>
            Secure identity routing gateway for premium clients
          </p>
        </div>

        {/* Auth form container */}
        <div className="glass-panel" style={{ padding: "32px" }}>
          {/* Quick Demo Switcher */}
          <div style={{ marginBottom: "28px" }}>
            <span className="form-label" style={{ textAlign: "center" }}>
              Choose Role Profile
            </span>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                background: "rgba(255, 255, 255, 0.03)",
                padding: "6px",
                borderRadius: "10px",
                border: "1px solid var(--border-color)",
              }}
            >
              <button
                type="button"
                onClick={() => handleRoleSelect("customer")}
                style={{
                  padding: "10px 12px",
                  borderRadius: "6px",
                  fontWeight: "600",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  background: role === "customer" ? "rgba(59, 130, 246, 0.2)" : "transparent",
                  color: role === "customer" ? "#3b82f6" : "var(--foreground-muted)",
                  border: role === "customer" ? "1px solid rgba(59, 130, 246, 0.4)" : "1px solid transparent",
                  transition: "all 0.2s ease",
                }}
              >
                Preferred Client
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect("admin")}
                style={{
                  padding: "10px 12px",
                  borderRadius: "6px",
                  fontWeight: "600",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  background: role === "admin" ? "rgba(194, 156, 83, 0.2)" : "transparent",
                  color: role === "admin" ? "var(--primary)" : "var(--foreground-muted)",
                  border: role === "admin" ? "1px solid rgba(194, 156, 83, 0.4)" : "1px solid transparent",
                  transition: "all 0.2s ease",
                }}
              >
                Elite Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label htmlFor="username" className="form-label">
                Secure Account ID
              </label>
              <input
                id="username"
                type="text"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ fontFamily: "var(--font-mono)" }}
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Security Password
              </label>
              <input
                id="password"
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "var(--accent-red)",
                  background: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  padding: "10px 12px",
                  borderRadius: "6px",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{
                width: "100%",
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
                background:
                  role === "admin"
                    ? "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)"
                    : "linear-gradient(135deg, var(--accent-blue) 0%, #1e40af 100%)",
                boxShadow:
                  role === "admin"
                    ? "0 4px 15px var(--primary-glow)"
                    : "0 4px 15px var(--accent-blue-glow)",
              }}
            >
              {loading ? (
                <>
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      border: "2px solid #ffffff",
                      borderTopColor: "transparent",
                      animation: "pulse-slow 1s linear infinite",
                    }}
                  />
                  Decrypting Session...
                </>
              ) : (
                `Sign In as ${role === "admin" ? "Admin" : "Customer"}`
              )}
            </button>
          </form>
        </div>

        {/* Demo Credential notice */}
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "0.8rem",
            color: "var(--foreground-muted)",
          }}
        >
          Mock Credentials: Select role above to autofill, then click sign in.
        </div>
      </div>
    </div>
  );
}
