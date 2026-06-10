"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { getSession, login, UserSession } from "@/lib/auth";

export default function CustomerTransferPage() {
  const [customer, setCustomer] = useState<UserSession | null>(null);
  const [balance, setBalance] = useState<number>(0);
  
  // Form inputs
  const [recipientName, setRecipientName] = useState("");
  const [recipientAccount, setRecipientAccount] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [reference, setReference] = useState("");
  
  // State
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<"form" | "confirming" | "success">("form");
  const [txnId, setTxnId] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");

  useEffect(() => {
    const session = getSession();
    setCustomer(session);
    if (session && session.balance !== undefined) {
      setBalance(session.balance);
    }
  }, []);

  const handleTriggerConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferAmount || parseFloat(transferAmount) <= 0) return;
    if (parseFloat(transferAmount) > balance) {
      alert("Insufficient liquid gold assets to satisfy this transfer.");
      return;
    }
    setStep("confirming");
  };

  const handleExecuteTransfer = () => {
    setSubmitting(true);
    
    const statuses = [
      "Securing encrypted tunnel...",
      "Resolving routing clearing houses...",
      "Interrogating secure bank ledgers...",
      "Verifying client session credentials...",
      "Authorizing liquid gold settlement...",
    ];

    // Cycle through status messages to show real engineering depth
    let messageIndex = 0;
    const interval = setInterval(() => {
      if (messageIndex < statuses.length) {
        setVerificationStatus(statuses[messageIndex]);
        messageIndex++;
      }
    }, 600);

    setTimeout(() => {
      clearInterval(interval);
      try {
        const amount = parseFloat(transferAmount);
        const nextBalance = balance - amount;
        
        // Update local states
        setBalance(nextBalance);
        const transactionRef = `TXN-${Math.floor(70000 + Math.random() * 9000)}`;
        setTxnId(transactionRef);

        // Update the Session Cookie so it persists across other pages
        if (customer) {
          const updatedSession: UserSession = {
            ...customer,
            balance: nextBalance,
          };
          login(updatedSession); // Writes updated cookie
        }

        setStep("success");
      } catch (e) {
        console.error("Failed to execute transfer", e);
      } finally {
        setSubmitting(false);
      }
    }, 3200);
  };

  if (!customer) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <main style={{ maxWidth: "800px", width: "100%", margin: "0 auto", padding: "40px 24px", flex: 1 }}>
        
        {/* Back Link */}
        <div style={{ marginBottom: "20px" }}>
          <Link
            href="/customer/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--accent-blue)",
              fontSize: "0.9rem",
              fontWeight: "600",
            }}
          >
            ← Return to Asset Console
          </Link>
        </div>

        {/* Header Section */}
        <div style={{ marginBottom: "36px" }}>
          <h1>
            Initiate Secure <span className="gradient-text">Funds Routing</span>
          </h1>
          <p>Transfer capital instantly across cleared commercial banking nodes with 256-bit encryption.</p>
        </div>

        {step === "form" && (
          <div className="glass-panel" style={{ padding: "32px" }}>
            {/* Quick Available Balance Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "20px",
                borderBottom: "1px solid var(--border-color)",
                marginBottom: "28px",
              }}
            >
              <div>
                <span style={{ fontSize: "0.85rem", color: "var(--foreground-muted)" }}>Clearing Balance</span>
                <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#ffffff", fontFamily: "var(--font-mono)" }}>
                  ${balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <span style={{ fontSize: "0.8rem", color: "var(--accent-green)", fontWeight: "600" }}>● READY TO TRANSFER</span>
            </div>

            <form onSubmit={handleTriggerConfirm} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <label htmlFor="recipientName" className="form-label">Beneficiary Full Name</label>
                  <input
                    id="recipientName"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Alice Cooper"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="recipientAccount" className="form-label">Beneficiary Account Number</label>
                  <input
                    id="recipientAccount"
                    type="text"
                    className="form-input"
                    placeholder="e.g. APX-9941-213"
                    value={recipientAccount}
                    onChange={(e) => setRecipientAccount(e.target.value)}
                    required
                    style={{ fontFamily: "var(--font-mono)" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <label htmlFor="routingNumber" className="form-label">Interbank Routing Transit Number</label>
                  <input
                    id="routingNumber"
                    type="text"
                    className="form-input"
                    placeholder="e.g. RTN-021000021"
                    value={routingNumber}
                    onChange={(e) => setRoutingNumber(e.target.value)}
                    required
                    style={{ fontFamily: "var(--font-mono)" }}
                  />
                </div>
                <div>
                  <label htmlFor="transferAmount" className="form-label">Transfer Amount (USD)</label>
                  <input
                    id="transferAmount"
                    type="number"
                    step="0.01"
                    className="form-input"
                    placeholder="e.g. 2500.00"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    required
                    style={{ color: "var(--primary)", fontWeight: "600" }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reference" className="form-label">Routing Memo / Transaction Reference</label>
                <input
                  id="reference"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Invoice settlement or Capital Asset Allocation"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{
                  background: "linear-gradient(135deg, var(--accent-blue) 0%, #1e40af 100%)",
                  boxShadow: "0 4px 15px var(--accent-blue-glow)",
                  marginTop: "12px",
                }}
              >
                Review Wire Details & Sign
              </button>
            </form>
          </div>
        )}

        {step === "confirming" && (
          <div className="glass-panel" style={{ padding: "32px", textAlign: "center" }}>
            {!submitting ? (
              <>
                <h3 style={{ fontSize: "1.3rem", marginBottom: "16px", color: "var(--primary)" }}>
                  Verify Wire Settlement Key
                </h3>
                <p style={{ fontSize: "0.95rem", marginBottom: "28px" }}>
                  Please confirm the transfer of liquid gold assets to the recipient below:
                </p>

                <div
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "12px",
                    padding: "20px",
                    textAlign: "left",
                    marginBottom: "32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--foreground-muted)" }}>Beneficiary Name:</span>
                    <span style={{ fontWeight: "600" }}>{recipientName}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--foreground-muted)" }}>Target Account:</span>
                    <span style={{ fontWeight: "500", fontFamily: "var(--font-mono)" }}>{recipientAccount}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--foreground-muted)" }}>Transit Routing:</span>
                    <span style={{ fontWeight: "500", fontFamily: "var(--font-mono)" }}>{routingNumber}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border-color)", paddingTop: "12px" }}>
                    <span style={{ color: "var(--foreground-muted)", fontWeight: "600" }}>Wire Amount:</span>
                    <span style={{ fontWeight: "700", color: "var(--primary)", fontFamily: "var(--font-mono)" }}>
                      ${parseFloat(transferAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <button onClick={handleExecuteTransfer} className="btn-primary" style={{ flex: 1, background: "linear-gradient(135deg, var(--accent-blue) 0%, #1e40af 100%)" }}>
                    Authorize Wire Dispatch
                  </button>
                  <button onClick={() => setStep("form")} className="btn-secondary" style={{ flex: 1 }}>
                    Modify Details
                  </button>
                </div>
              </>
            ) : (
              <div style={{ padding: "40px 0" }}>
                {/* Custom animated loader */}
                <div style={{ position: "relative", width: "80px", height: "80px", margin: "0 auto 28px" }}>
                  <div
                    className="animate-pulse-slow"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      border: "3px solid var(--accent-blue)",
                      borderTopColor: "transparent",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                </div>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "12px" }}>Dispatching Wire Order</h3>
                <p style={{ color: "var(--primary)", fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
                  {verificationStatus || "Encrypting tunnel details..."}
                </p>
                {/* CSS Spin Animation inject */}
                <style jsx global>{`
                  @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                  }
                `}</style>
              </div>
            )}
          </div>
        )}

        {step === "success" && (
          <div className="glass-panel" style={{ padding: "32px", textAlign: "center", border: "1px solid rgba(16, 185, 129, 0.3)", background: "rgba(16, 185, 129, 0.02)" }}>
            {/* Checked success circle */}
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "rgba(16, 185, 129, 0.15)",
                border: "2px solid var(--accent-green)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
                boxShadow: "0 0 15px var(--accent-green-glow)",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <h2 style={{ fontSize: "1.8rem", color: "var(--accent-green)", marginBottom: "8px" }}>
              Settlement Dispatched
            </h2>
            <p style={{ fontSize: "0.95rem", marginBottom: "32px" }}>
              The interbank clearing transaction was finalized and securely signed.
            </p>

            <div
              style={{
                background: "rgba(3,7,18,0.3)",
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                padding: "16px 20px",
                textAlign: "left",
                marginBottom: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                fontSize: "0.9rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--foreground-muted)" }}>Receipt Code:</span>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: "600", color: "var(--primary)" }}>{txnId}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--foreground-muted)" }}>Dispatched From:</span>
                <span style={{ fontWeight: "500" }}>APX-5542-882</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--foreground-muted)" }}>Beneficiary:</span>
                <span style={{ fontWeight: "500" }}>{recipientName} ({recipientAccount})</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border-color)", paddingTop: "8px" }}>
                <span style={{ color: "var(--foreground-muted)" }}>Debited Amount:</span>
                <span style={{ fontWeight: "600", fontFamily: "var(--font-mono)" }}>
                  -${parseFloat(transferAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
              <Link href="/customer/dashboard" className="btn-primary" style={{ flex: 1, background: "linear-gradient(135deg, var(--accent-blue) 0%, #1e40af 100%)" }}>
                Return to Account
              </Link>
              <button
                onClick={() => {
                  setRecipientName("");
                  setRecipientAccount("");
                  setRoutingNumber("");
                  setTransferAmount("");
                  setReference("");
                  setStep("form");
                }}
                className="btn-secondary"
                style={{ flex: 1 }}
              >
                Send Another Wire
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
