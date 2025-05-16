import React, { useState, useEffect } from "react";
import StudentInfoForm from "./StudentInfoForm";
import CategoryScoreCard from "./CategoryScoreCard";
import TotalScoreDisplay from "./TotalScoreDisplay";
import ExportButtons from "./ExportButtons";

export default function GradingForm({ courseName, categories }) {
  const [student, setStudent] = useState({ name: "", id: "" });
  const [scores, setScores] = useState(
    categories.reduce((acc, cat) => ({ ...acc, [cat.name]: "" }), {})
  );
  const [comments, setComments] = useState(
    categories.reduce((acc, cat) => ({ ...acc, [cat.name]: "" }), {})
  );
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = Object.values(scores).reduce((sum, val) => sum + Number(val), 0);
    setTotal(sum);
  }, [scores]);

  const handleScoreChange = (category, value) => {
    const numericValue = Number(value);
    setScores({ ...scores, [category]: numericValue });
  };

  const handleCommentChange = (category, value) => {
    setComments({ ...comments, [category]: value });
  };

  const handleClearAll = () => {
  if (student.name && student.id) {
    saveToLocalStorage();
  }
  setStudent({ name: "", id: "" });
  setScores(categories.reduce((acc, cat) => ({ ...acc, [cat.name]: "" }), {}));
  setComments(categories.reduce((acc, cat) => ({ ...acc, [cat.name]: "" }), {}));
};

  const saveToLocalStorage = () => {
  const record = {
    student,
    scores,
    comments,
    total,
    date: new Date().toISOString(),
    courseName,
  };

  const existing = JSON.parse(localStorage.getItem("gradingRecords") || "[]");
  existing.push(record);
  localStorage.setItem("gradingRecords", JSON.stringify(existing));
};


  return (
    <div className="container my-4">
      <h2 className="mb-4">{courseName} Grading</h2>

      <StudentInfoForm student={student} setStudent={setStudent} />

      {categories.map((cat) => (
        <CategoryScoreCard
          key={cat.name}
          category={cat}
          score={scores[cat.name]}
          comment={comments[cat.name]}
          onScoreChange={handleScoreChange}
          onCommentChange={handleCommentChange}
        />
      ))}

      <TotalScoreDisplay total={total} />

      <div className="d-flex justify-content-center gap-2 mb-3">
        <ExportButtons
          student={student}
          categories={categories}
          scores={scores}
          comments={comments}
          total={total}
        />
        <button className="btn btn-danger" onClick={handleClearAll}>
          Clear All Inputs
        </button>
      </div>
    </div>
  );
}
