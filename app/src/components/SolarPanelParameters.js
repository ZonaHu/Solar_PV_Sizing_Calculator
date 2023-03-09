import {Card, InputNumber, Modal, Typography} from 'antd';
import {useState} from 'react';
import {InfoCircleTwoTone} from '@ant-design/icons';
import SolarPanelType from "./SolarPanelType";
import SolarPanelPosition from "./SolarPanelPosition";

const {Title, Paragraph} = Typography;


export const SolarPanelParameters = () => {

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

    return <div>
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


        <Title level={4} style={{padding: '50px 50px 0px', textAlign: 'left'}}> Enter parameters of your solar
            panel.</Title>

        <SolarPanelPosition/>

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

        <SolarPanelType/>
    </div>
}