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
    Mail,
    FileText,
    CheckCircle,
    XOctagon,
    Eye,
    UserMinus,
    Trash2,
} from "lucide-react";
import { motion } from 'framer-motion';
import { Clock, Home, Layers as DatasetIcon, BarChart2 as ModelIcon, Users as UserMgmtIcon } from 'lucide-react';
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
    const [selected, setSelected] = useState<User | null>(null);

    // Filtered & sorted users
    const users = useMemo(() => {
        return [...dummyUsers]
            .filter(u => u.username.includes(search) || u.fullName.toLowerCase().includes(search.toLowerCase()))
            
    }, [search]);

    return (
        <div className="flex min-h-screen text-gray-100 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
            {/* Sidebar omit for brevity... reuse AdminPanel */}
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
                        { href: '/design3/admin', label: 'Activity Monitoring', icon: <Clock className="h-5 w-5" /> },
                        { href: '/design3/admin/dataset-management', label: 'Dataset Management', icon: <DatasetIcon className="h-5 w-5" /> },
                        { href: '/design3/admin/ai-model-tuning', label: 'AI Model Tuning', icon: <ModelIcon className="h-5 w-5" /> },
                        { href: '/design3/admin/user-management', label: 'User Management', icon: <UserMgmtIcon className="h-5 w-5" />, active: true },
                    ].map((item) => (
                        <motion.a
                            key={item.href}
                            href={item.href}
                            whileHover={{ backgroundColor: '#374151' }}
                            className={`relative flex items-center space-x-2 px-3 py-2 rounded transition-colors duration-200 ${item.active ? 'bg-gray-700 text-indigo-300' : 'text-gray-100 hover:text-indigo-300'
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

                {/* Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map(u => (
                        <motion.div
                            key={u.id}
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            onClick={() => setSelected(u)}
                            className="bg-gray-800 p-4 rounded-lg shadow cursor-pointer flex flex-col justify-between"
                        >
                            {/* Header */}
                            <div className="flex items-center mb-4">
                                <UserIcon className="h-6 w-6 text-indigo-400 mr-2" />
                                <div>
                                    <p className="text-lg font-semibold">{u.fullName}</p>
                                    <p className="text-sm text-gray-400">@{u.username}</p>
                                </div>
                            </div>
                            {/* Details */}
                            <div className="space-y-2 text-sm">
                                <p className="flex items-center"><Mail className="h-5 w-5 text-gray-400 mr-2" />{u.email}</p>
                                <p className="flex items-center"><FileText className="h-5 w-5 text-gray-400 mr-2" />Uploads: {u.uploads}</p>
                                <p className="flex items-center"><AlertCircle className="h-5 w-5 text-gray-400 mr-2" />Threats: {u.threats}</p>
                                <p className="flex items-center">
                                    {u.status === 'Active' && <CheckCircle className="h-5 w-5 text-green-400 mr-2" />}
                                    {u.status === 'Suspended' && <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />}
                                    {u.status === 'Banned' && <XOctagon className="h-5 w-5 text-red-400 mr-2" />}
                                    <span className={`font-medium ${u.status === 'Active' ? 'text-green-300' : u.status === 'Suspended' ? 'text-yellow-300' : 'text-red-300'}`}>{u.status}</span>
                                </p>
                            </div>
                            {/* Actions */}
                            <div className="mt-4 flex justify-end space-x-3">
                                <motion.button whileHover={{ scale: 1.1 }} className="p-2 bg-blue-600 rounded hover:bg-blue-500" title="View User">
                                    <Eye className="h-4 w-4 text-white" />
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.1 }} className="p-2 bg-yellow-600 rounded hover:bg-yellow-500" title="Suspend User">
                                    <UserMinus className="h-4 w-4 text-white" />
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.1 }} className="p-2 bg-red-600 rounded hover:bg-red-500" title="Delete User">
                                    <Trash2 className="h-4 w-4 text-white" />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
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
