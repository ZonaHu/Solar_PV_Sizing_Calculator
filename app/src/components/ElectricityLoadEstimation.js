import React, { useEffect, useMemo } from 'react';
import { Card, InputNumber, Typography, Form, Input, Switch,TimePicker } from "antd";
import { useState, useImperativeHandle, forwardRef } from "react";
import WeeklyCommutingTable from "./WeeklyCommutingTable";
import dayjs from 'dayjs';

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

const names = [
  "Load_Jan",
  "Load_Feb",
  "Load_Mar",
  "Load_Apr",
  "Load_May",
  "Load_Jun",
  "Load_Jul",
  "Load_Aug",
  "Load_Sep",
  "Load_Oct",
  "Load_Nov",
  "Load_Dec"
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

  const wfh = Form.useWatch('wfh', form)

  const moreThanOneDayNotWfh = useMemo(() => {
    return Object.values(wfh || {}).filter((v) => !v).length > 0
  }, [wfh])

  return <div>
    <Form name='step3'
      form={form} initialValues={{
        monthlyElectricityLoad: monthlyElectricityLoad,
        max_soc: 80,
        min_soc: 20,
        EV_charging: 'naive',
        consumption: 164,
        N_nc: 5,
        monthly_electricity_load: {
          "Load_Jan": 0,
          "Load_Feb": 0,
          "Load_Mar": 0,
          "Load_Apr": 0,
          "Load_May": 0,
          "Load_Jun": 0,
          "Load_Jul": 0,
          "Load_Aug": 0,
          "Load_Sep": 0,
          "Load_Oct": 0,
          "Load_Nov": 0,
          "Load_Dec": 0,
        },
        wfh: {
          "wfh_monday": false,
          "wfh_tuesday": false,
          "wfh_wednesday": false,
          "wfh_thursday": false,
          "wfh_friday": false,
        },
      }}>
      <Title level={4} style={{ padding: '50px 50px 0px', textAlign: 'left' }}> Enter following information for your
        electricity estimation.</Title>
      <Card style={{ width: '90%', margin: '50px', textAlign: 'left' }}>
        <Title level={3} style={{ textAlign: 'left' }}>Electric Vehicle</Title>
        

        <Paragraph>
          <b>What is the maximum State Of Charge for your electric vehicle?</b>
          <Form.Item noStyle name={'max_soc'} rules={[{ required: true, message: "the maximum State Of Charge for this vehicle is required" }]}>
            <InputNumber
              addonAfter={"%"}
              style={{ width: '100px', marginLeft: '10px' }}
              min="0"
            />
          </Form.Item>
        </Paragraph>

        <Paragraph>
          <b>what is the minimum State Of Charge for your electric vehicle?</b>
          <Form.Item noStyle name={'min_soc'} rules={[{ required: true, message: "the minimum State Of Charge for this vehicle is required" }]}>
            <InputNumber
              addonAfter={"%"}
              style={{ width: '100px', marginLeft: '10px' }}
              min="0"
            />
          </Form.Item>
        </Paragraph>

        <Paragraph>
          <b>Enter your battery capacity for this vehicle in kWh:</b>
          <Form.Item noStyle name={'ev_battery_capacity'} rules={[{ required: true, message: "battery capacity for vehicle is required" }]}>
            <InputNumber
              style={{ width: '150px', marginLeft: '10px' }}
              addonAfter={"kWh"}
              min="0"
              step="10"
            />
          </Form.Item>
        </Paragraph>
        <Paragraph>
          <b> What is the charging rate for this vehicle?</b>
          <Form.Item noStyle name={'charging_rate'} rules={[{ required: true, message: "charging rate for this vehicle is required" }]}>
            <InputNumber addonAfter={"%"}
              style={{ width: '100px', marginLeft: '10px' }}
              min="0"
              max="100"
            />
          </Form.Item>
        </Paragraph>
        <Paragraph>
          <b>What's the minimum acceptable State Of Charge?</b>
          <Form.Item noStyle name={'soc_lim'} rules={[{ required: true, message: "the minimum acceptable State Of Charge is required" }]}>
            <InputNumber
              addonAfter={"%"}
              style={{ width: '100px', marginLeft: '10px' }}
              min="0"
              max="100"
            />
          </Form.Item>
        </Paragraph>

        <Paragraph>
          <b>EV_charging</b>
          <Form.Item noStyle name={'EV_charging'} rules={[{ required: true, message: "the minimum acceptable State Of Charge is required" }]}>
            <Input
              style={{ width: '100px', marginLeft: '10px' }}
              disabled
            />
          </Form.Item>
        </Paragraph>

        <Paragraph>
          <b>Is it unidirectional?</b>
          <Form.Item noStyle name={'unidirectional'} valuePropName="checked" rules={[{ required: true }]}>
            <Switch checkedChildren="unidirectional" unCheckedChildren="bidirectional" defaultChecked style={{ width: '120px', marginLeft: '10px' }} />
          </Form.Item>
        </Paragraph>

        <Paragraph>
          <b> When start recharging, what is the state of charge you usually re-charge to?</b>
          <Form.Item noStyle name={'chargeState'} rules={[{ required: true }]}>
            <InputNumber
              addonAfter={"%"}
              style={{ width: '100px', marginLeft: '10px' }}
              min="0"
              max="100"
            />
          </Form.Item>
        </Paragraph>
        <Paragraph>
          <b> What is the consumption of the EV battery in Wh/km?</b>
          <Form.Item noStyle name={'consumption'} rules={[{ required: true }]}>
            <InputNumber
                addonAfter={"Wh/km"}
                style={{ width: '200px', marginLeft: '10px' }}
              min="0"
            />
          </Form.Item>
        </Paragraph>

        <WeeklyCommutingTable />
        {
          moreThanOneDayNotWfh ? <div style={{ marginTop: 20 }}>
            <Paragraph >
              <b> What is the average distance (2-way) you commute with your EV when not working from home?</b>
              <Form.Item noStyle name={'C_dist'} rules={[{ required: true }]}>
                <InputNumber
                  style={{ width: '100px', marginLeft: '10px' }}
                  addonAfter={"km"}
                  min="0"
                />
              </Form.Item>
            </Paragraph>
            <Paragraph>
              <b> What is your average departure time?</b>
              <Form.Item noStyle name={'C_dept'} rules={[{ required: true }]}>
                <TimePicker
                  style={{ width: '120px', marginLeft: '10px' }}
                  format={'HH:mm'}
                ></TimePicker>
              </Form.Item>
            </Paragraph>

            <Paragraph>
              <b> What is your average arrival time?</b>
              <Form.Item noStyle name={'C_arr'} rules={[{ required: true }]}>
                <TimePicker
                    style={{ width: '120px', marginLeft: '10px' }}
                    format={'HH:mm'}
                  ></TimePicker>
              </Form.Item>
            </Paragraph>
          </div>
            : null
        }
        <Paragraph style={{ marginTop: moreThanOneDayNotWfh ? 0 : 20 }}>
          <b> What is your weekly number of non-commuting one-way trips?</b>
          <Form.Item noStyle name={'N_nc'} rules={[{ required: true }]}>
            <InputNumber
              style={{ width: '100px', marginLeft: '10px' }}
              min="0"
            />
          </Form.Item>
        </Paragraph>

      </Card>
      <Card style={{ width: '90%', margin: '50px', textAlign: 'left' }}>
        <Title level={3} style={{ textAlign: 'left' }}>Monthly Electricity Load in kWh</Title>
        {
          monthsGroup.map((months, index) => {
            return <Paragraph key={index}>
              {
                months.map((month, index2) => {
                  const num = index * 4 + index2
                  return <span key={month} style={{ marginLeft: index2 == 0 ? 0 : 16 }}>
                    <b> {month} * </b>
                    <Form.Item noStyle name={['monthly_electricity_load', names[num]]} rules={[{ required: true }]}>
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