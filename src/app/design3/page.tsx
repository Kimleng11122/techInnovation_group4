"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Users } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="space-y-8 text-center max-w-lg">
        <Link href="/design3">
          <h1 className="text-4xl font-extrabold"> </h1>
        </Link>
        <p className="text-gray-400">
          Choose your panel to continue. Monitor, manage, and secure your files with ease.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={() => router.push('/design3/admin')}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 transition-transform transform hover:scale-105 px-6 py-4 rounded-lg shadow-lg"
          >
            <ShieldCheck className="h-5 w-5 text-white" />
            <span className="font-semibold">Admin Panel</span>
          </button>

          <button
            onClick={() => router.push('/design3/registerHome')}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-500 focus:bg-green-700 transition-transform transform hover:scale-105 px-6 py-4 rounded-lg shadow-lg"
          >
            <Users className="h-5 w-5 text-white" />
            <span className="font-semibold">User Panel</span>
          </button>
        </div>
        <div className="mt-6 text-sm text-gray-500">
          Need help? Contact support or check the documentation.
        </div>
      </div>
    </div>
  );
}
