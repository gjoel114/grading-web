import React from "react";
import GradingForm from "./GradingForm";

const frontendCategories = [
  { name: "Idea & Problem Description", max: 15, criteria: "Clear problem identification, explained idea and objectives, relevance" },
  { name: "Design & Layout", max: 20, criteria: "Consistent layout, user-friendly, proper use of colors/fonts/spacing" },
  { name: "Responsiveness", max: 15, criteria: "Responsive across devices, uses media queries or frameworks, no breakage" },
  { name: "Functionality", max: 15, criteria: "All features work, good use of JS, no major bugs or broken links" },
  { name: "Code Quality", max: 15, criteria: "Clean readable code, proper indentation, modularity, semantic HTML" },
  { name: "Accessibility", max: 5, criteria: "Basic accessibility (alt text, ARIA, keyboard navigation, contrast)" },
  { name: "Documentation & Presentation", max: 15, criteria: "Clear README or documentation, explains design, organized presentation" }
];

export default function FrontEndGradingForm() {
  return <GradingForm courseName="Front-End Project" categories={frontendCategories} />;
}
