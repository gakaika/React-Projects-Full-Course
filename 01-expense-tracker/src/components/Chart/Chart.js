import ChartBar from "./ChartBar"

import "./Chart.css";

const Chart = (props) => {
    const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value);
    const totalMaxValue = Math.max(...dataPointValues);
    
    const chartBars = props.dataPoints.map((dataPoint) => <ChartBar key={dataPoint.label} value={dataPoint.value} maxValue={totalMaxValue} label={dataPoint.label}/>);

    return (
        <div className="chart">
            {chartBars}
        </div>
    );

}

export default Chart;