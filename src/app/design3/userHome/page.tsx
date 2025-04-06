"use client";

import React, { useState, ChangeEvent } from "react";
import { v4 as uuid } from "uuid";

type FileStatus = "Safe" | "Suspicious";
type FileItem = {
  id: string;
  name: string;
  size?: string;
  status?: FileStatus;
  type: "file" | "url";
};

type Folder = {
  id: string;
  name: string;
  items: FileItem[];
};

export default function UserHome() {
  // -------------------------
  // 1) State
  // -------------------------
  const [folders, setFolders] = useState<Folder[]>([
    {
      id: "1",
      name: "Personal File",
      items: [
        {
          id: "f1",
          name: "report.pdf",
          size: "256 KB",
          status: "Safe",
          type: "file",
        },
        {
          id: "f2",
          name: "photo.jpg",
          size: "1.2 MB",
          status: "Safe",
          type: "file",
        },
        {
          id: "u1",
          name: "http://example.com",
          status: "Suspicious",
          type: "url",
        },
      ],
    },
    { id: "2", name: "My uploaded files", items: [] },
    { id: "3", name: "Downloaded files", items: [] },
  ]);

  const [selectedFolderId, setSelectedFolderId] = useState<string | null>("1");

  // For adding a new folder
  const [newFolderName, setNewFolderName] = useState("");
  // For adding a URL
  const [newURL, setNewURL] = useState("");

  // -------------------------
  // 2) Helpers
  // -------------------------
  const selectedFolder = folders.find((f) => f.id === selectedFolderId);

  function handleSelectFolder(folderId: string) {
    setSelectedFolderId(folderId);
  }

  function handleCreateFolder() {
    if (!newFolderName.trim()) return;
    const newFolder: Folder = {
      id: uuid(),
      name: newFolderName.trim(),
      items: [],
    };
    setFolders((prev) => [...prev, newFolder]);
    setNewFolderName("");
  }

  function handleRenameFolder(folderId: string) {
    const newName = prompt("Enter new folder name:");
    if (!newName) return;
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === folderId ? { ...folder, name: newName } : folder
      )
    );
  }

  function handleDeleteFolder(folderId: string) {
    // Optional: confirm
    if (!confirm("Are you sure you want to delete this folder?")) return;
    setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
    // If we deleted the selected folder, reset selection
    if (selectedFolderId === folderId) {
      setSelectedFolderId(folders.length ? folders[0].id : null);
    }
  }

  // -------------------------
  // 3) File/URL Management
  // -------------------------
  function handleUploadFiles(e: ChangeEvent<HTMLInputElement>) {
    if (!selectedFolder) return;
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newItems: FileItem[] = Array.from(files).map((file) => ({
      id: uuid(),
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      status: "Safe" as FileStatus,
      type: "file",
    }));

    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === selectedFolder.id
          ? { ...folder, items: [...folder.items, ...newItems] }
          : folder
      )
    );
  }

  function handleAddURL() {
    if (!selectedFolder || !newURL.trim()) return;
    const newItem: FileItem = {
      id: uuid(),
      name: newURL.trim(),
      status: "Safe",
      type: "url",
    };

    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === selectedFolder.id
          ? { ...folder, items: [...folder.items, newItem] }
          : folder
      )
    );
    setNewURL("");
  }

  function handleMoveItem(itemId: string, fromFolderId: string, toFolderId: string) {
    if (fromFolderId === toFolderId) return; // no-op
    // 1. Find the item
    const fromFolder = folders.find((f) => f.id === fromFolderId);
    if (!fromFolder) return;
    const itemToMove = fromFolder.items.find((i) => i.id === itemId);
    if (!itemToMove) return;

    // 2. Remove from old folder
    const updatedFromFolder = {
      ...fromFolder,
      items: fromFolder.items.filter((i) => i.id !== itemId),
    };

    // 3. Add to new folder
    const toFolder = folders.find((f) => f.id === toFolderId);
    if (!toFolder) return;
    const updatedToFolder = {
      ...toFolder,
      items: [...toFolder.items, itemToMove],
    };

    // 4. Update state
    setFolders((prev) =>
      prev.map((f) => {
        if (f.id === fromFolderId) return updatedFromFolder;
        if (f.id === toFolderId) return updatedToFolder;
        return f;
      })
    );
  }

  // -------------------------
  // 4) Render
  // -------------------------
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4">
        {/* Create Folder */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="New folder name"
            className="mb-2 w-full rounded-md bg-gray-700 p-2 text-sm text-gray-100 focus:outline-none"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <button
            className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-500"
            onClick={handleCreateFolder}
          >
            + New Folder
          </button>
        </div>

        {/* Folder List */}
        <div>
          {folders.map((folder) => (
            <div
              key={folder.id}
              className={`mb-2 flex items-center justify-between rounded p-2 ${
                folder.id === selectedFolderId ? "bg-gray-700" : "bg-gray-800"
              } hover:bg-gray-700`}
            >
              <div
                className="cursor-pointer"
                onClick={() => handleSelectFolder(folder.id)}
              >
                {folder.name}
              </div>
              {/* Folder Actions */}
              <div className="flex space-x-2 text-sm">
                <button
                  onClick={() => handleRenameFolder(folder.id)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Rename
                </button>
                <button
                  onClick={() => handleDeleteFolder(folder.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Del
                </button>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Page Title */}
        <h1 className="mb-6 text-2xl font-semibold">File &amp; URL Management</h1>

        {/* Selected Folder Name */}
        {selectedFolder ? (
          <div className="mb-4 text-lg font-medium">
            Currently Viewing: {selectedFolder.name}
          </div>
        ) : (
          <div className="mb-4 text-sm text-gray-400">
            Please select or create a folder.
          </div>
        )}

        {/* Tools for Uploading and Adding URL */}
        {selectedFolder && (
          <div className="mb-6 flex items-center gap-4">
            {/* Upload Files */}
            <label className="flex cursor-pointer flex-col items-center rounded bg-blue-600 px-3 py-2 text-sm hover:bg-blue-500">
              <span>Upload File</span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleUploadFiles}
              />
            </label>

            {/* Add URL */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Add URL..."
                className="w-48 rounded bg-gray-800 p-2 text-sm focus:outline-none"
                value={newURL}
                onChange={(e) => setNewURL(e.target.value)}
              />
              <button
                onClick={handleAddURL}
                className="rounded bg-green-600 px-3 py-2 text-sm hover:bg-green-500"
              >
                Add URL
              </button>
            </div>
          </div>
        )}

        {/* Files and URLs Section */}
        <section>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 text-sm font-normal">Name</th>
                <th className="py-2 text-sm font-normal">Size</th>
                <th className="py-2 text-sm font-normal">Status</th>
                <th className="py-2 text-sm font-normal">Move</th>
              </tr>
            </thead>
            <tbody>
              {selectedFolder?.items.map((item) => (
                <tr key={item.id} className="border-b border-gray-700">
                  <td className="py-2 text-sm">{item.name}</td>
                  <td className="py-2 text-sm">{item.size || "—"}</td>
                  <td className="py-2 text-sm">
                    <span
                      className={`rounded px-2 py-1 text-white ${
                        item.status === "Safe" ? "bg-green-600" : "bg-yellow-600"
                      }`}
                    >
                      {item.status || "Safe"}
                    </span>
                  </td>
                  {/* Move to another folder */}
                  <td className="py-2 text-sm">
                    <select
                      className="rounded bg-gray-800 p-1 text-sm text-gray-100"
                      value={selectedFolderId || ""}
                      onChange={(e) =>
                        handleMoveItem(item.id, selectedFolder.id, e.target.value)
                      }
                    >
                      {folders.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              {/* If folder is empty */}
              {selectedFolder?.items.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-sm text-gray-400">
                    This folder is empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}