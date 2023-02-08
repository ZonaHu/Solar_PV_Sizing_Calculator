import { Card } from 'antd';
import { Divider } from 'antd';
import { Button, Input, InputNumber } from 'antd';
import { useState } from 'react';
export const MyLocation = () => {
    const [status1, setStatus1] = useState('error') 
    const [status2, setStatus2] = useState('error') 
    return <div>
        <Card style={{ width: '90%', margin: '50px', textAlign: 'left' }}>
            <h1>Welcome!</h1>
            <p>
                This calculator is intended for homeowners and small to medium businesses to determine how many solar panels and how large a storage battery to buy to achieve a certain level of grid independence, based on your location, solar panel parameters, and electricity usages.
            </p>

            <p>
                This calculator uses <a href="https://cs.uwaterloo.ca/~fkazhami/papers/synthetic_trace_generation.pdf">machine learning</a> to estimate your hourly electricity usage and a <a href="https://cs.uwaterloo.ca/~fkazhami/papers/robust-practical-approaches-8.pdf">robust statistical algorithm</a> to optimize the amount of solar panels and battery storage needed to fulfill a certain portion of your electricity needs with minimum cost.
            </p>

            <p>
                To use this calculator, please prepare the following:
                <li className="li-dot"><b>Your location</b>, in terms of longitude and latitude. Later this page you can also detect your location with your IP address or enter your city.</li>
                <li className="li-dot"><b>Solar panel parameters</b>, including the tilt and azimuth of your solar panel, and what types of panels you intend to install. See detailed instruction at page 2. The parameters and instructions are provided by <a href="https://pvwatts.nrel.gov/pvwatts.php">PVWatts</a>. </li>
                <li className="li-dot"><b>Your electricity statements</b>, up to a year for each month. We are interested in how much electricity (in kWh) you used for each month during the past year, as well as (optionally) the electricity cost for the last entire year.</li>
                <li className="li-dot"><b>Your local system costs</b> for solar panels and batteries. We listed out some sample prices per unit in the US but different region has different costs. <a href="https://www.energysage.com/solar/">EnergySage</a> provides great instructions and example prices.</li>
            </p>
        </Card>
        <Card style={{ width: '90%', margin: '50px', textAlign: 'center' }}>
            <h1 style={{ textAlign: 'left' }}>Your Location</h1>
            <p>
                <b>Location</b>: Your location is needed to compute how much electricity your solar panels can generate. Enter your locations using one of the following ways:
            </p>

            <p>
                <b>Autofill location using your IP address:</b>                
                <Button style={{marginLeft:'10px'}}>Detect Location</Button>
            </p>
            
            <Divider>OR</Divider>

            <p>
                <b>Enter your city:</b>  
                <Input style={{width:'200px',borderBottom:'1px solid #000', marginLeft:'10px',borderRadius:0}} placeholder="your city" bordered={false}/>
            </p>
            <Divider>OR</Divider>

            <p>
                <b>Enter your latitude and longitude: </b>
                <InputNumber 
                    style={{width:'100px', marginLeft:'10px'}} 
                    placeholder="latitude" 
                    status={status1}
                    min="-90"
                    max="90"
                    step="0.01"
                    onChange={(value) => {
                        if (value && value !== 0) {
                            setStatus1('')
                        } else {
                            setStatus1('error')
                        }
                        
                    }}
                    stringMode
                />
                <InputNumber 
                    style={{width:'100px', marginLeft:'10px'}} 
                    placeholder="longitude"
                    status={status2}
                    min="0"
                    max="180"
                    step="0.01"
                    stringMode
                    onChange={(value) => {
                        if (value && value !== 0) {
                            setStatus2('')
                        } else {
                            setStatus2('error')
                        }
                    }}
                />
            </p>

            <Divider>OR</Divider>

            <Button> Manually Input PV Generation Parameters Instead </Button>
        </Card>
    </div>
}
