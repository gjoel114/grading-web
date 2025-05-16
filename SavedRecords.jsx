import React, { useEffect, useState } from "react";

export default function SavedRecords() {
  const [records, setRecords] = useState([]);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [modalRecord, setModalRecord] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("gradingRecords");
    if (stored) {
      try {
        setRecords(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse gradingRecords:", e);
      }
    }
  }, []);

  const handleCheckboxChange = (index) => {
    setSelectedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSelectAllGroup = (groupIndexes) => {
    const allSelected = groupIndexes.every(i => selectedIndexes.includes(i));
    if (allSelected) {
      setSelectedIndexes(prev => prev.filter(i => !groupIndexes.includes(i)));
    } else {
      setSelectedIndexes(prev => [...new Set([...prev, ...groupIndexes])]);
    }
  };

  const downloadCSV = (recordsToExport, filename = "grading_records.csv") => {
    const csvRows = [
      ["Student Name", "Student ID", "Course", "Total", "Date"],
      ...recordsToExport.map((r) => [
        r.student.name,
        r.student.id,
        r.courseName,
        r.total,
        new Date(r.date).toLocaleString(),
      ]),
    ];
    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadSelected = () => {
    if (selectedIndexes.length === 0) {
      alert("Please select at least one record to download.");
      return;
    }
    if (selectedIndexes.length === 1) {
      const r = records[selectedIndexes[0]];
      const filename = `${r.student.name.replace(/\s+/g, "_")}_${r.student.id}.csv`;
      downloadCSV([r], filename);
    } else {
      downloadCSV(selectedIndexes.map((i) => records[i]), "selected_grading_records.csv");
    }
  };

  const deleteSelected = () => {
    if (selectedIndexes.length === 0) {
      alert("Please select records to delete.");
      return;
    }
    const confirmed = window.confirm("Are you sure you want to delete the selected records?");
    if (!confirmed) return;
    const remaining = records.filter((_, i) => !selectedIndexes.includes(i));
    localStorage.setItem("gradingRecords", JSON.stringify(remaining));
    setRecords(remaining);
    setSelectedIndexes([]);
  };

  const openModal = (record, index) => {
    setModalRecord({ ...record, index });
    setEditData({
      scores: { ...record.scores },
      comments: { ...record.comments },
    });
  };

  const handleScoreChange = (category, value) => {
    setEditData((prev) => ({
      ...prev,
      scores: { ...prev.scores, [category]: value },
    }));
  };

  const handleCommentChange = (category, value) => {
    setEditData((prev) => ({
      ...prev,
      comments: { ...prev.comments, [category]: value },
    }));
  };

  const handleSaveChanges = () => {
    const updated = [...records];
    const index = modalRecord.index;
    const updatedRecord = {
      ...modalRecord,
      scores: editData.scores,
      comments: editData.comments,
      total: Object.values(editData.scores).reduce((sum, val) => sum + Number(val), 0),
    };
    updated[index] = updatedRecord;
    setRecords(updated);
    localStorage.setItem("gradingRecords", JSON.stringify(updated));
    setModalRecord(null);
  };

  const groupedRecords = {
    "Front-End Project": records.filter((r) => r.courseName === "Front-End Project"),
    "MIS Student Innovation Project": records.filter((r) => r.courseName === "MIS Student Innovation Project"),
    "HCI Innovation Project": records.filter((r) => r.courseName === "HCI Innovation Project"),
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Saved Grading Records</h2>
      <div className="mb-3 d-flex flex-wrap gap-2">
        <button className="btn btn-success" onClick={() => downloadCSV(records)}>Download All as CSV</button>
        <button className="btn btn-primary" onClick={downloadSelected}>Download Selected as CSV</button>
        <button className="btn btn-danger" onClick={deleteSelected}>Delete Selected</button>
      </div>

      {Object.entries(groupedRecords).map(([course, group]) => {
        if (group.length === 0) return null;

        const groupIndexes = group.map((r) =>
          records.findIndex(
            (x) => x.student.id === r.student.id && x.courseName === r.courseName
          )
        );
        const selectedCount = groupIndexes.filter(i => selectedIndexes.includes(i)).length;

        return (
          <div className="mb-5" key={course}>
            <h4>{course} <small className="text-muted">({selectedCount} selected)</small></h4>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={groupIndexes.every(i => selectedIndexes.includes(i))}
                        onChange={() => handleSelectAllGroup(groupIndexes)}
                      />
                    </th>
                    <th>Student Name</th>
                    <th>ID</th>
                    <th>Course</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {group.map((r) => {
                    const i = records.findIndex(
                      (x) => x.student.id === r.student.id && x.courseName === r.courseName
                    );
                    return (
                      <tr key={i}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedIndexes.includes(i)}
                            onChange={() => handleCheckboxChange(i)}
                          />
                        </td>
                        <td>{r.student.name}</td>
                        <td>{r.student.id}</td>
                        <td>{r.courseName}</td>
                        <td>{r.total}</td>
                        <td>{new Date(r.date).toLocaleString()}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-info" onClick={() => openModal(r, i)}>
                            View / Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {modalRecord && (
        <div className="modal d-block" tabIndex="-1" role="dialog" onClick={() => setModalRecord(null)}>
          <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Grading Details</h5>
                <button type="button" className="btn-close" onClick={() => setModalRecord(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Student:</strong> {modalRecord.student.name}</p>
                <p><strong>ID:</strong> {modalRecord.student.id}</p>
                <p><strong>Course:</strong> {modalRecord.courseName}</p>
                <hr />
                {Object.keys(editData.scores).map((category) => (
                  <div key={category} className="mb-3">
                    <label><strong>{category}</strong></label>
                    <input
                      type="number"
                      className="form-control mb-1"
                      value={editData.scores[category]}
                      onChange={(e) => handleScoreChange(category, e.target.value)}
                    />
                    <textarea
                      className="form-control"
                      placeholder="Comment (optional)"
                      value={editData.comments[category] || ""}
                      onChange={(e) => handleCommentChange(category, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleSaveChanges}>Save Changes</button>
                <button className="btn btn-secondary" onClick={() => setModalRecord(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
