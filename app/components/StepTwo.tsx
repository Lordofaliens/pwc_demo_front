import React, { useEffect } from 'react';
import * as d3 from "d3";
import 'bootstrap/dist/css/bootstrap.min.css';
import {getGlobalResponseData} from "~/globalState";


const StepTwo: React.FC = () => {
    useEffect(() => {
        const chartData = getGlobalResponseData();

        let firstYearProjection = chartData ? chartData.firstYearProjection : 0;
        let totalPriceImpact = chartData ? chartData.totalPriceImpact : 0;
        let totalMixImpact = chartData ? chartData.totalMixImpact : 0;
        let totalVolumeImpact = chartData ? chartData.totalVolumeImpact : 0;
        let secondYearProjection = chartData ? chartData.secondYearProjection : 0;



        const data = [
            { label: "Initial Value", open: 0, close: firstYearProjection },
                        { label: "Price", open: firstYearProjection, close: firstYearProjection + totalPriceImpact },
                        { label: "Mix", open: firstYearProjection + totalPriceImpact, close: firstYearProjection + totalPriceImpact - totalMixImpact },
                        { label: "Volume", open: firstYearProjection + totalPriceImpact - totalMixImpact, close : firstYearProjection + totalPriceImpact + totalVolumeImpact },
                        { label: "Result Value", open: 0, close: firstYearProjection + totalPriceImpact + totalVolumeImpact }
        ];

        const svgWidth = 500;
        const svgHeight = 300;
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const barWidth = (svgWidth - margin.left - margin.right) / data.length;

        const svg = d3.select('#histogram')
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Define scales
        const xScale = d3.scaleBand()
            .domain(data.map((_, i) => i.toString())) // Create indices for each candle
            .range([0, svgWidth - margin.left - margin.right])
            .paddingInner(0.3)
            .paddingOuter(0.2);

        const yScale = d3.scaleLinear()
            .domain([
                0,
                d3.max(data, d => Math.max(d.open, d.close)) ?? 0
            ])
            .nice()
            .range([svgHeight - margin.top - margin.bottom, 0]);

        // Create bars (candles)
        svg.selectAll('.candle')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'candle')
            .attr('x', (_, i) => xScale(i.toString()) ?? 0)
            .attr('y', (d: { open: number; close: number; }) => yScale(Math.max(d.open, d.close))) // Position the top of the bar
            .attr('width', barWidth)
            .attr('height', (d: { open: any; close: any; }) => Math.abs(yScale(d.open) - yScale(d.close))) // Height based on Open/Close difference
            .attr('fill', (d: { open: number; close: number; }) => d.open > d.close ? 'red' : 'green'); // Red for down, green for up

        // Add labels to each column
        svg.selectAll('.label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'label')
            .attr('x', (_, i) => (xScale(i.toString()) ?? 0) + barWidth / 2) // Center the label
            .attr('y', svgHeight - margin.top - margin.bottom + 15) // Position the label slightly below each bar
            .attr('text-anchor', 'middle')
            .attr('fill', 'black')
            .text((d: { label: any; }) => d.label);

        // Add magnitude labels on top of each bar
        svg.selectAll('.magnitude')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'magnitude')
            .attr('x', (_, i) => (xScale(i.toString()) ?? 0) + barWidth / 2) // Center the label on top of the bar
            .attr('y', (d: { open: number; close: number; }) => yScale(Math.max(d.open, d.close)) - 5) // Position the label just above the bar
            .attr('text-anchor', 'middle')
            .attr('fill', 'black')
            .text((d: { open: number; close: number; }) => formatMagnitude(d.close-d.open));

        // Add x-axis
        svg.append('g')
            .selectAll('.x-axis')
            .data(data)
            .enter()
            .append('line')
            .attr('class', 'x-axis')
            .attr('x', (_, i) => (xScale(i.toString()) ?? 0) + barWidth / 2)
            .attr('y1', yScale(0))
            .attr('x', (_, i) => (xScale(i.toString()) ?? 0) + barWidth / 2)
            .attr('y2', svgHeight - margin.top - margin.bottom)
            .attr('stroke', 'black')
            .attr('stroke-width', 1);

    }, []);

    const formatMagnitude = (value: number) => {
        const isNegative = value < 0;
        const absValue = Math.abs(value);

        let formattedValue;

        if (absValue >= 1e9) {
            formattedValue = (absValue / 1e9).toFixed(2) + 'B';
        } else if (absValue >= 1e6) {
            formattedValue = (absValue / 1e6).toFixed(2) + 'M';
        } else if (absValue >= 1e3) {
            formattedValue = (absValue / 1e3).toFixed(2) + 'K';
        } else {
            formattedValue = absValue.toFixed(2);
        }

        return isNegative ? `-${formattedValue}` : formattedValue;
    };


    return (
        <div className="step-container">
            <h2>View Analytics</h2>
            <div id="histogram" style={{ display: 'flex', justifyContent: 'center' }}></div>  {/* Adjust the container's size */}
        </div>
    );
};

export default StepTwo;