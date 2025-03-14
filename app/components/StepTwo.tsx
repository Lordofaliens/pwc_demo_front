import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

const visualizeStep2Data = (): void => {
    const step2Data = localStorage.getItem('step2Data');
    if (step2Data) {
        const data = JSON.parse(step2Data);
        console.log("Visualizing data:", data);
        // Implement the visualization logic here
        // For example, you can use a library like Chart.js or D3.js to create the visual representation of the star schema
    } else {
        console.error("No data found for step 2 visualization.");
    }
};
const StepTwo: React.FC = () => {
    useEffect(() => {
        visualizeStep2Data();
    }, []);

    return (
        <div className="step-container">
            <h2>Adjustments and Schema Diagram</h2>
            {/* Add your adjustments and schema diagram code here */}
        </div>
    );
};

export default StepTwo;