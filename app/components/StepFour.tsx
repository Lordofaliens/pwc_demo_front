import React, { useEffect } from 'react';
import * as d3 from 'd3';
import 'bootstrap/dist/css/bootstrap.min.css';

const StepFour: React.FC = () => {
    useEffect(() => {
        // D3.js code to create a histogram
        const data = [/* Your data here */];
        const svg = d3.select('#histogram')
            .append('svg')
            .attr('width', 500)
            .attr('height', 300);

        // Add your D3.js histogram code here
    }, []);

    return (
        <div className="step-container">
            <h2>View Analytics</h2>
            <div id="histogram"></div>
        </div>
    );
};

export default StepFour;