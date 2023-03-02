import {Button, Card, Dropdown, InputNumber, message, Modal, Space, Typography} from 'antd';
import {useEffect, useState} from 'react';
import {DownOutlined, InfoCircleTwoTone} from '@ant-design/icons';

const {Title, Paragraph} = Typography;


const modTypeItems = [
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

const arrayTypeItems = [
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

const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};

const handleAMenuClick = (e) => {
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
    const [lines, setLines] = useState(1)
    const arr = Array(100)
    for (let i = 0; i < arr.length; i++) {
        arr[i] = {Tilt: 0, Azimuth: 0}
    }
    const [data, setData] = useState(arr)
    useEffect(() => {
        console.log(data)
    }, [data])

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

    const [isSLModalOpen, setIsSLModalOpen] = useState(false);
    const showModal3 = () => {
        setIsSLModalOpen(true);
    };

    const handleOk3 = () => {
        setIsSLModalOpen(false);
    };

    const handleCancel3 = () => {
        setIsSLModalOpen(false);
    };

    const [isModalOpen4, setIsModalOpen4] = useState(false);
    const showModal4 = () => {
        setIsModalOpen4(true);
    };

    const handleOk4 = () => {
        setIsModalOpen4(false);
    };

    const handleCancel4 = () => {
        setIsModalOpen4(false);
    };
    const [isModalOpen5, setIsModalOpen5] = useState(false);
    const showModal5 = () => {
        setIsModalOpen5(true);
    };

    const handleOk5 = () => {
        setIsModalOpen5(false);
    };

    const handleCancel5 = () => {
        setIsModalOpen5(false);
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
                    of thumb for fixed arrays is to set the tilt angle to the latitude of the system's location to
                    maximize the system's total electrical output over the year. Use a lower tilt angle favor peak
                    production in the summer months when the sun is high in the sky, or a higher tilt angle to increase
                    output during winter months. Higher tilt angles tend to cost more for racking and mounting hardware,
                    and may increase the risk of wind damage to the array.</p>
                <p>For an array installed on a building's roof, you may want to choose a tilt angle equal to the roof
                    pitch. Use the table below to convert roof pitch in ratio of rise (vertical) over run (horizontal)
                    to tilt angle.</p>
                <table style={{textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', fontSize: '14px'}}>
                    <caption style={{textAlign: 'center'}}>Photovoltaic array tilt angle for different roof pitches
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
                <table style={{textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', fontSize: '14px'}}>
                    <caption style={{textAlign: 'center'}}>Azimuth angles for different compass headings</caption>
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
        <Modal title="System Losses" open={isSLModalOpen} onOk={handleOk3} onCancel={handleCancel3}>
            <div>
                <p>The system losses account for performance losses you would expect in a real system that are not
                    explicitly calculated by the PVWatts<sup>®</sup> model equations.</p>

                <p>The default value for the system losses of 14% is based on the categories in the table below, and
                    calculated as follows:</p>

                <p style={{textAlign: 'center'}}>
                    100% × [ 1- ( 1 - 0.02 ) × ( 1 - 0.03 ) × ( 1 - 0.02 ) × ( 1 - 0.02 ) ×
                    ( 1 - 0.005 ) × ( 1 - 0.015) × ( 1- 0.01 ) × ( 1 - 0.03) ] = 14%
                </p>

                <p>PVWatts<sup>®</sup> calculates temperature-related losses as a function of the cell temperature, so
                    you should not include temperature loss in the system loss percentage.</p>

                <p>If you want to use a value other than the default, you can specify values for the categories listed
                    in the table below and calculate the new total value as above.</p>

                <table style={{textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', fontSize: '14px'}}>
                    <caption style={{textAlign: 'center'}}>Default values for the system loss categories</caption>
                    <tbody>
                    <tr>
                        <th>Category</th>
                        <th>Default Value (%)</th>
                    </tr>
                    <tr>
                        <td>Soiling</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Shading</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Snow</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Mismatch</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Wiring</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Connections</td>
                        <td>0.5</td>
                    </tr>
                    <tr>
                        <td>Light-Induced Degradation</td>
                        <td>1.5</td>
                    </tr>
                    <tr>
                        <td>Nameplate Rating</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Age</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Availability</td>
                        <td>3</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </Modal>
        <Modal title="Module Type" open={isModalOpen4} onOk={handleOk4} onCancel={handleCancel4}>
            <div>
                <p>The module type describes the photovoltaic modules in the array. If you do not have information about
                    the modules in the system, use the default Standard module type. Otherwise, you can use information
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
                <p>The array type describes whether the PV modules in the array are fixed, or whether they move to track
                    the movement of the sun across the sky with one or two axes of rotation. The default value is for a
                    fixed array, or one with no tracking. Use the following diagrams to choose the appropriate option
                    for your system:</p>
                <figure>
                    <img width="550" src="assets/img/pv_array_type.png" alt="Diagram of the three tracking options available in PVWatts®." />
                    <figcaption>Fixed Open and Roof Mount Options</figcaption>
                </figure>
            </div>
        </Modal>


        <Title level={4} style={{padding: '50px 50px 0px', textAlign: 'left'}}> Enter parameters of your solar
            panel.</Title>


        <Card style={{width: '90%', margin: '50px', textAlign: 'left'}}>
            <Title level={3}>Solar Panel Position</Title>
            <Paragraph>
                <b>Tilt <InfoCircleTwoTone onClick={showTiltModal}/>: </b> {'     '}
                The tilt angle is the angle from horizontal of the solar panel.
                The optimal angle, if possible, is the absolute value of the latitude of your location.
                See below for detailed instruction.
            </Paragraph>

            <Paragraph>
                <b>Azimuth <InfoCircleTwoTone onClick={showModal2}/>: </b>
                For a fixed array, the azimuth angle is the <b>angle clockwise from true north</b> describing the
                direction that the array faces.
                An azimuth angle of 180° is for a south-facing array, and an azimuth angle of zero degrees is for a
                north-facing array.
                See below for detailed instruction.
            </Paragraph>

            <Paragraph>
                <b>Enter your number of roof segments:</b>
                <InputNumber style={{width: '50px', marginLeft: '20px'}}
                             value={lines}
                             onChange={e => {
                                 setLines(e)
                             }}
                             min={1}/>
            </Paragraph>
            {
                Array(Number(lines)).fill(0).map((item, index) => <div key={index} style={{marginBottom: '10px'}}>
                    <b>Enter your {index + 1}'s roof segment's Tilt and Azimuth: </b>
                    <InputNumber
                        style={{width: '150px', marginLeft: '10px'}}
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
                    <InputNumber
                        style={{width: '150px', marginLeft: '10px'}}
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
                </div>)
            }


        </Card>

        <Card style={{width: '90%', margin: '50px', textAlign: 'left'}}>
            <Title level={3} style={{textAlign: 'left'}}>Solar Panel System Losses</Title>
            <Paragraph>
                <b>System Losses <InfoCircleTwoTone onClick={showModal3}/>: </b> The system losses account for
                performance losses you would expect in a real system that are not explicitly calculated by the PVWatts®
                model equations. The system losses account for performance losses you would expect in a real system that
                are not explicitly calculated by the PVWatts® model equations. Click on the info icon for detailed
                instruction.
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
                <Dropdown menu={modTypeMenuProps}>
                    <Button style={{marginLeft: '20px'}}>
                        <Space>
                            Button
                            <DownOutlined/>
                        </Space>
                    </Button>
                </Dropdown>
            </Paragraph>

            <Paragraph>
                <b>Array Type *</b>
                <Dropdown menu={arrayTypeMenuProps}>
                    <Button style={{marginLeft: '20px'}}>
                        <Space>
                            Button
                            <DownOutlined/>
                        </Space>
                    </Button>
                </Dropdown>
            </Paragraph>
        </Card>
    </div>
}