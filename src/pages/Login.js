import NavigationBar from '../components/NavigationBar'
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from "react";
import { useAuth } from '../contexts/AuthContext';
import { Alert, Button, Card, Form} from 'react-bootstrap';

import axios from 'axios'

function Login(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const { currentUser, login, token } = useAuth();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        setError('');
        setLoading(true);
        await login(emailRef.current.value, passwordRef.current.value)
            .then(response => userRegisterInformation(response.id))
            .catch(e => {
                setError(e.message);
                setLoading(false);
            });
        
    }

    async function userRegisterInformation(id){
        try {            
            const userData = {
                'email': id,
            }
            
            const URL_USER_REGISTER_API = 'http://localhost:5000/api/v1/auth/user';
            
            var req = {
                url: URL_USER_REGISTER_API,
                method: "POST",
                data: userData,
                headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: "application/json"
                }
            };

            await axios(req).then(resp => {
                console.log(resp.data.hasInfoRegistered);
                if(resp.data.user.hasInfoRegistered){
                    navigate('/home');
                }
                else {
                    navigate('/registerUserInfo');
                }
            });

        } catch (e) {
            setError('Error : ' + e.message)
            setLoading(false)
        }
    }

    if (currentUser) {
        navigate('/home');
    }
    else{
        navigate('/');
    }

    return (
        <>
            <NavigationBar />
            <Card className="w-75 mx-auto mt-5">
                <Card.Body>
                    <h1 className="display-4 text-center my-3">Log In</h1>
                    { error && <Alert variant="danger">{ error }</Alert> }
                    <Form onSubmit={ handleSubmit }>
                        <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                                    ref={ emailRef } 
                                    type="email"
                                    placeholder="Enter email" 
                                    autoComplete="off" 
                                    required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                                    ref={ passwordRef } 
                                    type="password" 
                                    placeholder="Password" 
                                    autoComplete="off" 
                                    required />
                        </Form.Group>

                        <Button className="w-100" 
                                variant="dark"
                                type="submit"
                                disabled={ loading }>
                            Log In
                        </Button>
                        <Card.Text className="text-muted text-center my-3">
                            Need an account? <Link to="/register">Sign up</Link>
                        </Card.Text>
                    </Form>
                </Card.Body>
            </Card>
        </>        
    );
}

export default Login;
