import {Button, Modal, Typography, Dropdown, Space, message} from 'antd';

import { useState } from 'react';
import {DownOutlined, UserOutlined} from "@ant-design/icons";

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
                    <Button style={{width: '140px', marginLeft: '20px'}}>
                        <Space>
                            Vehicle No.
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </Paragraph>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </>
    );
};
export default SingleTripModal;