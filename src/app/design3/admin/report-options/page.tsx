// File: src/app/design3/admin/report-options/page.tsx
"use client";

import Link from "next/link";
import React, { useState, FormEvent } from "react";

export default function ReportOptionsPage() {
    // ─── State ───────────────────────────────────────────────────────────
    const [threatClass, setThreatClass] = useState(
        "Trojan Malware (Password Stealer)"
    );
    const [severity, setSeverity] = useState("Critical");
    const [behaviorSummary, setBehaviorSummary] = useState(
        "This Trojan injects into system processes, logs keystrokes, encrypts data at rest, and exfiltrates credentials over HTTPS while evading standard AV signatures."
    );
    const [datasetRefs, setDatasetRefs] = useState(
        "VirusShare, Custom Intelligence Feed, MISP, AlienVault, PhishTank"
    );

    const [explanations, setExplanations] = useState<string[]>([
        "Uses polymorphic packing to evade signature-based detection.",
        "Known to target financial services with man-in-the-browser payloads.",
        "Often distributed via spear-phishing emails with malicious macro attachments.",
    ]);
    const [newExplanation, setNewExplanation] = useState("");

    const [exportPDF, setExportPDF] = useState(true);
    const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
        "desktop"
    );

    // ─── Handlers ────────────────────────────────────────────────────────
    function addExplanation(e: FormEvent) {
        e.preventDefault();
        if (!newExplanation.trim()) return;
        setExplanations([...explanations, newExplanation.trim()]);
        setNewExplanation("");
    }
    function removeExplanation(idx: number) {
        setExplanations(explanations.filter((_, i) => i !== idx));
    }
    function resetForm() {
        setThreatClass("");
        setSeverity("Medium");
        setBehaviorSummary("");
        setDatasetRefs("");
        setExplanations([]);
        setExportPDF(true);
        setPreviewMode("desktop");
    }

    // ─── Render ─────────────────────────────────────────────────────────
    return (
        <div className="flex min-h-screen text-gray-100 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
            {/* Sidebar */}
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
                    <a href="/design3/admin/report-options"
                        className="block px-3 py-2 bg-gray-700 rounded text-gray-100 font-medium">
                        Report Options
                    </a>
                    <a href="/design3/admin/user-management"
                        className="block px-3 py-2 hover:bg-gray-700 rounded"
                    >
                        User Management
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 space-y-8">
                <h1 className="text-2xl font-bold">Report Options</h1>

                {/* Editable Sections */}
                <section className="bg-gray-800 p-6 rounded shadow space-y-4">
                    <h2 className="text-lg font-semibold">Editable Sections</h2>
                    <div className="grid grid-cols-2 gap-6">
                        {/* Threat Classification */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium">Threat Classification</label>
                            <input
                                type="text"
                                value={threatClass}
                                onChange={(e) => setThreatClass(e.target.value)}
                                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none"
                            />
                        </div>
                        {/* Severity Levels */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium">Severity Levels</label>
                            <select
                                value={severity}
                                onChange={(e) => setSeverity(e.target.value)}
                                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none"
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>Critical</option>
                            </select>
                        </div>
                        {/* Detected Behavior Summary */}
                        <div className="col-span-2 space-y-1">
                            <label className="block text-sm font-medium">Detected Behavior Summary</label>
                            <textarea
                                value={behaviorSummary}
                                onChange={(e) => setBehaviorSummary(e.target.value)}
                                rows={3}
                                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none"
                            />
                        </div>
                        {/* Dataset References */}
                        <div className="col-span-2 space-y-1">
                            <label className="block text-sm font-medium">Dataset References</label>
                            <input
                                type="text"
                                value={datasetRefs}
                                onChange={(e) => setDatasetRefs(e.target.value)}
                                placeholder="Comma-separated sources"
                                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none"
                            />
                        </div>
                    </div>
                </section>

                {/* Explanation Boxes */}
                <section className="bg-gray-800 p-6 rounded shadow">
                    <h2 className="text-lg font-semibold mb-3">Explanation Boxes</h2>
                    <div className="space-y-2">
                        {explanations.map((text, idx) => (
                            <div
                                key={idx}
                                className="flex items-start justify-between bg-gray-700 p-3 rounded"
                            >
                                <p className="text-sm">{text}</p>
                                <button
                                    onClick={() => removeExplanation(idx)}
                                    className="text-red-400 hover:text-red-300"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                        {explanations.length === 0 && (
                            <p className="text-gray-400 text-sm">No explanations added yet.</p>
                        )}
                    </div>
                    <form onSubmit={addExplanation} className="mt-4 flex space-x-2">
                        <input
                            type="text"
                            value={newExplanation}
                            onChange={(e) => setNewExplanation(e.target.value)}
                            placeholder="New explanation..."
                            className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
                        >
                            Add
                        </button>
                    </form>
                </section>

                {/* Export & Preview Options */}
                <section className="bg-gray-800 p-6 rounded shadow space-y-4">
                    <h2 className="text-lg font-semibold">Export &amp; Preview</h2>
                    <div className="flex items-center space-x-6">
                        {/* Export PDF */}
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={exportPDF}
                                onChange={(e) => setExportPDF(e.target.checked)}
                                className="h-4 w-4 text-green-500 bg-gray-600 rounded focus:ring-0"
                            />
                            <span className="text-sm">Allow PDF Download</span>
                        </label>
                        {/* Preview Mode */}
                        <div className="flex items-center space-x-2">
                            <span className="text-sm">Preview:</span>
                            <button
                                onClick={() => setPreviewMode("desktop")}
                                className={`px-3 py-1 rounded ${previewMode === "desktop"
                                    ? "bg-blue-600"
                                    : "bg-gray-700 hover:bg-gray-600"
                                    }`}
                            >
                                Desktop
                            </button>
                            <button
                                onClick={() => setPreviewMode("mobile")}
                                className={`px-3 py-1 rounded ${previewMode === "mobile"
                                    ? "bg-blue-600"
                                    : "bg-gray-700 hover:bg-gray-600"
                                    }`}
                            >
                                Mobile
                            </button>
                        </div>
                    </div>

                    {/* Preview Frame */}
                    <div
                        className={`mt-4 bg-gray-700 rounded ${previewMode === "mobile" ? "w-64 h-96" : "w-full h-64"
                            } border border-gray-600`}
                    >
                        <p className="text-gray-400 text-center pt-8">
                            {previewMode === "mobile"
                                ? "Mobile Report Preview"
                                : "Desktop Report Preview"}
                        </p>
                    </div>
                </section>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={resetForm}
                        className="border border-gray-600 px-5 py-2 rounded hover:bg-gray-700"
                    >
                        Reset
                    </button>
                    <button className="bg-green-600 px-5 py-2 rounded hover:bg-green-500">
                        Save Changes
                    </button>
                </div>
            </main>
        </div>
    );
}