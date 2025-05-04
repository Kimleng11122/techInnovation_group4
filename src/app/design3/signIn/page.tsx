"use client";
import Link from "next/link";
import React from "react";

export default function SignIn() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 text-gray-100 flex">
            {/* Left panel / Logo area */}
            <div className="hidden md:flex md:flex-col w-1/3 bg-gray-800 border-r border-gray-700 justify-center items-center">
                <div className="text-3xl font-bold">LOGO</div>
            </div>

            {/* Sign-In Form */}
            <div className="flex-1 flex items-center justify-center px-6">
                <div className="w-full max-w-sm bg-gray-800 p-6 rounded shadow-md">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
                    <form>
                        {/* Email Field */}
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium mb-1 text-gray-200"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="email@example.com"
                                className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        {/* Password Field */}
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium mb-1 text-gray-200"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        {/* Sign In Button */}
                        <Link href="/design3/registerHome">
                            <button
                                type="submit"
                                className="w-full py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition font-semibold"
                            >
                                Sign In
                            </button>
                        </Link>
                    </form>
                    {/* Footer Links */}
                    <div className="mt-4 text-center text-sm text-gray-400">
                        Don’t have an account?{" "}
                        <Link href="/design3/signUp" className="text-indigo-400 hover:text-indigo-300 transition">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}