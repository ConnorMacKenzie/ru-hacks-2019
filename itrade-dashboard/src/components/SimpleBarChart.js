import React, { PureComponent } from 'react';
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';



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
            selected = data.payload[0].payload.name
        }
    }

    onBar = () => {
        this.props.onChange("month");
    }
    offBar = () => {
        this.props.onChange("year");
    }
    onHover = () => {
        this.props.onHover(selected);
        console.log("here")

    }

    render() {
        return (
            <BarChart
                width={500}
                height={300}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
                onMouseOver = {this.onBar}
                onMouseLeave = {this.offBar}
            >
                <CartesianGrid strokeDasharray="3 4" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={this.showTooltipData.bind(this)}/>
                <Legend/>
                <Bar dataKey="pv" fill="#8884d8" onMouseOver = {this.onHover}/>
                <Bar dataKey="uv" fill="#82ca9d" onMouseOver = {this.onHover}/>
            </BarChart>
        );
    }
}
