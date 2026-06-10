"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { getSession, UserSession } from "@/lib/auth";

interface SystemLog {
  id: string;
  time: string;
  category: "auth" | "system" | "security";
  message: string;
  status: "success" | "warning" | "blocked";
}

const INITIAL_LOGS: SystemLog[] = [
  {
    id: "LOG-9023",
    time: "10:14:22",
    category: "auth",
    message: "Session token generated for customer1 (John Doe)",
    status: "success",
  },
  {
    id: "LOG-9022",
    time: "09:44:01",
    category: "security",
    message: "Access blocked: IP 198.51.100.12 attempted accessing /admin/dashboard without token",
    status: "blocked",
  },
  {
    id: "LOG-9021",
    time: "08:15:30",
    category: "system",
    message: "Automated backups successfully synced to secure vault-3",
    status: "success",
  },
  {
    id: "LOG-9020",
    time: "07:00:00",
    category: "system",
    message: "Database optimization cycle executed (Duration: 145ms)",
    status: "success",
  },
  {
    id: "LOG-9019",
    time: "06:12:45",
    category: "security",
    message: "Administrator admin1 logged in from secure device MAC-0012",
    status: "success",
  },
];

export default function AdminDashboard() {
  const [admin, setAdmin] = useState<UserSession | null>(null);
  const [logs, setLogs] = useState<SystemLog[]>(INITIAL_LOGS);

  useEffect(() => {
    setAdmin(getSession());
  }, []);

  const addSimulationLog = () => {
    const newLog: SystemLog = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      time: new Date().toLocaleTimeString(),
      category: Math.random() > 0.5 ? "auth" : "security",
      message: Math.random() > 0.5 
        ? "Dynamic routing intercept: token parsed successfully"
        : "Security check: middleware active, role validation satisfied",
      status: "success",
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  if (!admin) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <main style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "40px 24px", flex: 1 }}>
        {/* Welcome Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent-green)",
                  display: "inline-block",
                  boxShadow: "0 0 10px var(--accent-green-glow)",
                }}
              />
              <span style={{ fontSize: "0.85rem", color: "var(--accent-green)", fontWeight: "600", textTransform: "uppercase" }}>
                Secure Admin Network Active
              </span>
            </div>
            <h1>
              Systems Control <span className="gradient-text">Console</span>
            </h1>
            <p>Welcome back, Commander {admin.name.split(" ")[0]}. Accessing terminal security logs.</p>
          </div>
          <div>
            <button
              onClick={addSimulationLog}
              className="btn-primary"
              style={{
                fontSize: "0.85rem",
                padding: "10px 18px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Simulate Network Activity
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {/* Card 1 */}
          <div className="glass-panel">
            <div style={{ fontSize: "0.8rem", color: "var(--foreground-muted)", textTransform: "uppercase", fontWeight: "600", marginBottom: "12px" }}>
              Secure Transactions
            </div>
            <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "#ffffff", marginBottom: "6px" }}>
              $2,482,900
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--accent-green)", fontWeight: "500" }}>
              ↑ 12.4% vs yesterday
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel">
            <div style={{ fontSize: "0.8rem", color: "var(--foreground-muted)", textTransform: "uppercase", fontWeight: "600", marginBottom: "12px" }}>
              Connected Clients
            </div>
            <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "#ffffff", marginBottom: "6px" }}>
              1,245
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--accent-blue)", fontWeight: "500" }}>
              99.2% active sessions
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel">
            <div style={{ fontSize: "0.8rem", color: "var(--foreground-muted)", textTransform: "uppercase", fontWeight: "600", marginBottom: "12px" }}>
              Platform Status
            </div>
            <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--accent-green)", marginBottom: "6px" }}>
              99.99%
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--foreground-muted)", fontWeight: "500" }}>
              All nodes operational
            </div>
          </div>

          {/* Card 4 */}
          <div className="glass-panel">
            <div style={{ fontSize: "0.8rem", color: "var(--foreground-muted)", textTransform: "uppercase", fontWeight: "600", marginBottom: "12px" }}>
              Threat Mitigation
            </div>
            <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--primary)", marginBottom: "6px" }}>
              0 Incidents
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--accent-green)", fontWeight: "500" }}>
              WAF active & guarding
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div style={{ display: "grid", gridTemplateColumns: "3fr 1.2fr", gap: "24px", alignItems: "start" }}>
          {/* Left panel: Audit Logs */}
          <div className="glass-panel" style={{ padding: "30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "1.3rem" }}>Middleware Router & System Audit Logs</h2>
              <span style={{ fontSize: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", padding: "4px 10px", borderRadius: "4px", color: "var(--foreground-muted)", fontFamily: "var(--font-mono)" }}>
                REALTIME CAPTURE
              </span>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-color)", color: "var(--foreground-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>
                    <th style={{ padding: "12px 16px" }}>Log ID</th>
                    <th style={{ padding: "12px 16px" }}>Timestamp</th>
                    <th style={{ padding: "12px 16px" }}>Category</th>
                    <th style={{ padding: "12px 16px" }}>Event Description</th>
                    <th style={{ padding: "12px 16px", textAlign: "right" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr
                      key={log.id}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.02)",
                        fontSize: "0.9rem",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <td style={{ padding: "16px", fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: "600", color: "var(--primary)" }}>
                        {log.id}
                      </td>
                      <td style={{ padding: "16px", color: "var(--foreground-muted)", fontSize: "0.8rem" }}>
                        {log.time}
                      </td>
                      <td style={{ padding: "16px" }}>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            color:
                              log.category === "security"
                                ? "var(--accent-red)"
                                : log.category === "auth"
                                ? "var(--accent-blue)"
                                : "var(--foreground-muted)",
                          }}
                        >
                          {log.category}
                        </span>
                      </td>
                      <td style={{ padding: "16px", color: "#e5e7eb" }}>{log.message}</td>
                      <td style={{ padding: "16px", textAlign: "right" }}>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            fontWeight: "500",
                            background:
                              log.status === "success"
                                ? "rgba(16, 185, 129, 0.15)"
                                : log.status === "blocked"
                                ? "rgba(239, 68, 68, 0.15)"
                                : "rgba(194, 156, 83, 0.15)",
                            color:
                              log.status === "success"
                                ? "var(--accent-green)"
                                : log.status === "blocked"
                                ? "var(--accent-red)"
                                : "var(--primary)",
                          }}
                        >
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Panel: Role Intercept Information */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="glass-panel" style={{ border: "1px solid rgba(194,156,83,0.2)", background: "rgba(194,156,83,0.02)" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "12px", color: "var(--primary)" }}>Administrative Shield</h3>
              <p style={{ fontSize: "0.85rem", marginBottom: "16px" }}>
                You are currently inside the protected <code style={{ fontFamily: "var(--font-mono)", color: "var(--primary)", background: "rgba(255,255,255,0.05)", padding: "2px 4px", borderRadius: "3px" }}>/admin/*</code> path matched by Next.js edge middleware.
              </p>
              <p style={{ fontSize: "0.85rem", marginBottom: "16px" }}>
                Attempting to access client areas will safely redirect or present appropriate dashboard routing.
              </p>
              <Link href="/customer/dashboard" className="btn-secondary" style={{ display: "block", textAlign: "center", fontSize: "0.85rem" }}>
                Try Accessing Customer Route
              </Link>
            </div>

            <div className="glass-panel">
              <h3 style={{ fontSize: "1.1rem", marginBottom: "12px" }}>Control Tools</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Link href="/admin/users" className="btn-secondary" style={{ textAlign: "center", fontSize: "0.85rem" }}>
                  Manage Banking Users
                </Link>
                <div style={{ fontSize: "0.75rem", color: "var(--foreground-muted)", textAlign: "center", fontStyle: "italic" }}>
                  Vault encryption engine v4.1 active
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
