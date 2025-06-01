import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import './PerformanceTracking.css';

Modal.setAppElement('#root'); // For accessibility

const PerformanceTracking = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [kpi, setKpi] = useState('');
  const [rating, setRating] = useState(1);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [performanceRecords, setPerformanceRecords] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [editEmployee, setEditEmployee] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/api/get_employees.php')
      .then(res => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to load employees.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      setLoading(true);
      axios.get(`http://localhost:8000/api/get_performance.php?employee_id=${selectedEmployee}`)
        .then(res => {
          setPerformanceRecords(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          toast.error('Failed to load performance records.');
          setLoading(false);
        });
    } else {
      setPerformanceRecords([]);
    }
  }, [selectedEmployee]);

  const validateForm = (isEdit = false) => {
    const newErrors = {};
    if (!isEdit && !selectedEmployee) newErrors.employee = 'Employee selection is required';
    if (isEdit && !editEmployee) newErrors.editEmployee = 'Employee selection is required';
    if (!kpi) newErrors.kpi = 'KPI/Goal is required';
    if (!rating) newErrors.rating = 'Rating is required';
    else if (rating < 1 || rating > 5) newErrors.rating = 'Rating must be between 1 and 5';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:8000/api/save_performance.php', {
        employee_id: selectedEmployee,
        kpi,
        rating,
        notes
      });
      toast.success('Performance record saved successfully.');
      setKpi('');
      setRating(1);
      setNotes('');
      setErrors({});
      // Refresh performance records
      const res = await axios.get(`http://localhost:8000/api/get_performance.php?employee_id=${selectedEmployee}`);
      setPerformanceRecords(res.data);
    } catch (err) {
      toast.error('Failed to save performance record.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (record) => {
    setEditRecord(record);
    setEditEmployee(record.employee_id);
    setKpi(record.kpi);
    setRating(record.rating);
    setNotes(record.notes || '');
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditRecord(null);
    setEditEmployee('');
    setKpi('');
    setRating(1);
    setNotes('');
    setErrors({});
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(true);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await axios.put(`http://localhost:8000/api/update_performance.php`, {
        id: editRecord.id,
        employee_id: editEmployee,
        kpi,
        rating,
        notes
      });
      toast.success('Performance record updated successfully.');
      closeModal();
      // Refresh performance records
      const res = await axios.get(`http://localhost:8000/api/get_performance.php?employee_id=${editEmployee}`);
      setPerformanceRecords(res.data);
      setSelectedEmployee(editEmployee); // Update main form employee
    } catch (err) {
      toast.error('Failed to update performance record.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this performance record?')) return;
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8000/api/delete_performance.php?id=${id}`);
      toast.success('Performance record deleted successfully.');
      // Refresh performance records
      const res = await axios.get(`http://localhost:8000/api/get_performance.php?employee_id=${selectedEmployee}`);
      setPerformanceRecords(res.data);
    } catch (err) {
      toast.error('Failed to delete performance record.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="performance-container">
      <h2 className="performance-title">Performance Tracking</h2>
      {loading ? (
        <div className="spinner">Loading...</div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="performance-form">
            <div className="form-group">
              <label htmlFor="employee">Employee</label>
              <select
                id="employee"
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                aria-required="true"
                className={errors.employee ? 'input-error' : ''}
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
              {errors.employee && <span className="error-message">{errors.employee}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="kpi">KPI/Goal</label>
              <input
                id="kpi"
                type="text"
                placeholder="Enter KPI or goal"
                value={kpi}
                onChange={(e) => setKpi(e.target.value)}
                aria-required="true"
                className={errors.kpi ? 'input-error' : ''}
              />
              {errors.kpi && <span className="error-message">{errors.kpi}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating (1–5)</label>
              <input
                id="rating"
                type="number"
                min="1"
                max="5"
                step="1"
                placeholder="Enter rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                aria-required="true"
                className={errors.rating ? 'input-error' : ''}
              />
              {errors.rating && <span className="error-message">{errors.rating}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                placeholder="Enter additional notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button
              type="submit"
              aria-label="Save Performance Record"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Performance'}
            </button>
          </form>

          {selectedEmployee && (
            <div className="performance-history">
              <h3 className="history-title">Performance History</h3>
              <table className="performance-table">
                <thead>
                  <tr>
                    <th>KPI/Goal</th>
                    <th>Rating</th>
                    <th>Notes</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceRecords.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="no-data">No performance records available</td>
                    </tr>
                  ) : (
                    performanceRecords.map(record => (
                      <tr key={record.id}>
                        <td>{record.kpi}</td>
                        <td>{record.rating}</td>
                        <td>{record.notes || '-'}</td>
                        <td>{record.created_at || '-'}</td>
                        <td>
                          <button
                            className="action-btn edit-btn"
                            onClick={() => openEditModal(record)}
                            aria-label={`Edit performance record for ${record.kpi}`}
                          >
                            Edit
                          </button>
                          <button
                            className="action-btn delete-btn"
                            onClick={() => handleDelete(record.id)}
                            aria-label={`Delete performance record for ${record.kpi}`}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="modal"
            overlayClassName="modal-overlay"
            contentLabel="Edit Performance Record"
          >
            <h2 className="modal-title">Edit Performance Record</h2>
            <form onSubmit={handleEditSubmit} className="performance-form">
              <div className="form-group">
                <label htmlFor="edit-employee">Employee</label>
                <select
                  id="edit-employee"
                  value={editEmployee}
                  onChange={(e) => setEditEmployee(e.target.value)}
                  aria-required="true"
                  className={errors.editEmployee ? 'input-error' : ''}
                >
                  <option value="">Select Employee</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
                {errors.editEmployee && <span className="error-message">{errors.editEmployee}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="edit-kpi">KPI/Goal</label>
                <input
                  id="edit-kpi"
                  type="text"
                  placeholder="Enter KPI or goal"
                  value={kpi}
                  onChange={(e) => setKpi(e.target.value)}
                  aria-required="true"
                  className={errors.kpi ? 'input-error' : ''}
                />
                {errors.kpi && <span className="error-message">{errors.kpi}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="edit-rating">Rating (1–5)</label>
                <input
                  id="edit-rating"
                  type="number"
                  min="1"
                  max="5"
                  step="1"
                  placeholder="Enter rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  aria-required="true"
                  className={errors.rating ? 'input-error' : ''}
                />
                {errors.rating && <span className="error-message">{errors.rating}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="edit-notes">Notes</label>
                <textarea
                  id="edit-notes"
                  placeholder="Enter additional notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className="modal-buttons">
                <button
                  type="submit"
                  aria-label="Save Changes"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                  aria-label="Cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        </>
      )}
    </div>
  );
};

export default PerformanceTracking;