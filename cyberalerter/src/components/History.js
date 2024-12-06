import React, { useState } from 'react';
import searchIcon from '../images/search.svg'; // Adjust the path to your icon

const HistoryComponent = ({ qucikScanData = [] }) => {
  const [activeOption, setActiveOption] = useState('monitorScan'); // State for active option
  const [monitorScans, setMonitorScans] = useState([]); // State for monitor scan data
  const [selectedScan, setSelectedScan] = useState(null); // State for selected scan
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  console.log("[qs] history", qucikScanData);

  // View button handler
  const handleView = (scan) => {
    setSelectedScan(scan);
  };

  // Download button handler
  const handleDownload = (scan) => {
    const blob = new Blob([JSON.stringify(scan.details)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${scan.productName}-scan-details.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter products based on search query
  const filteredProducts = qucikScanData.filter(product =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 id="history" className="cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <b>History</b>
        </h3>
      </div>

      {/* Options for Monitor Scans and Other History */}
      <div className="flex space-x-4">
        <button
          className={`${
            activeOption === 'monitorScan' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'
          }`}
          onClick={() => setActiveOption('monitorScan')}>
          <b>Monitor Scan History</b>
        </button>
        <button
          className={`${
            activeOption === 'otherHistory' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'
          }`}
          onClick={() => setActiveOption('otherHistory')}
        >
          <b>Single Scan History</b>
        </button>
      </div>

      {/* Render content based on active option */}
      {activeOption === 'monitorScan' && (
        <div>
          <div>
            <ul className="flex space-x-4"> {/* Flex container for horizontal layout */}
              {monitorScans.map((scan, index) => (
                <li
                  key={index}
                  className={`cursor-pointer shadow-md border-2 p-1 rounded-lg ${
                    selectedScan === scan ? "bg-blue-800 text-white border-blue-600" : "bg-white"
                  }`}
                  onClick={() => setSelectedScan(scan)}
                >
                  {scan.productName}
                </li>
              ))}
            </ul>
          </div>

          {/* Display selected scan below */}
          {selectedScan && (
            <div className="mt-4">
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h4><b>Selected Scan:</b> {selectedScan.productName}</h4>
                <p><b>Details about:</b> {selectedScan.details}.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Table for scan history */}
      {activeOption === 'otherHistory' && (
        <div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h4><b>Quick Scan History</b></h4>

            {/* Search Bar */}
            <div className="flex items-center mb-4">
              <img src={searchIcon} alt="Search Icon" className="w-6 h-6 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Search Products..."
              />
            </div>

            <div>
              {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((scan, index) => (
                  <div key={index} className="mb-4 p-4 border rounded-md">
                    <h5><b>Product Name:</b> {scan.productName}</h5>
                    <p><b>Product Version:</b> {scan.productVersion}</p>
                    <p><b>CVE ID:</b> {scan.cveId}</p>
                    <p><b>Scan Date:</b> {new Date(scan.scanDate).toLocaleDateString()}</p>
                    <p><b>Scan ID:</b> {scan.scanId}</p>
                    <h6><b>Results:</b></h6>
                    {scan.results.map((result, resIndex) => (
                      <div key={resIndex} className="ml-4">
                        <p><b>CVE ID:</b> {result.cveId}</p>
                        <p><b>Description:</b> {result.description}</p>
                        <p><b>Published Date:</b> {result.publishedDate ? new Date(result.publishedDate).toLocaleDateString() : 'N/A'}</p>
                        <p><b>Last Modified:</b> {result.lastModified ? new Date(result.lastModified).toLocaleDateString() : 'N/A'}</p>
                        <p><b>Status:</b> {result.vulnStatus}</p>
                        <p><b>Base Score:</b> {result.baseScore}</p>
                        <p><b>Severity:</b> {result.baseSeverity}</p>
                        <p><b>OEM URL:</b> <a href={result.oemUrl} target="_blank" rel="noopener noreferrer">Details</a></p>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <p>No scan data available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryComponent;
