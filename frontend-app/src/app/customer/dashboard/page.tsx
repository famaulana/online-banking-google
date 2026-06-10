"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { getSession, UserSession } from "@/lib/auth";

interface Transaction {
  id: string;
  description: string;
  date: string;
  amount: number;
  type: "credit" | "debit";
  status: "completed" | "processing" | "failed";
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "TXN-77342",
    description: "Payroll Direct Deposit - Apex Corp",
    date: "Jun 09, 2026",
    amount: 8400.00,
    type: "credit",
    status: "completed",
  },
  {
    id: "TXN-77341",
    description: "Decentralized Exchange - Liquidity Swap",
    date: "Jun 08, 2026",
    amount: -1200.00,
    type: "debit",
    status: "completed",
  },
  {
    id: "TXN-77340",
    description: "Starbucks Elite Reserve",
    date: "Jun 07, 2026",
    amount: -32.50,
    type: "debit",
    status: "completed",
  },
  {
    id: "TXN-77339",
    description: "Bespoke Furniture - Wire Transfer",
    date: "Jun 05, 2026",
    amount: -4500.00,
    type: "debit",
    status: "completed",
  },
  {
    id: "TXN-77338",
    description: "Asset Dividend - Treasury Bond Yield",
    date: "May 28, 2026",
    amount: 340.25,
    type: "credit",
    status: "completed",
  },
];

export default function CustomerDashboard() {
  const [customer, setCustomer] = useState<UserSession | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const session = getSession();
    setCustomer(session);
    if (session && session.balance !== undefined) {
      setBalance(session.balance);
    }
  }, []);

  if (!customer) return null;

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
                  backgroundColor: "var(--accent-blue)",
                  display: "inline-block",
                  boxShadow: "0 0 10px var(--accent-blue-glow)",
                }}
              />
              <span style={{ fontSize: "0.85rem", color: "var(--accent-blue)", fontWeight: "600", textTransform: "uppercase" }}>
                Preferred Client Terminal
              </span>
            </div>
            <h1>
              Welcome Back, <span className="gradient-text">{customer.name.split(" ")[0]}</span>
            </h1>
            <p>Access your liquid gold assets, initiate quantum wire routing, and audit secure transactions.</p>
          </div>
          <div>
            <Link
              href="/customer/transfer"
              className="btn-primary"
              style={{
                fontSize: "0.85rem",
                padding: "10px 18px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, var(--accent-blue) 0%, #1e40af 100%)",
                boxShadow: "0 4px 15px var(--accent-blue-glow)",
              }}
            >
              Initiate Secure Transfer
            </Link>
          </div>
        </div>

        {/* Assets Summary Panel */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          {/* Main Wallet Balance Card */}
          <div
            className="glass-panel"
            style={{
              padding: "32px",
              background: "linear-gradient(135deg, rgba(3, 7, 18, 0.8) 0%, rgba(31, 41, 55, 0.4) 100%)",
              border: "1px solid rgba(59, 130, 246, 0.25)",
              boxShadow: "0 10px 30px -15px var(--accent-blue-glow)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Holographic lines/decoration */}
            <div
              style={{
                position: "absolute",
                top: "-50px",
                right: "-50px",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(0,0,0,0) 70%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ fontSize: "0.85rem", color: "var(--accent-blue)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
              Total Liquid Holdings (USD)
            </div>
            <div style={{ fontSize: "2.8rem", fontWeight: "900", color: "#ffffff", letterSpacing: "-0.03em", marginBottom: "12px", fontFamily: "var(--font-mono)" }}>
              ${balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div style={{ display: "flex", gap: "16px", fontSize: "0.85rem", color: "var(--foreground-muted)" }}>
              <div>
                Account Number: <code style={{ fontFamily: "var(--font-mono)", color: "#ffffff" }}>APX-5542-882</code>
              </div>
              <div style={{ color: "var(--accent-green)" }}>● SECURE</div>
            </div>
          </div>

          {/* Secondary Savings Asset */}
          <div className="glass-panel" style={{ padding: "28px" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--foreground-muted)", textTransform: "uppercase", fontWeight: "600", marginBottom: "12px" }}>
              High-Yield Vault
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#ffffff", marginBottom: "8px", fontFamily: "var(--font-mono)" }}>
              $142,390.00
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--accent-green)", fontWeight: "500" }}>
              Interest Rate: 4.85% APY
            </div>
          </div>

          {/* Investment Portfolio */}
          <div className="glass-panel" style={{ padding: "28px" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--foreground-muted)", textTransform: "uppercase", fontWeight: "600", marginBottom: "12px" }}>
              Venture Holdings
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "var(--primary)", marginBottom: "8px", fontFamily: "var(--font-mono)" }}>
              $89,200.12
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--accent-green)", fontWeight: "500" }}>
              ↑ +8.45% return this cycle
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div style={{ display: "grid", gridTemplateColumns: "3fr 1.2fr", gap: "24px", alignItems: "start" }}>
          {/* Left panel: Transaction History */}
          <div className="glass-panel" style={{ padding: "30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "1.3rem" }}>Audited Statement of Transactions</h2>
              <span style={{ fontSize: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", padding: "4px 10px", borderRadius: "4px", color: "var(--foreground-muted)", fontFamily: "var(--font-mono)" }}>
                ACTIVE NODE
              </span>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-color)", color: "var(--foreground-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>
                    <th style={{ padding: "12px 16px" }}>Reference</th>
                    <th style={{ padding: "12px 16px" }}>Date</th>
                    <th style={{ padding: "12px 16px" }}>Counterparty & Description</th>
                    <th style={{ padding: "12px 16px" }}>Amount (USD)</th>
                    <th style={{ padding: "12px 16px", textAlign: "right" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr
                      key={tx.id}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.02)",
                        fontSize: "0.95rem",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <td style={{ padding: "16px", fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: "600", color: "var(--foreground-muted)" }}>
                        {tx.id}
                      </td>
                      <td style={{ padding: "16px", color: "var(--foreground-muted)", fontSize: "0.8rem" }}>
                        {tx.date}
                      </td>
                      <td style={{ padding: "16px", fontWeight: "500", color: "#e5e7eb" }}>
                        {tx.description}
                      </td>
                      <td style={{ padding: "16px", fontFamily: "var(--font-mono)", fontWeight: "600" }}>
                        <span style={{ color: tx.type === "credit" ? "var(--accent-green)" : "#ffffff" }}>
                          {tx.type === "credit" ? "+" : "-"}
                          ${Math.abs(tx.amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td style={{ padding: "16px", textAlign: "right" }}>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            fontWeight: "500",
                            background:
                              tx.status === "completed"
                                ? "rgba(16, 185, 129, 0.15)"
                                : tx.status === "processing"
                                ? "rgba(59, 130, 246, 0.15)"
                                : "rgba(239, 68, 68, 0.15)",
                            color:
                              tx.status === "completed"
                                ? "var(--accent-green)"
                                : tx.status === "processing"
                                ? "var(--accent-blue)"
                                : "var(--accent-red)",
                          }}
                        >
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Panel: Role Intercept Testing */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="glass-panel" style={{ border: "1px solid rgba(59,130,246,0.2)", background: "rgba(59,130,246,0.02)" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "12px", color: "var(--accent-blue)" }}>Routing Shield</h3>
              <p style={{ fontSize: "0.85rem", marginBottom: "16px" }}>
                You are currently inside the protected <code style={{ fontFamily: "var(--font-mono)", color: "var(--accent-blue)", background: "rgba(255,255,255,0.05)", padding: "2px 4px", borderRadius: "3px" }}>/customer/*</code> directory matched by Next.js edge middleware.
              </p>
              <p style={{ fontSize: "0.85rem", marginBottom: "16px" }}>
                If you attempt to sneak into administrative URL endpoints (such as `admin/dashboard`), the routing shield will instantly intercept, block and redirect you.
              </p>
              <Link href="/admin/dashboard" className="btn-secondary" style={{ display: "block", textAlign: "center", fontSize: "0.85rem" }}>
                Try Accessing Admin Route
              </Link>
            </div>

            <div className="glass-panel">
              <h3 style={{ fontSize: "1.1rem", marginBottom: "12px" }}>Financial Operations</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Link href="/customer/transfer" className="btn-secondary" style={{ textAlign: "center", fontSize: "0.85rem" }}>
                  Funds Routing Matrix
                </Link>
                <div style={{ fontSize: "0.75rem", color: "var(--foreground-muted)", textAlign: "center" }}>
                  Frictionless instant transfers with secure 256-bit encryption.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
