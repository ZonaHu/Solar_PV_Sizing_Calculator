import React from 'react';
import {Button, Card, Typography} from "antd";
import {Line} from '@ant-design/charts';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import 'jspdf-autotable';

const {Title, Paragraph} = Typography;

export const Results = () => {
    // those are currently placeholder data, will be computed from the backend.
    const data = [
        {Epsilon: `0.1`, Cost: 3, PV1: 12, PV2: 20, Storage: 300},
        {Epsilon: '0.12', Cost: 4, PV1: 20, PV2: 20, Storage: 300},
        {Epsilon: '0.29', Cost: 3.5, PV1: 20, PV2: 20, Storage: 300},
        {Epsilon: '0.45', Cost: 5, PV1: 20, PV2: 20, Storage: 300},
        {Epsilon: '0.37', Cost: 4.9, PV1: 20, PV2: 20, Storage: 300},
        {Epsilon: '0.23', Cost: 6, PV1: 20, PV2: 20, Storage: 300},
        {Epsilon: '0.24', Cost: 7, PV1: 20, PV2: 20, Storage: 300},
        {Epsilon: '0.39', Cost: 9, PV1: 20, PV2: 20, Storage: 300},
        {Epsilon: '0.67', Cost: 13, PV1: 20, PV2: 20, Storage: 300},
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
                fontSize: '12',
                textAlign: 'center',
                fill: '#999',
            }
        },
        yAxis: {
            title: {
                fontSize: '12',
                textAlign: 'center',
                fill: '#999',
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
            fields: ['Cost', 'PV1', 'PV2', 'Storage'],
        }
    };

    // eslint-disable-next-line no-unused-vars
    let chart;

    const exportToPDF = async () => {
        const input = document.getElementById("resultsSection");
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('l', 'mm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        const headers = ["Epsilon", "Cost", "PV1", "PV2", "Storage"];

        const tableData = data.map(item => [
            item.Epsilon,
            item.Cost.toString(),
            item.PV1.toString(),
            item.PV2.toString(),
            item.Storage.toString()
        ]);

        pdf.autoTable({
            startY: height + 10,
            head: [headers],
            body: tableData,
        });
        pdf.save("results.pdf");
    };


    return <div id="resultsSection">
        <Card style={{width: '90%', margin: '50px', textAlign: 'left'}}>
            <Title level={3}>Sizing to meet <b> ε * 100% </b> of your electricity load through solar energy:</Title>
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
                <Line {...config} onReady={(chartInstance) => (chart = chartInstance)}/>
            </div>
        </Card>

        <Card style={{width: '90%', margin: '50px', textAlign: 'left'}}>
            <Button onClick={exportToPDF} style={{marginBottom: '5px'}}>Export the Result Section</Button>
        </Card>
    </div>
}