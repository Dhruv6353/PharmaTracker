import { Form, Col, Button, Card } from 'react-bootstrap';
import { FiLogIn } from 'react-icons/fi'
import { authenticateLogin } from '../service/service.js';
import { useState , useContext} from 'react';
import { LoginContext } from '../controller/loginstate.jsx';
import {url} from '../constants/constants'
import {useHistory} from 'react-router-dom'


const loginInitialValues = {
    username: '',
    password: '',
};


const Login = () => {

    const [login, setLogin] = useState(loginInitialValues);

    const {account, setAccount} = useContext(LoginContext);

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }
    
    const history = useHistory();

    const clickHandler = async () => {
        let response = await authenticateLogin(login);
        if(!response) {
            alert("invalid login");
            setLogin({ ...login, password: ''});
            return;  
        }
        // alert("login successfully");
        setAccount(login.username);
        setLogin(loginInitialValues);
        history.push('/Update');
    }
    

    return (
        <Card style={{ display: 'block', 
        width: '30rem',
        margin: '100px auto',
        borderRadius: '5px',
        background: 'rgba(255,255,255, 0.15)',
        padding: 30,
        }}>
            <h4 style={{color: '#ffffff', display:'flex', justifyContent: "center", alignItems: "center", marginBottom: 15}}>
                <FiLogIn style={{color: '#ffffff', fontSize: 20}} className="mr-2"/>
                Login
            </h4>
            <Form onSubmit={e => {e.preventDefault(); }}>
                <Form.Group as={Col}>
                    <Form.Label style={{fontSize: 20, color: '#ffffff'}}>
                        <span>User Name</span>
                    </Form.Label>
                    <Form.Control required onChange={(e) => onValueChange(e)} value={login.username} name="username" type="text" placeholder="Enter User Name"/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label style={{fontSize: 20, color: '#ffffff'}}>
                        <span>Password</span>
                    </Form.Label>
                    <Form.Control required onChange={(e) => onValueChange(e) } name="password" value={login.password} type="password" placeholder="Enter Password"/>
                </Form.Group>
                <Button type="submit" size="lg" variant="success" onClick={() => clickHandler()} style={{marginLeft: '40%', marginTop: 20}} >
                    Login
                </Button>
            </Form>
        </Card>
    )
}

export default Login;