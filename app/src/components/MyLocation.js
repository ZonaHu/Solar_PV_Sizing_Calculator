import React, { forwardRef, useImperativeHandle } from 'react';
import { Button, Card, Divider, Input, InputNumber, Typography, Upload, message, Form } from 'antd';
import { useState } from 'react';
import { UploadOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

// TODO: need to save the file onto the server


export const MyLocation = forwardRef((props, ref) => {
  // eslint-disable-next-line no-unused-vars
  const [latitude, setLatitude] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [longitude, setLongitude] = useState(null);

  const handleDownloadClick = () => {
    // TODO: Replace the path with the path of the file on the server
    fetch('/app/src/components/assets/new_dheli_pv_Kopie.txt')
      .then((response) => {
        const filename = 'sample.txt';
        response.blob().then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        });
      });
  };


  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const accuracy = position.coords.accuracy;
          const locationResult = `Latitude: ${latitude}, Longitude: ${longitude}, Accuracy: ${accuracy} meters`;

          // TODO: save this location Result as the location data
          console.log(locationResult);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  };

  const [form] = Form.useForm();
  useImperativeHandle(ref, () => ({
    form,
  }));

  // we are using a mock link for now
  const uploadProps = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        form.setFieldValue('fileUrl', info.file.response.url || "https://ant.design/components/form-cn")
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        form.setFieldsValue({ fileUrl: null })
      }
    },
  };

  return <div>
    <Card style={{ width: '90%', margin: '50px', textAlign: 'left' }}>
      <Title level={3}>Welcome!</Title>
      <Paragraph>
        This calculator is intended for homeowners and small to medium businesses to determine how many solar
        panels and how large a storage battery to buy to achieve a certain level of grid independence, based on
        your location, solar panel parameters, and electricity usages. The algorithm accounts for <b> multiple
          roof segments</b>.
      </Paragraph>

      <Paragraph>
        This calculator uses <a href="https://cs.uwaterloo.ca/~fkazhami/papers/synthetic_trace_generation.pdf">machine
          learning</a> to estimate your hourly electricity usage and a <a
            href="https://cs.uwaterloo.ca/~fkazhami/papers/robust-practical-approaches-8.pdf">robust statistical
          algorithm</a> to optimize the amount of solar panels and battery storage needed to fulfill a certain
        portion of your electricity needs with minimum cost.
      </Paragraph>

      <Paragraph>
        To use this calculator, please prepare the following:
        <li className="li-dot"><b>Your location</b>, in terms of longitude and latitude. Later this page you can
          also detect your location with your IP address or enter your city.</li>
        <li className="li-dot"><b>Solar panel parameters</b>, including the tilt and azimuth of your solar
          panel, and what types of panels you intend to install. See detailed instruction at page 2. The
          parameters and instructions are provided by <a
            href="https://pvwatts.nrel.gov/pvwatts.php">PVWatts</a>.
        </li>
        <li className="li-dot"><b>Your electricity statements</b>, up to a year for each month. We are
          interested in how much electricity (in kWh) you used for each month during the past year, as well as
          (optionally) the electricity cost for the last entire year.
        </li>
        <li className="li-dot"><b>Your local system costs</b> for solar panels and batteries. We listed out some
          sample prices per unit in the US but different region has different costs. <a
            href="https://www.energysage.com/solar/">EnergySage</a> provides great instructions and example
          prices.
        </li>
      </Paragraph>
    </Card>
    <Form  name='step1' form={form}>
      <Card style={{ width: '90%', margin: '50px', textAlign: 'center' }}>
        <Title level={3} style={{ textAlign: 'left' }}>Your Location</Title>
        <Paragraph>
          <b>Location</b>: Your location is needed to compute how much electricity your solar panels can generate.
          Enter your locations using one of the following ways:
        </Paragraph>

        <Paragraph>
          <b>Autofill location using your IP address:</b>
          <Button style={{ marginLeft: '10px' }} onClick={getLocation}>Detect Location</Button>
        </Paragraph>

        <Divider>OR</Divider>

        <Paragraph>
          <b>Enter your city:</b>
          <Form.Item noStyle name={'city'} rules={[{required: true,message: "city is required"}]}>
            <Input style={{ width: '200px', borderBottom: '1px solid #000', marginLeft: '10px', borderRadius: 0 }}
              placeholder="your city"
              bordered={false}
            />
          </Form.Item>
        </Paragraph>
        <Divider>OR</Divider>
        <Paragraph>
          <b>Enter your latitude and longitude: </b>
          <Form.Item noStyle name={'latitude'} rules={[{required: true}]}>
            <InputNumber
              style={{ width: '100px', marginLeft: '10px' }}
              placeholder="latitude"
              min="-90"
              max="90"
              step="0.01"
              // onChange={(value) => {
              //   if (value && value !== 0) {
              //     setStatus1('')
              //     setLatitude(value);
              //   } else {
              //     setStatus1('error')
              //     setLatitude(null);
              //   }
              // }}
              stringMode
            />
          </Form.Item>
          <Form.Item noStyle name={'longitude'} rules={[{required: true}]}>
            <InputNumber
              style={{ width: '100px', marginLeft: '10px' }}
              placeholder="longitude"
              min="-180"
              max="180"
              step="0.01"
              stringMode
              // onChange={(value) => {
              //   if (value && value !== 0) {
              //     setStatus2('')
              //     setLongitude(value);
              //   } else {
              //     setStatus2('error')
              //     setLongitude(null);
              //   }
              // }}
            />
          </Form.Item>
        </Paragraph>

        <Divider>OR</Divider>
        <Paragraph>
          <Form.Item noStyle name="fileUrl">
            <Input type='hidden'></Input>
          </Form.Item>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Manually upload PV generation parameters in text file</Button>
          </Upload>
          <Button type="link"
            onClick={handleDownloadClick}
          >
            Download Sample File
          </Button>
        </Paragraph>
      </Card>
    </Form>
  </div>
});

MyLocation.displayName = 'MyLocation';