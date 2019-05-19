import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

function SimpleLineChart(props) {
  const graph_data = props.data.productByCode[0].orders;
  const data = [
    { name: graph_data[0], Price: graph_data[0].order_price, date: graph_data[0].audit_mth},
    { name: graph_data[1], Price: graph_data[1].order_price, date: graph_data[1].audit_mth},
    { name: graph_data[2], Price: graph_data[2].order_price, date: graph_data[2].audit_mth},
    { name: graph_data[3], Price: graph_data[3].order_price, date: graph_data[3].audit_mth},
    { name: graph_data[4], Price: graph_data[4].order_price, date: graph_data[4].audit_mth},
    { name: graph_data[5], Price: graph_data[5].order_price, date: graph_data[5].audit_mth},
    { name: graph_data[6], Price: graph_data[6].order_price, date: graph_data[6].audit_mth},
    { name: graph_data[7], Price: graph_data[7].order_price, date: graph_data[7].audit_mth},
    { name: graph_data[8], Price: graph_data[8].order_price, date: graph_data[8].audit_mth},
    { name: graph_data[9], Price: graph_data[9].order_price, date: graph_data[9].audit_mth},
    { name: graph_data[10], Price: graph_data[10].order_price, date: graph_data[10].audit_mth},
    { name: graph_data[11], Price: graph_data[11].order_price, date: graph_data[11].audit_mth},
  ];

  return (
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="99%" height={320}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis dataKey="Price"/>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Price" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SimpleLineChart;
