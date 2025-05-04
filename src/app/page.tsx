// File: src/app/page.tsx
"use client";

import React from "react";
import { ShieldCheck, Zap, Cpu, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  
  const buttons = [
    {
      label: "CyberStrike",
      icon: <Zap className="h-6 w-6 text-purple-400" />, 
      color: "bg-purple-600 hover:bg-purple-500 focus:bg-purple-700",
      path: 'https://cyberstrike-blue.vercel.app',
    },
    {
      label: "SecureScan",
      icon: <ShieldCheck className="h-6 w-6 text-blue-400" />, 
      color: "bg-blue-600 hover:bg-blue-500 focus:bg-blue-700",
      path: '/design3',
    },
    {
      label: "File & URL Scanner",
      icon: <Cpu className="h-6 w-6 text-green-400" />, 
      color: "bg-green-600 hover:bg-green-500 focus:bg-green-700",
      path: '/design3/user',
    },
    {
      label: "Mailbox Threat Detector",
      icon: <Mail className="h-6 w-6 text-red-400" />, 
      color: "bg-red-600 hover:bg-red-500 focus:bg-red-700",
      path: '/mailbox-detector',
    },
  ];

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="p-8 bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-2xl shadow-2xl max-w-xl w-full"
      >
        <motion.h1
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="text-4xl font-extrabold mb-4"
        >
          Welcome to Malware Detection
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-400 mb-8"
        >
          Choose a module to begin. Monitor and protect your assets with confidence.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {buttons.map((btn, idx) => (
            <motion.a
              key={idx}
              href={btn.path}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex items-center
                space-x-2 px-6 py-4 rounded-xl
                shadow-lg transition-transform focus:outline-none
                ${btn.color}
              `}
            >
              {btn.icon}
              <span className="font-semibold">{btn.label}</span>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 text-sm text-gray-500 text-center"
        >
          Need assistance? Visit our <a href="/help" className="text-blue-400 hover:underline">Help Center</a>.
        </motion.div>
      </motion.div>
    </div>
  );
}
