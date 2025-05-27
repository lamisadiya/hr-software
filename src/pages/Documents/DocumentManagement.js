import React, { useState } from 'react';
import './DocumentManagement.css'; // Optional for styling


const countryChecklists = {
  USA: [
    { id: 1, item: 'W-4 Tax Form', templateUrl: '/templates/usa/w4-template.pdf' },
    { id: 2, item: 'I-9 Employment Verification', templateUrl: '/templates/usa/i9-template.pdf' },
  ],
  Canada: [
    { id: 1, item: 'TD1 Form', templateUrl: '/templates/canada/td1-template.pdf' },
    { id: 2, item: 'SIN Confirmation', templateUrl: '/templates/canada/sin-template.pdf' },
  ],
  Bangladesh: [
    { id: 1, item: 'NID Copy', templateUrl: '/templates/bd/nid-template.pdf' },
    { id: 2, item: 'TIN Certificate', templateUrl: '/templates/bd/tin-template.pdf' },
  ],
};


const DocumentManagement = () => {

  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [uploadedDocs, setUploadedDocs] = useState({});

  const checklist = countryChecklists[selectedCountry];

  const handleFileUpload = (id, file) => {
    const fileInfo = {
      file,
      status: 'Completed',
      timestamp: new Date().toLocaleString(),
    };
    setUploadedDocs({ ...uploadedDocs, [`${selectedCountry}_${id}`]: fileInfo });
  };

  const getStatus = (id) => {
    const key = `${selectedCountry}_${id}`;
    return uploadedDocs[key] ? uploadedDocs[key].status : 'Pending';
  };

  const getTimestamp = (id) => {
    const key = `${selectedCountry}_${id}`;
    return uploadedDocs[key]?.timestamp || '-';
  };

  return (
    <div className="doc-management">
      <h2>Document Management</h2>

      {/* Country Selector */}
      <label>Select Country:</label>
      <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
        {Object.keys(countryChecklists).map((country) => (
          <option key={country}>{country}</option>
        ))}
      </select>

      {/* Checklist Table */}
      <table className="checklist-table">
  <thead>
    <tr>
      <th>Checklist Item</th>
      <th>Status</th>
      <th>Upload File</th>
      <th>Template</th>
      <th>Last Updated</th>
    </tr>
  </thead>
  <tbody>
    {checklist.map((item) => (
      <tr key={item.id}>
        <td>{item.item}</td>
        <td>{getStatus(item.id)}</td>
        <td>
          <input
            type="file"
            onChange={(e) => handleFileUpload(item.id, e.target.files[0])}
          />
        </td>
        <td>
          <a href={item.templateUrl} download target="_blank" rel="noopener noreferrer">
            Download
          </a>
        </td>
        <td>{getTimestamp(item.id)}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default DocumentManagement;
