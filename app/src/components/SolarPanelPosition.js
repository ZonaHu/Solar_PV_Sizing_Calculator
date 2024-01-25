import React from 'react';
import { Card, InputNumber, Modal, Typography,Form } from 'antd';
import { InfoCircleTwoTone } from "@ant-design/icons";
import { useState } from "react";

const { Title, Paragraph } = Typography;

const SolarPanelPosition = () => {
  const [lines, setLines] = useState(1)
  const arr = Array(100)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = { Tilt: 0, Azimuth: 0 }
  }
  const [data, setData] = useState(arr)
  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  const [isTiltModalOpen, setIsTiltModalOpen] = useState(false);
  const showTiltModal = () => {
    setIsTiltModalOpen(true);
  };

  const handleTiltOk = () => {
    setIsTiltModalOpen(false);
  };

  const handleTiltCancel = () => {
    setIsTiltModalOpen(false);
  };

  const [isAziModalOpen, setIsAziModalOpen] = useState(false);
  const showModal2 = () => {
    setIsAziModalOpen(true);
  };

  const handleAziOk = () => {
    setIsAziModalOpen(false);
  };

  const handleAziCancel = () => {
    setIsAziModalOpen(false);
  };

  return <div>
    <Modal title="Tilt" open={isTiltModalOpen} onOk={handleTiltOk} onCancel={handleTiltCancel}>
      <div>
        <p>The tilt angle is the angle from horizontal of the photovoltaic modules in the array. For a fixed
          array, the tilt angle is the angle from horizontal of the array where 0° = horizontal, and 90° =
          vertical. For arrays with one-axis tracking, the tilt angle is the angle from horizontal of the
          tracking axis. The tilt angle does not apply to arrays with two-axis tracking.</p>
        <p>The PVWatts<sup></sup> default value for the tilt angle depends on the array type: For a fixed array,
          the default value is 20 degrees, and for one-axis tracking the default value is zero. A common rule
          of thumb for fixed arrays is to set the tilt angle to the latitude of the system&apos;s location to
          maximize the system&apos;s total electrical output over the year. Use a lower tilt angle favor peak
          production in the summer months when the sun is high in the sky, or a higher tilt angle to increase
          output during winter months. Higher tilt angles tend to cost more for racking and mounting hardware,
          and may increase the risk of wind damage to the array.</p>
        <p>For an array installed on a building&apos;s roof, you may want to choose a tilt angle equal to the roof
          pitch. Use the table below to convert roof pitch in ratio of rise (vertical) over run (horizontal)
          to tilt angle.</p>
        <table style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', fontSize: '14px' }}>
          <caption style={{ textAlign: 'center' }}>Photovoltaic array tilt angle for different roof pitches
          </caption>
          <tbody>
            <tr>
              <th>Roof Pitch (rise/run)</th>
              <th>Tilt Angle (deg)</th>
            </tr>
            <tr>
              <td>4/12</td>
              <td>18.4</td>
            </tr>
            <tr>
              <td>5/12</td>
              <td>22.6</td>
            </tr>
            <tr>
              <td>6/12</td>
              <td>26.6</td>
            </tr>
            <tr>
              <td>7/12</td>
              <td>30.3</td>
            </tr>
            <tr>
              <td>8/12</td>
              <td>33.7</td>
            </tr>
            <tr>
              <td>9/12</td>
              <td>36.9</td>
            </tr>
            <tr>
              <td>10/12</td>
              <td>39.8</td>
            </tr>
            <tr>
              <td>11/12</td>
              <td>42.5</td>
            </tr>
            <tr>
              <td>12/12</td>
              <td>45.0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>

    <Modal title="Azimuth" open={isAziModalOpen} onOk={handleAziOk} onCancel={handleAziCancel}>
      <div>
        <p>For a fixed array, the azimuth angle is the angle clockwise from true north describing the direction
          that the array faces. An azimuth angle of 180° is for a south-facing array, and an azimuth angle of
          zero degrees is for a north-facing array.</p>
        <p>For an array with one-axis tracking, the azimuth angle is the angle clockwise from true north of the
          axis of rotation. The azimuth angle does not apply to arrays with two-axis tracking.</p>
        <p>The default value is an azimuth angle of 180° (south-facing) for locations in the northern hemisphere
          and 0° (north-facing) for locations in the southern hemisphere. These values typically maximize
          electricity production over the year, although local weather patterns may cause the optimal azimuth
          angle to be slightly more or less than the default values. For the northern hemisphere, increasing
          the azimuth angle favors afternoon energy production, and decreasing the azimuth angle favors
          morning energy production. The opposite is true for the southern hemisphere.</p>
        <table style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', fontSize: '14px' }}>
          <caption style={{ textAlign: 'center' }}>Azimuth angles for different compass headings</caption>
          <tbody>
            <tr>
              <th>Heading</th>
              <th>Azimuth Angle</th>
            </tr>
            <tr>
              <td>N</td>
              <td>0°</td>
            </tr>
            <tr>
              <td>NE</td>
              <td>45°</td>
            </tr>
            <tr>
              <td>E</td>
              <td>90°</td>
            </tr>
            <tr>
              <td>SE</td>
              <td>135°</td>
            </tr>
            <tr>
              <td>S</td>
              <td>180°</td>
            </tr>
            <tr>
              <td>SW</td>
              <td>225°</td>
            </tr>
            <tr>
              <td>W</td>
              <td>270°</td>
            </tr>
            <tr>
              <td>NW</td>
              <td>315°</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
    <Card style={{ width: '90%', margin: '50px', textAlign: 'left' }}>
      <Title level={3}>Solar Panel Position</Title>
      <Paragraph>
        <b>Tilt <InfoCircleTwoTone onClick={showTiltModal} />: </b> {'     '}
        The tilt angle is the angle from horizontal of the solar panel.
        The optimal angle, if possible, is the absolute value of the latitude of your location.
        See below for detailed instruction.
      </Paragraph>

      <Paragraph>
        <b>Azimuth <InfoCircleTwoTone onClick={showModal2} />: </b>
        For a fixed array, the azimuth angle is the <b>angle clockwise from true north</b> describing the
        direction that the array faces.
        An azimuth angle of 180° is for a south-facing array, and an azimuth angle of zero degrees is for a
        north-facing array.
        See below for detailed instruction.
      </Paragraph>

      <Paragraph>
        <b>Enter your number of roof segments:</b>
        <Form.Item name="lines" rules={[{ required: true }]} noStyle>
          <InputNumber style={{ width: '50px', marginLeft: '20px' }}
            value={lines}
            onChange={e => {
              setLines(e)
            }}
            min={1} 
          />
        </Form.Item>
      </Paragraph>
      {
        Array(Number(lines)).fill(0).map((item, index) => <div key={index} style={{ marginBottom: '10px' }}>
          <b>Enter your {index + 1}&apos;s roof segment&apos;s Tilt and Azimuth: </b>
          <Form.Item noStyle name={['linesData',index,'Tilt']} rules={[{required: true}]}>
              <InputNumber
                style={{ width: '150px', marginLeft: '10px' }}
                placeholder="Tilt in degrees"
                min="-90"
                max="90"
                step="0.01"
                value={data[index].Tilt}
                onChange={e => {
                  const oldData = [...data]
                  oldData[index].Tilt = e
                  setData(oldData)
                }}
              />
          </Form.Item>
          <Form.Item noStyle name={['linesData',index,'Azimuth']} rules={[{required: true}]}>
            <InputNumber
              style={{ width: '150px', marginLeft: '10px' }}
              placeholder="Azimuth in degrees"
              min="0"
              max="180"
              step="0.01"
              value={data[index].Azimuth}
              onChange={e => {
                const oldData = [...data]
                oldData[index].Azimuth = e
                setData(oldData)
              }}
            />
          </Form.Item>
        </div>)
      }
    </Card>

  </div>
}
export default SolarPanelPosition;
