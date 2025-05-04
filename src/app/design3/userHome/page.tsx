"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Design3 = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    <div className="flex min-h-screen text-gray-100 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Right Section (Main Content) */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-gray-800 border-b border-gray-700 px-4 py-3">

          <Link href="/design3">
            <div className="text-lg font-bold">Welcome to SecureScan</div>
          </Link>
          <div className="space-x-3">
            <Link href="/design3/signIn">
              <button className="text-gray-400 hover:text-indigo-400">Sign in</button>
            </Link>
            <Link href="/design3/signUp">
              <button className="text-white bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700">
                Sign up
              </button>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-6">
            Enter a URL or upload a file to scan for malware
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-4xl">
            {/* URL Risk Analyzer */}
            <div className="bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">URL Risk Analyzer</h2>
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
            </div>

            {/* File Safety Checker */}
            <div className="bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">File Safety Checker</h2>
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
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-auto bg-gray-800 border-t border-gray-700 p-4 text-center">
            <p className="text-sm text-gray-400">
              &copy; 2023 Malware Scanner. All rights reserved.
            </p>
            <p className="text-sm text-gray-400"></p>
            <Link href="/design3/userHome" className="text-indigo-400 hover:text-indigo-300">
              Privacy Policy
            </Link>
          </footer>

        </main>
      </div>
    </div>
  );
};

export default Design3;