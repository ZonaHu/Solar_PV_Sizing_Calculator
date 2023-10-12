import React from 'react';
import {Card, InputNumber, Typography} from "antd";
import {useState} from "react";
import WeeklyCommutingTable from "./WeeklyCommutingTable";

const {Title, Paragraph} = Typography;

export const ElectricityLoadEstimation = () => {
    const [numVehicles, setNumVehicles] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [lines, setLines] = useState(1)
    const arr = Array(100)
    for (let i = 0; i < arr.length; i++) {
        arr[i] = {Cap: 0}
    }
    const [data, setData] = useState(arr)
    const [bidirectionalVehicles, setBidirectionalVehicles] = useState(0);
    const [stateOfCharge, setStateOfCharge] = useState(0);
    const [monthlyElectricityLoad, setMonthlyElectricityLoad] = useState(Array(12).fill(0));


    return <div>
        <Title level={4} style={{padding: '50px 50px 0px', textAlign: 'left'}}> Enter following information for your
            electricity
            estimation.</Title>
        <Card style={{width: '90%', margin: '50px', textAlign: 'left'}}>
            <Title level={3} style={{textAlign: 'left'}}>Electric Vehicle</Title>

            <Paragraph>
                <b>Enter the number of electric vehicle you have: </b>
                <InputNumber
                    style={{width: '50px', marginLeft: '10px'}}
                    value={numVehicles}
                    onChange={setNumVehicles}
                    min={1}
                />
            </Paragraph>

            <Paragraph>
                <b> How many of them are bidirectional? </b>
                <InputNumber
                    style={{width: '50px', marginLeft: '10px'}}
                    value={bidirectionalVehicles}
                    onChange={setBidirectionalVehicles}
                    min="0"
                />
            </Paragraph>

            {
                Array(Number(lines)).fill(0).map((item, index) => <div key={index} style={{marginBottom: '10px'}}>
                    <b>Enter your battery capacity for vehicle #{index + 1} in kWh: </b>
                    <InputNumber
                        style={{width: '150px', marginLeft: '10px'}}
                        addonAfter={"kWh"}
                        min="0"
                        step="10"
                        value={data[index].Cap}
                        onChange={e => {
                            const oldData = [...data]
                            oldData[index].Cap = e
                            setData(oldData)
                        }}
                    />
                </div>)
            }

            <Paragraph>
                <b> When start recharging, what is the state of charge you usually re-charge to?</b>
                <InputNumber addonAfter={"%"}
                             style={{width: '100px', marginLeft: '10px'}}
                             value={stateOfCharge}
                             onChange={setStateOfCharge}
                             min="0"
                             max="100"
                />
            </Paragraph>

            <WeeklyCommutingTable numVehicles={numVehicles}/>
        </Card>

        <Card style={{width: '90%', margin: '50px', textAlign: 'left'}}>
            <Title level={3} style={{textAlign: 'left'}}>Monthly Electricity Load in kWh</Title>

            <Paragraph>
                <b> January * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    value={monthlyElectricityLoad[0]}
                    onChange={value => {
                        const newLoad = [...monthlyElectricityLoad];
                        newLoad[0] = value;
                        setMonthlyElectricityLoad(newLoad);
                    }}
                    min="0"
                />
                <b style={{marginLeft: '10px'}}> February * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    value={monthlyElectricityLoad[1]}
                    onChange={value => {
                        const newLoad = [...monthlyElectricityLoad];
                        newLoad[1] = value;
                        setMonthlyElectricityLoad(newLoad);
                    }}
                    min="0"
                />
                <b style={{marginLeft: '10px'}}> March * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    value={monthlyElectricityLoad[2]}
                    onChange={value => {
                        const newLoad = [...monthlyElectricityLoad];
                        newLoad[2] = value;
                        setMonthlyElectricityLoad(newLoad);
                    }}
                    min="0"
                />
                <b style={{marginLeft: '10px'}}> April * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    value={monthlyElectricityLoad[3]}
                    onChange={value => {
                        const newLoad = [...monthlyElectricityLoad];
                        newLoad[3] = value;
                        setMonthlyElectricityLoad(newLoad);
                    }}
                    min="0"
                />
            </Paragraph>
            <Paragraph>
                <b> May * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    value={monthlyElectricityLoad[4]}
                    onChange={value => {
                        const newLoad = [...monthlyElectricityLoad];
                        newLoad[4] = value;
                        setMonthlyElectricityLoad(newLoad);
                    }}
                    min="0"
                />
                <b style={{marginLeft: '10px'}}> June * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    value={monthlyElectricityLoad[5]}
                    onChange={value => {
                        const newLoad = [...monthlyElectricityLoad];
                        newLoad[5] = value;
                        setMonthlyElectricityLoad(newLoad);
                    }}
                    min="0"
                />
                <b style={{marginLeft: '10px'}}> July * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    value={monthlyElectricityLoad[6]}
                    onChange={value => {
                        const newLoad = [...monthlyElectricityLoad];
                        newLoad[6] = value;
                        setMonthlyElectricityLoad(newLoad);
                    }}
                    min="0"
                />
                <b style={{marginLeft: '10px'}}> August * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    value={monthlyElectricityLoad[7]}
                    onChange={value => {
                        const newLoad = [...monthlyElectricityLoad];
                        newLoad[7] = value;
                        setMonthlyElectricityLoad(newLoad);
                    }}
                    min="0"
                />
            </Paragraph>
            <Paragraph>
                <b> September * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    value={monthlyElectricityLoad[8]}
                    onChange={value => {
                        const newLoad = [...monthlyElectricityLoad];
                        newLoad[8] = value;
                        setMonthlyElectricityLoad(newLoad);
                    }}
                    min="0"
                />
                <b style={{marginLeft: '10px'}}> October * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    value={monthlyElectricityLoad[9]}
                    onChange={value => {
                        const newLoad = [...monthlyElectricityLoad];
                        newLoad[9] = value;
                        setMonthlyElectricityLoad(newLoad);
                    }}
                    min="0"
                />
                <b style={{marginLeft: '10px'}}> November * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    value={monthlyElectricityLoad[10]}
                    onChange={value => {
                        const newLoad = [...monthlyElectricityLoad];
                        newLoad[10] = value;
                        setMonthlyElectricityLoad(newLoad);
                    }}
                    min="0"
                />
                <b style={{marginLeft: '10px'}}> December * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    value={monthlyElectricityLoad[11]}
                    onChange={value => {
                        const newLoad = [...monthlyElectricityLoad];
                        newLoad[11] = value;
                        setMonthlyElectricityLoad(newLoad);
                    }}
                    min="0"
                />
            </Paragraph>
        </Card>
    </div>
}