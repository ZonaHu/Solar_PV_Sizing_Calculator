import React, {useState} from 'react';
import './App.css'
import {Button, message, Steps, theme, Typography} from 'antd';

import {MyLocation} from './components/MyLocation'
import {ElectricityLoadEstimation} from './components/ElectricityLoadEstimation'
import {EstimationParameters} from './components/EstimationParameters'
import {Results} from './components/Results'
import {SolarPanelParameters} from './components/SolarPanelParameters'

const {Title} = Typography;

const steps = [
    {
        title: 'My Location',
        content: MyLocation,
    },
    {
        title: 'Solar Panel Parameters',
        content: SolarPanelParameters,
    },
    {
        title: 'Electricity Load Estimation',
        content: ElectricityLoadEstimation,
    },
    {
        title: 'Estimation Parameters',
        content: EstimationParameters,
    },
    {
        title: 'Results',
        content: Results,
    },
];

const App = () => {
    const {token} = theme.useToken();
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const [status1, setStatus1] = useState('error')
    const [status2, setStatus2] = useState('error')
    
    const items = steps.map((item) => ({key: item.title, title: item.title}));

    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };
    const onChange = (value) => {
        setCurrent(value);
    };
    return (
        <>
            <Typography><Title level={2}> Solar Panel and Battery Size Calculator </Title></Typography>
            <Steps style={{marginTop: 36}} current={current} items={items} onChange={onChange}/>
            <div style={contentStyle}>{steps[current].content({ status1, setStatus1, status2, setStatus2 })}</div>
            <div style={{marginTop: 24}}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </>
    );
};

export default App;