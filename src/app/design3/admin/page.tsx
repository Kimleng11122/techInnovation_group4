// File: src/app/design3/admin/user-activity-monitoring/page.tsx
"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  User as UserIcon,
  Search,
  Clock,
  CheckCircle,
  AlertTriangle,
  XOctagon,
  Sun,
} from 'lucide-react';
import { Home, Layers as DatasetIcon, BarChart2 as ModelIcon, Users as UserMgmtIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    BarChart,
    Bar,
} from "recharts";

type StatCard = {
    label: string;
    value: number | string;
    icon: React.ReactNode;
};

type Activity = {
    timestamp: string;
    user: string;
    action: string;
    detail: string;
};

type Notification = {
    id: string;
    message: string;
    type: "info" | "warning" | "error";
};

// ─── Dummy Data for Charts ─────────────────────────────────────────────
const threatTrendData = [
    { date: "Apr 27", Safe: 70, Suspicious: 20, Malicious: 10 },
    { date: "Apr 28", Safe: 65, Suspicious: 25, Malicious: 10 },
    { date: "Apr 29", Safe: 75, Suspicious: 15, Malicious: 10 },
    { date: "Apr 30", Safe: 80, Suspicious: 12, Malicious: 8 },
    { date: "May 1", Safe: 78, Suspicious: 14, Malicious: 8 },
    { date: "May 2", Safe: 76, Suspicious: 15, Malicious: 9 },
    { date: "May 3", Safe: 76, Suspicious: 15, Malicious: 9 },
];

const perfTrendData = [
    { date: "Apr 27", scans: 600, accuracy: 92 },
    { date: "Apr 28", scans: 580, accuracy: 91 },
    { date: "Apr 29", scans: 610, accuracy: 93 },
    { date: "Apr 30", scans: 590, accuracy: 92 },
    { date: "May 1", scans: 620, accuracy: 94 },
    { date: "May 2", scans: 610, accuracy: 93 },
    { date: "May 3", scans: 630, accuracy: 92 },
];

export default function UserActivityMonitoringPage() {
    // ─── Dummy State ───────────────────────────────────────────────────────
    const stats: StatCard[] = [
        { label: "Registered Users", value: 1248, icon: <UserIcon className="h-8 w-8 text-indigo-400" /> },
        { label: "Total Scans", value: 4872, icon: <Search className="h-8 w-8 text-blue-400" /> },
        { label: "Safe Rate", value: "76%", icon: <CheckCircle className="h-8 w-8 text-green-400" /> },
        { label: "Suspicious Rate", value: "15%", icon: <AlertTriangle className="h-8 w-8 text-yellow-400" /> },
        { label: "Malicious Rate", value: "9%", icon: <XOctagon className="h-8 w-8 text-red-400" /> },
        { label: "Recent Threats", value: 37, icon: <Clock className="h-8 w-8 text-pink-400" /> },
    ];

    const [activities] = useState<Activity[]>([
        { timestamp: "May 3, 2025 14:22", user: "Alice", action: "Uploaded file", detail: "invoice.docx" },
        { timestamp: "May 3, 2025 14:18", user: "Bob", action: "Scanned URL", detail: "http://malicious.test" },
        { timestamp: "May 3, 2025 14:15", user: "Charlie", action: "Logged in", detail: "" },
        { timestamp: "May 3, 2025 14:10", user: "Dana", action: "Deleted folder", detail: "Old Reports" },
    ]);

    const modelStatus = {
        version: "v2.3.1",
        lastUpdated: "May 2, 2025 09:45",
    };

    const [notifications] = useState<Notification[]>([
        { id: "n1", message: "High-risk file detected in scan #4870", type: "error" },
        { id: "n2", message: "Dataset ‘VirusShare’ expires in 3 days", type: "warning" },
        { id: "n3", message: "New ML model version available (v2.3.2)", type: "info" },
    ]);

    // ─── Render ────────────────────────────────────────────────────────────
    return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 overflow-hidden"
        >
          {/* Decorative Blobs */}
          <div className="absolute -top-20 -left-20 h-72 w-72 bg-purple-600 opacity-20 blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 -right-20 h-64 w-64 bg-green-600 opacity-20 blur-3xl animate-blob animation-delay-2000"></div>

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-64 bg-gray-800 border-r border-gray-700 p-4 relative"
            >
              <div className="flex items-center justify-between mb-6">
                <Home className="h-6 w-6 text-indigo-400" />
                <Link href="/design3">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-lg font-semibold text-gray-100 hover:text-indigo-300"
                  >
                    Admin Panel
                  </motion.span>
                </Link>
              </div>
              <nav className="space-y-1">
                {[
                  { href: '/design3/admin', label: 'Activity Monitoring', icon: <Clock className="h-5 w-5" />, active: true },
                  { href: '/design3/admin/dataset-management', label: 'Dataset Management', icon: <DatasetIcon className="h-5 w-5" /> },
                  { href: '/design3/admin/ai-model-tuning', label: 'AI Model Tuning', icon: <ModelIcon className="h-5 w-5" /> },
                  { href: '/design3/admin/user-management', label: 'User Management', icon: <UserMgmtIcon className="h-5 w-5" /> },
                ].map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    whileHover={{ backgroundColor: '#374151' }}
                    className={`relative flex items-center space-x-2 px-3 py-2 rounded transition-colors duration-200 ${
                      item.active ? 'bg-gray-700 text-indigo-300' : 'text-gray-100 hover:text-indigo-300'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                    {item.active && (
                      <motion.span
                        layoutId="sidebarIndicator"
                        className="absolute left-0 inset-y-0 w-1 bg-indigo-500 rounded-tr-md rounded-br-md"
                      />
                    )}
                  </motion.a>
                ))}
              </nav>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 p-6 space-y-8 overflow-y-auto">
              {/* Theme Toggle */}
              <button
                onClick={() => document.documentElement.classList.toggle('light')}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-700/50 hover:bg-gray-700 text-white"
              >
                <Sun className="h-5 w-5" />
                {/* swap to <Moon /> for light mode */}
              </button>

                <h1 className="text-2xl font-bold">Activity Monitoring</h1>

                {/* System Statistics */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((s) => (
                        <motion.div
                          key={s.label}
                          whileHover={{ scale: 1.03 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                          className="flex items-center space-x-4 bg-gray-800 p-4 rounded shadow"
                        >
                            <div className="text-3xl">{s.icon}</div>
                            <div>
                                <p className="text-xl font-semibold">{s.value}</p>
                                <p className="text-sm text-gray-400">{s.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </section>

                {/* Activity Summary */}
                <section>
                    <h2 className="text-lg font-semibold mb-2">Live Activity Feed</h2>
                    <div className="overflow-x-auto border border-gray-700 rounded">
                        <table className="min-w-full divide-y divide-gray-700 text-sm">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-300">Time</th>
                                    <th className="px-4 py-2 text-left text-gray-300">User</th>
                                    <th className="px-4 py-2 text-left text-gray-300">Action</th>
                                    <th className="px-4 py-2 text-left text-gray-300">Detail</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {activities.map((a, i) => (
                                    <motion.tr
                                        key={i}
                                        whileHover={{ backgroundColor: '#2d3748' }}
                                        transition={{ duration: 0.2 }}
                                        className="cursor-pointer even:bg-gray-800"
                                    >
                                        <td className="px-4 py-2">{a.timestamp}</td>
                                        <td className="px-4 py-2">{a.user}</td>
                                        <td className="px-4 py-2">{a.action}</td>
                                        <td className="px-4 py-2">{a.detail || "—"}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Trend Charts & Model Status */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Threat Types Over Time */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-gray-800 p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">Threat Types Over Time</h2>
                        <ResponsiveContainer width="100%" height={160}>
                            <LineChart data={threatTrendData}>
                                <CartesianGrid stroke="#444" />
                                <XAxis dataKey="date" stroke="#AAA" />
                                <YAxis stroke="#AAA" />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Safe" stroke="#4CAF50" strokeWidth={2} />
                                <Line type="monotone" dataKey="Suspicious" stroke="#FFB300" strokeWidth={2} />
                                <Line type="monotone" dataKey="Malicious" stroke="#F44336" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Upload & Performance Trends */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-gray-800 p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">Upload & Model Performance</h2>
                        <ResponsiveContainer width="100%" height={160}>
                            <BarChart data={perfTrendData}>
                                <CartesianGrid stroke="#444" />
                                <XAxis dataKey="date" stroke="#AAA" />
                                <YAxis yAxisId="left" orientation="left" stroke="#AAA" />
                                <YAxis yAxisId="right" orientation="right" stroke="#AAA" />
                                <Tooltip />
                                <Legend />
                                <Bar yAxisId="left" dataKey="scans" fill="#2196F3" />
                                <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#FFC107" strokeWidth={2} />
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>



                    {/* Model Status */}
                    <div className="bg-gray-800 p-4 rounded shadow space-y-2">
                        <h2 className="text-lg font-semibold">Model Status</h2>
                        <p>
                            <span className="font-medium">Version:</span> {modelStatus.version}
                        </p>
                        <p>
                            <span className="font-medium">Last Updated:</span> {modelStatus.lastUpdated}
                        </p>
                    </div>
                </section>

                {/* Notifications / Alerts */}
                <section>
                    <h2 className="text-lg font-semibold mb-2">Notifications & Alerts</h2>
                    <ul className="space-y-2">
                        {notifications.map((n) => (
                            <li
                                key={n.id}
                                className={`
                  flex items-center justify-between bg-gray-800 p-3 rounded
                  ${n.type === "error" ? "border-l-4 border-red-500" : ""}
                  ${n.type === "warning" ? "border-l-4 border-yellow-500" : ""}
                  ${n.type === "info" ? "border-l-4 border-blue-500" : ""}
                `}
                            >
                                <p className="text-sm">{n.message}</p>
                                <span className="text-xs text-gray-400 uppercase">{n.type}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </motion.div>
    );
}