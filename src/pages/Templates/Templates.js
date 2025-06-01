import React, { useState } from 'react';
import './Templates.css';

const Templates = () => {
  const [templates, setTemplates] = useState([
    { id: 1, name: 'Offer Letter', category: 'HR', fileUrl: '#' },
    { id: 2, name: 'NDA Agreement', category: 'Legal', fileUrl: '#' },
    { id: 3, name: 'Leave Application Form', category: 'HR', fileUrl: '#' },
  ]);
  const [form, setForm] = useState({ name: '', category: '', file: null });
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Template name is required';
    if (!form.category) newErrors.category = 'Category is required';
    if (!form.file) newErrors.file = 'Please select a file';
    return newErrors;
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setUploading(true);
    // Simulate file upload (replace with actual backend integration)
    setTimeout(() => {
      const newTemplate = {
        id: Date.now(),
        name: form.name,
        category: form.category,
        fileUrl: '#', // Placeholder; update with actual file URL from backend
      };
      setTemplates([...templates, newTemplate]);
      setForm({ name: '', category: '', file: null });
      setErrors({});
      setUploading(false);
    }, 1000); // Simulated delay
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, file });
    if (file) {
      setErrors({ ...errors, file: null });
    }
  };

  return (
    <div className="templates-container">
      <h2 className="templates-title">HR Templates Library</h2>

      {/* Upload New Template */}
      <form onSubmit={handleUpload} className="template-form">
        <div className="form-group">
          <label htmlFor="name">Template Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter template name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            aria-required="true"
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            aria-required="true"
            className={errors.category ? 'input-error' : ''}
          >
            <option value="">Select Category</option>
            <option value="HR">HR</option>
            <option value="Legal">Legal</option>
            <option value="Onboarding">Onboarding</option>
            <option value="Exit">Exit</option>
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="file">Template File</label>
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            aria-required="true"
            className={errors.file ? 'input-error' : ''}
          />
          {errors.file && <span className="error-message">{errors.file}</span>}
          {form.file && <span className="file-name">{form.file.name}</span>}
        </div>

        <button
          type="submit"
          aria-label="Upload Template"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Template'}
        </button>
      </form>

      {/* Template List */}
      <table className="template-table">
        <thead>
          <tr>
            <th>Template Name</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.length === 0 ? (
            <tr>
              <td colSpan="3" className="no-data">No templates available</td>
            </tr>
          ) : (
            templates.map((tpl) => (
              <tr key={tpl.id}>
                <td>{tpl.name}</td>
                <td>{tpl.category}</td>
                <td>
                  <a
                    href={tpl.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-link view-link"
                    aria-label={`View ${tpl.name}`}
                  >
                    View
                  </a>
                  <a
                    href={tpl.fileUrl}
                    download
                    className="action-link download-link"
                    aria-label={`Download ${tpl.name}`}
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Templates;