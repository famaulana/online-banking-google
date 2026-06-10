export interface UserSession {
  username: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  balance?: number; // relevant for customer online banking
}

export const MOCK_USERS = {
  admin: {
    username: "admin1",
    name: "Farhan Agung (Admin)",
    email: "admin@apexbank.com",
    role: "admin" as const,
  },
  customer: {
    username: "customer1",
    name: "John Doe (Customer)",
    email: "john.doe@gmail.com",
    role: "customer" as const,
    balance: 54220.50,
  },
};

// Simple cookie-based helper for client-side authentication
export function getSession(): UserSession | null {
  if (typeof window === "undefined") return null;
  const cookies = document.cookie.split(";");
  const sessionCookie = cookies.find((c) => c.trim().startsWith("user_session="));
  if (!sessionCookie) return null;

  try {
    const value = sessionCookie.split("=")[1];
    return JSON.parse(decodeURIComponent(value));
  } catch (e) {
    console.error("Failed to parse user session", e);
    return null;
  }
}

export function login(user: UserSession): void {
  if (typeof window === "undefined") return;
  // Cookie expires in 1 day
  const date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  
  document.cookie = `user_session=${encodeURIComponent(
    JSON.stringify(user)
  )}${expires}; path=/; SameSite=Lax`;
}

export function logout(): void {
  if (typeof window === "undefined") return;
  document.cookie = "user_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
