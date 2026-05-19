"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
        <p className="text-gray-600">Join Coffee SaaS to discover amazing coffee shops</p>
      </div>
      <SignUp
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