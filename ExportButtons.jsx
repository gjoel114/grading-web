import React from "react";
import { saveAs } from "file-saver";

export default function ExportButtons({ student, categories, scores, comments, total }) {
  const exportCSV = () => {
    let csvContent = `Student Name,${student.name}\nStudent ID,${student.id}\n\nCategory,Score,Max,Comment\n`;
    categories.forEach((cat) => {
      csvContent += `${cat.name},${scores[cat.name]},${cat.max},"${comments[cat.name]}"\n`;
    });
    csvContent += `\nTotal,${total},100\n`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${student.name || "student"}_grading.csv`);
  };

  const exportPDF = () => {
    window.print();
  };

  return (
    <div className="d-flex justify-content-center gap-2">
      <button className="btn btn-primary" onClick={exportCSV}>
        Export as CSV
      </button>
      <button className="btn btn-secondary" onClick={exportPDF}>
        Export as PDF
      </button>
    </div>
  );
}
