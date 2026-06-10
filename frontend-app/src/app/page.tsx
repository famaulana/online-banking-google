import { redirect } from "next/navigation";

export default function Home() {
  // Simple fallback redirect, although middleware handles this automatically.
  redirect("/login");
}
