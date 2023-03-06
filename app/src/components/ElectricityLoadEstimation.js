import {Card, Input, InputNumber, Typography} from "antd";


const {Title, Paragraph} = Typography;

export const ElectricityLoadEstimation = () => {

    return <div>
        <Title level={4} style={{padding: '50px 50px 0px', textAlign: 'left'}}> Enter following information for your electricity
            estimation.</Title>
        <Card style={{width: '90%', margin: '50px', textAlign: 'left'}}>
            <Title level={3} style={{textAlign: 'left'}}>Electric Vehicle</Title>

            <Paragraph>
                <b>Enter the number of electric vehicle you have: </b>
                <InputNumber
                    style={{width: '50px', marginLeft: '10px'}}
                    min="0"
                />
            </Paragraph>

            <Paragraph>
                <b> How many of them are bidirectional? </b>
                <InputNumber
                    style={{width: '50px', marginLeft: '10px'}}
                    min="0"
                />
            </Paragraph>

            {/*<Paragraph>*/}
            {/*    <b> How large is the battery in kWh? </b>*/}
            {/*    <InputNumber*/}
            {/*        style={{width: '50px', marginLeft: '10px'}}*/}
            {/*        min="0"*/}
            {/*    />*/}
            {/*</Paragraph>*/}
            <Paragraph>
                <b>How many days per week do you commute to work with EV? </b>
                <InputNumber
                    style={{width: '50px', marginLeft: '10px'}}
                    min="0"
                />
            </Paragraph>

            <Paragraph>
                <b> When does the EV usually leave the house</b>
                <Input
                    style={{width: '100px', marginLeft: '10px'}}
                    min="0"
                />
            </Paragraph>

            <Paragraph>
                <b> When does the EV usually return the house</b>
                <Input
                    style={{width: '100px', marginLeft: '10px'}}
                    min="0"
                />
            </Paragraph>

            <Paragraph>
                <b> What is the state of charge of the EV battery when you arrive?</b>
                <Input
                    style={{width: '100px', marginLeft: '10px'}}
                    min="0"
                />
            </Paragraph>
        </Card>

        <Card style={{width: '90%', margin: '50px', textAlign: 'left'}}>
            <Title level={3} style={{textAlign: 'left'}}>Monthly Electricity Load in kWh</Title>

            <Paragraph>
                <b> January * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    min="0"
                />
                <b style={{ marginLeft: '10px'}}> February * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    min="0"
                />
                <b style={{ marginLeft: '10px'}}> March * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    min="0"
                />
                <b style={{ marginLeft: '10px'}}> April * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    min="0"
                />
            </Paragraph>
            <Paragraph>
                <b> May * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    min="0"
                />
                <b style={{ marginLeft: '10px'}}> June * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    min="0"
                />
                <b style={{ marginLeft: '10px'}}> July * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    min="0"
                />
                <b style={{ marginLeft: '10px'}}> August * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    min="0"
                />
            </Paragraph>
            <Paragraph>
                <b> September * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    min="0"
                />
                <b style={{ marginLeft: '10px'}}> October * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    min="0"
                />
                <b style={{ marginLeft: '10px'}}> November * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    min="0"
                />
                <b style={{ marginLeft: '10px'}}> December * </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    min="0"
                />
            </Paragraph>
        </Card>
    </div>
}