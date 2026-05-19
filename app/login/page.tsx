"use client";

import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to continue to Coffee SaaS</p>
      </div>
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-amber-600 hover:bg-amber-700 text-sm normal-case",
            card: "shadow-lg",
            headerTitle: "text-2xl font-bold",
            headerSubtitle: "text-gray-600",
          },
        }}
      />
    </div>
  );
}