import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css'
import { Button, message, Steps, theme, Typography } from 'antd';
import { MyLocation } from './components/MyLocation'
import { ElectricityLoadEstimation } from './components/ElectricityLoadEstimation'
import { EstimationParameters } from './components/EstimationParameters'
import { Results } from './components/Results'
import { SolarPanelParameters } from './components/SolarPanelParameters'
import { nextStepAction, prevStepAction, setStepAction,updateFormAction } from "./store/reducer/formSlice";
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs';

const { Title } = Typography;

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

function formatData(data){
  if(!data){
    return null
  }
  return {
    ...data,
    leaveAt: data.leaveAt  ? dayjs(data.leaveAt).format('HH:mm') : null,
    returnAt: data.returnAt ? dayjs(data.returnAt).format('HH:mm') : null,
  }
}

const App = () => {
  const { step,form1,form2,form3,form4 } = useSelector(state => state.stepForm)
  const dispatch = useDispatch()
  const { token } = theme.useToken();

  // eslint-disable-next-line no-unused-vars
  const [status1, setStatus1] = useState('error')
  // eslint-disable-next-line no-unused-vars
  const [status2, setStatus2] = useState('error')

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

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

  const [errors,setErrors] = useState([])
  const childRef = useRef();


  const submitForm = async () => {
    console.log('submitting form')
    const form3Values = {
      ...form3,
      trips: (form3.trips || []).map((trip)=>{
        return {
          ...trip,
          monday: formatData(trip.monday),
          tuesday: formatData(trip.tuesday),
          wednesday: formatData(trip.wednesday),
          thursday: formatData(trip.thursday),
          friday: formatData(trip.friday),
          saturday: formatData(trip.saturday),
          sunday: formatData(trip.sunday),
        }
      })
    }
    const formData = {
      ...form1,
      ...form2,
      ...form3Values,
      ...form4
    }
    console.log("🚀 ~ submitForm ~ formData:", formData)
    dispatch(nextStepAction())
  }

  const getElement = (current) => {
    if (current === 0) {
      return <MyLocation ref={childRef}/>
    } else if (current === 1) {
      return <SolarPanelParameters ref={childRef}/>
    } else if (current === 2) {
      return <ElectricityLoadEstimation ref={childRef}/>
    } else if (current === 3) {
      return <EstimationParameters ref={childRef}/>
    } else {
      return <Results />
    }
  }

  const currentFormDataStore = useMemo(()=>{
    if(step === 0){
      return form1
    }
    if(step === 1){
      return form2
    }
    if(step === 2){
      return form3
    }
    if(step === 3){
      return form4
    }
  },[step,form1,form2,form3,form4])

  useEffect(()=>{
    if(step === 4){
      return
    }
    childRef.current.form.setFieldsValue(currentFormDataStore)
    if(step === 2){
      childRef.current.setTrips(currentFormDataStore.trips || [])
    }
  },[step,currentFormDataStore])

  return (
    <>
      <Typography><Title level={2}> Solar Panel and Battery Size Calculator </Title></Typography>
      <Steps style={{ marginTop: 36 }} current={step} items={items} onChange={onChange} />
      <div style={contentStyle}>
        {
          getElement(step)
        }
      </div>
      <div style={{ marginTop: 24 }}>
        {step < steps.length - 1 && (
          <Button type="primary" onClick={async () => {
            try {
              const formData = await childRef.current.form.validateFields()
              if(step === 2){
                const trips = childRef.current.trips
                formData.trips = trips
              }
              dispatch(updateFormAction(formData))
              setErrors([])
              // submit the form here
              if(step === 3){
                setTimeout(()=>{
                  submitForm()
                },60)
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
          <Button style={{ margin: '0 8px' }} onClick={() => dispatch(prevStepAction())}>
            Previous
          </Button>
        )}
      </div>
      {
        errors.map((item,index) => <p key={index} style={{color: 'red'}}>{item.errors[0]}</p>)
      }
    </>
  );
};

export default App;