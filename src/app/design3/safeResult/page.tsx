"use client"
import React from 'react';

const SafeResultPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-gray-800 shadow-md rounded-lg p-6">
        
        {/* --- START: Summary Card --- */}
        <div className="mb-4 bg-gray-700 p-4 rounded flex items-center justify-between">
          <div>
            {/* File Name */}
            <h2 className="text-xl font-semibold text-gray-100">
              report_0425.docx
            </h2>
            {/* Scan Time */}
            <p className="text-sm text-gray-400">
              Scan Time: 4/25/2024, 3:45 PM
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Risk Score */}
            <p className="text-sm text-gray-400">Safe Score: 10/100</p>
            {/* Status Label */}
            <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              SAFE
            </span>
          </div>
        </div>
        {/* --- END: Summary Card --- */}

        <div className="mt-6 space-y-6">
          {/* Threat Classification & Severity Levels Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-100 mb-3">
                Threat Classification
              </h2>
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
                  <tr className="bg-gray-800 hover:bg-gray-600 transition-colors">
                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                      None detected
                    </td>
                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                      N/A
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-100 mb-3">
                Severity Levels
              </h2>
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
                  <tr className="bg-gray-800 hover:bg-gray-600 transition-colors">
                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                      Keylogger
                    </td>
                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                      <span className="bg-gray-600 text-gray-300 text-xs font-semibold px-2 py-1 rounded">
                        Not Detected
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-gray-800 hover:bg-gray-600 transition-colors">
                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                      Info Stealer
                    </td>
                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                      <span className="bg-gray-600 text-gray-300 text-xs font-semibold px-2 py-1 rounded">
                        Not Detected
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-gray-800 hover:bg-gray-600 transition-colors">
                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                      Trojan
                    </td>
                    <td className="px-4 py-2 border border-gray-700 text-gray-300">
                      <span className="bg-gray-600 text-gray-300 text-xs font-semibold px-2 py-1 rounded">
                        Not Detected
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Behavior & Indicators Section */}
          <div className="bg-gray-800 rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-100 mb-3">
              Detected Behavior
            </h2>
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
                <tr className="bg-gray-800 hover:bg-gray-600 transition-colors">
                  <td className="px-4 py-2 border border-gray-700 text-gray-300">
                    Create file
                  </td>
                  <td className="px-4 py-2 border border-gray-700 text-gray-300">
                    No suspicious activity
                  </td>
                  <td className="px-4 py-2 border border-gray-700 text-gray-300">
                    <span className="bg-green-900 text-green-400 text-xs font-semibold px-2 py-1 rounded">
                      Safe
                    </span>
                  </td>
                </tr>
                <tr className="bg-gray-800 hover:bg-gray-600 transition-colors">
                  <td className="px-4 py-2 border border-gray-700 text-gray-300">
                    Connection to Hidden proc
                  </td>
                  <td className="px-4 py-2 border border-gray-700 text-gray-300">
                    No hidden connections
                  </td>
                  <td className="px-4 py-2 border border-gray-700 text-gray-300">
                    <span className="bg-green-900 text-green-400 text-xs font-semibold px-2 py-1 rounded">
                      Safe
                    </span>
                  </td>
                </tr>
                <tr className="bg-gray-800 hover:bg-gray-600 transition-colors">
                  <td className="px-4 py-2 border border-gray-700 text-gray-300">
                    Modification
                  </td>
                  <td className="px-4 py-2 border border-gray-700 text-gray-300">
                    No registry modifications
                  </td>
                  <td className="px-4 py-2 border border-gray-700 text-gray-300">
                    <span className="bg-green-900 text-green-400 text-xs font-semibold px-2 py-1 rounded">
                      Safe
                    </span>
                  </td>
                </tr>
                <tr className="bg-gray-800 hover:bg-gray-600 transition-colors">
                  <td className="px-4 py-2 border border-gray-700 text-gray-300">
                    Packed
                  </td>
                  <td className="px-4 py-2 border border-gray-700 text-gray-300">
                    No packer used
                  </td>
                  <td className="px-4 py-2 border border-gray-700 text-gray-300">
                    <span className="bg-green-900 text-green-400 text-xs font-semibold px-2 py-1 rounded">
                      Safe
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Dataset References Section */}
          <div className="bg-gray-800 rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-100 mb-3">
              Dataset References
            </h2>
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
                <tr className="bg-gray-800 hover:bg-gray-600 transition-colors">
                  <td className="px-4 py-2 border border-gray-700 text-gray-300">
                    VirusShare
                  </td>
                  <td className="px-4 py-2 border border-gray-700 text-gray-300">
                    No known malicious hash matches
                  </td>
                </tr>
                <tr className="bg-gray-800 hover:bg-gray-600 transition-colors">
                  <td className="px-4 py-2 border border-gray-700 text-gray-300">
                    URLhaus
                  </td>
                  <td className="px-4 py-2 border border-gray-700 text-gray-300">
                    No suspicious IP or domain found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafeResultPage;