import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {Card, Form, InputNumber, Slider, Typography} from "antd";

import './EP.css';

const {Title, Paragraph} = Typography;

export const EstimationParameters = forwardRef((props, ref) => {
    const [spPrice, setSpPrice] = useState(2590);
    const handleSolarPanelPriceChange = (value) => {
        setSpPrice(value);
    };

    const [form] = Form.useForm();
    useImperativeHandle(ref, () => ({
        form,
    }));

    useEffect(() => {
        form.setFieldsValue({'PV_cost': spPrice});
    }, [spPrice, form])

    const [batteryPrice, setBatteryPrice] = useState(0);

    const handleBatteryPriceChange = (value) => {
        setBatteryPrice(value);
    }

    useEffect(() => {
        form.setFieldsValue({'B_cost': batteryPrice});
    }, [batteryPrice, form])


    return <div>
        <Form name='step4' form={form} initialValues={{
            days_in_chunk: 100,
            pv_max: 10,
            cells_max: 20,
            confidence: 0.8,
        }}>
            <Card style={{width: '90%', margin: '50px', textAlign: 'left'}}>
                <Title level={3} style={{textAlign: 'left'}}>Electricity Target Parameters</Title>
                <Paragraph>
                    The estimation metric we use is <b> Portion of Electricity Met</b>, we maximize the portion of
                    electricity that is fulfilled by the solar panels. i.e. we will provide different levels of portions
                    and
                    the amount of solar panels and batteries needed to achieve such portion.
                </Paragraph>

            </Card>

            <Card style={{width: '90%', margin: '50px', textAlign: 'left'}}>
                <Title level={3} style={{textAlign: 'left'}}>System Costs</Title>

                <Paragraph style={{marginBottom: '20px'}}>
                    The cost of the solar panels (in terms of kW) and battery storages (in terms of kWh). Average prices
                    from several popular manufacturers are listed for reference.
                </Paragraph>
                <div style={{marginBottom: '20px', textAlign: 'center'}}>
                    <Paragraph>
                        <b>Typical prices for solar panels in the US in 2020 (source from
                            <a href="https://news.energysage.com/how-much-does-the-average-solar-panel-installation-cost-in-the-u-s/"> EnergySage</a>)
                        </b>
                    </Paragraph>
                </div>
                <table className="my-table">
                    <thead>
                    <tr>
                        <th>Manufacturer</th>
                        <th>Price Range (6kW system)</th>
                        <th>Price Range (10kW system)</th>
                        <th>Average Price per kW</th>
                        <th>Use this price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Yingli Solar</td>
                        <td>$13,860 – $17,220</td>
                        <td>$23,100 – $28,700</td>
                        <td>$2,590</td>
                        <td>
                            <button className="my-button" onClick={() => setSpPrice(2590)}>Use this price</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Trina Solar</td>
                        <td>$14,940 – $18,300</td>
                        <td>$24,900 – $30,500</td>
                        <td>$2,770</td>
                        <td>
                            <button className="my-button" onClick={() => setSpPrice(2770)}>Use this price</button>
                        </td>
                    </tr>
                    <tr>
                        <td>LG Solar</td>
                        <td>$15,840 – $19,800</td>
                        <td>$26,400 – $33,000</td>
                        <td>$2,970</td>
                        <td>
                            <button className="my-button" onClick={() => setSpPrice(2970)}>Use this price</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div style={{display: 'flex', alignItems: 'center', marginTop: '20px', marginBottom: '20px'}}>
                    <span style={{marginRight: '20px'}}>Solar Panel Cost per kW:</span>
                    <Slider style={{flexGrow: 1}} min={500} max={5000} step={10} value={spPrice}
                            onChange={handleSolarPanelPriceChange}/>
                    <Form.Item noStyle name={'PV_cost'} rules={[{required: true, message: "Cost is required"}]}>
                        <InputNumber style={{marginLeft: '20px', width: '100px'}} min={500} max={5000} step={10}
                                     onChange={handleSolarPanelPriceChange}/>
                    </Form.Item>
                </div>
                <div style={{marginTop: '20px', marginBottom: '20px', textAlign: 'center'}}>
                    <Paragraph>
                        <b>Typical prices for battery storage in the US (source from
                            <a href="https://news.energysage.com/tesla-powerwall-vs-sonnen-eco-vs-lg-chem/"> EnergySage </a>
                            and
                            <a href="https://www.solaris-shop.com/lg-chem-resu10h-9-8kwh-primary-lithium-ion-battery/"> Solaris</a>)
                        </b>
                    </Paragraph>
                </div>
                <table className="my-table">
                    <thead>
                    <tr>
                        <th>Manufacturer</th>
                        <th>Capacity</th>
                        <th>List Price (without installation cost)</th>
                        <th>Warranty</th>
                        <th>Average Price per kWh</th>
                        <th>Use this price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Tesla Powerwall</td>
                        <td>13.5 kWh</td>
                        <td>$6700</td>
                        <td>10 years, 70% capacity</td>
                        <td>$496.30</td>
                        <td>
                            <button className="my-button" onClick={() => setBatteryPrice(496.3)}>Use this price</button>
                        </td>
                    </tr>
                    <tr>
                        <td>LG CHEM RESU10H</td>
                        <td>9.8 kWh</td>
                        <td>$5250</td>
                        <td>10 years, 60% capacity</td>
                        <td>$535.72</td>
                        <td>
                            <button className="my-button" onClick={() => setBatteryPrice(535.72)}>Use this price
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Sonnen eco</td>
                        <td>4 kWh</td>
                        <td>$9950</td>
                        <td>10 years, 70% capacity</td>
                        <td>$2487.5</td>
                        <td>
                            <button className="my-button" onClick={() => setBatteryPrice(2487.5)}>Use this price
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}}>
                    <span style={{marginRight: '20px'}}>Battery Storage Cost per kWh:</span>
                    <Slider style={{flexGrow: 1}} min={100} max={2500} step={10} value={batteryPrice}
                            onChange={handleBatteryPriceChange}/>
                    <Form.Item noStyle name={'B_cost'}
                               rules={[{required: true, message: "Battery Storage Cost per kWh is required"}]}>
                        <InputNumber style={{marginLeft: '20px', width: '100px'}} min={100} max={2500} step={10}
                                     onChange={handleBatteryPriceChange}/>
                    </Form.Item>
                </div>
            </Card>
            <Card style={{width: '90%', margin: '50px', textAlign: 'left'}}>
                <Title level={3} style={{textAlign: 'left'}}>System Capacity</Title>
                <Paragraph>
                    Maximum number of solar panels (in terms of kW) or batteries (in terms of kWh) available for
                    installation, constrained by physical rooftop or storage sizes.
                </Paragraph>
                <Paragraph>
                    See below for instruction on estimating your system capacity.
                </Paragraph>
                <Paragraph>
                    Leaving this to the default values is fine. The calculator will return the optimal, feasible system
                    that
                    exists within the capacity value. Higher capacity may result in less precise answers, whereas
                    capacity
                    is more likely to generate infeasible results.
                </Paragraph>
                <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}}>
                    <span style={{marginRight: '20px'}}>Maximum Solar Panel Capacity:</span>
                    <Form.Item noStyle name={'pv_max'}
                               rules={[{required: true, message: "Solar Panel Capacity is required"}]}>
                        <InputNumber style={{width: '100px'}} min={1}/>
                    </Form.Item>
                </div>
                <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}}>
                    <span style={{marginRight: '20px'}}>Maximum Battery Capacity:</span>
                    <Form.Item noStyle name={'cells_max'}
                               rules={[{required: true, message: "Maximum Battery Capacity is required"}]}>
                        <InputNumber style={{width: '100px'}} min={1}/>
                    </Form.Item>
                </div>
            </Card>

            <Card style={{width: '90%', margin: '50px', textAlign: 'left'}}>
                <Title level={3} style={{textAlign: 'left'}}>Advanced Parameters</Title>
                <Paragraph>
                    <b>Confidence Level and Days in Sample: </b>
                    Our algorithm provides a conservative estimate. It guarantees a level of confidence (between 0.5 to
                    1)
                    such that in any windows of &quot;Days in Sample&quot; days that certain levels of either Portion of
                    Electricity
                    Met or Loss of Load Probability is met.
                </Paragraph>

                <div style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{marginRight: '20px'}}>Confidence Level, [0.5, 1]:</span>
                    <Form.Item noStyle name={'confidence'}
                               rules={[{required: true, message: "Confidence Level is required"}]}>
                        <InputNumber style={{width: '75px'}} min={0.5} max={1} step={0.01}/>
                    </Form.Item>
                </div>

                <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}}>
                    <span style={{marginRight: '20px'}}>Days In Sample:</span>
                    <Form.Item noStyle name={'days_in_chunk'}
                               rules={[{required: true, message: "Days In Sample is required"}]}>
                        <InputNumber style={{width: '75px'}} min={1} max={365} disabled/>
                    </Form.Item>
                </div>
                <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}}>
                    <span style={{marginRight: '20px'}}>epsilon, [0.1, 0.9]:</span>
                    <Form.Item noStyle name={'epsilon'} rules={[{required: true, message: "epsilon is required"}]}>
                        <InputNumber style={{width: '75px'}} min={0.1} max={0.9} step={0.01}/>
                    </Form.Item>
                </div>
            </Card>
        </Form>
    </div>
})

EstimationParameters.displayName = 'EstimationParameters';