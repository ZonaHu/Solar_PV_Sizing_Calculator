import {Card} from 'antd';
import {Divider} from 'antd';
import type { MenuProps } from 'antd';
import {Button, Dropdown, Input, InputNumber, Typography, Space, message} from 'antd';
import {useState} from 'react';
import {DownOutlined, InfoCircleTwoTone} from '@ant-design/icons';

const { Title, Paragraph } = Typography;


const modTypeItems: MenuProps['items1'] = [
    {
        label: 'Standard',
        key: '1',
    },
    {
        label: 'Premium',
        key: '2',
    },
    {
        label: 'Thin film',
        key: '3',
    },
];

const arrayTypeItems: MenuProps['items2'] = [
    {
        label: 'Fixed - Open Rack',
        key: '1',
    },
    {
        label: 'Fixed - Roof Mounted',
        key: '2',
    },
    {
        label: '1 - Axis',
        key: '3',
    },
    {
        label: '1 - Axis Backtracking',
        key: '4',
    },
    {
        label: '2 - Axis',
        key: '5',
    },
];

const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};

const handleAMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};


const modTypeMenuProps = {
    modTypeItems,
    onClick: handleMenuClick,
};

const arrayTypeMenuProps = {
    arrayTypeItems,
    onClick: handleAMenuClick,
};
export const SolarPanelParameters = () => {
    return <div>

        <Title level={4} style={{ padding: '50px 50px 0px', textAlign: 'left'}}> Enter parameters of your solar panel.</Title>


        <Card style={{width: '90%', margin: '50px', textAlign: 'left'}}>
            <Title level={3}>Solar Panel Position</Title>
            <Paragraph>
                <b>Tilt <InfoCircleTwoTone />: </b> {'     '}
                The tilt angle is the angle from horizontal of the solar panel.
                The optimal angle, if possible, is the absolute value of the latitude of your location.
                See below for detailed instruction.
            </Paragraph>

            <Paragraph>
                <b>Azimuth <InfoCircleTwoTone />: </b>
                For a fixed array, the azimuth angle is the <b>angle clockwise from true north</b> describing the direction that the array faces.
                An azimuth angle of 180° is for a south-facing array, and an azimuth angle of zero degrees is for a north-facing array.
                See below for detailed instruction.
            </Paragraph>

            <Paragraph>
                <b>Enter your number of roof segments:</b>
                <InputNumber style={{width: '50px',  marginLeft: '20px'}}
                             min={1} />
            </Paragraph>


            <b>Enter your Tilt and Azimuth: </b>
            <InputNumber
                style={{width: '150px', marginLeft: '10px'}}
                placeholder="Tilt in degrees"
                min="-90"
                max="90"
                step="0.01"
            />
            <InputNumber
                style={{width: '150px', marginLeft: '10px'}}
                placeholder="Azimuth in degrees"
                min="0"
                max="180"
                step="0.01"
            />
        </Card>

        <Card style={{width: '90%', margin: '50px', textAlign: 'left'}}>
            <Title level={3} style={{textAlign: 'left'}}>Solar Panel System Losses</Title>
            <Paragraph>
                <b>System Losses <InfoCircleTwoTone />: </b> The system losses account for performance losses you would expect in a real system that are not explicitly calculated by the PVWatts® model equations. The system losses account for performance losses you would expect in a real system that are not explicitly calculated by the PVWatts® model equations. Click on the info icon for detailed instruction.
            </Paragraph>

            <Paragraph>
                <b>System Losses (%)*</b>
                <InputNumber
                    style={{width: '150px', marginLeft: '10px'}}
                    placeholder="%, [0,99]"
                    min="0"
                    max="99"
                />
            </Paragraph>
        </Card>


        <Card style={{width: '90%', margin: '50px', textAlign: 'left'}}>
            <Title level={3} style={{textAlign: 'left'}}>Solar Panel Type</Title>
            <Paragraph>
                <b>Module Type <InfoCircleTwoTone />: </b>
                The module type describes the type of photovoltaic film used in the solar panel. See below for detailed instruction.
            </Paragraph>

            <Paragraph>
                <b>Array Type <InfoCircleTwoTone />: </b>
                The array type describes whether the solar panel in the array are fixed, or whether they move to track the movement of the sun across the sky with one or two axes of rotation. See below for detailed instruction.
            </Paragraph>

            <Paragraph>
                <b>Module Type *</b>
                <Dropdown menu={modTypeMenuProps} >
                    <Button style={{ marginLeft: '20px'}}>
                        <Space>
                            Button
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </Paragraph>

            <Paragraph>
                <b>Array Type *</b>
                <Dropdown menu={arrayTypeMenuProps} >
                    <Button style={{ marginLeft: '20px'}}>
                        <Space>
                            Button
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </Paragraph>
        </Card>
    </div>
}