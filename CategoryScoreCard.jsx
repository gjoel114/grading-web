import React from "react";

export default function CategoryScoreCard({
  category,
  score,
  comment,
  onScoreChange,
  onCommentChange
}) {
  const value = Number(score);
  const isInvalid = value < 0 || value > category.max;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">
          {category.name} (Max: {category.max} points)
        </h5>
        <p className="card-text text-muted">
          <small>Criteria: {category.criteria}</small>
        </p>
        <div className="mb-2">
          <input
            type="number"
            min="0"
            max={category.max}
            className={`form-control mb-2 ${isInvalid ? "is-invalid" : ""}`}
            value={score}
            onChange={(e) => onScoreChange(category.name, e.target.value)}
            placeholder="Score"
          />
          {isInvalid && (
            <div className="invalid-feedback">
              Please enter a value between 0 and {category.max}
            </div>
          )}
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Comments"
          value={comment}
          onChange={(e) => onCommentChange(category.name, e.target.value)}
        />
      </div>
    </div>
  );
}
