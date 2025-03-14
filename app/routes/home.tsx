import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import StepThree from "../components/StepThree";
import StepFour from "../components/StepFour";
import "../styles/App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "PwC Price Volume analysis" },
    { name: "description", content: "Our prototype for PwC Price volumen analysis" },
  ];
}

export const totalSteps = 4

export default function Home() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
      default:
        return <StepOne />;
    }
  };

  return (
    <div className="container">
      <header className="bg-primary text-white text-center py-3 mb-4">
        <h1>PwC Price Volume Analysis</h1>
      </header>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      {renderStep()}
      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
          disabled={currentStep === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setCurrentStep((prev) => Math.min(prev + 1, totalSteps))}
          disabled={currentStep === totalSteps}
        >
          Next
        </button>
      </div>
      <footer className="bg-light text-center py-3 mt-4">
        <p>&copy; Made for 2025 TU Delft software project to PwC</p>
      </footer>
    </div>
  );
}
