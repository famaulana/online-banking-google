"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { getSession, UserSession } from "@/lib/auth";

interface BankingUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  balance?: number;
  status: "active" | "suspended" | "pending";
}

const INITIAL_USERS: BankingUser[] = [
  {
    id: "USR-0001",
    name: "John Doe",
    email: "john.doe@gmail.com",
    role: "customer",
    balance: 54220.50,
    status: "active",
  },
  {
    id: "USR-0002",
    name: "Sarah Jenkins",
    email: "sarah.j@outlook.com",
    role: "customer",
    balance: 125400.00,
    status: "active",
  },
  {
    id: "USR-0003",
    name: "Alex Rivera",
    email: "alex.rivera@techcorp.io",
    role: "customer",
    balance: 3200.75,
    status: "pending",
  },
  {
    id: "USR-0004",
    name: "Farhan Agung (Admin)",
    email: "admin@apexbank.com",
    role: "admin",
    status: "active",
  },
  {
    id: "USR-0005",
    name: "Marcus Vance",
    email: "marcus.vance@gmail.com",
    role: "customer",
    balance: 0.00,
    status: "suspended",
  },
];

export default function AdminUsersPage() {
  const [admin, setAdmin] = useState<UserSession | null>(null);
  const [users, setUsers] = useState<BankingUser[]>(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserBalance, setNewUserBalance] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    setAdmin(getSession());
  }, []);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const newUser: BankingUser = {
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newUserName,
      email: newUserEmail,
      role: "customer",
      balance: newUserBalance ? parseFloat(newUserBalance) : 0,
      status: "active",
    };

    setUsers((prev) => [...prev, newUser]);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserBalance("");
    setShowAddForm(false);
  };

  const toggleStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatusMap: Record<string, "active" | "suspended" | "pending"> = {
            active: "suspended",
            suspended: "active",
            pending: "active",
          };
          return { ...u, status: nextStatusMap[u.status] };
        }
        return u;
      })
    );
  };

  if (!admin) return null;

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <main style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "40px 24px", flex: 1 }}>
        {/* Navigation Link */}
        <div style={{ marginBottom: "20px" }}>
          <Link
            href="/admin/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--primary)",
              fontSize: "0.9rem",
              fontWeight: "600",
            }}
          >
            ← Return to Control Console
          </Link>
        </div>

        {/* Header Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px" }}>
          <div>
            <h1>
              User Accounts <span className="gradient-text">Directory</span>
            </h1>
            <p>Review, provision, and audit active customer wallets and access tokens.</p>
          </div>
          <div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn-primary"
              style={{
                fontSize: "0.85rem",
                padding: "10px 18px",
              }}
            >
              {showAddForm ? "Cancel Provisioning" : "Provision New Account"}
            </button>
          </div>
        </div>

        {/* Provisioning Form (Glass Card) */}
        {showAddForm && (
          <div
            className="glass-panel"
            style={{
              padding: "24px",
              marginBottom: "32px",
              border: "1px solid rgba(194,156,83,0.3)",
              background: "rgba(194,156,83,0.03)",
            }}
          >
            <h3 style={{ fontSize: "1.1rem", marginBottom: "16px", color: "var(--primary)" }}>
              Account Provisioning Terminal
            </h3>
            <form
              onSubmit={handleAddUser}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                alignItems: "end",
              }}
            >
              <div>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Alice Cooper"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="e.g. alice@gmail.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="form-label">Initial Balance (USD)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g. 5000"
                  value={newUserBalance}
                  onChange={(e) => setNewUserBalance(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ height: "46px" }}>
                Generate Account Keys
              </button>
            </form>
          </div>
        )}

        {/* Directory Card */}
        <div className="glass-panel" style={{ padding: "30px" }}>
          {/* Filtering and search */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              gap: "16px",
            }}
          >
            <div style={{ position: "relative", flex: 1, maxWidth: "400px" }}>
              <input
                type="text"
                placeholder="Search by name, email, or role..."
                className="form-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: "16px" }}
              />
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--foreground-muted)" }}>
              Showing {filteredUsers.length} of {users.length} registered nodes
            </div>
          </div>

          {/* Users Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)", color: "var(--foreground-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>
                  <th style={{ padding: "12px 16px" }}>Client ID</th>
                  <th style={{ padding: "12px 16px" }}>Client Details</th>
                  <th style={{ padding: "12px 16px" }}>Security Role</th>
                  <th style={{ padding: "12px 16px" }}>Liquid Wallet Balance</th>
                  <th style={{ padding: "12px 16px" }}>System Status</th>
                  <th style={{ padding: "12px 16px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((userNode) => (
                  <tr
                    key={userNode.id}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.02)",
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {/* User ID */}
                    <td style={{ padding: "16px", fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: "600", color: "var(--foreground-muted)" }}>
                      {userNode.id}
                    </td>

                    {/* Details */}
                    <td style={{ padding: "16px" }}>
                      <div style={{ fontWeight: "600", color: "#ffffff" }}>{userNode.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--foreground-muted)" }}>{userNode.email}</div>
                    </td>

                    {/* Role */}
                    <td style={{ padding: "16px" }}>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          background: userNode.role === "admin" ? "rgba(194, 156, 83, 0.15)" : "rgba(59, 130, 246, 0.15)",
                          color: userNode.role === "admin" ? "var(--primary)" : "var(--accent-blue)",
                        }}
                      >
                        {userNode.role}
                      </span>
                    </td>

                    {/* Balance */}
                    <td style={{ padding: "16px", fontFamily: "var(--font-mono)", fontWeight: "500" }}>
                      {userNode.balance !== undefined ? (
                        <span style={{ color: "var(--accent-green)" }}>
                          ${userNode.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      ) : (
                        <span style={{ color: "var(--foreground-muted)", fontSize: "0.85rem", fontStyle: "italic" }}>
                          N/A (Administrator)
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td style={{ padding: "16px" }}>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          textTransform: "capitalize",
                          color:
                            userNode.status === "active"
                              ? "var(--accent-green)"
                              : userNode.status === "suspended"
                              ? "var(--accent-red)"
                              : "var(--primary)",
                        }}
                      >
                        ● {userNode.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "16px", textAlign: "right" }}>
                      {userNode.role !== "admin" ? (
                        <button
                          onClick={() => toggleStatus(userNode.id)}
                          className="btn-secondary"
                          style={{
                            padding: "4px 10px",
                            fontSize: "0.75rem",
                            borderColor: userNode.status === "active" ? "var(--accent-red)" : "var(--accent-green)",
                            color: userNode.status === "active" ? "var(--accent-red)" : "var(--accent-green)",
                            background: "transparent",
                          }}
                        >
                          {userNode.status === "active" ? "Suspend Account" : "Activate Account"}
                        </button>
                      ) : (
                        <span style={{ fontSize: "0.75rem", color: "var(--foreground-muted)", fontStyle: "italic" }}>
                          Protected Node
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
