// File: src/app/design3/admin/user-management/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import {
    User as UserIcon,
    Settings2,
    Info,
    ClipboardList,
    AlertCircle,
    ShieldCheck,
    Archive,
} from "lucide-react";
import Link from "next/link";

// Dummy user data
const dummyUsers = [
    {
        id: "u1",
        username: "alice",
        fullName: "Alice Johnson",
        email: "alice@example.com",
        role: "User",
        uploads: 12,
        threats: "3/12",
        status: "Active",
        registered: new Date(2025, 0, 15, 10, 30),
        lastLogin: new Date(2025, 4, 2, 14, 12),
        twoFA: true,
        expiration: null,
        ipRestriction: "None",
        activity: [
            { id: 1, type: "File Upload", item: "report.pdf", time: "May 2, 2025 14:12" },
            { id: 2, type: "URL Scan", item: "http://example.com", time: "May 1, 2025 09:45" },
        ],
        threatsHistory: [
            { id: 1, item: "malware.exe", time: "Apr 30, 2025 16:22" },
            { id: 2, item: "http://bad.test", time: "Apr 28, 2025 11:05" },
        ],
        audit: [
            { id: 1, action: "Password Reset", time: "May 1, 2025 08:20" },
            { id: 2, action: "Role Changed to User", time: "Apr 20, 2025 12:00" },
        ],
    },
    {
        id: "u2",
        username: "bob",
        fullName: "Bob Brown",
        email: "bob@example.com",
        role: "Admin",
        uploads: 34,
        threats: "5/34",
        status: "Active",
        registered: new Date(2024, 10, 1, 9, 0),
        lastLogin: new Date(2025, 3, 30, 17, 45),
        twoFA: false,
        expiration: new Date(2025, 11, 31),
        ipRestriction: "192.168.1.0/24",
        activity: [
            { id: 1, type: "File Upload", item: "data.csv", time: "Apr 30, 2025 16:00" },
            { id: 2, type: "Login", item: "-", time: "Apr 29, 2025 12:15" },
        ],
        threatsHistory: [
            { id: 1, item: "ransomware.doc", time: "Apr 22, 2025 14:00" },
        ],
        audit: [
            { id: 1, action: "Promoted to Admin", time: "Dec 1, 2024 09:00" },
        ],
    },
    {
        id: "u3",
        username: "charlie",
        fullName: "Charlie Lee",
        email: "charlie@example.com",
        role: "Suspended",
        uploads: 5,
        threats: "1/5",
        status: "Suspended",
        registered: new Date(2025, 0, 10, 11, 45),
        lastLogin: new Date(2025, 3, 28, 10, 30),
        twoFA: true,
        expiration: new Date(2025, 6, 1),
        ipRestriction: "None",
        activity: [
            { id: 1, type: "URL Scan", item: "http://safe.example", time: "Apr 27, 2025 13:20" },
            { id: 2, type: "File Upload", item: "image.png", time: "Apr 26, 2025 15:10" },
        ],
        threatsHistory: [
            { id: 1, item: "suspicious.exe", time: "Apr 25, 2025 14:00" },
        ],
        audit: [
            { id: 1, action: "Suspended account", time: "Apr 29, 2025 09:00" },
        ],
    },
    {
        id: "u4",
        username: "dana",
        fullName: "Dana Kumar",
        email: "dana@example.com",
        role: "User",
        uploads: 20,
        threats: "0/20",
        status: "Active",
        registered: new Date(2025, 1, 20, 8, 15),
        lastLogin: new Date(2025, 4, 1, 12, 0),
        twoFA: false,
        expiration: null,
        ipRestriction: "None",
        activity: [
            { id: 1, type: "Login", item: "-", time: "May 1, 2025 12:00" },
            { id: 2, type: "File Upload", item: "notes.txt", time: "Apr 30, 2025 17:30" },
        ],
        threatsHistory: [],
        audit: [
            { id: 1, action: "Password Changed", time: "Apr 20, 2025 14:45" },
        ],
    },
    // Add more dummy users as needed
];

type User = typeof dummyUsers[0];

export default function UserManagementPage() {
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState<keyof User>("username");
    const [sortAsc, setSortAsc] = useState(true);
    const [selected, setSelected] = useState<User | null>(null);

    // Filtered & sorted users
    const users = useMemo(() => {
        return [...dummyUsers]
            .filter(u => u.username.includes(search) || u.fullName.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => {
                if ((a[sortField] ?? "") < (b[sortField] ?? "")) return sortAsc ? -1 : 1;
                if ((a[sortField] ?? "") > (b[sortField] ?? "")) return sortAsc ? 1 : -1;
                return 0;
            });
    }, [search, sortField, sortAsc]);

    return (
        <div className="flex min-h-screen text-gray-100 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
            {/* Sidebar omit for brevity... reuse AdminPanel */}
            <aside className="w-64 bg-gray-800 border-r border-gray-700 p-4">
                <Link href="/design3">
                    <div className="text-lg font-semibold mb-4">Admin Panel</div>
                </Link>
                <nav className="space-y-1">
                    <a href="/design3/admin"
                        className="block px-3 py-2 hover:bg-gray-700 rounded">
                        Activity Monitoring
                    </a>
                    <a
                        href="/design3/admin/dataset-management"
                        className="block px-3 py-2 hover:bg-gray-700 rounded"
                    >
                        Dataset Management
                    </a>
                    <a href="/design3/admin/ai-model-tuning"
                        className="block px-3 py-2 hover:bg-gray-700 rounded">
                        AI Model Tuning
                    </a>
                    {/* <a href="/design3/admin/report-options"
                        className="block px-3 py-2 hover:bg-gray-700 rounded">
                        Report Options
                    </a> */}

                    <a href="/design3/admin/user-management"
                        className="block px-3 py-2 bg-gray-700 rounded text-gray-100 font-medium"
                    >
                        User Management
                    </a>

                </nav>
            </aside>

            <main className="flex-1 p-6 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-4">User Management</h1>

                {/* Search */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full max-w-md px-3 py-2 bg-gray-800 border border-gray-600 rounded focus:outline-none"
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-gray-800 rounded">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-700">
                            <tr>
                                {[
                                    { key: "username", label: "Username" },
                                    { key: "email", label: "Email" },
                                    { key: "role", label: "Role" },
                                    { key: "uploads", label: "Uploads" },
                                    { key: "threats", label: "Threats Detected" },
                                    { key: "status", label: "Status" },
                                    { key: "actions", label: "Actions" },
                                ].map(col => (
                                    <th
                                        key={col.key}
                                        className="px-4 py-2 text-left text-gray-300 cursor-pointer hover:bg-gray-600"
                                        onClick={() => {
                                            if (col.key !== "actions") {
                                                const field = col.key as keyof User;
                                                setSortAsc(sortField === field ? !sortAsc : true);
                                                setSortField(field);
                                            }
                                        }}
                                    >
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id} className="border-b border-gray-700 hover:bg-gray-800">
                                    <td className="px-4 py-2">{u.username} / {u.fullName}</td>
                                    <td className="px-4 py-2">{u.email}</td>
                                    <td className="px-4 py-2">{u.role}</td>
                                    <td className="px-4 py-2">{u.uploads}</td>
                                    <td className="px-4 py-2">{u.threats}</td>
                                    <td className={`px-4 py-2 ${u.status === "Active" ? "text-green-400" : u.status === "Suspended" ? "text-yellow-400" : "text-red-400"}`}>{u.status}</td>
                                    <td className="px-4 py-2 space-x-2">
                                        <button onClick={() => setSelected(u)} className="text-blue-400 hover:text-blue-300">View</button>
                                        <button className="text-yellow-400 hover:text-yellow-300">Suspend</button>
                                        <button className="text-red-400 hover:text-red-300">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Detail Side Panel */}
                {/* Centered Detail Modal */}
                {selected && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.5)]">
                        <div className="relative bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                            {/* Close Button */}
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
                            >
                                ✕
                            </button>

                            {/* Header */}
                            <div className="flex items-center space-x-2 mb-4">
                                <UserIcon className="h-6 w-6 text-green-400" />
                                <h2 className="text-2xl font-semibold">{selected.fullName}</h2>
                            </div>

                            {/* Basic Info Card */}
                            <div className="bg-gray-700 p-4 rounded mb-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Info className="h-5 w-5 text-blue-400" />
                                    <h3 className="font-semibold">Basic Information</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div><span className="font-medium">Email:</span> {selected.email}</div>
                                    <div><span className="font-medium">Role:</span> {selected.role}</div>
                                    <div><span className="font-medium">Registered:</span> {format(selected.registered, 'MMM d, yyyy')}</div>
                                    <div><span className="font-medium">Last Login:</span> {format(selected.lastLogin, 'MMM d, yyyy HH:mm')}</div>
                                </div>
                            </div>

                            {/* Activity Summary Card */}
                            <div className="bg-gray-700 p-4 rounded mb-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <ClipboardList className="h-5 w-5 text-yellow-400" />
                                    <h3 className="font-semibold">Activity Summary</h3>
                                </div>
                                <ul className="list-disc list-inside text-sm space-y-1">
                                    {selected.activity.map((a) => (
                                        <li key={a.id}>[{a.time}] {a.type}: {a.item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Threats History Card */}
                            <div className="bg-gray-700 p-4 rounded mb-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <AlertCircle className="h-5 w-5 text-red-400" />
                                    <h3 className="font-semibold">Threats History</h3>
                                </div>
                                {selected.threatsHistory.length ? (
                                    <ul className="list-disc list-inside text-sm space-y-1">
                                        {selected.threatsHistory.map((t) => (
                                            <li key={t.id}>[{t.time}] {t.item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-400">No threats detected.</p>
                                )}
                            </div>

                            {/* Audit Trail Card */}
                            <div className="bg-gray-700 p-4 rounded mb-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Archive className="h-5 w-5 text-purple-400" />
                                    <h3 className="font-semibold">Audit Trail</h3>
                                </div>
                                <ul className="list-disc list-inside text-sm space-y-1">
                                    {selected.audit.map((a) => (
                                        <li key={a.id}>[{a.time}] {a.action}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Admin Controls Card */}
                            <div className="bg-gray-700 p-4 rounded mb-4">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Settings2 className="h-5 w-5 text-green-300" />
                                    <h3 className="font-semibold">Admin Controls</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    <button className="w-full bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 text-sm">Promote / Demote Admin</button>
                                    <button className="w-full bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-500 text-sm">Suspend / Activate Account</button>
                                    <button className="w-full bg-red-600 px-4 py-2 rounded hover:bg-red-500 text-sm">Reset Password</button>
                                </div>
                            </div>

                            {/* Security & Access Card */}
                            <div className="bg-gray-700 p-4 rounded">
                                <div className="flex items-center space-x-2 mb-2">
                                    <ShieldCheck className="h-5 w-5 text-green-400" />
                                    <h3 className="font-semibold">Security & Access</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div><span className="font-medium">2FA Status:</span> {selected.twoFA ? "Enabled" : "Disabled"}</div>
                                    <div><span className="font-medium">Account Expiry:</span> {selected.expiration ? format(selected.expiration, 'MMM d, yyyy') : "None"}</div>
                                    <div className="col-span-2"><span className="font-medium">IP Restriction:</span> {selected.ipRestriction}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
