import {Button, Card, Divider, Input, InputNumber, Typography,Upload, message} from 'antd';
import {useState} from 'react';
import {UploadOutlined} from "@ant-design/icons";

const {Title, Paragraph} = Typography;

// TODO: need to be updated
const props = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

export const MyLocation = () => {

    const [status1, setStatus1] = useState('error')
    const [status2, setStatus2] = useState('error')
    const [city, setCity] = useState("");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const handleDownloadClick = () => {
        fetch('/app/src/components/assets/new_dheli_pv_Kopie.txt')
            .then((response) => {
                const filename = 'sample.txt';
                response.blob().then((blob) => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                });
            });
    };

    return <div>
        <Card style={{width: '90%', margin: '50px', textAlign: 'left'}}>
            <Title level={3}>Welcome!</Title>
            <Paragraph>
                This calculator is intended for homeowners and small to medium businesses to determine how many solar
                panels and how large a storage battery to buy to achieve a certain level of grid independence, based on
                your location, solar panel parameters, and electricity usages. The algorithm accounts for <b> multiple
                roof segments</b>.
            </Paragraph>

            <Paragraph>
                This calculator uses <a href="https://cs.uwaterloo.ca/~fkazhami/papers/synthetic_trace_generation.pdf">machine
                learning</a> to estimate your hourly electricity usage and a <a
                href="https://cs.uwaterloo.ca/~fkazhami/papers/robust-practical-approaches-8.pdf">robust statistical
                algorithm</a> to optimize the amount of solar panels and battery storage needed to fulfill a certain
                portion of your electricity needs with minimum cost.
            </Paragraph>

            <Paragraph>
                To use this calculator, please prepare the following:
                <li className="li-dot"><b>Your location</b>, in terms of longitude and latitude. Later this page you can
                    also detect your location with your IP address or enter your city.</li>
                <li className="li-dot"><b>Solar panel parameters</b>, including the tilt and azimuth of your solar
                    panel, and what types of panels you intend to install. See detailed instruction at page 2. The
                    parameters and instructions are provided by <a
                        href="https://pvwatts.nrel.gov/pvwatts.php">PVWatts</a>.
                </li>
                <li className="li-dot"><b>Your electricity statements</b>, up to a year for each month. We are
                    interested in how much electricity (in kWh) you used for each month during the past year, as well as
                    (optionally) the electricity cost for the last entire year.
                </li>
                <li className="li-dot"><b>Your local system costs</b> for solar panels and batteries. We listed out some
                    sample prices per unit in the US but different region has different costs. <a
                        href="https://www.energysage.com/solar/">EnergySage</a> provides great instructions and example
                    prices.
                </li>
            </Paragraph>
        </Card>
        <Card style={{width: '90%', margin: '50px', textAlign: 'center'}}>
            <Title level={3} style={{textAlign: 'left'}}>Your Location</Title>
            <Paragraph>
                <b>Location</b>: Your location is needed to compute how much electricity your solar panels can generate.
                Enter your locations using one of the following ways:
            </Paragraph>

            <Paragraph>
                <b>Autofill location using your IP address:</b>
                <Button style={{marginLeft: '10px'}}>Detect Location</Button>
            </Paragraph>

            <Divider>OR</Divider>

            <Paragraph>
                <b>Enter your city:</b>
                <Input style={{width: '200px', borderBottom: '1px solid #000', marginLeft: '10px', borderRadius: 0}}
                       placeholder="your city"
                       bordered={false}
                       value={city}
                       onChange={(e) => setCity(e.target.value)}
                />
            </Paragraph>
            <Divider>OR</Divider>

            <Paragraph>
                <b>Enter your latitude and longitude: </b>
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    placeholder="latitude"
                    status={status1}
                    min="-90"
                    max="90"
                    step="0.01"
                    onChange={(value) => {
                        if (value && value !== 0) {
                            setStatus1('')
                            setLatitude(value);
                        } else {
                            setStatus1('error')
                            setLatitude(null);
                        }
                    }}
                    stringMode
                />
                <InputNumber
                    style={{width: '100px', marginLeft: '10px'}}
                    placeholder="longitude"
                    status={status2}
                    min="-180"
                    max="180"
                    step="0.01"
                    stringMode
                    onChange={(value) => {
                        if (value && value !== 0) {
                            setStatus2('')
                            setLongitude(value);
                        } else {
                            setStatus2('error')
                            setLongitude(null);
                        }
                    }}
                />
            </Paragraph>

            <Divider>OR</Divider>
            <Paragraph>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Manually upload PV generation parameters in text file</Button>
                </Upload>
                <Button type="link"
                    onClick={handleDownloadClick}
                >
                    Download Sample File
                </Button>
            </Paragraph>
        </Card>
    </div>
}