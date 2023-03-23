import {Button, Modal, Typography, TimePicker, Dropdown, Space, message, Divider, InputNumber} from 'antd';

import { useState } from 'react';
import {DownOutlined, UserOutlined} from "@ant-design/icons";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const { Paragraph } = Typography;


const SingleTripModal = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
    setIsModalOpen(true);
    };
    const handleOk = () => {
    setIsModalOpen(false);
    };
    const handleCancel = () => {
    setIsModalOpen(false);
    };

    // TODO: items will be the number of vehicles user inputted
    const items = [
        {
            label: '1st menu item',
            key: '1',
            icon: <UserOutlined />,
        },
        {
            label: '2nd menu item',
            key: '2',
            icon: <UserOutlined />,
        },
        {
            label: '3rd menu item',
            key: '3',
            icon: <UserOutlined />,
            danger: true,
        },
        {
            label: '4rd menu item',
            key: '4',
            icon: <UserOutlined />,
            danger: true,
            disabled: true,
        },
    ];

    const handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
      <>
        <Button type="primary" onClick={showModal}>
          + Add a New Trip
        </Button>
        <Modal title="Add a New Trip" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Paragraph>
                <b> Select the vehicle you travelled with: </b>
                <Dropdown menu={ menuProps }>
                    <Button style={{width: '140px', marginLeft: '10px'}}>
                        <Space>
                            Vehicle No.
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </Paragraph>
            <Paragraph>
                <b> Leave at: </b>
                <TimePicker  style={{width: '120px', marginLeft: '10px'}} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
            </Paragraph>
            <Paragraph>
                <b> Return at: </b>
                <TimePicker  style={{width: '120px', marginLeft: '10px'}} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
            </Paragraph>
            <Paragraph  style={{ marginTop: '50px'}}>
                <b> Distance travelled: </b>
                <InputNumber addonAfter={"km"} style={{width: '100px', marginLeft: '10px'}}/>
            </Paragraph>
            <Divider>OR</Divider>
            <Paragraph>
                <b> State of Charge on return: </b>
                <InputNumber addonAfter={"%"} style={{width: '100px', marginLeft: '10px'}}/>
            </Paragraph>
        </Modal>
      </>
    );
};
export default SingleTripModal;