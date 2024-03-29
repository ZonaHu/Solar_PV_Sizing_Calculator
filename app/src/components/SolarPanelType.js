import React from 'react';
import { Card, Modal, Typography,Select,Form} from 'antd';
import { InfoCircleTwoTone} from "@ant-design/icons";
import {useState} from "react";

const {Title, Paragraph} = Typography;

const SolarPanelType = () => {

    const showModal5 = () => {
        setIsModalOpen5(true);
    };

    const showModal4 = () => {
        setIsModalOpen4(true);
    };

    const [isModalOpen4, setIsModalOpen4] = useState(false);

    const handleOk4 = () => {
        setIsModalOpen4(false);
    };

    const handleCancel4 = () => {
        setIsModalOpen4(false);
    };
    const [isModalOpen5, setIsModalOpen5] = useState(false);


    const handleOk5 = () => {
        setIsModalOpen5(false);
    };

    const handleCancel5 = () => {
        setIsModalOpen5(false);
    };

    const itemsMod = [
        {
            label: 'Standard',
            value: 'Standard',
        },
        {
            label: 'Premium',
            value: 'Premium',
        },
        {
            label: 'Thin film',
            value: 'Thin film',
        },
    ];


    const arrayTypeItems = [
        {
            label: 'Fixed - Open Rack',
            value: 'Fixed - Open Rack',
        },
        {
            label: 'Fixed - Roof Mounted',
            value: 'Fixed - Roof Mounted',
        },
        {
            label: '1 - Axis',
            value: '1 - Axis',
        },
        {
            label: '1 - Axis Backtracking',
            value: '1 - Axis Backtracking',
        },
        {
            label: '2 - Axis',
            value: '2 - Axis',
        },
    ];

    return <div>
        <Card style={{width: '90%', margin: '50px', textAlign: 'left'}}>
            <Modal title="Module Type" open={isModalOpen4} onOk={handleOk4} onCancel={handleCancel4}>
                <div>
                    <p>The module type describes the photovoltaic modules in the array. If you do not have information
                        about
                        the modules in the system, use the default Standard module type. Otherwise, you can use
                        information
                        from the module data sheet and the table below to choose the module type.</p>
                    <table style={{textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', fontSize: '14px'}}>
                        <caption style={{textAlign: 'center'}}>Module Type Options</caption>
                        <tbody>
                        <tr>
                            <th>PVWatts<sup>®</sup> Module Type</th>
                            <th>Cell Material</th>
                            <th>Approximate Nominal Efficiency</th>
                            <th>Module Cover</th>
                            <th>Temperature Coefficient of Power</th>
                        </tr>
                        <tr>
                            <td>Standard</td>
                            <td>Crystalline Silicon</td>
                            <td>15%</td>
                            <td>Glass</td>
                            <td>-0.47 %/°C</td>
                        </tr>
                        <tr>
                            <td>Premium</td>
                            <td>Crystalline Silicon</td>
                            <td>19%</td>
                            <td>Glass with anti-reflective coating</td>
                            <td>-0.35 %/°C</td>
                        </tr>
                        <tr>
                            <td>Thin Film</td>
                            <td>Thin film</td>
                            <td>10%</td>
                            <td>Glass</td>
                            <td>-0.20 %/°C</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </Modal>
            <Modal title="Array Type" open={isModalOpen5} onOk={handleOk5} onCancel={handleCancel5}>
                <div>
                    <p>The array type describes whether the PV modules in the array are fixed, or whether they move to
                        track
                        the movement of the sun across the sky with one or two axes of rotation. The default value is
                        for a
                        fixed array, or one with no tracking. Use the following diagrams to choose the appropriate
                        option
                        for your system:</p>
                    <figure>
                        <img width="550" src="assets/img/pv_array_type.png"
                             alt="Diagram of the three tracking options available in PVWatts®."/>
                        <figcaption>Fixed Open and Roof Mount Options</figcaption>
                    </figure>
                </div>
            </Modal>
            <Title level={3} style={{textAlign: 'left'}}>Solar Panel Type</Title>
            <Paragraph>
                <b>Module Type <InfoCircleTwoTone onClick={showModal4}/>: </b>
                The module type describes the type of photovoltaic film used in the solar panel. See below for detailed
                instruction.
            </Paragraph>

            <Paragraph>
                <b>Array Type <InfoCircleTwoTone onClick={showModal5}/>: </b>
                The array type describes whether the solar panel in the array are fixed, or whether they move to track
                the movement of the sun across the sky with one or two axes of rotation. See below for detailed
                instruction.
            </Paragraph>

            <Paragraph>
                <b>Module Type *</b>
                <Form.Item noStyle name={"moduleType"} rules={[{required: true}]}>
                  <Select style={{marginLeft: '20px'}} placeholder="Select Module Type"
                    options={itemsMod}
                  ></Select>
                </Form.Item>
                {/* <Dropdown overlay={modTypeMenu}>
                    <Button style={{marginLeft: '20px'}}>
                        <Space>
                            {moduleType || 'Select Module Type'}
                            <DownOutlined/>
                        </Space>
                    </Button>
                </Dropdown> */}
            </Paragraph>

            <Paragraph>
                <b>Array Type *</b>
                <Form.Item noStyle name={"arrayType"} rules={[{required: true}]}>
                  <Select style={{marginLeft: '20px'}} placeholder="Select Array Type"
                    options={arrayTypeItems}
                  ></Select>
                </Form.Item>
                {/* <Dropdown overlay={arrayTypeMenu}>
                    <Button style={{marginLeft: '20px'}}>
                        <Space>
                            {arrayType || 'Select Array Type'}
                            <DownOutlined/>
                        </Space>
                    </Button>
                </Dropdown> */}
            </Paragraph>
        </Card>
    </div>
}
export default SolarPanelType;
