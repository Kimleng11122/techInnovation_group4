"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from 'framer-motion';
import { Zap, ShieldCheck } from 'lucide-react';

interface ScanRecord {
    name: string;
    date: string;
    status: "Safe" | "Malicious" | "Suspicious";
    threatSummary: string;
}

const RegisterHome = () => {
    const [file, setFile] = useState<File | null>(null);
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [viewMode, setViewMode] = useState<"file" | "url">("file");

    // Sample data for demonstration:
    const [scanHistory] = useState<ScanRecord[]>([
        { name: "https://example.com", date: "Apr 23, 2024", status: "Safe", threatSummary: "No threats detected" },
        { name: "https://example2.com", date: "Apr 23, 2024", status: "Safe", threatSummary: "No threats detected" },
        { name: "https://example3.com", date: "Apr 23, 2024", status: "Safe", threatSummary: "No threats detected" },
        { name: "https://malicious-site.com", date: "Apr 23, 2024", status: "Malicious", threatSummary: "Detected malware: Trojan" },
        { name: "document.pdf", date: "Apr 23, 2024", status: "Suspicious", threatSummary: "Possible phishing attempt" },
        { name: "image.png", date: "Apr 23, 2024", status: "Safe", threatSummary: "No threats detected" },
        { name: "video.mp4", date: "Apr 23, 2024", status: "Safe", threatSummary: "No threats detected" },
        { name: "archive.zip", date: "Apr 23, 2024", status: "Safe", threatSummary: "No threats detected" },
    ]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null);
    };

    const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const handleFileScan = () => {
        if (!file) {
            alert("No file selected");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push("/design3/safeResult");
        }, 2000); // simulate processing delay
    };

    const handleURLScan = () => {
        const validateUrl = (url: string) => {
            const pattern = new RegExp(
                "^(https?:\\/\\/)?" +
                "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
                "((\\d{1,3}\\.){3}\\d{1,3}))" +
                "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
                "(\\?[;&a-z\\d%_.~+=-]*)?" +
                "(\\#[-a-z\\d_]*)?$",
                "i"
            );
            return !!pattern.test(url);
        };

        if (!validateUrl(url)) {
            alert("No valid URL entered");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push("/design3/maliciousResult");
        }, 2000); // simulate processing delay
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-100 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
                <div className="text-center">
                    <div className="mb-4 animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-solid mx-auto" />
                    <p className="text-xl font-semibold">Scanning in progress...</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex min-h-screen bg-gray-900 text-gray-100 overflow-hidden"
        >
            {/* Animated background blobs */}
            <div className="absolute -top-20 -left-20 h-72 w-72 bg-purple-600 opacity-20 blur-3xl animate-blob"></div>
            <div className="absolute bottom-0 -right-20 h-64 w-64 bg-green-600 opacity-20 blur-3xl animate-blob animation-delay-2000"></div>
            {/* Right Section (Main Content) */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <header className="flex items-center justify-between bg-gray-800 border-b border-gray-700 px-4 py-3">
                    <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="w-full flex items-center justify-between">
                        <Link href="/design3">
                            <div className="text-lg font-bold">Welcome Kimleng</div>
                        </Link>
                        <div className="space-x-3">
                            <Link href="/design3">
                                <button className="text-white bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700">
                                    Log out
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-6 flex flex-col items-center">
                    <h1 className="text-2xl font-bold mb-6">
                        Enter a URL or upload a file to scan for malware
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-4xl">
                        {/* URL Risk Analyzer */}
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="bg-gray-800 p-6 rounded-lg shadow"
                        >
                            <h2 className="text-xl font-semibold mb-4">
                                <Zap className="inline h-5 w-5 text-indigo-400 mr-2"/> URL Risk Analyzer
                            </h2>
                            <div className="flex space-x-2 mb-4">
                                <input
                                    type="text"
                                    placeholder="Enter URL"
                                    value={url}
                                    onChange={handleURLChange}
                                    className="flex-1 px-3 py-2 rounded border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <button
                                    onClick={handleURLScan}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                                >
                                    Scan
                                </button>
                            </div>
                            <p className="text-sm text-gray-400">
                                Paste any URL (e.g. http://example.com) to analyze for potential threats.
                            </p>
                        </motion.div>

                        {/* File Safety Checker */}
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="bg-gray-800 p-6 rounded-lg shadow"
                        >
                            <h2 className="text-xl font-semibold mb-4">
                                <ShieldCheck className="inline h-5 w-5 text-green-400 mr-2"/> File Safety Checker
                            </h2>
                            <label
                                htmlFor="fileUpload"
                                className="block w-full p-6 border-2 border-dashed border-gray-600 rounded text-center cursor-pointer mb-4 hover:border-indigo-500"
                            >
                                {file ? (
                                    <span className="text-gray-100">{file.name}</span>
                                ) : (
                                    <span className="text-gray-400">Click to upload file</span>
                                )}
                                <input
                                    id="fileUpload"
                                    type="file"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                            <button
                                onClick={handleFileScan}
                                className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                            >
                                Scan
                            </button>
                        </motion.div>
                    </div>


                    <div className="bg-gray-800 p-6 rounded-lg shadow w-full max-w-4xl">

                        <div className="mb-4">
                            <div className="flex border-b border-gray-700">
                                <button
                                    className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 hover:text-indigo-300 focus:outline-none ${viewMode === "file"
                                        ? "text-indigo-400 border-b-2 border-indigo-400"
                                        : "text-gray-400"
                                        }`}
                                    onClick={() => setViewMode("file")}
                                >
                                    Files
                                </button>
                                <button
                                    className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 hover:text-indigo-300 focus:outline-none ${viewMode === "url"
                                        ? "text-indigo-400 border-b-2 border-indigo-400"
                                        : "text-gray-400"
                                        }`}
                                    onClick={() => setViewMode("url")}
                                >
                                    URL
                                </button>
                            </div>
                        </div>
                        <div>
                            {viewMode === "file" ? (
                                <table className="w-full text-sm border border-gray-700 rounded">
                                    <thead className="bg-gray-700">
                                        <tr>
                                            <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">File</th>
                                            <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">Date</th>
                                            <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">Threat Summary</th>
                                            <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {scanHistory
                                            .filter((record) => !record.name.startsWith("http"))
                                            .map((record, index) => (
                                                <motion.tr
                                                    whileHover={{ backgroundColor: '#2d3748' }}
                                                    transition={{ duration: 0.2 }}
                                                    key={index}
                                                    className="even:bg-gray-800 hover:bg-gray-700 cursor-pointer"
                                                    onClick={() =>
                                                        record.status === "Malicious"
                                                            ? router.push("/design3/maliciousResult") :
                                                            record.status === "Suspicious"
                                                                ? router.push("/design3/suspiciousResult")
                                                                : router.push("/design3/safeResult")
                                                    }
                                                >
                                                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                                                        {record.name}
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                                                        {record.date}
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                                                        {record.threatSummary}
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                                                        {record.status === "Safe" && (
                                                            <span className="bg-green-900 text-green-400 text-xs font-semibold px-2 py-1 rounded">
                                                                Safe
                                                            </span>
                                                        )}
                                                        {record.status === "Malicious" && (
                                                            <span className="bg-red-900 text-red-400 text-xs font-semibold px-2 py-1 rounded">
                                                                Malicious
                                                            </span>
                                                        )}
                                                        {record.status === "Suspicious" && (
                                                            <span className="bg-yellow-900 text-yellow-400 text-xs font-semibold px-2 py-1 rounded">
                                                                Suspicious
                                                            </span>
                                                        )}
                                                    </td>
                                                </motion.tr>
                                            ))}
                                    </tbody>
                                </table>
                            ) : (
                                <table className="w-full text-sm border border-gray-700 rounded">
                                    <thead className="bg-gray-700">
                                        <tr>
                                            <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">URL</th>
                                            <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">Date</th>
                                            <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">Threat Summary</th>
                                            <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {scanHistory
                                            .filter((record) => record.name.startsWith("http"))
                                            .map((record, index) => (
                                                <motion.tr
                                                    whileHover={{ backgroundColor: '#2d3748' }}
                                                    transition={{ duration: 0.2 }}
                                                    key={index}
                                                    className="even:bg-gray-800 hover:bg-gray-700 cursor-pointer"
                                                    onClick={() =>
                                                        record.status === "Malicious"
                                                            ? router.push("/design3/maliciousResult") :
                                                            record.status === "Suspicious"
                                                                ? router.push("/design3/suspiciousResult")
                                                                : router.push("/design3/safeResult")
                                                    }
                                                >
                                                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                                                        {record.name}
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                                                        {record.date}
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                                                        {record.threatSummary}
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                                                        {record.status === "Safe" && (
                                                            <span className="bg-green-900 text-green-400 text-xs font-semibold px-2 py-1 rounded">
                                                                Safe
                                                            </span>
                                                        )}
                                                        {record.status === "Malicious" && (
                                                            <span className="bg-red-900 text-red-400 text-xs font-semibold px-2 py-1 rounded">
                                                                Malicious
                                                            </span>
                                                        )}
                                                        {record.status === "Suspicious" && (
                                                            <span className="bg-yellow-900 text-yellow-400 text-xs font-semibold px-2 py-1 rounded">
                                                                Suspicious
                                                            </span>
                                                        )}
                                                    </td>
                                                </motion.tr>
                                            ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                    </div>
                    {/* ========================= END of SCAN HISTORY ========================= */}

                </main>
            </div>
        </motion.div>
    );
};

export default RegisterHome;