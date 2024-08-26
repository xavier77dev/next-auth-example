"use client";

import { signOut } from "next-auth/react"

function DashboardPage() {
  return (
    <section className="p-6 text-white">
      <h1>Dashboard</h1>
      <button onClick={() => signOut()}>logout</button>
    </section>
  )
}

export default DashboardPage;
