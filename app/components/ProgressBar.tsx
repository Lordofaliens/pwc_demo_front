import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ProgressBar.css';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    const stepLabels = ['Ingestion', 'Schema Analysis', 'Visualization'];

    return (
        <div className="progress-bar-container">
            {stepLabels.map((label, index) => (
                <div key={index} className="progress-step-container">
                    <div className={`progress-step ${currentStep >= index + 1 ? 'completed' : ''}`}>
                        {label}
                    </div>
                    {index < totalSteps - 1 && (
                        <div className={`progress-line ${currentStep > index + 1 ? 'completed' : ''}`}></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
