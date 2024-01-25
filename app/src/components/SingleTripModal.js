import React from 'react';
import { Button, Divider, Dropdown, InputNumber, message, Modal, Space, TimePicker, Typography } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from 'react';

dayjs.extend(customParseFormat);

const { Paragraph } = Typography;

// eslint-disable-next-line react/prop-types
const SingleTripModal = ({ lines, tripId, dayOfWeek, onAddTrip }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleNo, setVehicleNo] = useState('');
  const [leaveAt, setLeaveAt] = useState('');
  const [returnAt, setReturnAt] = useState('');
  const [distance, setDistance] = useState('');
  const [stateOfCharge, setStateOfCharge] = useState('');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (!vehicleNo) {
      message.error('Please select a vehicle');
      return;
    }
    if (!leaveAt || !returnAt) {
      message.error('Please select the time');
      return;
    }
    if (!distance && !stateOfCharge) {
      message.error('Please enter the distance or state of charge');
      return;
    }
    if (dayjs(returnAt).isBefore(dayjs(leaveAt))) {
      message.error('Return time should be after leave time');
      return;
    }
    try {
      await onAddTrip(
        {
          tripId: tripId,
          vehicleNo,
          leaveAt: dayjs(leaveAt),
          returnAt: dayjs(returnAt),
          distance,
          stateOfCharge,
        },
        dayOfWeek
      );
      setIsModalOpen(false);
    } catch (error) {

    }

  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items = Array.from({ length: lines }, (_, index) => ({
    label: `Vehicle No. ${index + 1}`,
    key: `${index + 1}`,
    icon: <UserOutlined />,
  }));

  const handleMenuClick = (e) => {
    setVehicleNo(e.key);
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
          <Dropdown menu={menuProps}>
            <Button style={{ width: '180px', marginLeft: '10px' }}>
              <Space>
                {vehicleNo ? `Vehicle No. ${vehicleNo}` : 'Select a Vehicle'}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Paragraph>
        <Paragraph>
          <b> Leave at: </b>
          <TimePicker
            style={{ width: '120px', marginLeft: '10px' }}
            defaultValue={dayjs('00:00:00', 'HH:mm:ss')}
            onChange={(value) => setLeaveAt(value)}
          />
        </Paragraph>
        <Paragraph>
          <b> Return at: </b>
          <TimePicker
            style={{ width: '120px', marginLeft: '10px' }}
            defaultValue={dayjs('00:00:00', 'HH:mm:ss')}
            onChange={(value) => setReturnAt(value)}
          />
        </Paragraph>
        <Paragraph style={{ marginTop: '50px' }}>
          <b> Distance travelled: </b>
          <InputNumber
            addonAfter="km"
            style={{ width: '100px', marginLeft: '10px' }}
            value={distance}
            onChange={(value) => setDistance(value)}
            min={0}
          />
        </Paragraph>
        <Divider>OR</Divider>
        <Paragraph>
          <b>State of Charge on return: </b>
          <InputNumber
            addonAfter="%"
            style={{ width: '100px', marginLeft: '10px' }}
            value={stateOfCharge}
            onChange={(value) => setStateOfCharge(value)}
            min={0}
          />
        </Paragraph>
      </Modal>
    </>
  );
};

export default SingleTripModal;

