import React from 'react';
import {Checkbox, Form, message, Table, Typography} from 'antd';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween)

const {Title, Paragraph} = Typography;


function timeIsBetween(time, startTime, endTime) {
    return time.isBetween(startTime, endTime, null, '[]');
}

function isOverLab([LeaveAtA, returnAtA], [LeaveAtB, returnAtB]) {
    return timeIsBetween(LeaveAtA, LeaveAtB, returnAtB) || timeIsBetween(returnAtA, LeaveAtB, returnAtB) || timeIsBetween(LeaveAtB, LeaveAtA, returnAtA) || timeIsBetween(returnAtB, LeaveAtA, returnAtA)
}


// eslint-disable-next-line react/prop-types
const WeeklyCommutingTable = ({numVehicles, setTripCounter, setTrips, trips, tripCounter}) => {
    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday"];

    const handleAddTrip = async (newTrip, dayOfWeek) => {
        if (newTrip) {
            const {leaveAt, returnAt} = newTrip;
            // eslint-disable-next-line react/prop-types
            const isLeaveTimeBetween = trips.some((row) => {
                const trip = row[dayOfWeek];
                if (trip) {
                    return timeIsBetween(leaveAt, trip.leaveAt, trip.returnAt);
                }
                return false;
            });

            // eslint-disable-next-line react/prop-types
            const isReturnTimeBetween = trips.some((row) => {
                const trip = row[dayOfWeek];
                if (trip) {
                    return timeIsBetween(returnAt, trip.leaveAt, trip.returnAt);
                }
                return false;
            });

            if (isLeaveTimeBetween || isReturnTimeBetween) {
                message.error('The time you entered is overlapped with other trips');
                return Promise.reject();
            }

            // eslint-disable-next-line react/prop-types
            const isOverlapped = trips.some((row) => {
                const trip = row[dayOfWeek];
                if (trip) {
                    return isOverLab([leaveAt, returnAt], [trip.leaveAt, trip.returnAt])
                }
                return false;
            });

            if (isOverlapped) {
                message.error('The time you entered is overlapped with other trips');
                return Promise.reject();
            }

            setTrips((prevTrips) => {
                const updatedTrips = [...prevTrips];
                let rowIndex = updatedTrips.findIndex((row) => row[dayOfWeek] === null);
                if (rowIndex === -1) {
                    rowIndex = updatedTrips.length;
                    const newRow = {
                        key: `row-${rowIndex}`,
                        monday: null,
                        tuesday: null,
                        wednesday: null,
                        thursday: null,
                        friday: null,
                        saturday: null,
                        sunday: null,
                    };
                    updatedTrips.push(newRow);
                }

                updatedTrips[rowIndex][dayOfWeek] = newTrip;

                return updatedTrips;
            });
        }

        setTripCounter(tripCounter + 1);
    };

    const columns = [
        {
            title: 'Monday',
            dataIndex: 'monday',
            width: 150,
        },
        {
            title: 'Tuesday',
            dataIndex: 'tuesday',
            width: 150,
        },
        {
            title: 'Wednesday',
            dataIndex: 'wednesday',
            width: 150,
        },
        {
            title: 'Thursday',
            dataIndex: 'thursday',
            width: 150,
        },
        {
            title: 'Friday',
            dataIndex: 'friday',
            width: 150,
        },
    ];

    const data = [
        {
            key: "addNew",
            monday: (
                <Form.Item valuePropName="checked" noStyle name={['wfh', 'wfh_monday']}>
                    <Checkbox value={1}>work from home?</Checkbox>
                </Form.Item>
            ),
            tuesday: (
                <Form.Item valuePropName="checked" noStyle name={['wfh', 'wfh_tuesday']}>
                    <Checkbox value={1}>work from home?</Checkbox>
                </Form.Item>
            ),
            wednesday: (
                <Form.Item valuePropName="checked" noStyle name={['wfh', 'wfh_wednesday']}>
                    <Checkbox value={1}>work from home?</Checkbox>
                </Form.Item>
            ),
            thursday: (
                <Form.Item valuePropName="checked" noStyle name={['wfh', 'wfh_thursday']}>
                    <Checkbox value={1}>work from home?</Checkbox>
                </Form.Item>
            ),
            friday: (
                <Form.Item valuePropName="checked" noStyle name={['wfh', 'wfh_friday']}>
                    <Checkbox value={1}>work from home?</Checkbox>
                </Form.Item>
            )
        },
    ];

    // eslint-disable-next-line react/prop-types
    // trips.forEach((row) => {
    //   const newRow = { key: row.key };
    //   daysOfWeek.forEach((day) => {
    //     if (row[day]) {
    //       const trip = row[day];
    //       newRow[day] = (
    //         <span>
    //           Leave at: {trip.leaveAt.format("HH:mm")} Return at: {trip.returnAt.format("HH:mm")} <br />
    //           vehicle #{trip.vehicleNo} <br /> <button
    //             onClick={() => {
    //               setTrips((prevTrips) => {
    //                 const updatedTrips = [...prevTrips];
    //                 const rowIndex = updatedTrips.findIndex((row) => row[day] === trip);
    //                 updatedTrips[rowIndex][day] = null;
    //                 return updatedTrips;
    //               });
    //             }}
    //           >delete</button>
    //         </span>
    //       );
    //     }
    //   });
    //   data.push(newRow);
    // });

    return <div>
        <Title level={5} style={{padding: '50px 50px 0px', textAlign: 'center'}}> Weekly Commuting Status Table </Title>
        <Paragraph>
            <b>* Please select the days that you're working from home </b>
        </Paragraph>
        <Table
            columns={columns}
            dataSource={data}
            scroll={{
                y: 500,
            }}
            pagination={false}
        />
    </div>
}
export default WeeklyCommutingTable;