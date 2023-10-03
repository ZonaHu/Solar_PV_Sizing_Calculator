import {Card, Typography} from "antd";
import { Line } from '@ant-design/charts';

const {Title, Paragraph} = Typography;

export const Results = () => {
    // those are currently placeholder data, will be computed from the backend.
    const data = [
        { Epsilon: `0.1`, Cost: 3, PV1: 12, PV2: 20, Storage: 300  },
        { Epsilon: '0.12', Cost: 4, PV1: 20, PV2: 20, Storage: 300  },
        { Epsilon: '0.29', Cost: 3.5, PV1: 20, PV2: 20, Storage: 300    },
        { Epsilon: '0.45', Cost: 5, PV1: 20, PV2: 20, Storage: 300    },
        { Epsilon: '0.37', Cost: 4.9, PV1: 20, PV2: 20, Storage: 300    },
        { Epsilon: '0.23', Cost: 6, PV1: 20, PV2: 20, Storage: 300    },
        { Epsilon: '0.24', Cost: 7, PV1: 20, PV2: 20, Storage: 300    },
        { Epsilon: '0.39', Cost: 9, PV1: 20, PV2: 20, Storage: 300    },
        { Epsilon: '0.67', Cost: 13, PV1: 20, PV2: 20, Storage: 300    },
    ];

    const config = {
        data,
        width: 800,
        height: 400,
        autoFit: false,
        xField: 'Epsilon',
        yField: 'Cost',
        xAxis: {
            title: {
                fontSize: '12', // 文本大小
                textAlign: 'center', // 文本对齐方式
                fill: '#999', // 文本颜色
            }
        },
        yAxis: {
            title: {
                fontSize: '12', // 文本大小
                textAlign: 'center', // 文本对齐方式
                fill: '#999', // 文本颜色
            }
        },
        point: {
            size: 5,
            shape: 'diamond',
        },
        label: {
            style: {
                fill: '#aaa',
            },
        },
        tooltip: {
            fields: ['Cost','PV1','PV2','Storage'],
        }
    };

    let chart;

    return <div>
        <Card style={{width: '90%', margin: '50px', textAlign: 'left'}}>
            <Title level={3}>Sizing to meet <b>  ε * 100% </b> of your electricity load through solar energy:</Title>
            <Paragraph>
                <b> pv roof segment = </b>
            </Paragraph>
            <Paragraph>
                <b> pv roof segment = </b>
            </Paragraph>
            <Paragraph>
                <b> stationary storage = </b>
            </Paragraph>
            <Paragraph>
                <b> cost = </b>
            </Paragraph>
        </Card>

        <Card style={{width: '90%', margin: '50px', textAlign: 'left'}}>
        <Title level={5}>
            How would the cost of your system vary if you chose a different value for ε?
        </Title>
        <div>
            <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
        </div>
        </Card>
    </div>
}