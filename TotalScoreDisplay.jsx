import React from "react";

export default function TotalScoreDisplay({ total }) {
  return (
    <div className="text-center my-4">
      <h4>Total Score: {total} / 100</h4>
    </div>
  );
}
