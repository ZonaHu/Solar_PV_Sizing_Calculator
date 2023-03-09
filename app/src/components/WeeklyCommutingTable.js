import {Button, Table, Typography} from 'antd';
import SingleTripModal from "./SingleTripModal";

const {Title, Paragraph} = Typography;

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

const data = [];

for (let i = 0; i < 5; i++) {
    data.push({
        key: i,
        monday: <SingleTripModal/>,
        tuesday:  <Button type="primary"> + Add a New Trip</Button>,
        wednesday: <Button type="primary"> + Add a New Trip</Button>,
        thursday: <Button type="primary"> + Add a New Trip</Button>,
        friday: <Button type="primary"> + Add a New Trip</Button>,
        saturday: <Button type="primary"> + Add a New Trip</Button>,
        sunday: <Button type="primary"> + Add a New Trip</Button>,
    });
}
const WeeklyCommutingTable = () => {
    return <div>
        <Title level={5} style={{padding: '50px 50px 0px', textAlign: 'center'}}> Weekly Commuting Table </Title>
        <Paragraph>
            <b>* Please click on the "Add a New Trip" button to input the leave time and return time for each trip that you made with your electric vehicles. </b>
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