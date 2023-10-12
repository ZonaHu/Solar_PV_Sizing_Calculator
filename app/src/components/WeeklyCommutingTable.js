import React, {useState} from 'react';
import {Table, Typography} from 'antd';
import SingleTripModal from "./SingleTripModal";

const {Title, Paragraph} = Typography;

// eslint-disable-next-line react/prop-types
const WeeklyCommutingTable = ({numVehicles}) => {
    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    const [trips, setTrips] = useState([
        {
            key: "row-0",
            monday: null,
            tuesday: null,
            wednesday: null,
            thursday: null,
            friday: null,
            saturday: null,
            sunday: null,
        },
    ]);

    const [tripCounter, setTripCounter] = useState(1);

    const handleAddTrip = (newTrip, dayOfWeek) => {
        if (newTrip) {
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
        {
            title: 'Saturday',
            dataIndex: 'saturday',
            width: 150,
        },
        {
            title: 'Sunday',
            dataIndex: 'sunday',
            width: 150,
        },
    ];

    const data = [
        {
            key: "addNew",
            monday: (
                <SingleTripModal
                    tripId={`trip-${tripCounter}`}
                    lines={numVehicles}
                    onAddTrip={(newTrip) => handleAddTrip(newTrip, "monday")}
                />
            ),
            tuesday: (
                <SingleTripModal
                    tripId={`trip-${tripCounter}`}
                    lines={numVehicles}
                    onAddTrip={(newTrip) => handleAddTrip(newTrip, "tuesday")}
                />
            ),
            wednesday: (
                <SingleTripModal
                    tripId={`trip-${tripCounter}`}
                    lines={numVehicles}
                    onAddTrip={(newTrip) => handleAddTrip(newTrip, "wednesday")}
                />
            ),
            thursday: (
                <SingleTripModal
                    tripId={`trip-${tripCounter}`}
                    lines={numVehicles}
                    onAddTrip={(newTrip) => handleAddTrip(newTrip, "thursday")}
                />
            ),
            friday: (
                <SingleTripModal
                    tripId={`trip-${tripCounter}`}
                    lines={numVehicles}
                    onAddTrip={(newTrip) => handleAddTrip(newTrip, "friday")}
                />
            ),
            saturday: (
                <SingleTripModal
                    tripId={`trip-${tripCounter}`}
                    lines={numVehicles}
                    onAddTrip={(newTrip) => handleAddTrip(newTrip, "saturday")}
                />
            ),
            sunday: (
                <SingleTripModal
                    tripId={`trip-${tripCounter}`}
                    lines={numVehicles}
                    onAddTrip={(newTrip) => handleAddTrip(newTrip, "sunday")}
                />
            ),
        },
    ];

    trips.forEach((row) => {
        const newRow = {key: row.key};

        daysOfWeek.forEach((day) => {
            if (row[day]) {
                const trip = row[day];
                newRow[day] = (
                    <>
                        Leave at: {trip.leaveAt.format("HH:mm")} Return at: {trip.returnAt.format("HH:mm")}
                    </>
                );
            }
        });

        data.push(newRow);
    });

    return <div>
        <Title level={5} style={{padding: '50px 50px 0px', textAlign: 'center'}}> Weekly Commuting Table </Title>
        <Paragraph>
            <b>* Please click on the &quot;Add a New Trip&quot; button to input the leave time and return time for each trip that
                you made with your electric vehicles. </b>
        </Paragraph>
        <Table
            columns={columns}
            dataSource={data}
            scroll={{
                y: 500,
            }}
        />
    </div>
}
export default WeeklyCommutingTable;