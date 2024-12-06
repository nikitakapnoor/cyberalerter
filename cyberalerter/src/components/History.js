import React, { useState } from 'react';
import searchIcon from '../images/search.svg'; // Adjust the path to your icon
import { jsPDF } from "jspdf";
import html2pdf from "html2pdf.js"; 
const HistoryComponent = ({ qucikScanData = [] }) => {
  const [activeOption, setActiveOption] = useState('monitorScan'); // State for active option
  const [monitorScans, setMonitorScans] = useState(["a " ,"b"]); // State for monitor scan data
  const [selectedScan, setSelectedScan] = useState(null); // State for selected scan
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [expandedIndex, setExpandedIndex] = useState(null);
  console.log("[qs] history", qucikScanData);

  // View button handler

  // Download button handler
  // const handleDownload = (scan) => {
  //   const blob = new Blob([JSON.stringify(scan.details)], { type: 'application/json' });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = `${scan.productName}-scan-details.json`;
  //   a.click();
  //   URL.revokeObjectURL(url);
  // };

  // const handleDownloadQSPDF = (scanId) => {
  //   const element = document.getElementById(scanId);  // Get the specific div by scanId
    
  //   // Use html2pdf to convert the selected div to PDF
  //   html2pdf()
  //     .from(element)   // Element to convert to PDF
  //     .save(`${scanId}_scan_details.pdf`);  // Download the PDF with a name based on scanId
  // };

  // Filter products based on search query
  const filteredProducts = qucikScanData.filter(product =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 id="history" className="cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <a href={"#history"}>History</a>
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
  <div className='max-h-[90vh]'>
    <div className="bg-white shadow-md rounded-lg p-2 ">
    <div className="flex items-center justify-between mb-2 pb-2 border-b-2 ">
  <h4 className="font-bold text-lg">Quick Scan History</h4>
  <div className="flex items-center w-[40%]">
    <img src={searchIcon} alt="Search Icon" className="w-6 h-6 mr-2" />
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="p-1 border rounded-md flex-1"
      placeholder="Search..."
    />
  </div>
</div>

      {/* Scan List */}
      <div className='max-h-[70vh] overflow-auto'>
      {filteredProducts && filteredProducts.length > 0 ? (
  filteredProducts.map((scan, index) => (
    <div key={index} id={`scan-${index}`}>
      {/* Collapsible Bar */}
      <div
        className={`flex justify-between items-center  p-2 border-b-2 border-b-[#91D5FF] cursor-pointer hover:bg-[#E6F7FF] ${expandedIndex === index && "bg-[#E6F7FF]"}`}
        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
        
      >
        <span className="font-semibold">{scan.productName}</span>
        <div>
          <span>{new Date(scan.scanDate).toLocaleDateString()}</span>
          {/* {expandedIndex === index &&
          <button 
            className='ml-1'
            onClick={(e) => { e.stopPropagation(); handleDownloadQSPDF(`scan-${index}`); }}  // Prevent collapsing and trigger download
          >
            Download PDF
          </button>
} */}
        </div>
      </div>

      {/* Expanded Details */}
      {expandedIndex === index && (
        <div className="mt-2 p-2 rounded-md">
          {scan.results.map((result, resIndex) => {
            let severityColor, severityText, severityBorder;
            switch (result.baseSeverity) {
              case 'Critical':
                severityColor = 'bg-red-100'; severityText='text-red-700'; severityBorder='border-red-500';
                break;
              case 'High':
                severityColor = 'bg-orange-100'; severityText='text-orange-700'; severityBorder='border-orange-500';
                break;
              case 'Medium':
                severityColor = 'bg-yellow-100'; severityText='text-yellow-700'; severityBorder='border-yellow-500';
                break;
              case 'Low':
                severityColor = 'bg-green-100'; severityText='text-green-700'; severityBorder='border-green-500';
                break;
              default:
                severityColor = 'bg-gray-100'; severityText='text-gray-700'; severityBorder='border-gray-500';
            }

            return (
              <div key={resIndex} className={`mb-4 pb-2 rounded-md border ${severityBorder}`}>
                <div className={`font-bold ${severityColor} ${severityText} pt-2 px-2 rounded-t-md`}>
                  CVE ID: {result.cveId}
                </div>
                <div className="mt-2 px-2 pb-2">
                  <p><b>Description:</b> {result.description}</p>
                  <p><b>Published Date:</b> {result.publishedDate ? new Date(result.publishedDate).toLocaleDateString() : 'N/A'}</p>
                  <p><b>Last Modified:</b> {result.lastModified ? new Date(result.lastModified).toLocaleDateString() : 'N/A'}</p>
                  <p><b>Status:</b> {result.vulnStatus}</p>
                  <p><b>Base Score:</b> {result.baseScore}</p>
                  <p><b>Severity:</b> {result.baseSeverity}</p>
                  <p>
                    <b>OEM URL:</b>{" "}
                    <a href={result.oemUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      Details
                    </a>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  ))
) : (
  <p className="text-gray-600">No scan data available.</p>
)}


      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default HistoryComponent;
