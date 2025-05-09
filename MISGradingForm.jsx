import React from "react";
import GradingForm from "./GradingForm";

const misCategories = [
  { name: "Originality & Innovation", max: 30, criteria: "Novelty of the idea, creative use of MIS concepts, unique solution" },
  { name: "Relevance & Problem Fit", max: 25, criteria: "Clear problem identification, appropriate solution fit, addresses real need" },
  { name: "Simple Design & MIS Application", max: 10, criteria: "Applies MIS principles, system components, user-centered design" },
  { name: "Feasibility & Technical Insight", max: 15, criteria: "Realistic implementation, technical understanding, appropriate tools" },
  { name: "Presentation & Communication", max: 10, criteria: "Effective presentation, clear explanation, professional delivery" },
  { name: "Team Collaboration & Effort", max: 10, criteria: "Evidence of teamwork, shared effort, coordinated work" }
];

export default function MISGradingForm() {
  return <GradingForm courseName="MIS Student Innovation Project" categories={misCategories} />;
}
