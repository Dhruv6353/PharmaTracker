import {Navbar, Nav, Button, Dropdown, Row, Col, Container} from 'react-bootstrap';
import { useContext, useState } from 'react';
import {GiMedicines} from 'react-icons/gi';
import {Link} from 'react-router-dom'
import { LoginContext } from '../controller/loginstate';
import { useHistory } from 'react-router-dom';
import './custom.css';

const Header = () => {

    const { account,setAccount } = useContext(LoginContext);

    const [expanded, setExpanded] = useState(false);
    
    const history = useHistory();

    const clickHandler = () => {
        setExpanded(false);
        history.push('/');
        setAccount('');
    }

    return (
        <Container>
            <Navbar expanded={expanded} style={{height: 50, background: 'black', marginTop: 15}} sticky="top" expand="lg">  
                <Nav className="col-2">
                    <Navbar.Brand href="/" >
                        <div className="mx-auto">
                            <GiMedicines className="mb-2" style={{color: '#5cb85c'}}/>
                            <span style={{color:'#ffffff', fontWeight: 600}}>Pharma</span>
                            <span style={{color:'#5cb85c', fontWeight: 600}}>Tracker</span>
                        </div>
                    </Navbar.Brand>
                </Nav>         
                <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} style={{background: '#3F7F3F'}} />
                <Navbar.Collapse as={Col} >
                {
                    account === '' ?
                    // login pachinu
                    <Nav onClick={() => setExpanded(false)} className="ml-auto col-4"   >
                            <Link to='/Signup'>
                                <Nav.Item className="mr-4" >
                                    <Button variant="outline-success">
                                        AdminSignup
                                    </Button>
                                </Nav.Item>
                            </Link>
                            <Link to='/Login'>
                                <Nav.Item style = {{color: 'white'}}>
                                    <Button variant="success">
                                        AdminLogin
                                    </Button>
                                </Nav.Item>
                            </Link>
                    </Nav>
                    :
                    // login pelanu default
                    <Nav className="ml-auto col-4">
                        <Link to='/Upload'>
                            <Nav.Item  className="mr-4">
                                <Button variant="outline-success" onClick={() => setExpanded(false)}>
                                    Add
                                </Button>
                            </Nav.Item>
                        </Link>
                        <Link to='/Update'>
                            <Nav.Item style = {{color: 'white'}} className="mr-4">
                                <Button variant="outline-success" onClick={() => setExpanded(false)}>
                                    Update/Delete
                                </Button>
                            </Nav.Item>
                        </Link>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {account}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="logout" style={{padding: 0}}>
                                <Dropdown.Item onClick={clickHandler} >
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav> 
                }
                </Navbar.Collapse>
            </Navbar>
        </Container>
    )
}

export default Header;


