import React from 'react';
// var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Statistics = () => {

    const options = {
        theme: "dark2",
        animationEnabled: true,
        exportFileName: "New Year Resolutions",
        exportEnabled: true,
        title:{
            text: "Top Categories of New Year's Resolution"
        },
        data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            toolTipContent: "{label}: <strong>{y}%</strong>",
            indexLabel: "{y}%",
            indexLabelPlacement: "inside",
            dataPoints: [
                { y: 32, label: "Health" },
                { y: 22, label: "Finance" },
                { y: 15, label: "Education" },
                { y: 19, label: "Career" },
                { y: 5, label: "Family" },
                { y: 7, label: "Real Estate" }
            ]
        }]
    }

    return(<div>
        <p>Statistics </p>
     
         </div>);
}

export default Statistics;