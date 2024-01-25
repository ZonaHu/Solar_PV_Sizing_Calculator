import React from 'react';
import { Card, InputNumber, Typography, Form } from "antd";
import { useState, useImperativeHandle, forwardRef } from "react";
import WeeklyCommutingTable from "./WeeklyCommutingTable";

const { Title, Paragraph } = Typography;

const monthsGroup = [
  ["January",
    "February",
    "March",
    "April"],
  ["May",
    "June",
    "July ",
    "August"],
  ["September",
    "October",
    "November",
    "December"]
]

export const ElectricityLoadEstimation = forwardRef((props, ref) => {
  const [numVehicles, setNumVehicles] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [lines, setLines] = useState(1)
  const arr = Array(100)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = { Cap: 0 }
  }
  const [monthlyElectricityLoad] = useState(Array(12).fill(0));

  const [trips, setTrips] = useState([
    {
      key: "row-0",
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null,
    },
  ]);

  const [tripCounter, setTripCounter] = useState(1);

  const [form] = Form.useForm();
  useImperativeHandle(ref, () => ({
    form,
    trips,
    setTrips,
  }));

  return <div>
    <Form name='step3' form={form} initialValues={{
      monthlyElectricityLoad: monthlyElectricityLoad,
    }}>
      <Title level={4} style={{ padding: '50px 50px 0px', textAlign: 'left' }}> Enter following information for your
        electricity
        estimation.</Title>
      <Card style={{ width: '90%', margin: '50px', textAlign: 'left' }}>
        <Title level={3} style={{ textAlign: 'left' }}>Electric Vehicle</Title>
        <Paragraph>
          <b>Enter the number of electric vehicle you have: </b>
          <Form.Item noStyle name={'vehicle'} rules={[{ required: true, message: "vehicle is required" }]}>
            <InputNumber
              style={{ width: '50px', marginLeft: '10px' }}
              onChange={setNumVehicles}
              min={1}
            />
          </Form.Item>
        </Paragraph>

        <Paragraph>
          <b> How many of them are bidirectional? </b>
          <Form.Item noStyle name={'bidirectional'} rules={[{ required: true, message: "bidirectional is required" }]}>
            <InputNumber
              style={{ width: '50px', marginLeft: '10px' }}
              min="0"
            />
          </Form.Item>
        </Paragraph>

        {
          Array(Number(numVehicles)).fill(0).map((item, index) => <div key={index} style={{ marginBottom: '10px' }}>
            <b>Enter your battery capacity for vehicle #{index + 1} in kWh: </b>
            <Form.Item noStyle name={['capacities', index, 'cap']} rules={[{ required: true, message: "capacity is required" }]}>
              <InputNumber
                style={{ width: '150px', marginLeft: '10px' }}
                addonAfter={"kWh"}
                min="0"
                step="10"
              // value={data[index].Cap}
              // onChange={e => {
              //   const oldData = [...data]
              //   oldData[index].Cap = e
              //   setData(oldData)
              // }}
              />
            </Form.Item>
          </div>)
        }

        <Paragraph>
          <b> When start recharging, what is the state of charge you usually re-charge to?</b>
          <Form.Item noStyle name={'chargeState'} rules={[{ required: true }]}>
            <InputNumber addonAfter={"%"}
              style={{ width: '100px', marginLeft: '10px' }}
              min="0"
              max="100"
            />
          </Form.Item>
        </Paragraph>
        <WeeklyCommutingTable numVehicles={numVehicles} trips={trips} tripCounter={tripCounter} setTripCounter={setTripCounter}
          setTrips={setTrips} />
      </Card>
      <Card style={{ width: '90%', margin: '50px', textAlign: 'left' }}>
        <Title level={3} style={{ textAlign: 'left' }}>Monthly Electricity Load in kWh</Title>
        {
          monthsGroup.map((months, index) => {
            return <Paragraph key={index}>
              {
                months.map((month, index2) => {
                  const num = index * 4 + index2
                  return <span key={month}>
                    <b> {month} * </b>
                    <Form.Item noStyle name={['monthlyElectricityLoad', num]} rules={[{ required: true }]}>
                      <InputNumber
                        style={{ width: '100px', marginLeft: '10px' }}
                        min="0"
                      />
                    </Form.Item>
                  </span>
                })
              }
            </Paragraph>
          })
        }
      </Card>
    </Form>
  </div>
})

ElectricityLoadEstimation.displayName = 'ElectricityLoadEstimation';