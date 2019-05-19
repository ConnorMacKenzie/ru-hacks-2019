import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Dashboard from './components/Dashboard';

const dataMock =[
    {
        "month": "Jan-16",
        "rundown":
            [
                {
                    "id": 12345,
                    "average_price": 1201.23,
                    "categories": [
                        {
                            "unassigned": 145.50
                        },
                        {
                            "food": 1220.23
                        }
                    ],
                    "products": [
                        {
                            "beef": 12345.20
                        },
                        {
                            "chicken": 123.20
                        },
                    ]
                },
                {
                    "id": 23234,
                    "average_price": 1701.23,
                    "categories": [
                        {
                            "unassigned": 1525.50
                        },
                        {
                            "food": 1820.23
                        }
                    ],
                    "products": [
                        {
                            "beef": 1345.20
                        },
                        {
                            "chicken": 1223.20
                        }
                    ]
                }
            ]
    },
    {
        "month": "Feb-16",
        "rundown": [
            {
                "id": 12345,
                "average_price": 1301.23,
                "categories": [
                    {
                        "unassigned": 145.50
                    },
                    {
                        "food": 1220.23
                    }
                ],
                "products": [
                    {
                        "beef": 12345.20
                    },
                    {
                        "chicken": 123.20
                    }
                ]
            },
            {
                "id": 23234,
                "average_price": 1701.23,
                "categories": [
                    {
                        "unassigned": 1525.50
                    },
                    {
                        "food": 1820.23
                    }
                ],
                "products": [
                    {
                        "beef": 1345.20
                    },
                    {
                        "chicken": 1223.20
                    }
                ]
            }
        ]
    },
    {
        "month": "mar-16",
        "rundown": [
            {
                "id": 12345,
                "average_price": 1101.23,
                "categories": [
                    {
                        "unassigned": 145.50
                    },
                    {
                        "food": 1220.23
                    }
                ],
                "products": [
                    {
                        "beef": 12345.20
                    },
                    {
                        "chicken": 123.20
                    }
                ]
            },
            {
                "id": 23234,
                "average_price": 1701.23,
                "categories": [
                    {
                        "unassigned": 1525.50
                    },
                    {
                        "food": 1820.23
                    }
                ],
                "products": [
                    {
                        "beef": 1345.20
                    },
                    {
                        "chicken": 1223.20
                    }
                ]
            }
        ]
    }
];
axios.get("http://localhost:5000/trends/supplier/jan-16").then(response => {
    const data = response.data;
    console.log("success", response);
    ReactDOM.render(
        <div className="Dashboard">
            <Dashboard data={data} /> </div>, document.getElementById('root'));
}).catch((error) => {
    console.log("error", error);
    ReactDOM.render(
        <div className="Dashboard">
            It's fucked
            <Dashboard data={'Shit'} /> </div>, document.getElementById('root'));
});



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
