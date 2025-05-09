import React from "react";
import GradingForm from "./GradingForm";

const hciCategories = [
  {
    name: "Project Proposal / Innovative Concept",
    max: 15,
    criteria: "Clear description of idea, innovation, target users, team roles"
  },
  {
    name: "User Research Report",
    max: 15,
    criteria: "Well-executed surveys, interviews, persona development to support design"
  },
  {
    name: "Sketches and Low-Fidelity Wireframes",
    max: 10,
    criteria: "Initial interface sketches, wireframes showing structure and flow"
  },
  {
    name: "High-Fidelity Prototype",
    max: 15,
    criteria: "Polished UI prototype (e.g., in Figma) with innovative interactions"
  },
  {
    name: "Interactive or Simulated Demo",
    max: 10,
    criteria: "Functional or video demo clearly showing system operation and interactions"
  },
  {
    name: "Usability Testing Report",
    max: 10,
    criteria: "Testing with users, collected feedback, documented improvements"
  },
  {
    name: "Final Presentation Slides",
    max: 10,
    criteria: "Clear, well-prepared presentation deck summarizing concept and work"
  },
  {
    name: "GitHub Repository",
    max: 10,
    criteria: "Complete repository with README, branches, commit history, and assets"
  },
  {
    name: "Final Project Report",
    max: 5,
    criteria: "Comprehensive written report covering design process, decisions, challenges"
  },
  {
    name: "Contribution to the Project",
    max: 15,
    criteria: "Active individual contribution, collaboration, meaningful participation"
  }
];

export default function HCIGradingForm() {
  return <GradingForm courseName="HCI Innovation Project" categories={hciCategories} />;
}
