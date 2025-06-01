import React, { useState } from 'react';
import './DocumentManagement.css';

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
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState({});

  const checklist = countryChecklists[selectedCountry] || [];

  const handleFileUpload = (id, file) => {
    if (!file) {
      setErrors({ ...errors, [`${selectedCountry}_${id}`]: 'Please select a file' });
      return;
    }
    setUploading({ ...uploading, [`${selectedCountry}_${id}`]: true });
    setErrors({ ...errors, [`${selectedCountry}_${id}`]: null });
    // Simulate file upload (replace with actual backend integration)
    setTimeout(() => {
      const fileInfo = {
        file,
        status: 'Completed',
        timestamp: new Date().toLocaleString(),
      };
      setUploadedDocs({ ...uploadedDocs, [`${selectedCountry}_${id}`]: fileInfo });
      setUploading({ ...uploading, [`${selectedCountry}_${id}`]: false });
    }, 1000); // Simulated delay
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
    <div className="doc-management-container">
      <h2 className="doc-management-title">Document Management</h2>

      {/* Country Selector */}
      <div className="form-group">
        <label htmlFor="country">Select Country</label>
        <select
          id="country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          aria-label="Select country for document checklist"
        >
          {Object.keys(countryChecklists).map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

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
          {checklist.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">No checklist items available</td>
            </tr>
          ) : (
            checklist.map((item) => (
              <tr key={item.id}>
                <td>{item.item}</td>
                <td className={getStatus(item.id) === 'Completed' ? 'status-completed' : 'status-pending'}>
                  {getStatus(item.id)}
                </td>
                <td>
                  <input
                    id={`file-${item.id}`}
                    type="file"
                    onChange={(e) => handleFileUpload(item.id, e.target.files[0])}
                    disabled={uploading[`${selectedCountry}_${item.id}`]}
                    aria-label={`Upload file for ${item.item}`}
                  />
                  {errors[`${selectedCountry}_${item.id}`] && (
                    <span className="error-message">{errors[`${selectedCountry}_${item.id}`]}</span>
                  )}
                  {uploading[`${selectedCountry}_${item.id}`] && (
                    <span className="uploading-message">Uploading...</span>
                  )}
                  {uploadedDocs[`${selectedCountry}_${item.id}`] && (
                    <span className="file-name">{uploadedDocs[`${selectedCountry}_${item.id}`].file.name}</span>
                  )}
                </td>
                <td>
                  <a
                    href={item.templateUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-link"
                    aria-label={`Download template for ${item.item}`}
                  >
                    Download
                  </a>
                </td>
                <td>{getTimestamp(item.id)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentManagement;