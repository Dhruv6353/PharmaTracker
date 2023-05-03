import { Col, Row, Card, Spinner } from 'react-bootstrap';
import { useEffect, useState} from 'react';
import {FaClinicMedical} from 'react-icons/fa';
import axios from 'axios';
import Alert from './Alert';

const url = 'https://pharmatracker-backend.onrender.com/api';

const Output = (props) => {
    
    const medicinedata = props.medicine;
    const district = props.district;
    
    var [ userdata,setUserdata ] = useState([]);
    var [ medicinequantity, setMedicinequantity] = useState([]);

    const userFinder = async (medicine) => {
        try {
            await axios.get(`${url}/user/search`,{'params':{username: medicine.username}})
            .then ((res) => {
                if(district === res.data[0].district)
                {
                   setUserdata(userdata => ([...userdata, res.data]));
                   setMedicinequantity(medicinequantity => ([...medicinequantity, medicine.quantity]));
                }
            })
        }catch(err) {
            console.log('Error while finding User',err);
        }
    }
    var i = 0;
    var [ I,seI ] = useState(0);
    useEffect(() => {
        setUserdata([])
        for(var i = 0; i < medicinedata.length; i++)
        {
            userFinder(medicinedata[i]);
        }
    }, [medicinedata])

    const updateI = () => {
        i = 2;
        seI(i);
    };

    if(i!=2){
        setInterval(updateI,2000);
    }

    return (
        <div>
        {
            I?
            <div>
            {
                userdata.length=== 0 ?
                // <Child  />
                <div className="d-flex justify-content-center">
                    <Alert msg={"Medicine not found in your district"} color={'warning'}/>
                </div>
                :
                <Row xs={1} md={2} className="g-4" style={{margin: '3% 3%'}}>
                    {
                        userdata.map((user, index) => (
                            <Col className = "mb-3">
                                <Card border="success" style = {{backgroundColor: 'rgba(255,255,255, 0.15)', color: '#ffffff', borderWidth: '2px'}}>
                                    <Card.Body> 
                                        <Card.Title style={{textTransform: 'uppercase'}}><FaClinicMedical className="mb-2"/> {user[0].shopname}</Card.Title>
                                        <Card.Text>
                                            <span style={{color:'#5cb85c'}}>
                                                <span style={{textTransform: 'uppercase'}}>{medicinedata[0].name} </span> 
                                                Quantity: 
                                            </span> {medicinequantity[index]}
                                            <br/>
                                            <span style={{color:'#5cb85c'}}>Owner Name: </span>{user[0].fullname}
                                            <br/>
                                            <span style={{color:'#5cb85c'}}>Shop Address: </span>{user[0].shopaddress}
                                            <br/>
                                            <span style={{color:'#5cb85c'}}>Pincode: </span>{user[0].pincode}
                                            <br/>
                                            <span style={{color:'#5cb85c'}}>Phone: </span>{user[0].phone}
                                            <br/>
                                            <span style={{color:'#5cb85c'}}>Email: </span>{user[0].email}
                                            <br/>
                                            <span style={{color:'#5cb85c'}}>Features: </span>{user[0].features} 
                                            <br/>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            }
            </div>
            :
            <div style={{color: '#fff'}} className="d-flex justify-content-center mb-4">
                <Spinner animation="border" variant="success" className="mr-3"/>
                Loading
            </div>
        }
        </div>
    )
}


export default Output;
