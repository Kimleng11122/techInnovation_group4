"use client";
import Link from "next/link";
import React, { useState, ChangeEvent, FormEvent } from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";
import { v4 as uuid } from "uuid";
import { motion } from 'framer-motion';
import { Zap, UploadCloud, Clock } from 'lucide-react';
import { Home, Layers as DatasetIcon, BarChart2 as ModelIcon, Users as UserMgmtIcon } from 'lucide-react';

type ModelVersion = {
    id: string;
    fileName: string;
    uploadedAt: string;
};

export default function ModelTuningPage() {
    // ─── State ────────────────────────────────────────────────────────────────
    const [learningRate, setLearningRate] = useState("");
    const [batchSize, setBatchSize] = useState("");
    const [epochs, setEpochs] = useState("");
    const [regularization, setRegularization] = useState("L2");

    const [versions, setVersions] = useState<ModelVersion[]>([
        { id: "v1", fileName: "model_v1.pth", uploadedAt: "Jun 1, 2024, 09:00 AM" },
        { id: "v2", fileName: "model_v2.pth", uploadedAt: "Jun 15, 2024, 02:30 PM" },
    ]);
    const [activeVersion, setActiveVersion] = useState(versions[0].id);

    const [fileToUpload, setFileToUpload] = useState<File | null>(null);

    const [confidence, setConfidence] = useState(0.5);

    const [performanceLog] = useState({
        lastTrained: "June 15, 2024 14:45",
        testAccuracy: "92.4%",
        f1Score: "0.90",
    });

    const trainingData = [
        { epoch: 1, accuracy: 0.70, loss: 0.85 },
        { epoch: 2, accuracy: 0.75, loss: 0.60 },
        { epoch: 3, accuracy: 0.80, loss: 0.50 },
        { epoch: 4, accuracy: 0.85, loss: 0.40 },
        { epoch: 5, accuracy: 0.88, loss: 0.35 },
        { epoch: 6, accuracy: 0.90, loss: 0.30 },
        { epoch: 7, accuracy: 0.92, loss: 0.28 },
        { epoch: 8, accuracy: 0.93, loss: 0.25 },
        { epoch: 9, accuracy: 0.94, loss: 0.23 },
        { epoch: 10, accuracy: 0.95, loss: 0.20 },
    ];

    // ─── Handlers ──────────────────────────────────────────────────────────────
    function handleParamReset() {
        setLearningRate("");
        setBatchSize("");
        setEpochs("");
        setRegularization("L2");
        setConfidence(0.5);
    }

    function handleModelUpload(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files?.[0]) return;
        setFileToUpload(e.target.files[0]);
    }

    function onUploadSubmit(e: FormEvent) {
        e.preventDefault();
        if (!fileToUpload) return;
        const newVer: ModelVersion = {
            id: uuid(),
            fileName: fileToUpload.name,
            uploadedAt: new Date().toLocaleString(),
        };
        setVersions([newVer, ...versions]);
        setActiveVersion(newVer.id);
        setFileToUpload(null);
    }

    // ─── Render ────────────────────────────────────────────────────────────────
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 overflow-hidden"
        >
            {/* Background blobs */}
            <div className="absolute -top-24 -left-24 h-80 w-80 bg-purple-600 opacity-20 blur-3xl animate-blob"></div>
            <div className="absolute bottom-0 -right-24 h-72 w-72 bg-green-600 opacity-20 blur-3xl animate-blob animation-delay-2000"></div>

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
                        { href: '/design3/admin', label: 'Activity Monitoring', icon: <Clock className="h-5 w-5" /> },
                        { href: '/design3/admin/dataset-management', label: 'Dataset Management', icon: <DatasetIcon className="h-5 w-5" /> },
                        { href: '/design3/admin/ai-model-tuning', label: 'AI Model Tuning', icon: <ModelIcon className="h-5 w-5" />, active: true },
                        { href: '/design3/admin/user-management', label: 'User Management', icon: <UserMgmtIcon className="h-5 w-5" /> },
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

            {/* Main Content */}
            <main className="flex-1 p-6 space-y-8">
                <h1 className="text-2xl font-bold">AI Model Tuning</h1>

                {/* Parameter Configuration */}
                <motion.section whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}
                    className="bg-gray-800 p-6 rounded shadow relative">
                    <h2 className="text-lg font-semibold mb-4">
                        <Zap className="inline h-5 w-5 text-blue-400 mr-2" /> Parameter Configuration
                    </h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm">Learning Rate</label>
                            <input
                                type="text"
                                value={learningRate}
                                onChange={e => setLearningRate(e.target.value)}
                                placeholder="e.g. 0.001"
                                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm">Batch Size</label>
                            <input
                                type="text"
                                value={batchSize}
                                onChange={e => setBatchSize(e.target.value)}
                                placeholder="e.g. 32"
                                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm">Epochs</label>
                            <input
                                type="text"
                                value={epochs}
                                onChange={e => setEpochs(e.target.value)}
                                placeholder="e.g. 10"
                                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm">Regularization Type</label>
                            <select
                                value={regularization}
                                onChange={e => setRegularization(e.target.value)}
                                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none"
                            >
                                <option>L2</option>
                                <option>L1</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-6 flex space-x-4">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className="bg-blue-600 px-5 py-2 rounded text-white"
                        >
                            Train Model
                        </motion.button>
                        <motion.button onClick={handleParamReset} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className="border border-gray-600 px-5 py-2 rounded text-white"
                        >
                            Reset Settings
                        </motion.button>
                    </div>
                </motion.section>

                {/* Model Upload & Selection */}
                <motion.section whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}
                    className="bg-gray-800 p-6 rounded shadow space-y-4 relative">
                    <UploadCloud className="absolute top-4 right-4 h-6 w-6 text-green-400 opacity-30 animate-pulse" />
                    <h2 className="text-lg font-semibold">Model Upload / Selection</h2>
                    <form onSubmit={onUploadSubmit} className="flex items-center gap-4">
                        <input
                            type="file"
                            accept=".pth,.h5,.pkl"
                            onChange={handleModelUpload}
                            className="file:mr-4 file:py-2 file:px-4 file:bg-blue-600 file:text-white file:rounded hover:file:bg-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-green-600 px-4 py-2 rounded hover:bg-green-500"
                        >
                            Upload
                        </button>
                    </form>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm divide-y divide-gray-700">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-300">Version</th>
                                    <th className="px-4 py-2 text-left text-gray-300">File Name</th>
                                    <th className="px-4 py-2 text-left text-gray-300">Uploaded At</th>
                                    <th className="px-4 py-2 text-left text-gray-300">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {versions.map(ver => (
                                    <motion.tr whileHover={{ backgroundColor: '#374151' }} transition={{ duration: 0.2 }}
                                        key={ver.id}
                                        className={
                                            ver.id === activeVersion
                                                ? "bg-gray-600"
                                                : "hover:bg-gray-700"
                                        }
                                    >
                                        <td className="px-4 py-2">{ver.id}</td>
                                        <td className="px-4 py-2">{ver.fileName}</td>
                                        <td className="px-4 py-2">{ver.uploadedAt}</td>
                                        <td className="px-4 py-2">
                                            {ver.id !== activeVersion && (
                                                <button
                                                    onClick={() => setActiveVersion(ver.id)}
                                                    className="text-blue-400 hover:text-blue-300"
                                                >
                                                    Rollback
                                                </button>
                                            )}
                                            {ver.id === activeVersion && (
                                                <span className="text-green-400">Active</span>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.section>

                {/* Training Graphs (placeholders) & Performance Logs */}
                <section className="grid grid-cols-2 gap-6">
                    {/* Graphs */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                        className="bg-gray-800 p-6 rounded shadow">
                        <h2 className="text-lg font-semibold mb-4">Training Graphs</h2>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={trainingData}>
                                <CartesianGrid stroke="#444" />
                                <XAxis dataKey="epoch" stroke="#AAA" />
                                <YAxis stroke="#AAA" />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="accuracy" name="Accuracy" stroke="#4CAF50" strokeWidth={2} />
                                <Line type="monotone" dataKey="loss" name="Loss" stroke="#F44336" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </motion.section>
                    {/* Performance */}
                    <div className="bg-gray-800 p-4 rounded shadow space-y-4">
                        <h2 className="text-lg font-semibold">Performance Logs</h2>
                        <div>
                            <p className="text-sm">
                                <span className="font-medium">Last Trained:</span>{" "}
                                {performanceLog.lastTrained}
                            </p>
                            <p className="text-sm">
                                <span className="font-medium">Test Accuracy:</span>{" "}
                                {performanceLog.testAccuracy}
                            </p>
                            <p className="text-sm">
                                <span className="font-medium">F1-Score:</span> {performanceLog.f1Score}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm">Confidence Threshold: {Math.round(confidence * 100)}%</label>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={confidence}
                                onChange={e => setConfidence(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </motion.div>
    );
}