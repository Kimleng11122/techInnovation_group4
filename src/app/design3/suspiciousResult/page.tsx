"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, ShieldAlert, Activity, Database, Sun } from "lucide-react";

const SuspiciousResultPage = () => {
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
      transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 overflow-hidden p-6"
    >
      {/* Decorative Blobs */}
      <div className="absolute -top-20 -left-20 h-72 w-72 bg-purple-600 opacity-20 blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 -right-20 h-64 w-64 bg-green-600 opacity-20 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="relative max-w-6xl mx-auto bg-gray-800 shadow-md rounded-lg p-6">
        <button
          onClick={() => document.documentElement.classList.toggle('light')}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-700/50 hover:bg-gray-700 text-white"
        >
          <Sun className="h-5 w-5" />
          {/* or swap to <Moon /> based on mode */}
        </button>

        {/* --- START: Summary Card --- */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="mb-4 bg-gray-700 p-4 rounded flex items-center justify-between"
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-100">
              report_0425.docx
            </h2>
            <p className="text-sm text-gray-400">
              Scan Time: 4/25/2024, 3:45 PM
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-400">Suspicious Score: 45/100</p>
            <span className="bg-yellow-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              SUSPICIOUS
            </span>
          </div>
        </motion.div>
        {/* --- END: Summary Card --- */}

        <div className="mt-6 space-y-6">
          {/* Threat Classification & Severity Levels Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Threat Classification */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-gray-800 rounded-lg shadow-sm p-4">
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
                      <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">
                        Threat
                      </th>
                      <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">
                        Confidence
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { threat: "Keylogger", confidence: "Medium" },
                      { threat: "Info Stealer", confidence: "Low" }
                    ].map((item, idx) => (
                      <motion.tr
                        key={idx}
                        whileHover={{ backgroundColor: '#4b5563' }}
                        transition={{ duration: 0.2 }}
                        className="even:bg-gray-800 hover:bg-gray-700 cursor-pointer"
                      >
                        <td className="px-4 py-2 border border-gray-700 text-gray-300">
                          {item.threat}
                        </td>
                        <td className="px-4 py-2 border border-gray-700">
                          <span className="bg-yellow-900 text-yellow-400 text-xs font-semibold px-2 py-1 rounded">
                            {item.confidence}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              )}
            </motion.div>

            {/* Severity Levels */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gray-800 rounded-lg shadow-sm p-4">
              <button
                onClick={() => setOpen({ ...open, severity: !open.severity })}
                className="w-full flex items-center justify-between mb-3 text-lg font-semibold text-gray-100"
              >
                <div className="flex items-center space-x-2">
                  <ShieldAlert className="h-5 w-5 text-indigo-400" />
                  <span>Severity Levels</span>
                </div>
                <span>{open.severity ? '−' : '+'}</span>
              </button>
              {open.severity && (
                <table className="w-full text-sm border border-gray-700 rounded">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">
                        Type
                      </th>
                      <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">
                        Severity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { type: "Keylogger", severity: "Medium" },
                      { type: "Info Stealer", severity: "Low" }
                    ].map((item, idx) => (
                      <motion.tr
                        key={idx}
                        whileHover={{ backgroundColor: '#4b5563' }}
                        transition={{ duration: 0.2 }}
                        className="even:bg-gray-800 hover:bg-gray-700 cursor-pointer"
                      >
                        <td className="px-4 py-2 border border-gray-700 text-gray-300">
                          {item.type}
                        </td>
                        <td className="px-4 py-2 border border-gray-700">
                          <span className="bg-yellow-900 text-yellow-400 text-xs font-semibold px-2 py-1 rounded">
                            {item.severity}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              )}
            </motion.div>
          </div>

          {/* Detected Behavior Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-gray-800 rounded-lg shadow-sm p-4">
            <button
              onClick={() => setOpen({ ...open, behavior: !open.behavior })}
              className="w-full flex items-center justify-between mb-3 text-lg font-semibold text-gray-100"
            >
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-indigo-400" />
                <span>Detected Behavior</span>
              </div>
              <span>{open.behavior ? '−' : '+'}</span>
            </button>
            {open.behavior && (
              <table className="w-full text-sm border border-gray-700 rounded">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">
                      Type
                    </th>
                    <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">
                      Detected Behavior
                    </th>
                    <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">
                      Severity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: "Create file", behavior: "Potential keylogging", severity: "Suspicious" },
                    { type: "Modification", behavior: "Partial registry edits", severity: "Suspicious" }
                  ].map((item, idx) => (
                    <motion.tr
                      key={idx}
                      whileHover={{ backgroundColor: '#4b5563' }}
                      transition={{ duration: 0.2 }}
                      className="even:bg-gray-800 hover:bg-gray-700 cursor-pointer"
                    >
                      <td className="px-4 py-2 border border-gray-700 text-gray-300">
                        {item.type}
                      </td>
                      <td className="px-4 py-2 border border-gray-700 text-gray-300">
                        {item.behavior}
                      </td>
                      <td className="px-4 py-2 border border-gray-700">
                        <span className="bg-yellow-900 text-yellow-400 text-xs font-semibold px-2 py-1 rounded">
                          {item.severity}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </motion.div>

          {/* Dataset References Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-gray-800 rounded-lg shadow-sm p-4">
            <button
              onClick={() => setOpen({ ...open, references: !open.references })}
              className="w-full flex items-center justify-between mb-3 text-lg font-semibold text-gray-100"
            >
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-indigo-400" />
                <span>Dataset References</span>
              </div>
              <span>{open.references ? '−' : '+'}</span>
            </button>
            {open.references && (
              <table className="w-full text-sm border border-gray-700 rounded">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">
                      Dataset
                    </th>
                    <th className="px-4 py-2 border border-gray-700 text-gray-300 text-left">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { dataset: "VirusShare", details: "No direct match, flagged in community" },
                    { dataset: "URLhaus", details: "Domain seen in suspicious campaigns" }
                  ].map((item, idx) => (
                    <motion.tr
                      key={idx}
                      whileHover={{ backgroundColor: '#4b5563' }}
                      transition={{ duration: 0.2 }}
                      className="even:bg-gray-800 hover:bg-gray-700 cursor-pointer"
                    >
                      <td className="px-4 py-2 border border-gray-700 text-gray-300">
                        {item.dataset}
                      </td>
                      <td className="px-4 py-2 border border-gray-700 text-gray-300">
                        {item.details}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SuspiciousResultPage;