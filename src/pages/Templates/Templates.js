import React, { useState } from 'react';
import './Templates.css'; // Optional: external CSS for better styling

const Templates = () => {
  const [templates, setTemplates] = useState([
    { id: 1, name: 'Offer Letter', category: 'HR', fileUrl: '#' },
    { id: 2, name: 'NDA Agreement', category: 'Legal', fileUrl: '#' },
    { id: 3, name: 'Leave Application Form', category: 'HR', fileUrl: '#' },
  ]);

  const [form, setForm] = useState({ name: '', category: '', file: '' });

  const handleUpload = (e) => {
    e.preventDefault();
    const newTemplate = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      fileUrl: '#', // Placeholder for now
    };
    setTemplates([...templates, newTemplate]);
    setForm({ name: '', category: '', file: '' });
  };

  return (
    <div>
      <h2>HR Templates Library</h2>

      {/* Upload New Template */}
      <form onSubmit={handleUpload} className="template-form">
        <input
          type="text"
          placeholder="Template Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="HR">HR</option>
          <option value="Legal">Legal</option>
          <option value="Onboarding">Onboarding</option>
          <option value="Exit">Exit</option>
        </select>
        <input
          type="file"
          onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
        />
        <button type="submit">Upload</button>
      </form>

      {/* Template List */}
      <table className="template-table">
        <thead>
          <tr>
            <th>Template Name</th>
            <th>Category</th>
            <th>Preview/Download</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((tpl) => (
            <tr key={tpl.id}>
              <td>{tpl.name}</td>
              <td>{tpl.category}</td>
              <td>
                <a href={tpl.fileUrl} target="_blank" rel="noopener noreferrer">
                  View
                </a>
                {' | '}
                <a href={tpl.fileUrl} download>
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Templates;
