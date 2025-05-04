"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {  PieChart, ShieldAlert, Database, Activity } from 'lucide-react';

const ResultPage = () => {
  const [open, setOpen] = useState({
    classification: true,
    severity: true,
    behavior: true,
    references: true,
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 overflow-hidden"
    >
      {/* Decorative background blobs */}
      <div className="absolute -top-20 -left-20 h-72 w-72 bg-purple-600 opacity-20 blur-3xl animate-blob" />
      <div className="absolute bottom-0 -right-20 h-64 w-64 bg-green-600 opacity-20 blur-3xl animate-blob animation-delay-2000" />
      <div className="max-w-6xl mx-auto bg-gray-800 shadow-md rounded-lg p-6 relative z-10">
        {/* --- START: Summary Card --- */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="mb-4 bg-gray-700 p-4 rounded flex items-center justify-between"
        >
          <div>
            {/* File Name */}
            <h2 className="text-xl font-semibold text-gray-100">
              invoice_0425.exe
            </h2>
            {/* Scan Time */}
            <p className="text-sm text-gray-400">
              Scan Time: 4/25/2024, 3:45 PM
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Risk Score */}
            <p className="text-sm text-gray-400">Risk Score: 110/100</p>
            {/* Status Label */}
            <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              MALICIOUS
            </span>
          </div>
        </motion.div>
        {/* --- END: Summary Card --- */}

        <div className="mt-6 space-y-6">
          {/* Threat Classification & Severity Levels Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800 rounded-lg shadow-sm p-4"
            >
              <button
                onClick={() => setOpen({ ...open, classification: !open.classification })}
                className="w-full flex items-center justify-between mb-3 text-lg font-semibold text-gray-100"
              >
                <div className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5 text-indigo-400" />
                  <span>Threat Classification</span>
                </div>
                <span>{open.classification ? '−' : '+'}</span>
              </button>
              {open.classification && (
                <table className="w-full text-sm border border-gray-700 rounded">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">Threat</th>
                      <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">Confidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    <motion.tr whileHover={{ backgroundColor: '#4b5563' }} transition={{ duration: 0.2 }} className="even:bg-gray-800 hover:bg-gray-600 transition-colors">
                      <td className="px-4 py-2 border border-gray-700 text-gray-300">Keylogger</td>
                      <td className="px-4 py-2 border border-gray-700">
                        <span className="bg-red-900 text-red-400 text-xs font-semibold px-2 py-1 rounded">
                          High
                        </span>
                      </td>
                    </motion.tr>
                    <motion.tr whileHover={{ backgroundColor: '#4b5563' }} transition={{ duration: 0.2 }} className="even:bg-gray-800 hover:bg-gray-600 transition-colors">
                      <td className="px-4 py-2 border border-gray-700 text-gray-300">Info Stealer</td>
                      <td className="px-4 py-2 border border-gray-700">
                        <span className="bg-yellow-900 text-yellow-400 text-xs font-semibold px-2 py-1 rounded">
                          Medium
                        </span>
                      </td>
                    </motion.tr>
                    <motion.tr whileHover={{ backgroundColor: '#4b5563' }} transition={{ duration: 0.2 }} className="even:bg-gray-800 hover:bg-gray-600 transition-colors">
                      <td className="px-4 py-2 border border-gray-700 text-gray-300">Trojan</td>
                      <td className="px-4 py-2 border border-gray-700">
                        <span className="bg-red-900 text-red-400 text-xs font-semibold px-2 py-1 rounded">
                          High
                        </span>
                      </td>
                    </motion.tr>
                  </tbody>
                </table>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800 rounded-lg shadow-sm p-4"
            >
              <button
                onClick={() => setOpen({ ...open, severity: !open.severity })}
                className="w-full flex items-center justify-between mb-3 text-lg font-semibold text-gray-100"
              >
                <div className="flex items-center space-x-2">
                  <ShieldAlert className="h-5 w-5 text-red-400" />
                  <span>Severity Levels</span>
                </div>
                <span>{open.severity ? '−' : '+'}</span>
              </button>
              {open.severity && (
                <table className="w-full text-sm border border-gray-700 rounded">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">Type</th>
                      <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">Severity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <motion.tr whileHover={{ backgroundColor: '#4b5563' }} transition={{ duration: 0.2 }} className="even:bg-gray-800 hover:bg-gray-600 transition-colors">
                      <td className="px-4 py-2 border border-gray-700 text-gray-300">Keylogger</td>
                      <td className="px-4 py-2 border border-gray-700">
                        <span className="bg-red-900 text-red-400 text-xs font-semibold px-2 py-1 rounded">
                          High
                        </span>
                      </td>
                    </motion.tr>
                    <motion.tr whileHover={{ backgroundColor: '#4b5563' }} transition={{ duration: 0.2 }} className="even:bg-gray-800 hover:bg-gray-600 transition-colors">
                      <td className="px-4 py-2 border border-gray-700 text-gray-300">Info Stealer</td>
                      <td className="px-4 py-2 border border-gray-700">
                        <span className="bg-red-900 text-red-400 text-xs font-semibold px-2 py-1 rounded">
                          High
                        </span>
                      </td>
                    </motion.tr>
                    <motion.tr whileHover={{ backgroundColor: '#4b5563' }} transition={{ duration: 0.2 }} className="even:bg-gray-800 hover:bg-gray-600 transition-colors">
                      <td className="px-4 py-2 border border-gray-700 text-gray-300">Trojan</td>
                      <td className="px-4 py-2 border border-gray-700">
                        <span className="bg-yellow-900 text-yellow-400 text-xs font-semibold px-2 py-1 rounded">
                          Medium
                        </span>
                      </td>
                    </motion.tr>
                  </tbody>
                </table>
              )}
            </motion.div>
          </div>

          {/* Behavior & Indicators Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-lg shadow-sm p-4"
          >
            <button
              onClick={() => setOpen({ ...open, behavior: !open.behavior })}
              className="w-full flex items-center justify-between mb-3 text-lg font-semibold text-gray-100"
            >
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-400" />
                <span>Detected Behavior</span>
              </div>
              <span>{open.behavior ? '−' : '+'}</span>
            </button>
            {open.behavior && (
              <table className="w-full text-sm border border-gray-700 rounded">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">Type</th>
                    <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">Detected Behavior</th>
                    <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">Severity</th>
                  </tr>
                </thead>
                <tbody>
                  <motion.tr whileHover={{ backgroundColor: '#4b5563' }} transition={{ duration: 0.2 }} className="even:bg-gray-800 hover:bg-gray-600 transition-colors">
                    <td className="px-4 py-2 border border-gray-700 text-gray-300">Create file</td>
                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                      C:\Windows\System32\ssvchost.exe
                    </td>
                    <td className="px-4 py-2 border border-gray-700">
                      <span className="bg-red-900 text-red-400 text-xs font-semibold px-2 py-1 rounded">
                        High
                      </span>
                    </td>
                  </motion.tr>
                  <motion.tr whileHover={{ backgroundColor: '#4b5563' }} transition={{ duration: 0.2 }} className="even:bg-gray-800 hover:bg-gray-600 transition-colors">
                    <td className="px-4 py-2 border border-gray-700 text-gray-300">Connection to Hidden proc</td>
                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                      IP 185.234.219.12:8030 - ama-prowsell.exe
                    </td>
                    <td className="px-4 py-2 border border-gray-700">
                      <span className="bg-red-900 text-red-400 text-xs font-semibold px-2 py-1 rounded">
                        High
                      </span>
                    </td>
                  </motion.tr>
                  <motion.tr whileHover={{ backgroundColor: '#4b5563' }} transition={{ duration: 0.2 }} className="even:bg-gray-800 hover:bg-gray-600 transition-colors">
                    <td className="px-4 py-2 border border-gray-700 text-gray-300">Modification</td>
                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                      HKCU\Software\Microsoft\Windows\Run
                    </td>
                    <td className="px-4 py-2 border border-gray-700">
                      <span className="bg-red-900 text-red-400 text-xs font-semibold px-2 py-1 rounded">
                        High
                      </span>
                    </td>
                  </motion.tr>
                  <motion.tr whileHover={{ backgroundColor: '#4b5563' }} transition={{ duration: 0.2 }} className="even:bg-gray-800 hover:bg-gray-600 transition-colors">
                    <td className="px-4 py-2 border border-gray-700 text-gray-300">Packed</td>
                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                      Packed with
                    </td>
                    <td className="px-4 py-2 border border-gray-700">
                      <span className="bg-red-900 text-red-400 text-xs font-semibold px-2 py-1 rounded">
                        High
                      </span>
                    </td>
                  </motion.tr>
                </tbody>
              </table>
            )}
          </motion.div>

          {/* Dataset References Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-lg shadow-sm p-4"
          >
            <button
              onClick={() => setOpen({ ...open, references: !open.references })}
              className="w-full flex items-center justify-between mb-3 text-lg font-semibold text-gray-100"
            >
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-yellow-400" />
                <span>Dataset References</span>
              </div>
              <span>{open.references ? '−' : '+'}</span>
            </button>
            {open.references && (
              <table className="w-full text-sm border border-gray-700 rounded">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">Dataset</th>
                    <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <motion.tr whileHover={{ backgroundColor: '#4b5563' }} transition={{ duration: 0.2 }} className="even:bg-gray-800 hover:bg-gray-600 transition-colors">
                    <td className="px-4 py-2 border border-gray-700 text-gray-300">VirusShare</td>
                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                      File Hash SHA256: a8c...,12f3 “AgentTesia” variant
                    </td>
                  </motion.tr>
                  <motion.tr whileHover={{ backgroundColor: '#4b5563' }} transition={{ duration: 0.2 }} className="even:bg-gray-800 hover:bg-gray-600 transition-colors">
                    <td className="px-4 py-2 border border-gray-700 text-gray-300">URLhaus</td>
                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                      C2 Server match: IP: 135.234.212 listed in cishphin
                    </td>
                  </motion.tr>
                </tbody>
              </table>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultPage;