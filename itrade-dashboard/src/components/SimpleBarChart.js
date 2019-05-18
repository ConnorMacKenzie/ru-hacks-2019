import React, { PureComponent } from 'react';
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {getDomainOfDataByKey} from "recharts/es6/util/ChartUtils";
import {PropTypes} from "@material-ui/core";

const data = [
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];

let selected;

export default class Example extends PureComponent {
    constructor(props){
        super(props);
        this.state ={
            label: ""
        }
    }
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

    showTooltipData = (data) => {
        if ( typeof data.payload[0] !== 'undefined') {
            return data.payload[0].payload.name
        }
    }

    onBar = (time) => {
        this.props.onChange(time);
    }
    onHover = () => {
        this.props.onHover(this.showTooltipData);
    }

    render() {
        return (
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
                onMouseLeave ={() => {this.onBar('year')}}
            >
                <CartesianGrid strokeDasharray="3 4" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={this.showTooltipData.bind(this)}/>
                <Legend/>
                <Bar dataKey="pv" fill="#8884d8" onMouseOver ={() => {this.onBar('month')}}/>
                <Bar dataKey="uv" fill="#82ca9d" onMouseOver ={this.onHover}/>
            </BarChart>
        );
    }
}
