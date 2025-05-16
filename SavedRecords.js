import React from "react";

export default function SavedRecords() {
  const records = JSON.parse(localStorage.getItem("gradingRecords") || "[]");

  const downloadAll = () => {
    const csvRows = [
      ["Student Name", "Student ID", "Course", "Total", "Date"],
      ...records.map((r) => [
        r.student.name,
        r.student.id,
        r.courseName,
        r.total,
        new Date(r.date).toLocaleString()
      ])
    ];

    const csvContent = csvRows.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "grading_records.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mt-4">
      <h2>Saved Grading Records</h2>
      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <>
          <button className="btn btn-success mb-3" onClick={downloadAll}>
            Download All as CSV
          </button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>ID</th>
                <th>Course</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i}>
                  <td>{r.student.name}</td>
                  <td>{r.student.id}</td>
                  <td>{r.courseName}</td>
                  <td>{r.total}</td>
                  <td>{new Date(r.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
