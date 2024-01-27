import React, {useEffect, useMemo, useRef, useState} from 'react';
import './App.css'
import {Button, message, Steps, theme, Typography} from 'antd';
import {MyLocation} from './components/MyLocation'
import {ElectricityLoadEstimation} from './components/ElectricityLoadEstimation'
import {EstimationParameters} from './components/EstimationParameters'
import {Results} from './components/Results'
import {nextStepAction, prevStepAction, setStepAction, updateFormAction} from "./store/reducer/formSlice";
import {useDispatch, useSelector} from 'react-redux'
import dayjs from 'dayjs';

const {Title} = Typography;

const steps = [
    {
        title: 'My Location',
        content: MyLocation,
    },
    // {
    //   title: 'Solar Panel Parameters',
    //   content: SolarPanelParameters,
    // },
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

function formatData(data) {
    if (!data) {
        return null
    }
    return {
        ...data,
        leaveAt: data.leaveAt ? dayjs(data.leaveAt).format('HH:mm') : null,
        returnAt: data.returnAt ? dayjs(data.returnAt).format('HH:mm') : null,
    }
}

const formatWfh = (data) => {
    const result = {}
    Object.keys(data).forEach((key) => {
        result[key] = data[key] ? 1 : 0
    })
    return result
}

const formatPercent = (data) => {
    const result = {}
    Object.keys(data).forEach((key) => {
        result[key] = (data[key] || 0) / 100
    })
    return result
}

const formatTime = (data) => {
    const result = {}
    Object.keys(data).forEach((key) => {
        result[key] = data[key] ? dayjs(data[key]).format('H.mm') : null
    })
    return result
}

const App = () => {
    const {step, form1, form2, form3} = useSelector(state => state.stepForm)
    const dispatch = useDispatch()
    const {token} = theme.useToken();

    // eslint-disable-next-line no-unused-vars
    const [status1, setStatus1] = useState('error')
    // eslint-disable-next-line no-unused-vars
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
        dispatch(setStepAction(value))
    };

    const [errors, setErrors] = useState([])
    const childRef = useRef();


    const submitForm = async () => {
        console.log('submitting form')
        const form3Values = {
            ...form3,
        }
        const formData = {
            ...form1,
            ...{
                ...form2,
                ...formatPercent({
                    "max_soc": form2.max_soc,
                    "min_soc": form2.min_soc,
                    "chargeState": form2.chargeState,
                    "soc_lim": form2.soc_lim
                }),
                ...formatTime({
                    C_dept: form2.C_dept,
                    C_arr: form2.C_arr,
                }),
                unidirectional: form2.unidirectional ? 1 : 0,
                ...(formatWfh(form2.wfh || {})),
            },
            ...form3Values,
            metric: 1,
            merge_trips: true,
            "path_to_ev_data": "path/to/ev_data_file.txt",
            "ev_generator": {
                "output": "ev_data_file.txt",
                "days": 365,
                "merge_trips": true,
            },
        }
        formData.ev_generator.ev_battery = formData.ev_battery_capacity
        formData.ev_generator.output = "ev_data_file.txt"
        formData.ev_generator.consumption = formData.consumption
        formData.ev_generator.wfh_monday = formData.wfh_monday
        formData.ev_generator.wfh_tuesday = formData.wfh_tuesday
        formData.ev_generator.wfh_wednesday = formData.wfh_wednesday
        formData.ev_generator.wfh_thursday = formData.wfh_thursday
        formData.ev_generator.wfh_friday = formData.wfh_friday
        formData.ev_generator.C_dist = formData.C_dist
        formData.ev_generator.C_dept = formData.C_dept
        formData.ev_generator.C_arr = formData.C_arr
        formData.ev_generator.N_nc = formData.N_nc
        formData.ev_generator.N_nc = formData.N_nc
        delete formData.wfh
        delete formData.consumption
        delete formData.wfh_monday
        delete formData.wfh_tuesday
        delete formData.wfh_wednesday
        delete formData.wfh_thursday
        delete formData.wfh_friday
        delete formData.C_dist
        delete formData.C_dept
        delete formData.C_arr
        delete formData.N_nc
        delete formData.N_nc
        console.log("🚀 ~ submitForm ~ formData:", formData)
        dispatch(nextStepAction())
    }
// else if (current === 1) {
//   return <SolarPanelParameters ref={childRef}/>
// }
    const getElement = (current) => {
        if (current === 0) {
            return <MyLocation ref={childRef}/>
        } else if (current === 1) {
            return <ElectricityLoadEstimation ref={childRef}/>
        } else if (current === 2) {
            return <EstimationParameters ref={childRef}/>
        } else {
            return <Results/>
        }
    }

    const currentFormDataStore = useMemo(() => {
        if (step === 0) {
            return form1
        }
        if (step === 1) {
            return form2
        }
        if (step === 2) {
            return form3
        }
        // if(step === 3){
        //   return form4
        // }
    }, [step, form1, form2, form3])

    useEffect(() => {
        if (step === 3) {
            return
        }
        childRef.current.form.setFieldsValue(currentFormDataStore)
        if (step === 1) {
            // childRef.current.setTrips(currentFormDataStore.trips || [])
        }
    }, [step, currentFormDataStore])

    return (
        <>
            <Typography><Title level={2}> Solar Panel and Battery Size Calculator </Title></Typography>
            <Steps style={{marginTop: 36}} current={step} items={items} onChange={onChange}/>
            <div style={contentStyle}>
                {
                    getElement(step)
                }
            </div>
            <div style={{marginTop: 24}}>
                {step < steps.length - 1 && (
                    <Button type="primary" onClick={async () => {
                        try {
                            const formData = await childRef.current.form.validateFields()
                            dispatch(updateFormAction(formData))
                            setErrors([])
                            // submit the form here
                            if (step === 2) {
                                setTimeout(() => {
                                    submitForm()
                                }, 60)
                                return
                            }
                            dispatch(nextStepAction())
                        } catch (error) {
                            setErrors(error.errorFields)
                            console.log(error)
                        }
                    }}>
                        Next
                    </Button>
                )}
                {step === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {step > 0 && (
                    <Button style={{margin: '0 8px'}} onClick={() => dispatch(prevStepAction())}>
                        Previous
                    </Button>
                )}
            </div>
            {
                errors.map((item, index) => <p key={index} style={{color: 'red'}}>{item.errors[0]}</p>)
            }
        </>
    );
};

export default App;