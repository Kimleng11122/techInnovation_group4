"use client";
import Link from "next/link";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { v4 as uuid } from "uuid";
import { motion } from 'framer-motion';
import { Database, UploadCloud, Clock } from 'lucide-react';
import { Home, Layers as DatasetIcon, BarChart2 as ModelIcon, Users as UserMgmtIcon } from 'lucide-react';

// --- types ---
type Version = {
  id: string;
  fileName: string;
  fileType: "CSV" | "JSON";
  uploadedAt: string;
};

type Dataset = {
  id: string;
  name: string;
  label: string;             // e.g. VirusShare, Custom, MISP
  enabled: boolean;
  versions: Version[];
};

export default function DatasetManagementPage() {
  // --- state ---
  // --- state (with dummy data for live feel) ---
  const [datasets, setDatasets] = useState<Dataset[]>([
    {
      id: '1',
      name: 'VirusShare Dataset',
      label: 'VirusShare',
      enabled: true,
      versions: [
        {
          id: 'v1',
          fileName: 'virushare_2024-05.csv',
          fileType: 'CSV',
          uploadedAt: 'May 1, 2024, 10:00 AM',
        },
        {
          id: 'v2',
          fileName: 'virushare_2024-06.csv',
          fileType: 'CSV',
          uploadedAt: 'June 1, 2024, 11:30 AM',
        },
      ],
    },
    {
      id: '2',
      name: 'Custom Intelligence Feed',
      label: 'Custom',
      enabled: false,
      versions: [
        {
          id: 'v1',
          fileName: 'custom_feed.json',
          fileType: 'JSON',
          uploadedAt: 'May 15, 2024, 2:45 PM',
        },
      ],
    },
  ]);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadName, setUploadName] = useState("");
  const [uploadLabel, setUploadLabel] = useState("Custom");

  // For preview/edit panel
  const [previewDataset, setPreviewDataset] = useState<Dataset | null>(null);
  const [editRowIndex, setEditRowIndex] = useState<number | null>(null);
  const [editedValue, setEditedValue] = useState("");

  // --- handlers ---
  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) setUploadFile(e.target.files[0]);
  }

  function onUploadSubmit(e: FormEvent) {
    e.preventDefault();
    if (!uploadFile || !uploadName.trim()) return;
    const ext = uploadFile.name.split(".").pop()!.toLowerCase();
    const fileType = ext === "json" ? "JSON" : "CSV";
    const newDataset: Dataset = {
      id: uuid(),
      name: uploadName.trim(),
      label: uploadLabel,
      enabled: true,
      versions: [{
        id: uuid(),
        fileName: uploadFile.name,
        fileType,
        uploadedAt: new Date().toLocaleString(),
      }]
    };
    setDatasets([newDataset, ...datasets]);
    setUploadFile(null);
    setUploadName("");
  }

  function toggleDataset(id: string) {
    setDatasets(d =>
      d.map(ds => ds.id === id ? { ...ds, enabled: !ds.enabled } : ds)
    );
  }

  function onAddVersion(id: string, f: File) {
    const ext = f.name.split(".").pop()!.toLowerCase();
    const fileType = ext === "json" ? "JSON" : "CSV";
    setDatasets(d =>
      d.map(ds =>
        ds.id === id
          ? {
            ...ds,
            versions: [
              {
                id: uuid(),
                fileName: f.name,
                fileType,
                uploadedAt: new Date().toLocaleString(),
              },
              ...ds.versions,
            ],
          }
          : ds
      )
    );
  }

  function onDeleteRow(ds: Dataset, idx: number) {
    setDatasets(d =>
      d.map(x =>
        x.id === ds.id
          ? { ...x, versions: x.versions.filter((_, i) => i !== idx) }
          : x
      )
    );
  }

  function onStartEdit(ds: Dataset, idx: number) {
    setPreviewDataset(ds);
    setEditRowIndex(idx);
    setEditedValue(ds.versions[idx].fileName);
  }

  function onSaveEdit(ds: Dataset) {
    setDatasets(d =>
      d.map(x =>
        x.id === ds.id
          ? {
            ...x,
            versions: x.versions.map((v, i) =>
              i === editRowIndex
                ? { ...v, fileName: editedValue }
                : v
            ),
          }
          : x
      )
    );
    setEditRowIndex(null);
    setEditedValue("");
  }

  // --- render ---
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 overflow-hidden"
    >
      {/* Animated Background Blobs */}
      <div className="absolute -top-32 -left-32 h-80 w-80 bg-purple-600 opacity-20 blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 -right-32 h-72 w-72 bg-green-600 opacity-20 blur-3xl animate-blob animation-delay-2000"></div>

      {/* Sidebar (reuse your existing AdminPanel sidebar) */}
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
            { href: '/design3/admin/dataset-management', label: 'Dataset Management', icon: <DatasetIcon className="h-5 w-5" />, active: true },
            { href: '/design3/admin/ai-model-tuning', label: 'AI Model Tuning', icon: <ModelIcon className="h-5 w-5" /> },
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

      {/* Main */}
      <main className="flex-1 p-6 space-y-8">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center text-3xl font-bold mb-4"
        >
          <Database className="h-8 w-8 text-indigo-400 mr-2" />
          Dataset Management
        </motion.h1>

        {/* Upload Panel */}
        <motion.section
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="bg-gray-800 p-4 rounded shadow relative"
        >
          <div className="absolute top-4 right-4 opacity-30">
            <UploadCloud className="h-6 w-6 text-gray-500 animate-pulse" />
          </div>
          <h2 className="text-lg font-semibold mb-3">Upload Dataset (CSV / JSON)</h2>
          <form onSubmit={onUploadSubmit} className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Dataset Name"
              value={uploadName}
              onChange={e => setUploadName(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded flex-1 focus:outline-none"
            />
            <select
              value={uploadLabel}
              onChange={e => setUploadLabel(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
            >
              <option>VirusShare</option>
              <option>Custom</option>
              <option>MISP</option>
            </select>
            <input
              type="file"
              accept=".csv,.json"
              onChange={onFileChange}
              className="file:mr-4 file:py-2 file:px-4 file:bg-blue-600 file:text-white file:rounded hover:file:bg-blue-500"
            />
            <button
              type="submit"
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-500"
            >
              Upload
            </button>
          </form>
        </motion.section>

        {/* Dataset List + Version Tracking */}
        <section className="space-y-4">
          {datasets.length === 0 ? (
            <p className="text-gray-400">No datasets uploaded yet.</p>
          ) : (
            datasets.map(ds => (
              <motion.div
                key={ds.id}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-gray-800 p-4 rounded shadow relative"
              >
                <div className="absolute top-2 right-2 text-sm text-gray-500">v{ds.versions.length}</div>
                <div className="flex items-center justify-between mb-2">
                  <div className="space-x-3">
                    <span className="font-semibold">{ds.name}</span>
                    <span className="px-2 py-1 text-xs bg-gray-700 rounded">{ds.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleDataset(ds.id)}
                      className={`relative inline-flex items-center h-6 rounded-full w-10 transition-colors focus:outline-none ${ds.enabled ? 'bg-green-500' : 'bg-gray-600'}`}
                      title={ds.enabled ? 'Disable dataset' : 'Enable dataset'}
                    >
                      <span
                        className={`transform transition-transform inline-block w-4 h-4 bg-white rounded-full ${ds.enabled ? 'translate-x-4' : 'translate-x-1'}`}
                      />
                    </button>
                    <input
                      type="file"
                      accept=".csv,.json"
                      onChange={e => e.target.files && onAddVersion(ds.id, e.target.files[0])}
                      className="file:py-1 file:px-2 file:bg-blue-600 file:text-white file:rounded hover:file:bg-blue-500"
                    />
                  </div>
                </div>

                {/* Versions Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-3 py-2 text-left text-gray-300">Version</th>
                        <th className="px-3 py-2 text-left text-gray-300">File Name</th>
                        <th className="px-3 py-2 text-left text-gray-300">Type</th>
                        <th className="px-3 py-2 text-left text-gray-300">Uploaded At</th>
                        <th className="px-3 py-2 text-left text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {ds.versions.map((v, i) => (
                        <motion.tr
                          key={v.id}
                          whileHover={{ backgroundColor: '#374151' }}
                          transition={{ duration: 0.2 }}
                          className="cursor-pointer even:bg-gray-800"
                        >
                          <td className="px-3 py-2">{v.id.slice(0, 8)}</td>
                          <td className="px-3 py-2">
                            {editRowIndex === i && previewDataset?.id === ds.id ? (
                              <input
                                value={editedValue}
                                onChange={e => setEditedValue(e.target.value)}
                                className="bg-gray-800 border border-gray-600 px-2 py-1 rounded text-sm focus:outline-none"
                              />
                            ) : (
                              v.fileName
                            )}
                          </td>
                          <td className="px-3 py-2">{v.fileType}</td>
                          <td className="px-3 py-2">{v.uploadedAt}</td>
                          <td className="px-3 py-2 space-x-2">
                            {editRowIndex === i && previewDataset?.id === ds.id ? (
                              <button
                                onClick={() => onSaveEdit(ds)}
                                className="text-green-400 hover:text-green-300"
                                title="Save row"
                              >
                                Save
                              </button>
                            ) : (
                              <button
                                onClick={() => onStartEdit(ds, i)}
                                className="text-blue-400 hover:text-blue-300"
                                title="Edit row"
                              >
                                Edit
                              </button>
                            )}
                            <button
                              onClick={() => onDeleteRow(ds, i)}
                              className="text-red-400 hover:text-red-300"
                              title="Delete row"
                            >
                              Delete
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ))
          )}
        </section>
      </main>
    </motion.div>
  );
}